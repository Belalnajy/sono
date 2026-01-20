const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Internal URL for SSR fetching on the server
const INTERNAL_API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001/api';
class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const isServer = typeof window === 'undefined';
    const baseUrl = isServer ? INTERNAL_API_URL : this.baseURL;
    const url = `${baseUrl}${endpoint}`;
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: 'An error occurred' }));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`,
      );
    }

    if (response.status === 204) {
      return {} as T;
    }

    const text = await response.text();
    return text ? JSON.parse(text) : ({} as T);
  }

  // Public endpoints
  async getCategories() {
    return this.request('/categories');
  }

  async getCategoryBySlug(slug: string) {
    return this.request(`/categories/slug/${slug}`);
  }

  async getArticles(params?: {
    status?: string;
    categoryId?: string;
    subcategoryId?: string;
    is_featured?: boolean;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ articles: any[]; total: number }> {
    const cleanParams: Record<string, string> = {};
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== 'undefined') {
          cleanParams[key] = value.toString();
        }
      });
    }
    const query = new URLSearchParams(cleanParams).toString();
    return this.request(`/articles${query ? `?${query}` : ''}`);
  }

  async getArticleBySlug(slug: string) {
    return this.request(`/articles/slug/${slug}`);
  }

  async getArticleById(id: string) {
    return this.request(`/articles/${id}`);
  }

  async getVideos(params?: { categoryId?: string; subcategoryId?: string }) {
    const cleanParams: Record<string, string> = {};
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== 'undefined') {
          cleanParams[key] = value.toString();
        }
      });
    }
    const query = new URLSearchParams(cleanParams).toString();
    return this.request(`/videos${query ? `?${query}` : ''}`);
  }

  // Auth endpoints
  async login(username: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  // Admin endpoints
  async getDashboardStats() {
    return this.request('/stats');
  }

  async createCategory(data: { name: string; slug: string }) {
    return this.request('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCategory(id: string, data: { name?: string; slug?: string }) {
    return this.request(`/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: string) {
    return this.request(`/categories/${id}`, {
      method: 'DELETE',
    });
  }

  async createSubcategory(data: {
    name: string;
    slug: string;
    categoryId: string;
  }) {
    return this.request('/subcategories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSubcategories() {
    return this.request('/subcategories');
  }

  async getSubcategoryBySlug(slug: string) {
    return this.request(`/subcategories/slug/${slug}`);
  }

  async updateSubcategory(
    id: string,
    data: { name?: string; slug?: string; categoryId?: string },
  ) {
    return this.request(`/subcategories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteSubcategory(id: string) {
    return this.request(`/subcategories/${id}`, {
      method: 'DELETE',
    });
  }

  async createArticle(data: any) {
    return this.request('/articles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateArticle(id: string, data: any) {
    return this.request(`/articles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteArticle(id: string) {
    return this.request(`/articles/${id}`, {
      method: 'DELETE',
    });
  }

  async createVideo(data: any) {
    return this.request('/videos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteVideo(id: string) {
    return this.request(`/videos/${id}`, {
      method: 'DELETE',
    });
  }

  async uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}/upload/image`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    return response.json();
  }

  async getTeamMembers() {
    return this.request('/team');
  }

  async createTeamMember(data: any) {
    return this.request('/team', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTeamMember(id: string, data: any) {
    return this.request(`/team/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteTeamMember(id: string) {
    return this.request(`/team/${id}`, {
      method: 'DELETE',
    });
  }

  async getSettings(): Promise<Record<string, string>> {
    return this.request('/settings');
  }

  async updateSettings(settings: Record<string, string>) {
    return this.request('/settings', {
      method: 'PATCH',
      body: JSON.stringify(settings),
    });
  }
}

export const apiClient = new ApiClient();
