export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  category?: Category;
}

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail_url?: string;
  images?: string[];
  video_url?: string;
  status: ArticleStatus;
  author?: string;
  category: Category;
  subcategory?: Subcategory;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  category: Category;
  subcategory?: Subcategory;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'editor';
}

export interface LoginResponse {
  access_token: string;
  user: User;
}
