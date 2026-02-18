'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { About } from '@/lib/types';
import { generateAboutAction, updateAboutAction } from '@/lib/actions';
import { useState, useTransition } from 'react';
import { Textarea } from '../ui/textarea';
import { Sparkles } from 'lucide-react';

const aboutSchema = z.object({
  shortBio: z.string().min(1, 'Short bio is required'),
  aboutParagraph: z
    .string()
    .min(10, 'About paragraph should be at least 10 characters.'),
});

interface AboutFormProps {
  about: About;
}

export default function AboutForm({ about }: AboutFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof aboutSchema>>({
    resolver: zodResolver(aboutSchema),
    defaultValues: about,
  });

  async function onSubmit(values: z.infer<typeof aboutSchema>) {
    startTransition(async () => {
      try {
        await updateAboutAction(values);
        toast({
          title: 'Success',
          description: 'About section updated successfully.',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update about section.',
          variant: 'destructive',
        });
      }
    });
  }

  const handleGenerate = () => {
    setIsGenerating(true);
    startTransition(async () => {
      const result = await generateAboutAction();
      if (result.success && result.data) {
        form.setValue('shortBio', result.data.shortBio);
        form.setValue('aboutParagraph', result.data.aboutParagraph);
        toast({
          title: 'Content Generated',
          description: 'AI has generated your about section.',
        });
      } else {
        toast({
          title: 'Generation Failed',
          description: result.error,
          variant: 'destructive',
        });
      }
      setIsGenerating(false);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="shortBio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio</FormLabel>
              <FormControl>
                <Input
                  placeholder="A concise 1-2 sentence biography."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aboutParagraph"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Me Paragraph</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A professional 'About Me' paragraph, 80-120 words long."
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            onClick={handleGenerate}
            disabled={isPending || isGenerating}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate with AI'}
          </Button>
          <Button type="submit" disabled={isPending || isGenerating}>
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
