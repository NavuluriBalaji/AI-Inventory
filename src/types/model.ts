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
  architecture?: {
    type: string;
    layers: number;
    parameters: string;
    trainingData: string;
  };
  capabilities?: {
    strengths: string[];
    limitations: string[];
  };
  useCases?: string[];
  ethicalConsiderations?: string[];
  requirements?: {
    compute: string;
    memory: string;
    storage: string;
  };
}