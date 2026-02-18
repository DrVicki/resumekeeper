'use client';

import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
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
import type { Experience } from '@/lib/types';
import { addExperienceAction, updateExperienceAction } from '@/lib/actions';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';

const experienceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  responsibilities: z.tuple([
    z.string().min(1, 'Responsibility cannot be empty'),
    z.string().min(1, 'Responsibility cannot be empty'),
    z.string().min(1, 'Responsibility cannot be empty'),
  ]),
});

interface ExperienceFormProps {
  experience: Experience | null;
  onSuccess: () => void;
}

export default function ExperienceForm({ experience, onSuccess }: ExperienceFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: experience?.title || '',
      company: experience?.company || '',
      startDate: experience?.startDate || '',
      endDate: experience?.endDate || '',
      responsibilities: experience?.responsibilities || ['', '', ''],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'responsibilities',
  });

  async function onSubmit(values: z.infer<typeof experienceSchema>) {
    setIsSubmitting(true);
    try {
      if (experience) {
        await updateExperienceAction({ id: experience.id, ...values });
      } else {
        await addExperienceAction(values);
      }
      toast({
        title: 'Success',
        description: `Experience ${experience ? 'updated' : 'added'} successfully.`,
      });
      onSuccess();
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${experience ? 'update' : 'add'} experience.`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Jan 2021" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Present" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
            <FormLabel>Responsibilities (must provide 3)</FormLabel>
            {fields.map((field, index) => (
            <FormField
                key={field.id}
                control={form.control}
                name={`responsibilities.${index}`}
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                    <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            ))}
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
