
"use client";

import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Video, MessagesSquare, KanbanSquare, Folder, Check, FileCheck, Users, School, Presentation, UploadCloud, Monitor, Bot, BrainCircuit, PenSquare, FolderKanban, Trophy, Lightbulb } from 'lucide-react';
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
          <CardTitle className="font-headline text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">EduSync – The Future of Connected Learning</CardTitle>
          <CardDescription>
            EduSync is an intelligent, all-in-one education platform designed to connect teachers, learners, and schools in a single digital space. With powerful AI support, real-time communication, and full subject coverage, EduSync transforms how learning is delivered, tracked, and experienced — whether in the classroom or online.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4 rounded-lg border border-border/50 bg-secondary/30 p-6">
              <h3 className="flex items-center gap-3 font-headline text-xl font-semibold"><Users className="h-6 w-6 text-primary" /> For Teachers: Control, Insight, and Impact</h3>
              <p className="text-muted-foreground">
                EduSync gives educators everything they need to teach, monitor, and guide students from anywhere.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><Presentation className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span><b>Live Teaching Tools</b> – Host engaging, interactive lessons with high-quality video, screen sharing, polls, and collaborative whiteboards.</span></li>
                <li className="flex gap-2"><UploadCloud className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span><b>Work Upload & Distribution</b> – Post assignments, projects, and study materials for individual classes or the entire school.</span></li>
                <li className="flex gap-2"><Monitor className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span><b>Real-Time Monitoring</b> – Track learner activity, progress, and participation live during classes.</span></li>
                <li className="flex gap-2"><Bot className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span><b>Instant Feedback</b> – Use AI-assisted marking and feedback to save time while giving personalized responses to each student.</span></li>
              </ul>
            </div>

            <div className="space-y-4 rounded-lg border border-border/50 bg-secondary/30 p-6">
              <h3 className="flex items-center gap-3 font-headline text-xl font-semibold"><School className="h-6 w-6 text-primary" /> For Learners: Every Subject, One Place</h3>
              <p className="text-muted-foreground">
                EduSync supports all school subjects — from Mathematics and Science to Languages, Arts, and beyond — with full AI tutoring assistance.
              </p>
               <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><BrainCircuit className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span><b>AI-Powered Learning Support</b> – Get instant explanations, practice questions, and step-by-step problem solving in any subject.</span></li>
                <li className="flex gap-2"><PenSquare className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span><b>Personalized Feedback</b> – AI reviews assignments and quizzes, providing clear guidance for improvement.</span></li>
                <li className="flex gap-2"><FolderKanban className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span><b>Always-Available Resources</b> – Access notes, videos, and exercises anytime, from any device.</span></li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="font-headline text-xl font-semibold mb-6">Core Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><span className="text-primary font-bold">1.</span><Video className="h-6 w-6 text-primary" /> Live Interactive Classes</CardTitle>
                    <CardDescription>Engage in real-time lessons with tools for collaboration and participation.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Video conferencing, screen sharing, and breakout groups</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Interactive quizzes and polls during sessions</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>AI-assisted teaching prompts and content generation</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><span className="text-primary font-bold">2.</span><FileCheck className="h-6 w-6 text-primary" /> AI-Enhanced Assignments</CardTitle>
                     <CardDescription>Revolutionize homework and projects.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                     <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Auto-generate practice sets and revision tasks</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>AI-assisted grading with instant feedback</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Difficulty adjustment based on learner performance</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><span className="text-primary font-bold">3.</span><KanbanSquare className="h-6 w-6 text-primary" /> Smart Progress Tracking</CardTitle>
                    <CardDescription>Know exactly where every learner stands.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Visual dashboards for class and individual progress</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>AI-powered insights to detect struggling learners early</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Attendance and participation analytics</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardHeader>
                     <CardTitle className="flex items-center gap-3"><span className="text-primary font-bold">4.</span><Folder className="h-6 w-6 text-primary" /> Central Resource Library</CardTitle>
                     <CardDescription>Keep all learning materials organized and accessible.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Secure uploads of notes, slides, worksheets, and videos</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Searchable by subject, topic, and date</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Accessible anytime for revision or catch-up learning</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                   <CardHeader>
                    <CardTitle className="flex items-center gap-3"><span className="text-primary font-bold">5.</span><MessagesSquare className="h-6 w-6 text-primary" /> Communication Hub</CardTitle>
                    <CardDescription>A single space for all teacher-student-parent interaction.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Direct messages and group chats</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Threaded discussions for specific topics</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Notifications for upcoming classes, deadlines, and school events</span></li>
                    </ul>
                  </CardContent>
                </Card>

                 <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Trophy className="h-6 w-6 text-primary" /> Gamified Learning Motivation</CardTitle>
                    <CardDescription>Turn learning into a rewarding challenge.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Earn points for completing tasks and participating</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Climb the leaderboard with peers</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-primary/80" /><span>Unlock badges and achievements to celebrate progress</span></li>
                    </ul>
                  </CardContent>
                </Card>
            </div>
          </div>
          <div className="text-center rounded-lg border border-border/50 bg-secondary/30 p-6">
             <h3 className="flex items-center justify-center gap-3 font-headline text-xl font-semibold"><Lightbulb className="h-6 w-6 text-amber-400" /> Why EduSync?</h3>
             <p className="text-muted-foreground mt-2 max-w-4xl mx-auto">
                EduSync isn’t just an app — it’s a complete digital school ecosystem, giving teachers powerful tools to teach and monitor, learners the freedom to learn anywhere, and AI the role of a personal teaching assistant for every subject.
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
