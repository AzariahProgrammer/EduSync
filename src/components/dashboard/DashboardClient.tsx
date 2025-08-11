
"use client";

import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Video, MessagesSquare, KanbanSquare, Calendar, Folder, Trophy, Package } from 'lucide-react';

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
            Your classroom, your way — whether you’re in the same building or miles apart. EduSync combines live video, real-time messaging, assignments, scheduling, and resource sharing into one seamless platform, built to empower both students and educators.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-headline text-xl font-semibold"><Package className="h-5 w-5 text-primary" /> All-in-One Learning Platform</h3>
            <p className="text-muted-foreground">
              EduSync eliminates the need to juggle multiple apps and tools. Everything you need for an engaging, organized, and collaborative learning experience is integrated into one powerful, easy-to-use interface.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-semibold text-lg"><Video className="h-5 w-5 text-primary/80" /> Live Classes</h4>
              <p className="text-sm text-muted-foreground">
                Connect instantly with crystal-clear video and audio. Features like screen sharing, virtual hand raising, and interactive whiteboards make learning more engaging than ever.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-semibold text-lg"><MessagesSquare className="h-5 w-5 text-primary/80" /> Real-Time Chat</h4>
              <p className="text-sm text-muted-foreground">
                Keep conversations flowing before, during, and after class with instant messaging, threaded discussions, and group chats.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-semibold text-lg"><KanbanSquare className="h-5 w-5 text-primary/80" /> Assignments Tracker</h4>
              <p className="text-sm text-muted-foreground">
                Stay on top of your workload with a visual Kanban board. Assignments are automatically categorized into To Do, In Progress, and Completed columns.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-semibold text-lg"><Calendar className="h-5 w-5 text-primary/80" /> Calendar & Reminders</h4>
              <p className="text-sm text-muted-foreground">
                Never miss an important date. EduSync’s integrated calendar syncs with your classes and assignments, sending automatic reminders.
              </p>
            </div>
             <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-semibold text-lg"><Folder className="h-5 w-5 text-primary/80" /> File Sharing</h4>
              <p className="text-sm text-muted-foreground">
                Organize and share course materials in a secure, centralized space. Upload lecture slides, study notes, and other resources.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-semibold text-lg"><Trophy className="h-5 w-5 text-primary/80" /> Leaderboard</h4>
              <p className="text-sm text-muted-foreground">
                Turn learning into a motivating challenge with gamification. Earn points, climb the leaderboard, and unlock achievement badges.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
