
"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border/50 bg-background/80 px-4 backdrop-blur-lg md:px-6">
      <SidebarTrigger />
      <div className="flex w-full items-center justify-end gap-4">
        {/* Future header items can go here */}
      </div>
    </header>
  );
}
