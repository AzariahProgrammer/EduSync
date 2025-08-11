
'use client';

import { useState, useCallback, useMemo } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
  maxFiles?: number;
}

export function ImageUploader({ imageUrls, setImageUrls, maxFiles = 5 }: ImageUploaderProps) {
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + imageUrls.length > maxFiles) {
      toast({
        variant: 'destructive',
        title: 'Upload Limit Exceeded',
        description: `You can only upload a maximum of ${maxFiles} images.`,
      });
      return;
    }

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Please upload only image files.' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setImageUrls([...imageUrls, e.target.result]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Clear the input value to allow re-uploading the same file
    event.target.value = '';
  };

  const removeImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
        <div className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer border-border hover:border-primary/50 transition-colors">
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={imageUrls.length >= maxFiles}
            />
            <div className="flex flex-col items-center justify-center text-center">
                <UploadCloud className="w-10 h-10 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                <p className="text-xs text-muted-foreground mt-1">({imageUrls.length}/{maxFiles} files uploaded)</p>
            </div>
        </div>
        
      {imageUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <Image
                src={url}
                alt={`Uploaded image ${index + 1}`}
                width={150}
                height={150}
                className="object-cover w-full h-full rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
