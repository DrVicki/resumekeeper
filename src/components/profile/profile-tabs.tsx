'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ResumeData } from '@/lib/types';
import BasicsForm from './basics-form';
import AboutForm from './about-form';
import ExperienceList from './experience-list';
import EducationList from './education-list';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

interface ProfileTabsProps {
  resumeData: ResumeData;
}

export default function ProfileTabs({ resumeData }: ProfileTabsProps) {
  return (
    <Tabs defaultValue="basics" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="basics">Basics</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
      </TabsList>
      <TabsContent value="basics">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent>
            <BasicsForm basics={resumeData.basics} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="about">
         <Card>
          <CardHeader>
            <CardTitle>About Section</CardTitle>
            <CardDescription>Craft your professional summary with AI assistance.</CardDescription>
          </CardHeader>
          <CardContent>
            <AboutForm about={resumeData.about} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="experience">
        <ExperienceList experience={resumeData.experience} />
      </TabsContent>
      <TabsContent value="education">
        <EducationList education={resumeData.education} />
      </TabsContent>
    </Tabs>
  );
}
