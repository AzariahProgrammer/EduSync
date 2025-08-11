
'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateNotes, type NotesOutput } from '@/ai/flows/notes-generator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { ImageUploader } from '@/components/common/ImageUploader';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters long.' }),
  notesCount: z.number().min(1).max(20),
});

interface NotesGeneratorProps {
  subject: string;
}

export function NotesGenerator({ subject }: NotesGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<NotesOutput | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: '', notesCount: 5 },
  });
  
  const notesCount = form.watch('notesCount');

  const topicPlaceholders = useMemo(() => ({
    'Mathematics': "e.g., 'Quadratic Equations' or 'Trigonometry'",
    'Physical Sciences': "e.g., 'Newton's Laws of Motion' or 'Chemical Bonding'",
    'Life Sciences': "e.g., 'DNA Replication' or 'The Human Nervous System'",
    'History': "e.g., 'The Sharpeville Massacre' or 'Apartheid Legislation'",
    'Geography': "e.g., 'Climate Regions of South Africa' or 'Plate Tectonics'",
    'Default': "e.g., 'Key Concepts' or 'Chapter Summary'",
  }), []);
  
  const placeholder = topicPlaceholders[subject as keyof typeof topicPlaceholders] || topicPlaceholders.Default;


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setNotes(null);
    try {
      const result = await generateNotes({
        subject,
        topic: values.topic,
        notesCount: values.notesCount,
        imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
      });
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              name="notesCount"
              render={({ field }) => (
                <FormItem>
                   <div className="flex justify-between items-center">
                    <FormLabel>Number of Flip Cards</FormLabel>
                    <Badge variant="secondary" className="px-3 py-1 text-base">{notesCount}</Badge>
                   </div>
                  <FormControl>
                    <Slider
                      min={1}
                      max={20}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Upload Your Work (Optional)</FormLabel>
              <p className="text-sm text-muted-foreground mb-2">Upload up to 5 images of your notes or textbook pages.</p>
              <ImageUploader imageUrls={imageUrls} setImageUrls={setImageUrls} maxFiles={5} />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Notes
          </Button>
        </form>
      </Form>

      {loading && (
        <div className="space-y-4 mt-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      )}

      {notes && notes.notes.length > 0 && (
        <div className="space-y-3 mt-6">
           <h3 className="font-headline text-lg font-semibold">Generated Flip Cards:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.notes.map((note, index) => (
              <Collapsible key={index} className="group">
                <Card className="bg-secondary/30 min-h-[150px] flex flex-col justify-center transition-all duration-300 [&[data-state=open]]:border-primary/50 [&[data-state=open]]:bg-primary/5">
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between w-full p-4 cursor-pointer text-center flex-grow">
                      <h4 className="font-semibold mx-auto text-lg transition-transform duration-300 group-data-[state=open]:-translate-y-2">{note.term}</h4>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                      <CardContent className="border-t border-border/50 p-4">
                          <p className="text-muted-foreground text-center">{note.definition}</p>
                      </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
