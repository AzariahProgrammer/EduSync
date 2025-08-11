
"use client";

import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Video, MessagesSquare, KanbanSquare, Calendar, Folder, Trophy, Package, Check, Lightbulb } from 'lucide-react';
import { useTypewriter } from '@/hooks/use-typewriter';

export function DashboardClient() {
  const { user } = useAuth();
  
  const welcomeMessage = `Welcome back, ${user?.displayName || user?.email?.split('@')[0] || 'learner'}!`;
  const subtitleMessage = 'Continue your learning journey and explore new paths.';

  const { displayedText: displayedWelcome, isTyping: isTypingWelcome } = useTypewriter(welcomeMessage, 50);
  const { displayedText: displayedSubtitle, isTyping: isTypingSubtitle } = useTypewriter(subtitleMessage, 25, welcomeMessage.length * 50 + 500);
  
  const blinkingCursor = (isTyping: boolean) => isTyping && <span className="blinking-cursor" />;

  return (
    <div className="space-y-8">
      <Card className="bg-card/50 backdrop-blur-sm border-border/20 overflow-hidden">
        <CardContent className="p-6 min-h-[120px]">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
              {displayedWelcome.split(', ').map((part, index) => 
                index === 0 ? <span key={index}>{part}, </span> : <span key={index} className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{part}</span>
              )}
              {blinkingCursor(isTypingWelcome)}
            </h1>
          </div>
          <div>
            <p className="text-muted-foreground">
                {displayedSubtitle}
                {blinkingCursor(isTypingSubtitle)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">EduSync – Learn Together, Anywhere</CardTitle>
          <CardDescription>
            Your connected learning space — built for the modern classroom, whether it’s physical, virtual, or a blend of both. EduSync combines real-time communication, interactive lessons, intelligent progress tracking, and seamless resource sharing into one intuitive platform designed to empower students, educators, and institutions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4 rounded-lg border border-border/50 bg-secondary/30 p-6">
            <h3 className="flex items-center gap-3 font-headline text-xl font-semibold"><Package className="h-6 w-6 text-primary" /> All-in-One Digital Learning Hub</h3>
            <p className="text-muted-foreground">
             Say goodbye to switching between apps. With EduSync, every tool you need — from live classes to interactive assignments — is unified in a single, secure, and easy-to-use environment.
            </p>
          </div>
          
          <div>
            <h3 className="font-headline text-xl font-semibold mb-6">What You Can Do with EduSync</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Video className="h-6 w-6 text-primary/80" /> Live, Interactive Lessons</CardTitle>
                    <CardDescription>Host and join classes with high-quality video and audio, while collaborating in real time.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Interactive whiteboard for group problem-solving</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Screen sharing for presentations and walkthroughs</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Virtual participation tools like polls and hand raises</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><MessagesSquare className="h-6 w-6 text-primary/80" /> Instant & Organized Communication</CardTitle>
                     <CardDescription>Keep conversations clear and accessible.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                     <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Real-time chat for quick questions and feedback</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Threaded discussions to keep topics focused</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Private and group channels for different classes or teams</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><KanbanSquare className="h-6 w-6 text-primary/80" /> Smart Assignments & Progress Tracking</CardTitle>
                    <CardDescription>Stay on track with intelligent task management.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Visual boards showing To Do, In Progress, and Completed</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Auto-generated progress reports for students and teachers</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>In-platform submissions and instant grading options</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardHeader>
                     <CardTitle className="flex items-center gap-3"><Calendar className="h-6 w-6 text-primary/80" /> Integrated Calendar & Reminders</CardTitle>
                     <CardDescription>Never miss a class, deadline, or event.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>All schedules in one synced calendar</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Automatic reminders and notifications</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Personalized daily and weekly overviews</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                   <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Folder className="h-6 w-6 text-primary/80" /> Centralized Resource Library</CardTitle>
                    <CardDescription>Access and share learning materials in seconds.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Upload notes, videos, slides, and practice exercises</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Organize by subject, topic, or course</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Secure, cloud-based storage accessible anytime</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Trophy className="h-6 w-6 text-primary/80" /> Gamified Learning Motivation</CardTitle>
                    <CardDescription>Turn learning into a rewarding challenge.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Earn points for participation and completed tasks</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Level up and unlock achievement badges</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Leaderboards to inspire healthy competition</span></li>
                    </ul>
                  </CardContent>
                </Card>
            </div>
          </div>
          <div className="text-center rounded-lg border border-border/50 bg-secondary/30 p-6">
             <h3 className="flex items-center justify-center gap-3 font-headline text-xl font-semibold"><Lightbulb className="h-6 w-6 text-amber-400" /> Why EduSync?</h3>
             <p className="text-muted-foreground mt-2">
                EduSync makes learning more than just lessons — it’s collaboration, progress, and achievement in one place.
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
