
export interface Experience {
  id: string;
  role: string;
  company: string;
  dates: string;
  description: string[];
  skills?: string[];
}

export type MediaType = 'image' | 'video' | 'rotating-images';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string; // Main image or video poster or first image in carousel
  repoUrl?: string;
  demoUrl?: string;
  imageHint?: string;
  mediaType?: MediaType; // To specify the kind of media
  imageUrls?: string[]; // For rotating images
}
