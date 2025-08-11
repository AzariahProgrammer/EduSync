
"use client";

import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { Copy, Sparkles, Loader2 } from 'lucide-react';
import { enhanceText, EnhanceTextInput } from '@/ai/flows/enhance-text';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

interface SelectionMenuProps {
  children: ReactNode;
}

export function SelectionMenu({ children }: SelectionMenuProps) {
  const [menu, setMenu] = useState<{ x: number; y: number; text: string } | null>(null);
  const [enhancedContent, setEnhancedContent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleMouseUp = useCallback((event: MouseEvent) => {
    // Check if the click is inside the menu itself
    if (menuRef.current && menuRef.current.contains(event.target as Node)) {
      return;
    }

    const selection = window.getSelection();
    const selectedText = selection?.toString().trim() ?? '';

    // Only show the menu if there is a non-empty, non-whitespace selection
    if (selection && !selection.isCollapsed && selectedText) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const target = event.target as HTMLElement;

      // Don't show menu on inputs or textareas
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        setMenu({
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY - 10,
          text: selectedText,
        });
      }
    } else {
      setMenu(null);
    }
  }, []);

  const handleCopy = useCallback(() => {
    if (menu?.text) {
      navigator.clipboard.writeText(menu.text);
      toast({
        title: "Copied to clipboard!",
        description: "The selected text has been copied.",
      });
      setMenu(null);
    }
  }, [menu, toast]);

  const handleEnhance = useCallback(async () => {
    if (menu?.text) {
      const textToEnhance = menu.text;
      setMenu(null); // Close the menu immediately
      setIsLoading(true);
      setIsModalOpen(true);
      try {
        const result = await enhanceText({ text: textToEnhance });
        setEnhancedContent(result.enhancedText);
      } catch (error) {
        console.error("Failed to enhance text:", error);
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: 'Could not enhance the text. Please try again.',
        });
        setIsModalOpen(false);
      } finally {
        setIsLoading(false);
      }
    }
  }, [menu, toast]);

  const closeModal = () => {
    setIsModalOpen(false);
    setEnhancedContent(null);
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <>
      {children}
      {menu && (
        <div
          ref={menuRef}
          className="fixed z-50 flex items-center gap-1 rounded-lg border border-primary/20 bg-background/80 p-1 shadow-2xl shadow-primary/10 backdrop-blur-md"
          style={{
            top: `${menu.y}px`,
            left: `${menu.x}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/20 hover:text-foreground"
          >
            <Copy className="h-4 w-4" />
            Copy
          </button>
          <div className="h-4 w-px bg-border"></div>
          <button
            onClick={handleEnhance}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/20 hover:text-foreground"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            Enhance
          </button>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
              <Sparkles className="h-6 w-6 text-primary" />
              Enhanced Text
            </DialogTitle>
            <DialogDescription>
              Here is the AI-enhanced version of your selected text.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 max-h-[60vh] overflow-y-auto rounded-md border border-border/50 bg-secondary/30 p-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">AI is thinking...</p>
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{enhancedContent}</p>
            )}
          </div>
           <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={closeModal}>Close</Button>
            <Button onClick={() => {
                if (enhancedContent) {
                    navigator.clipboard.writeText(enhancedContent);
                    toast({ title: 'Copied enhanced text!'});
                    closeModal();
                }
            }} disabled={isLoading}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
            </Button>
           </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
