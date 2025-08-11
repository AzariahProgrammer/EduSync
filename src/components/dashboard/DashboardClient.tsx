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
          Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'learner'}!
        </h1>
        <p className="text-muted-foreground">Continue your learning journey.</p>
      </div>

      <AILearningPath />

      <div>
        <h2 className="font-headline text-2xl font-semibold mb-4">My Courses</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.title} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
               <div className="relative h-40 w-full">
                <Image src={course.imageUrl} alt={course.title} fill className="object-cover" data-ai-hint={course.aiHint} />
              </div>
              <CardHeader>
                <CardTitle className="font-headline">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="secondary">Continue Learning</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
