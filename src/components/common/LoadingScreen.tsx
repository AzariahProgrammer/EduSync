
import { BookOpenCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  isClosing?: boolean;
}

export function LoadingScreen({ isClosing = false }: LoadingScreenProps) {
  return (
    <div className={cn(
      "fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center gap-4 bg-background transition-opacity duration-500 ease-in-out",
      isClosing ? "opacity-0" : "opacity-100"
    )}>
       <div className="absolute inset-0 grid-bg opacity-0 animate-fade-in" style={{ animationDelay: '500ms', animationDuration: '1000ms' }}></div>
      <div className="relative flex flex-col items-center gap-4">
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
            <div className="mb-4 flex items-center gap-3 text-2xl font-bold text-primary">
                <BookOpenCheck className="h-10 w-10" />
                <h1 className="font-headline text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">EduSync</h1>
            </div>
        </div>
        <p className="text-muted-foreground opacity-0 animate-fade-in-up" style={{ animationDelay: '1500ms' }}>Developed By Azariah Anderson</p>
      </div>
    </div>
  );
}
