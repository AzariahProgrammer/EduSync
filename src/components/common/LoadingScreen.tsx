
import { BookOpenCheck } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background grid-bg">
      <BookOpenCheck className="h-12 w-12 animate-pulse text-primary" />
      <p className="text-muted-foreground">Developed By Azariah Anderson</p>
    </div>
  );
}
