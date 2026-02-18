'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlusCircle, Edit, Trash2, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/types';
import ProjectForm from './project-form';
import { deleteProjectAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const handleEdit = (proj: Project) => {
    setEditingProject(proj);
    setOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingProject(null);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProjectAction(id);
      toast({
        title: 'Success',
        description: 'Project deleted.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Could not delete project.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((proj) => (
          <Card key={proj.id}>
             <CardHeader className="relative h-40">
              <Image
                src={proj.imageUrl}
                alt={proj.title}
                fill
                className="object-cover rounded-t-lg"
                data-ai-hint="abstract code"
              />
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{proj.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 h-20 overflow-hidden">{proj.description}</p>
            </CardContent>
            <CardFooter className="p-4 flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <a href={proj.evidenceValue} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2"/>
                  View
                </a>
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(proj)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this project.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(proj.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{editingProject ? 'Edit Project' : 'Add Project'}</DialogTitle>
        </DialogHeader>
        <ProjectForm
          project={editingProject}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
