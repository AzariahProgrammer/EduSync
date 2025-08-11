
'use client';

import { AuthForm } from '@/components/auth/AuthForm';
import { BookOpenCheck } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 grid-bg">
      <div className="w-full max-w-md space-y-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/20 text-center">
          <CardContent className="p-6">
              <div className="mb-4 flex flex-col items-center">
                <div className="mb-4 flex items-center gap-3 text-2xl font-bold text-primary">
                  <BookOpenCheck className="h-8 w-8" />
                  <h1 className="font-headline text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">EduSync</h1>
                </div>
                <p className="text-muted-foreground">Create an account to start your learning journey.</p>
              </div>
          </CardContent>
        </Card>
        <AuthForm mode="signup" />
        <Card className="bg-card/50 backdrop-blur-sm border-border/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/" className="font-semibold text-primary/90 transition-colors hover:text-primary">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
