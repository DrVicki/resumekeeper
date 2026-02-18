import type { ResumeData } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Briefcase, Building, Calendar, GraduationCap, Link as LinkIcon, Mail, MapPin, Globe } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

interface PortfolioProps {
  resumeData: ResumeData;
}

export default function Portfolio({ resumeData }: PortfolioProps) {
  const { basics, about, experience, education, projects } = resumeData;

  return (
    <div className="p-4 sm:p-8 md:p-12 font-body">
      {/* Hero Section */}
      <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <Image
          src={basics.avatarUrl}
          alt={basics.name}
          width={150}
          height={150}
          className="rounded-full border-4 border-primary shadow-lg"
          data-ai-hint="professional portrait"
        />
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{basics.name}</h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mt-1">{basics.title}</h2>
          <p className="mt-4 text-muted-foreground">{about.shortBio}</p>
          <div className="flex justify-center md:justify-start items-center gap-4 mt-4 text-sm text-muted-foreground">
             <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {basics.location}</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> {basics.email}</span>
            <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> {basics.website}</span>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          {/* About Section */}
          <section>
            <h3 className="text-2xl font-headline font-semibold border-b-2 border-primary pb-2 mb-4">About Me</h3>
            <p className="text-foreground/80 leading-relaxed">{about.aboutParagraph}</p>
          </section>

          {/* Experience Section */}
          <section>
            <h3 className="text-2xl font-headline font-semibold border-b-2 border-primary pb-2 mb-6">Experience</h3>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id} className="flex gap-4">
                  <div className="mt-1">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Briefcase className="h-5 w-5" />
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{exp.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                       <span className="flex items-center gap-2"><Building className="w-4 h-4" />{exp.company}</span>
                       <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-foreground/80">
                      {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section>
             <h3 className="text-2xl font-headline font-semibold border-b-2 border-primary pb-2 mb-6">Projects</h3>
             <div className="grid sm:grid-cols-2 gap-6">
               {projects.map(proj => (
                 <Card key={proj.id} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                       <Image src={proj.imageUrl} alt={proj.title} fill className="object-cover" data-ai-hint="abstract code" />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-lg">{proj.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1 h-16">{proj.description}</p>
                      <a href={proj.evidenceValue} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 mt-2">
                        <LinkIcon className="w-3 h-3"/> View Project
                      </a>
                    </CardContent>
                 </Card>
               ))}
             </div>
          </section>
        </div>

        <div className="space-y-12">
            {/* Education Section */}
            <section>
                <h3 className="text-2xl font-headline font-semibold border-b-2 border-primary pb-2 mb-6">Education</h3>
                <div className="space-y-6">
                {education.map(edu => (
                    <div key={edu.id} className="flex gap-4">
                    <div className="mt-1">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <GraduationCap className="h-5 w-5" />
                        </span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg">{edu.degree}</h4>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.startDate} - {edu.endDate}</p>
                    </div>
                    </div>
                ))}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}
