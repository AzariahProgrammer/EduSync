
"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { Header } from '@/components/dashboard/Header';
import { BookOpenCheck, Loader2 } from 'lucide-react';
import { LoadingScreen } from '@/components/common/LoadingScreen';

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
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen w-full bg-background grid-bg">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-y-auto">
          <Header />
          <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
