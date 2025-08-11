"use client";

import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { Copy, Sparkles, Loader2 } from 'lucide-react';
import { enhanceText } from '@/ai/flows/enhance-text';
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
  const selectionRef = useRef<Selection | null>(null);
  const { toast } = useToast();

  const handleMouseUp = useCallback((event: MouseEvent) => {
    const selection = window.getSelection();
    selectionRef.current = selection;
    const selectedText = selection?.toString().trim();

    if (selectedText) {
      const range = selection!.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      const targetIsInputOrTextarea = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement;
      
      if (!targetIsInputOrTextarea) {
        setMenu({
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
          text: selectedText,
        });
      }
    } else {
      // Clicked outside the menu?
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenu(null);
      }
    }
  }, []);
  
  const handleCopy = () => {
    if (menu?.text) {
      navigator.clipboard.writeText(menu.text);
      toast({
        title: "Copied to clipboard!",
        description: "The selected text has been copied.",
      });
      setMenu(null);
    }
  };

  const handleEnhance = async () => {
    if (menu?.text) {
      setIsLoading(true);
      setIsModalOpen(true);
      try {
        const result = await enhanceText({ text: menu.text });
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
        setMenu(null);
      }
    }
  };
  
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
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary/20 hover:text-primary-foreground"
          >
            <Copy className="h-4 w-4" />
            Copy
          </button>
          <div className="h-4 w-px bg-border"></div>
          <button
            onClick={handleEnhance}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary/20 hover:text-primary-foreground"
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
