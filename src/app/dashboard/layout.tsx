
"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { BookOpenCheck, Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background grid-bg">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-2xl font-bold text-primary">
              <BookOpenCheck className="h-12 w-12 animate-pulse" />
              <h1 className="font-headline text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">EduSync</h1>
            </div>
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          <p className="font-headline text-lg text-muted-foreground mt-4">Developed By Azariah Anderson</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-background grid-bg">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-y-auto">
          <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
