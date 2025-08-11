
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { suggestLearningPath, LearningPathSuggestionsOutput } from '@/ai/flows/learning-path-suggestions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CodeBlock } from '../common/CodeBlock';

const formSchema = z.object({
  learningGoals: z.string().min(10, {
    message: "Please describe your learning goals in at least 10 characters.",
  }),
});

export function AILearningPath() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LearningPathSuggestionsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      learningGoals: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setSuggestions(null);
    try {
      // Mocked user activity for demonstration purposes
      const result = await suggestLearningPath({
        learningGoals: values.learningGoals,
        userActivity: "Completed 'React for Beginners' and 'Firebase Essentials'. Spent some time on 'Advanced CSS'.",
      });
      setSuggestions(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not generate learning suggestions. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="bg-gradient-to-br from-secondary/30 to-background border-border/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Personalized Learning Path</CardTitle>
        </div>
        <CardDescription>
          Tell us your goals, and our AI will suggest the next steps in your learning journey with code examples.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="learningGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you want to learn next?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'I want to master React state management' or 'Learn how to use Firebase with Next.js'"
                      className="resize-none bg-background/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Suggestions
            </Button>
          </form>
        </Form>
        {loading && (
          <div className="mt-6 space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        )}
        {suggestions && suggestions.suggestedMaterials.length > 0 && (
          <div className="mt-6">
            <h3 className="font-headline text-lg font-semibold mb-3">Here's your suggested path:</h3>
            <Accordion type="single" collapsible className="w-full">
              {suggestions.suggestedMaterials.map((material, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="font-medium text-left hover:no-underline">
                    {material.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <CodeBlock language="javascript" value={material.code} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
