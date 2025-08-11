
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Atom, Briefcase, BookOpen, Brush, Languages, 
  Calculator, FlaskConical, Dna, PiggyBank, BarChart3, Presentation,
  Drama, Globe, Library, Code, MousePointerClick, BookMarked,
  Palette, Mic, Music
} from 'lucide-react';
import Link from 'next/link';

const subjects = [
  { name: 'Mathematics', path: 'mathematics', icon: <Calculator className="h-8 w-8 text-primary" /> },
  { name: 'Mathematical Literacy', path: 'mathematical-literacy', icon: <BarChart3 className="h-8 w-8 text-primary" /> },
  { name: 'Physical Sciences', path: 'physical-sciences', icon: <FlaskConical className="h-8 w-8 text-primary" /> },
  { name: 'Life Sciences', path: 'life-sciences', icon: <Dna className="h-8 w-8 text-primary" /> },
  { name: 'Accounting', path: 'accounting', icon: <PiggyBank className="h-8 w-8 text-primary" /> },
  { name: 'Business Studies', path: 'business-studies', icon: <Presentation className="h-8 w-8 text-primary" /> },
  { name: 'Economics', path: 'economics', icon: <BarChart3 className="h-8 w-8 text-primary" /> },
  { name: 'Information Technology', path: 'it', icon: <Code className="h-8 w-8 text-primary" /> },
  { name: 'Computer Applications Tech', path: 'cat', icon: <MousePointerClick className="h-8 w-8 text-primary" /> },
  { name: 'History', path: 'history', icon: <Library className="h-8 w-8 text-primary" /> },
  { name: 'Geography', path: 'geography', icon: <Globe className="h-8 w-8 text-primary" /> },
  { name: 'Religious Education', path: 'religious-education', icon: <BookMarked className="h-8 w-8 text-primary" /> },
  { name: 'Visual Arts', path: 'visual-arts', icon: <Palette className="h-8 w-8 text-primary" /> },
  { name: 'English', path: 'english', icon: <Mic className="h-8 w-8 text-primary" /> },
  { name: 'Afrikaans', path: 'afrikaans', icon: <Mic className="h-8 w-8 text-primary" /> },
  { name: 'Zulu', path: 'zulu', icon: <Mic className="h-8 w-8 text-primary" /> },
];

export default function SubjectsPage() {
  return (
    <div className="space-y-8">
      <Card className="bg-card/50 backdrop-blur-sm border-border/20">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Subjects (South African Curriculum)</CardTitle>
          <CardDescription>
            Select a subject to access AI-powered study tools like note generation and practice quizzes.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <Link href={`/dashboard/subjects/${subject.path}`} key={subject.path} className="group">
            <Card className="bg-card/50 backdrop-blur-sm border-border/20 h-full flex flex-col justify-center items-center text-center p-6 transition-all duration-200 group-hover:border-primary/60 group-hover:bg-primary/5 group-hover:-translate-y-1">
              <div className="mb-4 transition-transform duration-200 group-hover:scale-110">
                {subject.icon}
              </div>
              <CardTitle className="font-headline text-xl">{subject.name}</CardTitle>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
