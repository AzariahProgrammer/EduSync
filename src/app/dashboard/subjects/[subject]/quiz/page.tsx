
'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { QuizGenerator } from '@/components/dashboard/quiz/QuizGenerator';
import { FileQuestion } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function QuizPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  const topic = searchParams.get('topic') || '';
  const sourceText = searchParams.get('sourceText') || undefined;

  const formattedSubject = subject
    ? subject.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
    : 'Subject';

  return (
    <div className="space-y-8">
       <Card className="bg-card/50 backdrop-blur-sm border-border/20">
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
    </div>
  );
}


function QuizPageLoadingSkeleton() {
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

export default function QuizPage() {
  return (
    <Suspense fallback={<QuizPageLoadingSkeleton />}>
      <QuizPageContent />
    </Suspense>
  );
}
