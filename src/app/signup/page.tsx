import { AuthForm } from '@/components/auth/AuthForm';
import { BookOpenCheck } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex items-center gap-2 text-2xl font-bold text-primary">
            <BookOpenCheck className="h-8 w-8" />
            <h1 className="font-headline text-3xl font-bold">EduSync</h1>
          </div>
          <p className="text-muted-foreground">Create an account to start your learning journey.</p>
        </div>
        <AuthForm mode="signup" />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/" className="font-semibold text-primary transition-colors hover:text-primary/80">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
