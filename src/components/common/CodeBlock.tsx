
'use client';

import * as React from 'react';
import { memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock = memo(({ language, value }: CodeBlockProps) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast({
      title: 'Copied to clipboard!',
      description: 'The code has been copied.',
    });
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg bg-[#1e1e1e] font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
        <span className="text-xs text-muted-foreground">{language}</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
          {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          backgroundColor: 'transparent',
          borderRadius: '0 0 0.5rem 0.5rem',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'inherit',
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
});

CodeBlock.displayName = 'CodeBlock';
export { CodeBlock };
