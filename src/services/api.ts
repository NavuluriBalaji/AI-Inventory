import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://aiinventorybackend.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased to 30 seconds for AI enhancement
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response.data;
  },
  (error) => {
    console.error('❌ API Response Error:', error);
    
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Network connection failed. Please check CORS configuration.');
    }
    
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    }
    
    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    throw new Error(error.response?.data?.error || error.message || 'An error occurred');
  }
);

export interface ModelFilters {
  category?: string;
  provider?: string;
  isOpenSource?: boolean;
  verified?: boolean;
  tags?: string[];
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  models: T[];
  pagination: {
    current: number;
    total: number;
    count: number;
    totalModels: number;
  };
}

export interface ModelStats {
  totalModels: number;
  categories: Array<{ _id: string; count: number }>;
  providers: Array<{ _id: string; count: number }>;
  recentModels: Array<{
    id: string;
    name: string;
    provider: string;
    releaseDate: string;
  }>;
  popularModels: Array<{
    id: string;
    name: string;
    provider: string;
    popularityScore: number;
  }>;
  lastUpdated: string;
}

class ApiService {
  // Get all models with filtering and pagination
  async getModels(filters: ModelFilters = {}): Promise<PaginatedResponse<any>> {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            params.append(key, value.join(','));
          } else {
            params.append(key, String(value));
          }
        }
      });

      const response = await api.get(`/models?${params.toString()}`);
      
      // Since interceptor returns response.data, check the structure
      if (response && typeof response === 'object') {
        // If it has a 'data' property, use that
        if ('data' in response && response.data) {
          return response.data;
        }
        // If it has models property directly, return as is
        if ('models' in response && 'pagination' in response) {
          return response as PaginatedResponse<any>;
        }
        // Otherwise, wrap in expected format
        return {
          models: Array.isArray(response) ? response : [],
          pagination: {
            current: 1,
            total: 1,
            count: Array.isArray(response) ? response.length : 0,
            totalModels: Array.isArray(response) ? response.length : 0
          }
        };
      }
      
      // Fallback
      return {
        models: [],
        pagination: {
          current: 1,
          total: 1,
          count: 0,
          totalModels: 0
        }
      };
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }

  // Get models by category
  async getModelsByCategory(
    category: string, 
    page: number = 1, 
    limit: number = 20
  ): Promise<PaginatedResponse<any>> {
    const response = await api.get(`/models/category/${category}`, {
      params: { page, limit }
    });
    return response.data;
  }

  // Get single model by ID
  async getModel(id: string): Promise<any> {
    const response = await api.get(`/models/${id}`);
    return response.data;
  }

  // Get enhanced model details with AI enhancement if needed
  async getDetailedModel(id: string, forceEnhancement: boolean = false): Promise<any> {
    const params = forceEnhancement ? '?forceEnhancement=true' : '';
    const response = await api.get(`/models/${id}/detailed${params}`);
    return response.data;
  }

  // Search models
  async searchModels(
    query: string, 
    filters: Omit<ModelFilters, 'search'> = {}
  ): Promise<PaginatedResponse<any>> {
    const params = new URLSearchParams({ q: query });
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          params.append(key, value.join(','));
        } else {
          params.append(key, String(value));
        }
      }
    });

    const response = await api.get(`/search?${params.toString()}`);
    return response.data;
  }

  // Get model statistics
  async getModelStats(): Promise<ModelStats> {
    const response = await api.get('/stats');
    return response.data;
  }

  // Get health status
  async getHealth(): Promise<any> {
    const response = await api.get('/health'); // Fixed: removed /admin prefix
    return response;
  }

  // Admin functions
  async triggerScraping(source: string = 'all'): Promise<any> {
    const response = await api.post('/scrape', { source });
    return response;
  }

  async triggerAdminScraping(source: string = 'all'): Promise<any> {
    const response = await api.post('/admin/scrape', { source });
    return response;
  }

  async getScrapeStatus(): Promise<any> {
    const response = await api.get('/scrape/status');
    return response;
  }

  async triggerCleanup(olderThanDays: number = 30): Promise<any> {
    const response = await api.post('/admin/cleanup', { older_than_days: olderThanDays });
    return response;
  }

  async triggerStatsUpdate(): Promise<any> {
    const response = await api.post('/admin/update-stats');
    return response;
  }

  async triggerDailyUpdate(): Promise<any> {
    const response = await api.post('/update');
    return response.data;
  }

  async getTaskStatus(): Promise<any> {
    const response = await api.get('/admin/tasks');
    return response.data;
  }

  // Newsletter subscription
  async subscribeNewsletter(email: string): Promise<any> {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;

// Helper functions for common operations
export const modelApi = {
  // Get all models
  getAll: (filters?: ModelFilters) => apiService.getModels(filters),
  
  // Get by category
  getByCategory: (category: string, page?: number, limit?: number) => 
    apiService.getModelsByCategory(category, page, limit),
  
  // Get single model
  getById: (id: string) => apiService.getModel(id),
  
  // Get detailed model with AI enhancement
  getDetailed: (id: string, forceEnhancement?: boolean) => 
    apiService.getDetailedModel(id, forceEnhancement),
  
  // Search
  search: (query: string, filters?: Omit<ModelFilters, 'search'>) => 
    apiService.searchModels(query, filters),
  
  // Get stats
  getStats: () => apiService.getModelStats(),
  
  // Utility: Get popular models
  getPopular: (limit: number = 10) => 
    apiService.getModels({ 
      limit, 
      sortBy: 'popularityScore', 
      sortOrder: 'desc' 
    }),
  
  // Utility: Get recent models
  getRecent: (limit: number = 10) => 
    apiService.getModels({ 
      limit, 
      sortBy: 'releaseDate', 
      sortOrder: 'desc' 
    }),
  
  // Utility: Get open source models
  getOpenSource: (filters?: Omit<ModelFilters, 'isOpenSource'>) => 
    apiService.getModels({ ...filters, isOpenSource: true }),
  
  // Utility: Get by provider
  getByProvider: (provider: string, filters?: Omit<ModelFilters, 'provider'>) => 
    apiService.getModels({ ...filters, provider })
};
