
"use client";

import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AILearningPath } from './AILearningPath';
import Image from 'next/image';
import { Button } from '../ui/button';

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

      <AILearningPath />

    </div>
  );
}
