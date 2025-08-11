
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateNotes, NotesOutput } from '@/ai/flows/notes-generator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters.' }),
});

interface NotesGeneratorProps {
  subject: string;
}

export function NotesGenerator({ subject }: NotesGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<NotesOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setNotes(null);
    try {
      const result = await generateNotes({ subject, topic: values.topic });
      setNotes(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: 'Could not generate notes. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'Cellular Respiration' or 'The Great Depression'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Notes
          </Button>
        </form>
      </Form>

      {loading && (
        <div className="space-y-4 mt-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )}

      {notes && notes.notes.length > 0 && (
        <div className="space-y-3 mt-6">
           <h3 className="font-headline text-lg font-semibold">Generated Notes:</h3>
          {notes.notes.map((note, index) => (
            <Collapsible key={index} className="space-y-2">
              <Card className="bg-secondary/30">
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between w-full px-4 py-3 cursor-pointer">
                    <h4 className="font-semibold">{note.term}</h4>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                       <ChevronRight className="h-4 w-4 transition-transform [&[data-state=open]]:rotate-90" />
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent className="border-t border-border/50">
                        <p className="pt-4 text-muted-foreground">{note.definition}</p>
                    </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  );
}
