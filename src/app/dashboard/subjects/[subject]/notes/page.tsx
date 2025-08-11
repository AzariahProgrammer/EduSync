
'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NotesGenerator } from '@/components/dashboard/notes/NotesGenerator';
import { BookCopy } from 'lucide-react';

export default function NotesPage() {
  const params = useParams();
  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;

  const formattedSubject = subject
    ? subject.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
    : 'Subject';

  return (
    <div className="space-y-8">
      <Card className="bg-card/50 backdrop-blur-sm border-border/20">
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
          <NotesGenerator subject={formattedSubject} />
        </CardContent>
      </Card>
    </div>
  );
}
