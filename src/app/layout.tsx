
"use client";

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { SelectionMenu } from '@/components/common/SelectionMenu';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { cn } from '@/lib/utils';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setClosing(true); 
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  
  const showLoadingScreen = !mounted || (mounted && !closing);


  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <title>EduSync</title>
        <meta name="description" content="Your personalized learning journey." />
      </head>
      <body className="font-body antialiased">
        {showLoadingScreen && <LoadingScreen isClosing={closing} />}
        <div className={cn("transition-opacity duration-500", showLoadingScreen ? "opacity-0" : "opacity-100")}>
          <AuthProvider>
            <SelectionMenu>
              {children}
            </SelectionMenu>
            <Toaster />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
