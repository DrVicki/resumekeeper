export type Basics = {
  name: string;
  title: string;
  location: string;
  email: string;
  website: string;
  avatarUrl: string;
};

export type About = {
  aboutParagraph: string;
  shortBio: string;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: [string, string, string];
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  evidenceType: 'url' | 'file';
  evidenceValue: string;
  imageUrl: string;
};

export type ResumeData = {
  basics: Basics;
  about: About;
  experience: Experience[];
  education: Education[];
  projects: Project[];
};
