import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://aiinventorybackend.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
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
    return Promise.reject(error);
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
      
      if (response && (response.data || response.models)) {
        return response.data || response;
      }
      throw new Error('Invalid API response');
    } catch (error) {
      console.warn('⚠️ API failed', error);
      // Return empty structure to prevent UI crashes
      return {
        models: [],
        pagination: {
          current: 1,
          total: 0,
          count: 0,
          totalModels: 0
        }
      };
    }
  }

  // Get models by category
  async getModelsByCategory(
    category: string, 
    page: number = 1, 
    limit: number = 20
  ): Promise<PaginatedResponse<any>> {
    return this.getModels({ category, page, limit });
  }

  // Get single model by ID
  async getModel(id: string): Promise<any> {
    try {
      const response = await api.get(`/models/${id}`);
      return response.data || response;
    } catch (error) {
      console.warn(`⚠️ API failed for model ${id}`, error);
      throw error;
    }
  }

  // Get enhanced model details
  async getDetailed(id: string, forceEnhancement: boolean = false): Promise<any> {
    try {
      const params = forceEnhancement ? '?forceEnhancement=true' : '';
      const response = await api.get(`/models/${id}/detailed${params}`);
      return response.data || response;
    } catch (error) {
      console.warn(`⚠️ API failed for detailed model ${id}`, error);
      return {
        success: false,
        message: 'Model not found or API unavailable'
      };
    }
  }
  
  // Alias for getDetailed to match some calls
  async getDetailedModel(id: string, forceEnhancement: boolean = false): Promise<any> {
    return this.getDetailed(id, forceEnhancement);
  }

  // Search models
  async searchModels(
    query: string, 
    filters: Omit<ModelFilters, 'search'> = {}
  ): Promise<PaginatedResponse<any>> {
    return this.getModels({ ...filters, search: query });
  }

  // Get model statistics
  async getModelStats(): Promise<ModelStats> {
    try {
      const response = await api.get('/stats');
      return response.data || response;
    } catch (error) {
      console.warn('⚠️ API failed for stats', error);
      return {
        totalModels: 0,
        categories: [],
        providers: [],
        recentModels: [],
        popularModels: [],
        lastUpdated: new Date().toISOString()
      };
    }
  }

  // Get system health
  async getHealth(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      return { status: 'offline', timestamp: new Date().toISOString() };
    }
  }

  // Subscribe to newsletter
  async subscribeNewsletter(email: string): Promise<any> {
    try {
      const response = await api.post('/subscribe', { email });
      return response.data;
    } catch (error) {
      console.warn('⚠️ API failed for subscription', error);
      return { success: false, message: 'Subscription service unavailable' };
    }
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
