
"use client";

import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Video, MessagesSquare, KanbanSquare, Calendar, Folder, Trophy, Package, Check, Lightbulb } from 'lucide-react';

export function DashboardClient() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <Card className="bg-card/50 backdrop-blur-sm border-border/20">
        <CardContent className="p-6">
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Welcome back, <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{user?.displayName || user?.email?.split('@')[0] || 'learner'}</span>!
          </h1>
          <p className="text-muted-foreground">Continue your learning journey and explore new paths.</p>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">EduSync – Learn Together, Anywhere</CardTitle>
          <CardDescription>
            Your classroom, your way — whether you’re in the same room or continents apart. EduSync unites live video, real-time messaging, assignments, scheduling, and resource sharing into one seamless platform, purpose-built to empower both students and educators.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4 rounded-lg border border-border/50 bg-secondary/30 p-6">
            <h3 className="flex items-center gap-3 font-headline text-xl font-semibold"><Package className="h-6 w-6 text-primary" /> A True All-in-One Learning Platform</h3>
            <p className="text-muted-foreground">
              No more juggling between apps, tabs, and tools. EduSync brings every essential feature for engaging, organized, and collaborative learning into a single, beautifully designed interface that works effortlessly on any device.
            </p>
          </div>
          
          <div>
            <h3 className="font-headline text-xl font-semibold mb-6">Core Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Video className="h-6 w-6 text-primary/80" /> Live Classes</CardTitle>
                    <CardDescription>Experience real-time learning with crystal-clear video and audio.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Screen sharing for presentations and demos</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Virtual hand raising to keep classes interactive</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Collaborative whiteboards for group problem-solving</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><MessagesSquare className="h-6 w-6 text-primary/80" /> Real-Time Chat</CardTitle>
                     <CardDescription>Stay connected in and out of the classroom.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                     <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Instant messaging for quick communication</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Threaded discussions for organized conversations</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Group chats for teamwork and study groups</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><KanbanSquare className="h-6 w-6 text-primary/80" /> Assignments Tracker</CardTitle>
                    <CardDescription>Stay in control of your workload with a visual Kanban board.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Auto-categorized tasks: To Do, In Progress, Completed</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Deadlines and progress tracking at a glance</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Assignment submissions directly within the platform</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardHeader>
                     <CardTitle className="flex items-center gap-3"><Calendar className="h-6 w-6 text-primary/80" /> Calendar & Smart Reminders</CardTitle>
                     <CardDescription>Never miss a deadline or class.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Integrated calendar that syncs with assignments and events</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Automatic reminders for upcoming tasks and sessions</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Daily and weekly agenda views</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                   <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Folder className="h-6 w-6 text-primary/80" /> File Sharing & Resource Hub</CardTitle>
                    <CardDescription>Keep all your learning materials in one secure place.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Upload and share lecture slides, notes, and multimedia</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Organize resources by subject, topic, or class</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Access files anytime, from any device</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Trophy className="h-6 w-6 text-primary/80" /> Leaderboard & Gamification</CardTitle>
                    <CardDescription>Make learning exciting and rewarding.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Earn points for completing tasks and participating</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Climb the leaderboard with peers</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /><span>Unlock badges and achievements to celebrate progress</span></li>
                    </ul>
                  </CardContent>
                </Card>
            </div>
          </div>
          <div className="text-center rounded-lg border border-border/50 bg-secondary/30 p-6">
             <h3 className="flex items-center justify-center gap-3 font-headline text-xl font-semibold"><Lightbulb className="h-6 w-6 text-amber-400" /> Why EduSync?</h3>
             <p className="text-muted-foreground mt-2">
                Because education should be simple, engaging, and connected — whether you’re running a global virtual class or a small study group.
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
