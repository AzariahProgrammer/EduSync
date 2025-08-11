
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FolderKanban } from 'lucide-react';

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
            This is where the subjects page will go.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex h-64 items-center justify-center rounded-md border-2 border-dashed border-border/50 bg-secondary/30">
                <p className="text-muted-foreground">Content coming soon...</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
