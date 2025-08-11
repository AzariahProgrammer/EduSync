"use client";

import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AILearningPath } from './AILearningPath';
import Image from 'next/image';
import { Button } from '../ui/button';

const courses = [
  {
    title: 'React for Beginners',
    description: 'Master the fundamentals of React and build modern web applications.',
    progress: 75,
    category: 'Web Development',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'react code'
  },
  {
    title: 'Advanced CSS and Sass',
    description: 'Elevate your styling skills with advanced CSS techniques and Sass.',
    progress: 40,
    category: 'Web Design',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'css design'
  },
  {
    title: 'Firebase Essentials',
    description: 'Learn to build full-stack applications with Firebase.',
    progress: 90,
    category: 'Backend',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'firebase database'
  },
];

export function DashboardClient() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Welcome back, <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{user?.displayName || user?.email?.split('@')[0] || 'learner'}</span>!
        </h1>
        <p className="text-muted-foreground">Continue your learning journey and explore new paths.</p>
      </div>

      <AILearningPath />

      <div>
        <h2 className="font-headline text-2xl font-semibold mb-4">My Courses</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.title} className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 bg-secondary/30 border-border/50">
               <div className="relative h-48 w-full">
                <Image src={course.imageUrl} alt={course.title} fill className="object-cover" data-ai-hint={course.aiHint} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="flex flex-col flex-grow p-6 pt-4">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="font-headline text-xl">{course.title}</CardTitle>
                  <CardDescription className="text-muted-foreground/80">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 flex-grow">
                  <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2 bg-primary/20" />
                  </div>
                </CardContent>
                <CardFooter className="p-0 mt-6">
                  <Button className="w-full" variant="secondary">Continue Learning</Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
