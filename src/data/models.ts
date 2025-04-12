import { Model, Category } from '../types/model';

export const categories: Category[] = [
  {
    id: 'text-classification',
    name: 'Text Classification',
    description: 'Models specialized in categorizing text into predefined classes',
    icon: 'tag',
  },
  {
    id: 'nlp',
    name: 'NLP Tasks',
    description: 'Natural Language Processing models for various text-based tasks',
    icon: 'message-square',
  },
  {
    id: 'regression',
    name: 'Regression Models',
    description: 'Models designed for numerical prediction tasks',
    icon: 'trending-up',
  },
];

export const models: Model[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Advanced language model with superior reasoning and creativity',
    category: 'nlp',
    provider: 'OpenAI',
    documentationUrl: 'https://platform.openai.com/docs/models/gpt-4',
    testUrl: 'https://platform.openai.com/playground',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    features: ['Text generation', 'Code completion', 'Creative writing'],
    metrics: {
      accuracy: 0.94,
      latency: '500ms',
    },
  },
  {
    id: 'bert-base',
    name: 'BERT Base',
    description: 'Bidirectional transformer for natural language understanding',
    category: 'text-classification',
    provider: 'Google',
    documentationUrl: 'https://github.com/google-research/bert',
    testUrl: 'https://huggingface.co/bert-base-uncased',
    imageUrl: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349',
    features: ['Text classification', 'Named entity recognition', 'Question answering'],
    metrics: {
      accuracy: 0.89,
      f1Score: 0.92,
    },
  },
  // Add more models as needed
];