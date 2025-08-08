// Portfolio Data Types
export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  profileImage: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  phone?: string;
  location: string;
}

export interface Skill {
  name: string;
  proficiency: number; // 1-100
  icon: string;
  yearsOfExperience: number;
  relatedProjects: string[];
}

export interface SkillCategory {
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools';
  skills: Skill[];
}

export interface Achievement {
  description: string;
  impact?: string; // e.g., "70% reduction", "40% improvement"
  metrics?: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  location: string;
  description: string;
  achievements: Achievement[];
  technologies: string[];
  companyLogo: string;
  companyUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: string;
  startDate: string;
  endDate?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
  achievements: string[];
  logo: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  badge?: string;
  level?: 'Associate' | 'Professional' | 'Expert' | 'Specialist';
}

export interface LeadershipPosition {
  title: string;
  organization: string;
  duration: string;
  description: string;
  achievements: string[];
  type: 'Academic' | 'Professional' | 'Community';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  location: string;
  socialLinks: SocialLink[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  education: Education;
  certifications: Certification[];
  contact: ContactInfo;
}

// Component Props Types
export interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isScrolled: boolean;
}

export interface HeroSectionProps {
  personalInfo: PersonalInfo;
}

export interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

export interface ExperienceTimelineProps {
  experiences: Experience[];
}

export interface ProjectsGalleryProps {
  projects: Project[];
}

export interface EducationProps {
  education: Education;
  certifications: Certification[];
  leadershipPositions?: LeadershipPosition[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSectionProps {
  contactInfo: ContactInfo;
  onFormSubmit: (formData: ContactFormData) => Promise<void>;
}