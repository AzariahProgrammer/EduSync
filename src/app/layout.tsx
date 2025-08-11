
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
  const [loading, setLoading] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // This is a simple way to hide the loader after a short delay.
    // In a real app, you might tie this to data fetching or other async operations.
    const timer = setTimeout(() => {
      setClosing(true); // Start the fade-out animation
      setTimeout(() => setLoading(false), 500); // Remove from DOM after animation
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
        {loading && <LoadingScreen isClosing={closing} />}
        <div className={cn("transition-opacity duration-500", loading ? "opacity-0" : "opacity-100")}>
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
