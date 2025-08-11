
'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NotesGenerator } from '@/components/dashboard/subjects/NotesGenerator';
import { QuizGenerator } from '@/components/dashboard/subjects/QuizGenerator';
import { BookCopy, FileQuestion } from 'lucide-react';

export default function SubjectPage() {
  const params = useParams();
  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;

  // Capitalize and format the subject name for display
  const formattedSubject = subject
    ? subject.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
    : 'Subject';

  return (
    <div className="space-y-8">
      <Card className="bg-card/50 backdrop-blur-sm border-border/20">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{formattedSubject}</CardTitle>
          <CardDescription>
            Use the AI tools below to generate study materials for this subject.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="bg-card/50 backdrop-blur-sm border-border/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BookCopy className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline text-2xl">Generate Notes</CardTitle>
            </div>
            <CardDescription>
              Enter a topic to generate concise, flashcard-style notes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NotesGenerator subject={formattedSubject} />
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/20">
          <CardHeader>
             <div className="flex items-center gap-3">
              <FileQuestion className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline text-2xl">Create a Quiz</CardTitle>
            </div>
            <CardDescription>
              Enter a topic to generate a multiple-choice quiz to test your knowledge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QuizGenerator subject={formattedSubject} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
