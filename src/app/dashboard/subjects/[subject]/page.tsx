
'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookCopy, FileQuestion, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
            Choose an AI-powered tool to begin your study session for {formattedSubject}.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <Link href={`/dashboard/subjects/${subject}/study`} className="flex">
          <Card className="w-full bg-card/50 backdrop-blur-sm border-border/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <BookCopy className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="font-headline text-2xl">Generate Notes</CardTitle>
                  <CardDescription>
                    Create concise, flashcard-style notes for any topic.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end justify-end">
                <Button variant="ghost" className="text-primary hover:text-primary">
                    Start Generating <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href={`/dashboard/subjects/${subject}/study?tab=quiz`} className="flex">
          <Card className="w-full bg-card/50 backdrop-blur-sm border-border/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex flex-col">
            <CardHeader>
               <div className="flex items-center gap-4">
                <FileQuestion className="h-8 w-8 text-primary" />
                 <div>
                    <CardTitle className="font-headline text-2xl">Create a Quiz</CardTitle>
                    <CardDescription>
                    Test your knowledge with a multiple-choice quiz.
                    </CardDescription>
                 </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end justify-end">
                <Button variant="ghost" className="text-primary hover:text-primary">
                    Start Quizzer <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
