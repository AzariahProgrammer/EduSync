
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  surname: z.string().min(2, { message: "Surname must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const formSchema = mode === 'login' ? loginSchema : signupSchema;
  type AuthFormValues = z.infer<typeof formSchema>;

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      ...(mode === 'signup' && { name: '', surname: '' }),
    },
  });

  const onSubmit = async (values: AuthFormValues) => {
    setLoading(true);
    try {
      if (mode === 'signup') {
        const signupValues = values as z.infer<typeof signupSchema>;
        const userCredential = await createUserWithEmailAndPassword(auth, signupValues.email, signupValues.password);
        await updateProfile(userCredential.user, {
          displayName: `${signupValues.name} ${signupValues.surname}`,
        });
      } else {
        const loginValues = values as z.infer<typeof loginSchema>;
        await signInWithEmailAndPassword(auth, loginValues.email, loginValues.password);
      }
      router.push('/dashboard');
    } catch (error: any) {
      const errorCode = error.code;
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (errorCode === 'auth/email-already-in-use') {
        errorMessage = 'This email address is already in use.';
      }
      
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{mode === 'login' ? 'Login' : 'Sign Up'}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {mode === 'signup' && (
               <div className="flex flex-col sm:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === 'login' ? 'Log in' : 'Create account'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
