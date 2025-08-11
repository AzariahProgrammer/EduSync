
"use client";

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { SelectionMenu } from '@/components/common/SelectionMenu';
import { LoadingScreen } from '@/components/common/LoadingScreen';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This is a simple way to hide the loader after a short delay.
    // In a real app, you might tie this to data fetching or other async operations.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer);
  }, []);

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
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <AuthProvider>
            <SelectionMenu>
              {children}
            </SelectionMenu>
            <Toaster />
          </AuthProvider>
        )}
      </body>
    </html>
  );
}
