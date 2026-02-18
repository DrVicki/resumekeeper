import type { ResumeData } from './types';

// This is a mock database. In a real application, you would use a database.
let resumeData: ResumeData = {
  basics: {
    name: 'Jane Doe',
    title: 'Full-Stack Developer',
    location: 'San Francisco, CA',
    email: 'jane.doe@example.com',
    website: 'janedoe.dev',
    avatarUrl: 'https://i.postimg.cc/wBhQNk4m/Vicki-Bealman-Headshot.png',
  },
  about: {
    shortBio: 'Innovative Full-Stack Developer with a passion for creating beautiful and functional web applications.',
    aboutParagraph: 'With over 5 years of experience in the tech industry, I have a proven track record of developing robust and scalable web applications. My expertise spans across the full stack, from crafting responsive user interfaces with React and Next.js to building efficient backend services with Node.js. I thrive in collaborative environments and am always eager to learn new technologies to solve complex problems and deliver exceptional user experiences.',
  },
  experience: [
    {
      id: 'exp1',
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      startDate: 'Jan 2021',
      endDate: 'Present',
      responsibilities: [
        'Led the development of a new client-facing dashboard, improving user engagement by 20%.',
        'Mentored junior developers, providing code reviews and guidance on best practices.',
        'Architected and implemented a new microservices-based backend for our flagship product.',
      ],
    },
    {
      id: 'exp2',
      title: 'Software Engineer',
      company: 'Innovate Co.',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      responsibilities: [
        'Contributed to the development of a large-scale e-commerce platform using React and Redux.',
        'Wrote and maintained unit and integration tests, ensuring code quality and stability.',
        'Collaborated with designers and product managers to translate requirements into technical solutions.',
      ],
    },
  ],
  education: [
    {
      id: 'edu1',
      degree: 'B.S. in Computer Science',
      institution: 'University of Technology',
      startDate: 'Sep 2014',
      endDate: 'May 2018',
    },
  ],
  projects: [
    {
      id: 'proj1',
      title: 'ResumeKeeper',
      description: 'AI Resume Generator',
      evidenceType: 'url',
      evidenceValue: 'https://9000-firebase-studio-1771443638627.cluster-bp7tn4kmnjchatd3dgbbvk2kko.cloudworkstations.dev',
      imageUrl: 'https://i.postimg.cc/L61Yh8bG/Screenshot-2026-02-18-at-3-28-20-PM.png'
    },
    {
      id: 'proj2',
      title: 'Portfolio Website',
      description: 'My personal portfolio website to showcase my skills and projects.',
      evidenceType: 'url',
      evidenceValue: 'https://github.com/example/portfolio',
      imageUrl: 'https://picsum.photos/seed/p2/600/400'
    },
  ],
};

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getResumeData(): Promise<ResumeData> {
  await delay(100);
  return JSON.parse(JSON.stringify(resumeData));
}

export async function updateBasics(basics: ResumeData['basics']): Promise<void> {
  await delay(100);
  resumeData.basics = basics;
}

export async function updateAbout(about: ResumeData['about']): Promise<void> {
  await delay(100);
  resumeData.about = about;
}

export async function addExperience(experience: Omit<ResumeData['experience'][0], 'id'>): Promise<void> {
  await delay(100);
  resumeData.experience.unshift({ ...experience, id: `exp${Date.now()}` });
}

export async function updateExperience(experience: ResumeData['experience'][0]): Promise<void> {
  await delay(100);
  const index = resumeData.experience.findIndex(e => e.id === experience.id);
  if (index !== -1) {
    resumeData.experience[index] = experience;
  }
}

export async function deleteExperience(id: string): Promise<void> {
  await delay(100);
  resumeData.experience = resumeData.experience.filter(e => e.id !== id);
}

export async function addEducation(education: Omit<ResumeData['education'][0], 'id'>): Promise<void> {
  await delay(100);
  resumeData.education.unshift({ ...education, id: `edu${Date.now()}` });
}

export async function updateEducation(education: ResumeData['education'][0]): Promise<void> {
  await delay(100);
  const index = resumeData.education.findIndex(e => e.id === education.id);
  if (index !== -1) {
    resumeData.education[index] = education;
  }
}

export async function deleteEducation(id: string): Promise<void> {
  await delay(100);
  resumeData.education = resumeData.education.filter(e => e.id !== id);
}

export async function addProject(project: Omit<ResumeData['projects'][0], 'id'>): Promise<void> {
  await delay(100);
  resumeData.projects.unshift({ ...project, id: `proj${Date.now()}` });
}

export async function updateProject(project: ResumeData['projects'][0]): Promise<void> {
  await delay(100);
  const index = resumeData.projects.findIndex(p => p.id === project.id);
  if (index !== -1) {
    resumeData.projects[index] = project;
  }
}

export async function deleteProject(id: string): Promise<void> {
  await delay(100);
  resumeData.projects = resumeData.projects.filter(p => p.id !== id);
}
