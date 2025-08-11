
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Atom, Briefcase, BookOpen, Brush, FolderKanban, Languages } from 'lucide-react';
import Link from 'next/link';

const subjectCategories = [
  {
    title: 'Sciences & Mathematics',
    icon: <Atom className="h-6 w-6 text-primary" />,
    subjects: [
      { name: 'Mathematics (Pure Maths)', path: 'mathematics' },
      { name: 'Mathematical Literacy', path: 'mathematical-literacy' },
      { name: 'Physical Sciences (Physics & Chemistry)', path: 'physical-sciences' },
      { name: 'Life Sciences (Biology)', path: 'life-sciences' },
    ],
  },
  {
    title: 'Commerce & Technology',
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    subjects: [
      { name: 'Accounting', path: 'accounting' },
      { name: 'Business Studies', path: 'business-studies' },
      { name: 'Economics', path: 'economics' },
      { name: 'Information Technology (IT)', path: 'it' },
      { name: 'Computer Applications Technology (CAT)', path: 'cat' },
    ],
  },
  {
    title: 'Humanities & Social Sciences',
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    subjects: [
      { name: 'History', path: 'history' },
      { name: 'Geography', path: 'geography' },
      { name: 'Religious Education / World of Religion', path: 'religious-education' },
    ],
  },
  {
    title: 'Creative, Cultural & Language Arts',
    icon: <Languages className="h-6 w-6 text-primary" />,
    subjects: [
      { name: 'Visual Arts', path: 'visual-arts' },
      { name: 'English', path: 'english' },
      { name: 'Afrikaans', path: 'afrikaans' },
      { name: 'Zulu', path: 'zulu' },
    ],
  },
];

export default function SubjectsPage() {
  return (
    <div className="space-y-8">
      <Card className="bg-card/50 backdrop-blur-sm border-border/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FolderKanban className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Subjects (South African Curriculum)</CardTitle>
          </div>
          <CardDescription>
            Select a subject to generate AI-powered notes and quizzes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {subjectCategories.map((category) => (
              <Card key={category.title} className="bg-secondary/30 border-border/50 flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {category.icon}
                    <CardTitle className="font-headline text-xl">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {category.subjects.map((subject) => (
                      <li key={subject.path}>
                        <Link href={`/dashboard/subjects/${subject.path}`} className="flex items-center group">
                          <div className="h-2 w-2 rounded-full bg-primary/70 mr-3 shrink-0 group-hover:bg-primary transition-colors"></div>
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">{subject.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
