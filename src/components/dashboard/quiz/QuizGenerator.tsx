
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, Bot, Sparkles } from 'lucide-react';
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

const formSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters.' }),
});

interface QuizGeneratorProps {
  subject: string;
}

export function QuizGenerator({ subject }: QuizGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [quiz, setQuiz] = useState<QuizOutput | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: '' },
  });

  async function onFormSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setQuiz(null);
    setUserAnswers({});
    setSubmitted(false);
    setFeedback(null);
    try {
      const result = await generateQuiz({ subject, topic: values.topic, questionCount: 5 });
      setQuiz(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: 'Could not generate quiz. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };
  
  const handleSubmitQuiz = async () => {
    setSubmitted(true);
    setLoadingFeedback(true);
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
          userAnswer: q.userAnswer,
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
  };
  
  const calculateScore = () => {
    if (!quiz) return { correct: 0, total: 0, percentage: 0 };
    const correct = quiz.questions.reduce((score, question, index) => {
      return userAnswers[index] === question.correctAnswer ? score + 1 : score;
    }, 0);
    const total = quiz.questions.length;
    return { correct, total, percentage: Math.round((correct / total) * 100) };
  };

  const score = calculateScore();

  const getScoreColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  return (
    <div className="space-y-6">
      {!submitted && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Photosynthesis' or 'World War II'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Quiz
            </Button>
          </form>
        </Form>
      )}

      {loading && (
        <div className="space-y-4 mt-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
        </div>
      )}

      {quiz && !submitted && (
        <div className="space-y-4 mt-6">
            <h3 className="font-headline text-lg font-semibold">Generated Quiz:</h3>
            {quiz.questions.map((q, index) => (
                <Card key={index} className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle>Question {index + 1}</CardTitle>
                        <CardDescription>{q.questionText}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup onValueChange={(value) => handleAnswerChange(index, value)}>
                            {q.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center space-x-2 p-2 rounded-md hover:bg-primary/10">
                                    <RadioGroupItem value={option} id={`q${index}-opt${optIndex}`} />
                                    <Label htmlFor={`q${index}-opt${optIndex}`} className="flex-1 cursor-pointer">{option}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                </Card>
            ))}
             <Button onClick={handleSubmitQuiz} disabled={Object.keys(userAnswers).length !== quiz.questions.length}>
                Submit Quiz
            </Button>
        </div>
      )}

      {submitted && quiz && (
         <div className="space-y-6 mt-6">
             <Card className="bg-secondary/30 border-primary/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Quiz Results</CardTitle>
                    <CardDescription>You scored {score.correct} out of {score.total}</CardDescription>
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
                                {q.options.map((option, optIndex) => (
                                    <div key={optIndex} className="flex items-center space-x-2 p-2 rounded-md">
                                        <RadioGroupItem value={option} id={`result-q${index}-opt${optIndex}`} />
                                        <Label htmlFor={`result-q${index}-opt${optIndex}`} className={cn(
                                            'cursor-not-allowed',
                                            option === q.correctAnswer && 'font-bold text-green-400',
                                            option === userAnswer && !isCorrect && 'text-red-400 line-through'
                                        )}>{option}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start border-t border-border/50 pt-4 bg-background/30">
                            <p className="text-sm font-semibold mb-1">Explanation:</p>
                            <p className="text-sm text-muted-foreground">{q.explanation}</p>
                        </CardFooter>
                    </Card>
                )
            })}
             <Button onClick={() => onFormSubmit({ topic: form.getValues('topic') })}>
                Try Another Quiz on this Topic
            </Button>
         </div>
      )}
    </div>
  );
}
