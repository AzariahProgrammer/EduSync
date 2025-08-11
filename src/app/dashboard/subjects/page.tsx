
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Atom, Briefcase, BookOpen, Brush, FolderKanban } from 'lucide-react';

const subjectCategories = [
  {
    title: 'Sciences & Mathematics',
    icon: <Atom className="h-6 w-6 text-primary" />,
    subjects: [
      'Mathematics (Pure Maths)',
      'Mathematical Literacy',
      'Physical Sciences (Physics & Chemistry)',
      'Life Sciences (Biology)',
    ],
  },
  {
    title: 'Commerce & Technology',
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    subjects: [
      'Accounting',
      'Business Studies',
      'Economics',
      'Information Technology (IT)',
      'Computer Applications Technology (CAT)',
    ],
  },
  {
    title: 'Humanities & Social Sciences',
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    subjects: [
      'History',
      'Geography',
      'Religious Education / World of Religion',
    ],
  },
  {
    title: 'Creative, Cultural & Language Arts',
    icon: <Brush className="h-6 w-6 text-primary" />,
    subjects: ['Visual Arts'],
  },
];

export default function SubjectsPage() {
  return (
    <div className="space-y-8">
      <Card className="bg-card/50 backdrop-blur-sm border-border/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FolderKanban className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Subjects</CardTitle>
          </div>
          <CardDescription>
            Browse and select from the available subjects organized by category.
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
                      <li key={subject} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary/70 mr-3 shrink-0"></div>
                        <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{subject}</span>
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
