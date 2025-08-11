
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateQuiz, type QuizOutput } from '@/ai/flows/quiz-generator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters.' }),
});

interface QuizGeneratorProps {
  subject: string;
}

export function QuizGenerator({ subject }: QuizGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizOutput | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
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
  
  const handleSubmitQuiz = () => {
    setSubmitted(true);
  };
  
  const calculateScore = () => {
    if (!quiz) return 0;
    return quiz.questions.reduce((score, question, index) => {
      return userAnswers[index] === question.correctAnswer ? score + 1 : score;
    }, 0);
  };

  return (
    <div className="space-y-6">
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
                                <div key={optIndex} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`q${index}-opt${optIndex}`} />
                                    <Label htmlFor={`q${index}-opt${optIndex}`}>{option}</Label>
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
         <div className="space-y-4 mt-6">
             <Card className="bg-secondary/30 border-primary/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Quiz Results</CardTitle>
                    <CardDescription>You scored {calculateScore()} out of {quiz.questions.length}</CardDescription>
                </CardHeader>
             </Card>
            {quiz.questions.map((q, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                    <Card key={index} className={cn("bg-secondary/30", isCorrect ? 'border-green-500/50' : 'border-red-500/50')}>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Question {index + 1}</span>
                                {isCorrect ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
                            </CardTitle>
                            <CardDescription>{q.questionText}</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <RadioGroup value={userAnswer}>
                                {q.options.map((option, optIndex) => (
                                    <div key={optIndex} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option} id={`result-q${index}-opt${optIndex}`} disabled />
                                        <Label htmlFor={`result-q${index}-opt${optIndex}`} className={cn(
                                            option === q.correctAnswer && 'text-green-400',
                                            option === userAnswer && !isCorrect && 'text-red-400 line-through'
                                        )}>{option}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start border-t border-border/50 pt-4">
                            <p className="text-sm font-semibold">Explanation:</p>
                            <p className="text-sm text-muted-foreground">{q.explanation}</p>
                        </CardFooter>
                    </Card>
                )
            })}
             <Button onClick={() => onFormSubmit({ topic: form.getValues('topic') })}>
                Try Another Quiz
            </Button>
         </div>
      )}
    </div>
  );
}
