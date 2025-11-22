import { Category } from '../types/model';

export const categories: Category[] = [
  {
    id: 'text-generation',
    name: 'Text-Based',
    description: 'Models that operate on text data inputs and outputs',
    icon: 'file-text'
  },
  {
    id: 'text-classification',
    name: 'Text Classification',
    description: 'Models specialized in categorizing text into predefined classes',
    icon: 'tag',
  },
  {
    id: 'nlp',
    name: 'NLP',
    description: 'Natural Language Processing models for various text-based tasks',
    icon: 'message-square',
  },
  {
    id: 'multimodal-ai',
    name: 'Multimodal AI',
    description: 'Models that can process multiple types of input (text, images, audio)',
    icon: 'Cpu',
  },
  {
    id: 'conversational-ai',
    name: 'Conversational AI',
    description: 'AI models specialized in dialogue and conversation',
    icon: 'message-circle'
  },
  {
    id: 'open-source-llm',
    name: 'Open Source LLM',
    description: 'Open source large language models',
    icon: 'github'
  },
  {
    id: 'coding-assistant',
    name: 'Coding Assistant',
    description: 'AI models for code completion and programming assistance',
    icon: 'code'
  },
  {
    id: 'image-generation',
    name: 'Image Generation',
    description: 'AI models for creating images from text descriptions',
    icon: 'image'
  },
  {
    id: 'regression',
    name: 'Regression',
    description: 'Models designed for numerical prediction tasks',
    icon: 'trending-up',
  },
  {
    id: 'seq2seq',
    name: 'seq2seq',
    description: 'Models based on the transformer architecture, such as BERT, GPT, T5, etc.',
    icon: 'Cpu',
  }
];