export interface Model {
  id: string;
  name: string;
  description: string;
  category: string;
  provider: string;
  documentationUrl: string;
  testUrl: string;
  imageUrl: string;
  features: string[];
  metrics?: {
    accuracy?: number;
    f1Score?: number;
    latency?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}