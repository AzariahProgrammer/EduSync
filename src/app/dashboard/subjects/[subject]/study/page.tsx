
'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NotesGenerator } from '@/components/dashboard/notes/NotesGenerator';
import { QuizGenerator } from '@/components/dashboard/quiz/QuizGenerator';
import { BookCopy, FileQuestion } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function StudyPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  const topic = searchParams.get('topic') || '';
  const sourceText = searchParams.get('sourceText') || undefined;
  const tab = searchParams.get('tab') || 'notes';

  const formattedSubject = subject
    ? subject.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
    : 'Subject';

  const handleTabChange = (value: string) => {
    const newPath = `/dashboard/subjects/${subject}/study?tab=${value}`;
    router.replace(newPath, { scroll: false });
  };
  
  return (
    <div className="space-y-8">
      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notes" className="gap-2">
            <BookCopy className="h-5 w-5" /> Generate Notes
          </TabsTrigger>
          <TabsTrigger value="quiz" className="gap-2">
            <FileQuestion className="h-5 w-5" /> Create a Quiz
          </TabsTrigger>
        </TabsList>
        <TabsContent value="notes">
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 mt-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookCopy className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline text-2xl">Generate Notes for {formattedSubject}</CardTitle>
              </div>
              <CardDescription>
                Enter a topic to generate concise, flashcard-style notes using AI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotesGenerator 
                  subject={formattedSubject} 
                  initialTopic={topic}
                  sourceText={sourceText}
                />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quiz">
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 mt-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileQuestion className="h-6 w-6 text-primary" />
                  <CardTitle className="font-headline text-2xl">Create a Quiz for {formattedSubject}</CardTitle>
                </div>
                <CardDescription>
                  Enter a topic to generate a multiple-choice quiz to test your knowledge.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuizGenerator 
                  subject={formattedSubject} 
                  initialTopic={topic}
                  sourceText={sourceText}
                />
              </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


function StudyPageLoadingSkeleton() {
    return (
        <div className="space-y-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/20">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-7 w-64" />
                    </div>
                    <Skeleton className="h-5 w-96 mt-2" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        <div className="space-y-2">
                           <Skeleton className="h-5 w-24" />
                           <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="space-y-2">
                           <Skeleton className="h-5 w-48" />
                           <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-10 w-36" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function StudyPage() {
  return (
    <Suspense fallback={<StudyPageLoadingSkeleton />}>
      <StudyPageContent />
    </Suspense>
  );
}
