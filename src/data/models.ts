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
    features: [
      'Text generation',
      'Code completion',
      'Creative writing',
      'Question answering',
      'Language translation',
      'Text summarization'
    ],
    metrics: {
      accuracy: 0.94,
      latency: '500ms',
    },
    trainingParameters: {
      architecture: 'Transformer-based decoder-only model with sparse MoE layers',
      parameters: '1.76 trillion parameters',
      trainingTokens: '1.4 trillion tokens',
      contextWindow: '8,192 tokens (32K with memory optimization)',
      trainingData: [
        'Web pages and documents',
        'Books and literature',
        'Scientific papers',
        'Code repositories',
        'Filtered social media content'
      ],
      computeUsed: '25,000 NVIDIA A100 GPUs',
      trainingTime: '6 months of distributed training',
      optimizations: [
        'Mixture of Experts (MoE)',
        'Rotary Position Embedding (RoPE)',
        'Flash Attention',
        'Gradient checkpointing',
        'ZeRO optimizer'
      ],
      modelSize: '1.2 PB (uncompressed)',
      quantization: '4-bit quantization available for inference'
    },
    requirements: {
      pricing: 'Subscription-based, starting at $20/month',
      apiKey: true,
      authentication: true,
      hardware: 'Cloud-based, no local hardware required'
    },
    limitations: [
      'May occasionally generate incorrect information',
      'Cannot access real-time information',
      'Limited context window of 8K tokens',
      'Requires internet connection',
      'Cannot learn from conversations'
    ],
    alternatives: [
      {
        name: 'GPT-3.5',
        comparison: 'More affordable but less capable, good for basic tasks'
      },
      {
        name: 'Claude',
        comparison: 'Similar capabilities, better at analysis but more expensive'
      }
    ]
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
    features: [
      'Text classification',
      'Named entity recognition',
      'Question answering',
      'Sentiment analysis',
      'Text similarity'
    ],
    metrics: {
      accuracy: 0.89,
      f1Score: 0.92,
    },
    trainingParameters: {
      architecture: 'Bidirectional Transformer Encoder',
      parameters: '110 million parameters',
      trainingTokens: '3.3 billion tokens',
      contextWindow: '512 tokens',
      trainingData: [
        'BookCorpus (800M words)',
        'English Wikipedia (2,500M words)',
        'Masked Language Modeling (MLM)',
        'Next Sentence Prediction (NSP)'
      ],
      computeUsed: '4 Cloud TPUv3 pods',
      trainingTime: '4 days of pre-training',
      optimizations: [
        'WordPiece tokenization',
        'Masked Language Modeling',
        'Next Sentence Prediction',
        'Adam optimizer with weight decay',
        'Layer normalization'
      ],
      modelSize: '440 MB (uncompressed)',
      quantization: '8-bit quantization supported'
    },
    requirements: {
      pricing: 'Open-source, free to use',
      apiKey: false,
      authentication: false,
      hardware: 'Minimum 16GB RAM for inference, GPU recommended'
    },
    limitations: [
      'Requires significant computational resources',
      'Limited to 512 tokens per input',
      'Pre-trained on English text only',
      'Needs fine-tuning for specific tasks',
      'No text generation capabilities'
    ],
    alternatives: [
      {
        name: 'RoBERTa',
        comparison: 'Improved version of BERT with better training methodology'
      },
      {
        name: 'DistilBERT',
        comparison: 'Lighter and faster version, good for production deployment'
      }
    ]
  },
  {
  id: 'xgboost-regression',
  name: 'XGBoost Regression',
  description: 'Efficient gradient boosting model optimized for structured data',
  category: 'regression',
  provider: 'DMLC',
  documentationUrl: 'https://xgboost.readthedocs.io/en/stable/',
  testUrl: 'https://www.kaggle.com/code/ryanholbrook/xgboost-tutorial',
  imageUrl: 'https://images.unsplash.com/photo-1581091012184-5c7c8e64736e',
  features: [
    'Numerical regression',
    'Feature importance analysis',
    'Outlier detection',
    'Custom objective support'
  ],
  metrics: {
    rmse: 2.45,
    r2Score: 0.91
  },
  trainingParameters: {
    architecture: 'Ensemble of decision trees with gradient boosting',
    parameters: 'Varies based on dataset',
    trainingTokens: 'Not token-based',
    contextWindow: 'Not applicable',
    trainingData: [
      'Structured tabular datasets',
      'CSV/Excel files',
      'Relational databases'
    ],
    computeUsed: 'CPU or GPU acceleration supported',
    trainingTime: 'Minutes to hours based on dataset size',
    optimizations: [
      'Tree pruning',
      'Regularization (L1/L2)',
      'Histogram-based learning',
      'Parallelized tree construction'
    ],
    modelSize: 'Depends on tree depth and number',
    quantization: 'Built-in support for tree pruning and early stopping'
  },
  requirements: {
    pricing: 'Open-source, free to use',
    apiKey: false,
    authentication: false,
    hardware: 'Can run on CPU; GPU recommended for large datasets'
  },
  limitations: [
    'Less effective on unstructured data',
    'Not ideal for real-time inference',
    'May overfit small datasets if not tuned',
    'Limited interpretability for complex ensembles'
  ],
  alternatives: [
    {
      name: 'LightGBM',
      comparison: 'Faster training and lower memory usage'
    },
    {
      name: 'CatBoost',
      comparison: 'Better with categorical features out-of-the-box'
    }
  ]
},
{
  id: 't5-base',
  name: 'T5 Base',
  description: 'Text-to-text Transformer model for a wide range of NLP tasks',
  category: 'nlp',
  provider: 'Google',
  documentationUrl: 'https://huggingface.co/t5-base',
  testUrl: 'https://huggingface.co/transformers/model_doc/t5.html',
  imageUrl: 'https://images.unsplash.com/photo-1633356122342-d1c45d9f5c89',
  features: [
    'Text summarization',
    'Translation',
    'Text classification',
    'Question answering',
    'Grammatical error correction'
  ],
  metrics: {
    accuracy: 0.88,
    bleuScore: 0.36
  },
  trainingParameters: {
    architecture: 'Encoder-decoder Transformer',
    parameters: '220 million parameters',
    trainingTokens: 'Multi-task C4 dataset (~750GB)',
    contextWindow: '512 tokens',
    trainingData: [
      'Colossal Clean Crawled Corpus (C4)',
      'Wikipedia',
      'Books and QA datasets'
    ],
    computeUsed: 'TPUs with Google Cloud',
    trainingTime: 'Several weeks of pre-training',
    optimizations: [
      'Multi-task learning objective',
      'Span corruption pretraining',
      'Label smoothing',
      'Beam search decoding'
    ],
    modelSize: '892 MB',
    quantization: 'Available for 8-bit inference'
  },
  requirements: {
    pricing: 'Free on Hugging Face, usage-based in Google Cloud',
    apiKey: false,
    authentication: false,
    hardware: 'Recommended 16GB GPU for inference'
  },
  limitations: [
    'Limited context size',
    'Sensitive to prompt phrasing',
    'Large model size can cause slow inference',
    'Does not support real-time tasks efficiently'
  ],
  alternatives: [
    {
      name: 'BART',
      comparison: 'Better at summarization and generation tasks'
    },
    {
      name: 'UL2',
      comparison: 'Newer model by Google with improved performance'
    }
  ]
},
{
  id: 'distilbert',
  name: 'DistilBERT',
  description: 'A distilled version of BERT that is faster and smaller',
  category: 'text-classification',
  provider: 'Hugging Face',
  documentationUrl: 'https://huggingface.co/distilbert-base-uncased',
  testUrl: 'https://huggingface.co/models',
  imageUrl: 'https://images.unsplash.com/photo-1611927503569-4a73f56a1b68',
  features: [
    'Text classification',
    'Sentiment analysis',
    'Named entity recognition',
    'Question answering',
    'Embedding generation'
  ],
  metrics: {
    accuracy: 0.87,
    f1Score: 0.90
  },
  trainingParameters: {
    architecture: 'Transformer encoder (distilled BERT)',
    parameters: '66 million parameters',
    trainingTokens: 'Same as BERT, with knowledge distillation',
    contextWindow: '512 tokens',
    trainingData: [
      'BookCorpus',
      'English Wikipedia',
      'Distillation from BERT'
    ],
    computeUsed: 'GPU (NVIDIA V100) for training',
    trainingTime: '2 days with distillation setup',
    optimizations: [
      'Knowledge distillation',
      'Reduced layers',
      'Faster inference time'
    ],
    modelSize: '256 MB',
    quantization: 'Supported with ONNX and 8-bit formats'
  },
  requirements: {
    pricing: 'Free and open-source',
    apiKey: false,
    authentication: false,
    hardware: 'Runs efficiently on CPU and low-end GPUs'
  },
  limitations: [
    'Lower performance than full BERT on some tasks',
    'Still limited to 512 tokens',
    'May underperform in complex reasoning',
    'Needs fine-tuning for specific datasets'
  ],
  alternatives: [
    {
      name: 'TinyBERT',
      comparison: 'Even smaller size, great for mobile apps'
    },
    {
      name: 'MiniLM',
      comparison: 'Faster and comparable performance to DistilBERT'
    }
  ]
}
];