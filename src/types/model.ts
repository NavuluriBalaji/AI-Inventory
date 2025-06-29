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
  trainingParameters: {
    architecture: string;
    parameters: string;
    trainingTokens: string;
    contextWindow: string;
    trainingData: string[];
    computeUsed: string;
    trainingTime: string;
    optimizations: string[];
    modelSize: string;
    quantization?: string;
  };
  requirements: {
    pricing: string;
    apiKey: boolean;
    authentication: boolean;
    hardware: string;
  };
  limitations: string[];
  alternatives: {
    name: string;
    comparison: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}