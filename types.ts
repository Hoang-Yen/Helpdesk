import { ReactNode } from 'react';

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string; // Mapping to Lucide icons
}

export interface Section {
  id: string;
  title: string;
  content: string; // Changed from ReactNode to string for HTML content
}

export interface Article {
  id: string;
  categoryId: string;
  title: string;
  excerpt: string;
  sections: Section[];
  relatedArticleIds: string[];
  isPopular?: boolean;
  lastUpdated: string;
}

export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string; // Embed URL
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}