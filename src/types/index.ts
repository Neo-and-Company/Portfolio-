export interface Experience {
  id: string;
  role: string;
  company: string;
  dates: string;
  description: string[];
  skills?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  repoUrl?: string;
  demoUrl?: string;
  imageHint?: string;
}
