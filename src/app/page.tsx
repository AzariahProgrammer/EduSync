import { AuthForm } from '@/components/auth/AuthForm';
import { BookOpenCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 grid-bg">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex items-center gap-3 text-2xl font-bold text-primary">
            <BookOpenCheck className="h-8 w-8" />
            <h1 className="font-headline text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">EduSync</h1>
          </div>
          <p className="text-muted-foreground">Welcome back! Please login to your account.</p>
        </div>
        <AuthForm mode="login" />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/signup" className="font-semibold text-primary/90 transition-colors hover:text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
