
import { BookOpenCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  isClosing?: boolean;
}

export function LoadingScreen({ isClosing = false }: LoadingScreenProps) {
  return (
    <div className={cn(
      "fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center gap-4 bg-background grid-bg transition-opacity duration-500 ease-in-out",
      isClosing ? "opacity-0" : "opacity-100"
    )}>
      <BookOpenCheck className="h-12 w-12 animate-pulse text-primary" />
      <p className="text-muted-foreground">Developed By Azariah Anderson</p>
    </div>
  );
}
