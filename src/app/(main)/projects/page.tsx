import { getResumeData } from '@/lib/data';
import ProjectList from '@/components/projects/project-list';

export default async function ProjectsPage() {
  const { projects } = await getResumeData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          Showcase your work by adding projects with links or file uploads.
        </p>
      </div>
      <ProjectList projects={projects} />
    </div>
  );
}
