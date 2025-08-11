
'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Repeat, MoveRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateNotes, type NotesOutput } from '@/ai/flows/notes-generator';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { ImageUploader } from '@/components/common/ImageUploader';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters long.' }),
  notesCount: z.number().min(1).max(20),
});

interface NotesGeneratorProps {
  subject: string;
}

const FlipCard = ({ term, definition }: { term: string, definition: string }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <div className="perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
            <div
                className={cn(
                    "relative w-full h-full min-h-[150px] transform-style-3d transition-transform duration-500",
                    isFlipped && 'rotate-y-180'
                )}
            >
                {/* Front of the card */}
                <div className="absolute w-full h-full backface-hidden">
                    <Card className="bg-secondary/30 h-full flex flex-col items-center justify-center p-4 text-center">
                        <h4 className="font-semibold text-lg">{term}</h4>
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-xs text-muted-foreground">
                            <Repeat className="h-3 w-3" />
                            <span>Click to flip</span>
                        </div>
                    </Card>
                </div>
                {/* Back of the card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <Card className="bg-primary/10 border-primary/50 h-full flex flex-col items-center justify-center p-4 text-center">
                        <p className="text-muted-foreground">{definition}</p>
                         <div className="absolute bottom-2 right-2 flex items-center gap-1 text-xs text-muted-foreground">
                            <Repeat className="h-3 w-3" />
                            <span>Click to flip</span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};


export function NotesGenerator({ subject }: NotesGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<NotesOutput | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter();

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

  const handleConvertToQuiz = () => {
    if (!notes) return;
    const sourceText = notes.notes.map(note => `Term: ${note.term}\nDefinition: ${note.definition}`).join('\n\n');
    const topic = form.getValues('topic');
    const subjectPath = subject.toLowerCase().replace(/\s+/g, '-');
    
    const query = new URLSearchParams({
        topic: topic,
        sourceText: sourceText,
    }).toString();

    router.push(`/dashboard/subjects/${subjectPath}/quiz?${query}`);
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
        <div className="space-y-6 mt-6">
           <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-headline text-lg font-semibold">Generated Flip Cards:</h3>
            <Button onClick={handleConvertToQuiz}>
                Convert Notes to Quiz
                <MoveRight className="ml-2 h-4 w-4" />
            </Button>
           </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.notes.map((note, index) => (
                <FlipCard key={index} term={note.term} definition={note.definition} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
