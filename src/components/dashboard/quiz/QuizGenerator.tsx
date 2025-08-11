
'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, Bot, Timer, MoveRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateQuiz, type QuizOutput } from '@/ai/flows/quiz-generator';
import { generateFeedback } from '@/ai/flows/quiz-feedback';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { ImageUploader } from '@/components/common/ImageUploader';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters.' }),
  questionCount: z.number().int().min(1).max(10).default(5),
  timerDuration: z.number().int().min(10).max(120).default(60),
  sourceText: z.string().optional(),
});

interface QuizGeneratorProps {
  subject: string;
  initialTopic?: string;
  sourceText?: string;
}

export function QuizGenerator({ subject, initialTopic = '', sourceText }: QuizGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [quiz, setQuiz] = useState<QuizOutput | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerIntervalRef =  useRef<NodeJS.Timeout | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      topic: initialTopic, 
      questionCount: 5,
      timerDuration: 60,
      sourceText: sourceText,
    },
  });

  const questionCount = form.watch('questionCount');
  const timerDuration = form.watch('timerDuration');
  const subjectPath = subject.toLowerCase().replace(/\s+/g, '-');

  const handleSubmitQuiz = useCallback(async () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setSubmitted(true);
    setLoadingFeedback(true);
    toast({
        title: 'Quiz Submitted!',
        description: 'Generating your personalized feedback...',
    });

    try {
      if (!quiz) return;
      const incorrectAnswers = quiz.questions
        .map((q, index) => ({ ...q, userAnswer: userAnswers[index] }))
        .filter((q, index) => userAnswers[index] !== q.correctAnswer);

      const feedbackResult = await generateFeedback({
        subject,
        topic: form.getValues('topic'),
        incorrectAnswers: incorrectAnswers.map(q => ({
          questionText: q.questionText,
          userAnswer: q.userAnswer || "Not answered",
          correctAnswer: q.correctAnswer,
          explanation: q.explanation
        })),
      });
      setFeedback(feedbackResult.feedback);
    } catch (error) {
      console.error("Failed to get feedback:", error);
      toast({
        variant: 'destructive',
        title: 'AI Feedback Error',
        description: 'Could not generate AI feedback for your results.',
      });
    } finally {
      setLoadingFeedback(false);
    }
  }, [quiz, subject, userAnswers, form, toast]);

   // Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmitQuiz();
    }
    if (!timeLeft) return;

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(t => t! - 1);
    }, 1000);

    return () => {
      if(timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timeLeft, handleSubmitQuiz]);


  // Automatically generate quiz if sourceText is provided
  const onFormSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setQuiz(null);
    setUserAnswers({});
    setSubmitted(false);
    setFeedback(null);
    setTimeLeft(null);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    const { dismiss } = toast({
      title: 'AI is on the case!',
      description: 'Generating your quiz. This might take a moment.',
    });
    
    try {
      const result = await generateQuiz({
        subject,
        topic: values.topic,
        questionCount: values.questionCount,
        imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
        sourceText: values.sourceText,
      });
      setQuiz(result);
      setTimeLeft(values.timerDuration); // Start the timer
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: 'Could not generate quiz. Please try again.',
      });
    } finally {
      setLoading(false);
      dismiss();
    }
  }, [subject, imageUrls, toast]);

  useEffect(() => {
    if (sourceText) {
      onFormSubmit(form.getValues());
    }
  }, [sourceText, onFormSubmit, form]);


  const topicPlaceholders = useMemo(() => ({
    'Mathematics': "e.g., 'Algebraic Expressions' or 'Euclidean Geometry'",
    'Physical Sciences': "e.g., 'Organic Chemistry' or 'Electromagnetism'",
    'Life Sciences': "e.g., 'Genetics and Inheritance' or 'Human Evolution'",
    'History': "e.g., 'The Cold War' or 'Civil Rights Movement'",
    'Geography': "e.g., 'Urban Settlement' or 'Geomorphology'",
    'Default': "e.g., 'Test Your Knowledge' or 'Chapter 5 Quiz'",
  }), []);

  const placeholder = topicPlaceholders[subject as keyof typeof topicPlaceholders] || topicPlaceholders.Default;

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };
  
  const calculateScore = () => {
    if (!quiz) return { correct: 0, total: 0, percentage: 0 };
    const correct = quiz.questions.reduce((score, question, index) => {
      return userAnswers[index] === question.correctAnswer ? score + 1 : score;
    }, 0);
    const total = quiz.questions.length;
    return { correct, total, percentage: total > 0 ? Math.round((correct / total) * 100) : 0 };
  };

  const score = calculateScore();

  const getScoreColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  const restartQuiz = () => {
    onFormSubmit(form.getValues());
  }

  const startNewQuiz = () => {
    setQuiz(null);
    setUserAnswers({});
    setSubmitted(false);
    setFeedback(null);
    setImageUrls([]);
    setTimeLeft(null);
    form.reset({ topic: '', questionCount: 5, sourceText: undefined, timerDuration: 60 });
    const newPath = `/dashboard/subjects/${subjectPath}/study?tab=quiz`;
    router.replace(newPath, { scroll: false });
  }

  const handleConvertToNotes = () => {
    if (!quiz) return;
    const sourceText = quiz.questions.map(q => `Question: ${q.questionText}\nAnswer: ${q.correctAnswer}\nExplanation: ${q.explanation}`).join('\n\n');
    const topic = form.getValues('topic');
    
    const query = new URLSearchParams({
        tab: 'notes',
        topic: `Notes from '${topic}' Quiz`,
        sourceText: sourceText,
    }).toString();

    router.push(`/dashboard/subjects/${subjectPath}/study?${query}`);
  }


  if (loading) {
    return (
        <div className="space-y-4 mt-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
        </div>
    );
  }

  if (quiz && !submitted) {
    const formattedTime = timeLeft !== null ? `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}` : '';
    return (
        <div className="space-y-4 mt-6">
            <Card className="sticky top-16 z-10 bg-card/80 backdrop-blur-lg border-primary/20">
              <CardContent className="p-4 flex items-center justify-between">
                <h3 className="font-headline text-lg font-semibold">Quiz on {form.getValues('topic')}</h3>
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <Timer className="h-5 w-5" />
                  <span>{formattedTime}</span>
                </div>
              </CardContent>
            </Card>

            {quiz.questions.map((q, index) => (
                <Card key={index} className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle>Question {index + 1}</CardTitle>
                        <CardDescription>{q.questionText}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup onValueChange={(value) => handleAnswerChange(index, value)}>
                            <div className="space-y-2">
                                {q.options.map((option, optIndex) => (
                                    <div key={optIndex} className="flex items-center space-x-3 p-3 rounded-md transition-colors hover:bg-primary/10 has-[[data-state=checked]]:bg-primary/10">
                                        <RadioGroupItem value={option} id={`q${index}-opt${optIndex}`} />
                                        <Label htmlFor={`q${index}-opt${optIndex}`} className="flex-1 cursor-pointer font-normal">{option}</Label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>
            ))}
             <Button onClick={handleSubmitQuiz} disabled={Object.keys(userAnswers).length !== quiz.questions.length}>
                Submit Quiz
            </Button>
        </div>
    );
  }

  if (submitted && quiz) {
    return (
         <div className="space-y-6 mt-6">
             <Card className="bg-secondary/30 border-primary/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Quiz Results</CardTitle>
                    <CardDescription>You scored {score.correct} out of {score.total} on the topic: <span className="font-semibold">{form.getValues('topic')}</span></CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-3xl text-primary">{score.percentage}%</span>
                    <Progress value={score.percentage} className={cn("w-full h-3 [&>div]:", getScoreColor(score.percentage))} />
                  </div>
                </CardContent>
             </Card>

             <Card className="bg-secondary/30 border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 font-headline text-xl">
                    <Bot className="h-6 w-6 text-primary" />
                    AI Feedback
                  </CardTitle>
                   <CardDescription>Here's some personalized advice to help you improve.</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingFeedback ? (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Generating your feedback...</span>
                    </div>
                  ) : (
                    <p className="text-muted-foreground whitespace-pre-wrap">{feedback}</p>
                  )}
                </CardContent>
             </Card>

            {quiz.questions.map((q, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                    <Card key={index} className={cn("bg-secondary/30", isCorrect ? 'border-green-500/50' : 'border-red-500/50')}>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="flex-1">Question {index + 1}</span>
                                {isCorrect ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
                            </CardTitle>
                            <CardDescription>{q.questionText}</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <RadioGroup value={userAnswer} disabled>
                                <div className="space-y-2">
                                {q.options.map((option, optIndex) => (
                                    <div key={optIndex} className="flex items-center space-x-3 p-2 rounded-md">
                                        <RadioGroupItem value={option} id={`result-q${index}-opt${optIndex}`} />
                                        <Label htmlFor={`result-q${index}-opt${optIndex}`} className={cn(
                                            'cursor-not-allowed font-normal',
                                            option === q.correctAnswer && 'font-bold text-green-400',
                                            option === userAnswer && !isCorrect && 'text-red-400 line-through'
                                        )}>{option}</Label>
                                    </div>
                                ))}
                                </div>
                            </RadioGroup>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start border-t border-border/50 pt-4 bg-background/30">
                            <p className="text-sm font-semibold mb-1">Explanation:</p>
                            <p className="text-sm text-muted-foreground">{q.explanation}</p>
                        </CardFooter>
                    </Card>
                )
            })}
             <div className="flex flex-wrap gap-4">
                <Button onClick={restartQuiz}>
                    Try Quiz Again
                </Button>
                 <Button onClick={startNewQuiz} variant="outline">
                    Start a New Quiz
                </Button>
                <Button onClick={handleConvertToNotes} variant="secondary">
                    Convert Results to Notes
                    <MoveRight className="ml-2 h-4 w-4" />
                </Button>
             </div>
         </div>
      );
  }

  return (
    <div className="space-y-6">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Topic</FormLabel>
                        <FormControl>
                            <Input placeholder={placeholder} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="questionCount"
                    render={({ field }) => (
                        <FormItem>
                        <div className="flex justify-between items-center">
                            <FormLabel>Number of Questions</FormLabel>
                            <Badge variant="secondary" className="px-3 py-1 text-base">{questionCount}</Badge>
                        </div>
                        <FormControl>
                            <Slider
                            min={1}
                            max={10}
                            step={1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                    />
                    
                    <FormField
                    control={form.control}
                    name="timerDuration"
                    render={({ field }) => (
                        <FormItem>
                        <div className="flex justify-between items-center">
                            <FormLabel>Timer Duration</FormLabel>
                            <Badge variant="secondary" className="px-3 py-1 text-base">{Math.floor(field.value / 60)}m {field.value % 60}s</Badge>
                        </div>
                        <FormControl>
                            <Slider
                            min={10}
                            max={120}
                            step={5}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                    />

                    {sourceText ? (
                    <FormField
                        control={form.control}
                        name="sourceText"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Source Text from Notes</FormLabel>
                            <FormControl>
                            <Textarea {...field} readOnly className="h-40 bg-secondary/50" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    ) : (
                    <div>
                        <FormLabel>Upload Your Work (Optional)</FormLabel>
                        <p className="text-sm text-muted-foreground mb-2">Upload up to 5 images of your worksheets or textbook pages.</p>
                        <ImageUploader imageUrls={imageUrls} setImageUrls={setImageUrls} maxFiles={5} />
                    </div>
                    )}
                </div>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Quiz
                </Button>
            </form>
        </Form>
    </div>
  );
}
