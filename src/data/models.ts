import { Model, Category } from '../types/model';

export const categories: Category[] = [
  {
    id: 'text-based',
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
    name: 'Nlp',
    description: 'Natural Language Processing models for various text-based tasks',
    icon: 'message-square',
  },
  {
    id: 'regression',
    name: 'Regression',
    description: 'Models designed for numerical prediction tasks',
    icon: 'trending-up',
  },
  {
    id: 'transformer-based',
    name: 'Transformer-based',
    description: 'Models based on the transformer architecture, such as BERT, GPT, T5, etc.',
    icon: 'Cpu',
  },
    {
    id: 'multimodal-ai',
    name: 'Multimodal AI',
    description: 'Models based on the transformer architecture, such as BERT, GPT, T5, etc.',
    icon: 'Cpu',
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
    // rmse: 2.45,
    // r2Score: 0.91
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
    // bleuScore: 0.36
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
},
  {
    "id": "gpt-5-orion",
    "name": "GPT-5 (Orion)",
    "description": "GPT-5 Orion is OpenAI's anticipated 2025 model, expected to surpass previous versions with over a trillion parameters, enhanced multimodal capabilities, and human-like reasoning—designed to revolutionize scientific problem-solving, storytelling, and game design",
    category: 'multimodal-ai',
    "provider": "OpenAI",
    "documentationUrl": "https://platform.openai.com/docs/api-reference/introduction",
    "testUrl": "https://chat.openai.com/",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    "features": ["Multimodal input", "Advanced reasoning", "Large-scale parameters"],
    "metrics": {
      "accuracy": 0.94,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based decoder-only model",
      "parameters": "1+ trillion parameters",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Images", "Other Multimodal Data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["chain-of-thought"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": true,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Unknown context window",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "GPT-4",
        "comparison": "Current state-of-the-art, less advanced"
      }
    ]
  },
  {
    "id": "gpt-4.5",
    "name": "GPT-4.5",
    "description": "GPT-4.5 is OpenAI’s souped-up version of GPT-4, taking everything great about its predecessor and cranking it up a notch. It’s sharper at reasoning, speaks more languages fluently, and pumps out text that’s scarily on-point. Need a blog post, a translation, or a chatbot that doesn’t sound like a robot? This model’s your guy. It’s like GPT-4 went to the gym and came back faster, smarter, and ready to tackle anything from customer service to creative writing without breaking a sweat.",
    "category": "text-generation",
    "provider": "OpenAI",
    "documentationUrl": "https://platform.openai.com/docs/api-reference/introduction",
    "testUrl": "https://chat.openai.com/",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    "features": ["Text generation", "Reasoning", "Multilingual support"],
    "metrics": {
      "accuracy": 0.93,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based decoder-only model",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Code", "Other Data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": true,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Unknown context window",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "GPT-4",
        "comparison": "Current state-of-the-art, but potentially less optimized for some tasks"
      }
    ]
  },
  {
    "id": "gemini-1.5-pro",
    "name": "Gemini 1.5 Pro",
    "description": "Google DeepMind’s Gemini 1.5 Pro is a beast, swallowing up to 2 million tokens at once—think entire books or massive codebases. It’s the kind of AI you call when you need to churn through a mountain of data and still get coherent answers. From writing long-form articles to debugging complex code or blending text with images, this model doesn’t flinch. It’s fast, it’s versatile, and it’s ready to power everything from research labs to creative studios. DeepMind’s got a winner here.",
    "category": "multimodal-ai",
    "provider": "Google DeepMind",
    "documentationUrl": "https://deepmind.google/technologies/gemini/",
    "testUrl": "https://gemini.google.com/",
    "imageUrl": "https://cdn.neowin.com/news/images/uploaded/2024/05/1715805881_google_gemini_hero_image.jpg",
    "features": ["Multimodal input", "Long context", "Code generation"],
    "metrics": {
      "accuracy": 0.92,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "2 million tokens",
      "trainingData": ["Text", "Code", "Images", "Audio", "Video"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": true,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "GPT-4",
        "comparison": "Excellent for text, Gemini excels in multi-modal processing"
      }
    ]
  },
  {
    "id": "claude-3.7-sonnet",
    "name": "Claude 3.7 Sonnet",
    "description": "Claude 3.7 Sonnet from Anthropic is the AI you’d trust to have a heart-to-heart. It’s built to be safe, ethical, and whip-smart, keeping conversations flowing naturally even over long chats. Whether it’s helping with homework, powering a customer service bot, or brainstorming ideas, Sonnet stays on track and keeps things friendly. Anthropic’s focus on values means this model won’t stray into sketchy territory, making it a go-to for businesses or schools that need reliability without the headaches.",
    "category": "conversational-ai",
    "provider": "Anthropic",
    "documentationUrl": "https://docs.anthropic.com/en/api/getting-started",
    "testUrl": "https://claude.ai/",
    "imageUrl": "https://storage.googleapis.com/swipe-insight/content/images/article_images/72_edited_7240876.webp",
    "features": ["Dialogue", "Ethical reasoning", "Large context window"],
    "metrics": {
      "accuracy": 0.91,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Code", "Other Data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": true,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Unknown context window",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "GPT-4",
        "comparison": "Focuses on safety and conversational ability"
      }
    ]
  },
  {
    "id": "deepseek-r1",
    "name": "DeepSeek R1",
    "description": "DeepSeek R1 is a giant open-source model with 671 billion parameters, ready to chew through math, science, or code like it’s breakfast. It’s the kind of AI researchers and devs love—free to tweak, perfect for digging into tough problems like quantum physics or software bugs. With a massive context window, it can keep track of sprawling datasets or long documents without losing the plot. DeepSeek’s gift to the open-source world is a game-changer for anyone who wants serious brainpower without a paywall.",
    "category": "text-generation",
    "provider": "DeepSeek",
    "documentationUrl": "https://github.com/deepseek-ai",
    "testUrl": "https://chat.deepseek.com/",
    "imageUrl": "https://i.bstr.es/drivingeco/2025/01/Deepseek-r1-logo-880x495.webp",
    "features": ["Open source", "Scientific reasoning", "Massive context"],
    "metrics": {
      "accuracy": 0.91,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "671 billion parameters",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Code", "Math", "Science"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Free (Open Source)",
      "apiKey": false,
      "authentication": false,
      "hardware": "Can be run on local hardware"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Unknown context window",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "LLaMA 4",
        "comparison": "Another open-source model, but focus on reasoning"
      }
    ]
  },
  {
    "id": "qwen2.5-max",
    "name": "Qwen2.5-Max",
    "description": "Alibaba’s Qwen2.5-Max is a 72-billion-parameter beast that’s all about coding and math. Got a tricky algorithm or a stats problem? This model’s your new best friend. It handles 128K tokens, so you can throw entire projects at it and still get clean, precise answers. Plus, it’s open-source, so devs can tinker to their heart’s content. Whether you’re building apps, crunching numbers, or teaching AI to think like a coder, Qwen2.5-Max delivers without the fuss.",
    "category": "text-generation",
    "provider": "Alibaba Cloud",
    "documentationUrl": "https://huggingface.co/Qwen",
    "testUrl": "https://huggingface.co/Qwen/Qwen2.5-72B-Chat",
    "imageUrl": "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/679c9c61e16f01001d971884.jpg",
    "features": ["Open source", "Coding", "Mathematical reasoning", "128K context"],
    "metrics": {
      "accuracy": 0.91,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "72 billion parameters",
      "trainingTokens": "Unknown",
      "contextWindow": "128K tokens",
      "trainingData": ["Text", "Code", "Math"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Free (Open Source)",
      "apiKey": false,
      "authentication": false,
      "hardware": "Can be run on local hardware"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "DeepSeek R1",
        "comparison": "Focuses on coding and mathematical reasoning"
      }
    ]
  },
  {
    "id": "llama-4",
    "name": "LLaMA 4",
    "description": "Meta’s LLaMA 4 is the open-source hero researchers are waiting for, set to outshine LLaMA 3.1 with better reasoning and bigger context. It’s like giving your brain a turbo boost for tasks like coding, data analysis, or writing papers. Since it’s open-source, you can tweak it to fit your project perfectly, whether you’re in a university lab or a startup garage. LLaMA 4’s lean design means it runs smoothly even on modest hardware, making it a favorite for anyone who loves to experiment.",
    "category": "open-source-llm",
    "provider": "Meta AI",
    "documentationUrl": "https://ai.meta.com/llama/",
    "testUrl": "https://huggingface.co/meta-llama",
    "imageUrl": "https://en.saudishopper.com.sa/wp-content/uploads/2025/04/%D9%85%D9%8A%D8%AA%D8%A7-%D8%AA%D8%B9%D9%84%D9%86-%D8%B9%D9%86-%D9%84%D8%A7%D9%85%D8%A7-4-%D8%A7%D9%84%D8%AC%D9%8A%D9%84-%D8%A7%D9%84%D9%82%D8%A7%D8%AF%D9%85-%D9%85%D9%86-%D9%86%D9%85%D8%A7%D8%B0%D8%AC-%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A_ssict_1200_800.webp",
    "features": ["Open source", "Enhanced reasoning", "Large context"],
    "metrics": {
      "accuracy": 0.91,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Code", "Other Data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Free (Open Source)",
      "apiKey": false,
      "authentication": false,
      "hardware": "Can be run on local hardware"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "DeepSeek R1",
        "comparison": "Another open-source model, can also do scientific reasoning"
      }
    ]
  },
  {
    "id": "grok-4",
    "name": "Grok-4",
    "description": "xAI’s Grok-4, hitting the scene in mid-2025, is like a cosmic guide for curious minds. It’s built to handle text, images, and maybe more, answering questions with a mix of smarts and real-time flair. Want to explore the universe or just nail a tricky problem? Grok-4’s got your back. xAI’s mission to push human discovery shines here, with a model that’s as much about sparking ideas as it is about getting answers right. Expect it to be a game-changer for science, education, and beyond.",
    "category": "multimodal-ai",
    "provider": "xAI",
    "documentationUrl": "https://x.ai/research",
    "testUrl": "https://grok.x.ai/",
    "imageUrl": "https://thumbs.dreamstime.com/b/grok-logo-new-chatbot-platform-created-elon-musk-social-network-formerly-called-twitter-artificial-intelligence-298668212.jpg",
    "features": ["Multimodal input", "Advanced reasoning", "Real-time chat"],
    "metrics": {
      "accuracy": 0.91,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Images", "Real-time Data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": true,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "GPT-5",
        "comparison": "Multimodal focus, but geared towards conversational use"
      }
    ]
  },
  {
    "id": "gemini-2.0-flash",
    "name": "Gemini 2.0 Flash",
    "description": "Gemini 2.0 Flash from Google DeepMind is the AI you want when speed’s the name of the game. With a 1 million token context, it can juggle huge datasets and still spit out answers in a blink. It’s got built-in tool smarts, so it plays nice with other systems—think automation, analytics, or live apps. Developers love its zippy performance for building responsive tools, and its ability to stay coherent over long tasks makes it a rockstar for complex projects.",
    "category": "multimodal-ai",
    "provider": "Google DeepMind",
    "documentationUrl": "https://deepmind.google/technologies/gemini/",
    "testUrl": "https://gemini.google.com/",
    "imageUrl": "https://cdn.neowin.com/news/images/uploaded/2024/05/1715805881_google_gemini_hero_image.jpg",
    "features": ["Tool use", "1M token context", "Low latency"],
    "metrics": {
      "accuracy": 0.91,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "1 million tokens",
      "trainingData": ["Text", "Code", "Images", "Audio", "Video", "Tool use data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": true,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "GPT-4",
        "comparison": "Good for various applications, Gemini excels at speed"
      }
    ]
  },
  {
    "id": "llama-3.1",
    "name": "LLaMA 3.1",
    "description": "LLaMA 3.1 is Meta’s latest open-source gem, packing a punch with extended context and fine-tuned options for specific tasks. Whether you’re coding, analyzing data, or writing, this model keeps up without hogging resources. Its open-source vibe means anyone can dive in and tweak it, from university coders to startup dreamers. With a knack for handling long, tricky tasks, LLaMA 3.1 is the kind of AI that makes research and innovation feel like a breeze.",
    "category": "open-source-llm",
    "provider": "Meta AI",
    "documentationUrl": "https://ai.meta.com/llama/",
    "testUrl": "https://huggingface.co/meta-llama",
    "imageUrl": "https://en.saudishopper.com.sa/wp-content/uploads/2025/04/%D9%85%D9%8A%D8%AA%D8%A7-%D8%AA%D8%B9%D9%84%D9%86-%D8%B9%D9%86-%D9%84%D8%A7%D9%85%D8%A7-4-%D8%A7%D9%84%D8%AC%D9%8A%D9%84-%D8%A7%D9%84%D9%82%D8%A7%D8%AF%D9%85-%D9%85%D9%86-%D9%86%D9%85%D8%A7%D8%B0%D8%AC-%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A_ssict_1200_800.webp",
    "features": ["Open source", "Extended context", "Fine-tuned variants"],
    "metrics": {
      "accuracy": 0.90,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Code", "Other Data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Free (Open Source)",
      "apiKey": false,
      "authentication": false,
      "hardware": "Can be run on local hardware"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "LLaMA 4",
        "comparison": "Later iteration of LLaMA, potentially with better performance"
      }
    ]
  },
  {
    "id": "palm-2",
    "name": "PaLM 2",
    "description": "Google’s PaLM 2 is a 340-billion-parameter monster that’s all about reasoning and global reach. It can summarize reports, translate languages, or write technical docs like it’s no big deal. With training data that spans the globe, it’s a pro at handling multilingual tasks, making it perfect for businesses or researchers working across borders. PaLM 2’s built to scale, so it tackles big jobs without slowing down, delivering answers that are sharp and ready for the real world.",
    "category": "text-generation",
    "provider": "Google",
    "documentationUrl": "https://ai.google/discover/palm2/",
    "testUrl": "https://ai.google/",
    "imageUrl": "https://vectorseek.com/wp-content/uploads/2024/03/PaLM-2-Logo-Vector.svg-.png",
    "features": ["Reasoning", "Multilingual", "Large-scale training"],
    "metrics": {
      "accuracy": 0.90,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "340 billion parameters",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Code", "Multilingual Data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": true,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "GPT-4",
        "comparison": "Strong reasoning and multilingual capabilities"
      }
    ]
  },
  {
    "id": "qwq-32b",
    "name": "QwQ-32B",
    "description": "Alibaba’s QwQ-32B is a lean, mean 32-billion-parameter machine built for math and coding. It’s like having a genius coder on speed dial, ready to debug, optimize, or solve equations in a snap. Its efficient design means it doesn’t need a supercomputer to shine, perfect for devs working on tight budgets. Being open-source, it’s a playground for anyone who wants to customize their AI for niche projects, from data science to software tweaks.",
    "category": "text-generation",
    "provider": "Alibaba Cloud",
    "documentationUrl": "https://huggingface.co/Qwen",
    "testUrl": "https://huggingface.co/Qwen",
    "imageUrl": "https://res.infoq.com/news/2024/12/qwq-preview/en/headerimage/generatedHeaderImage-1735659078260.jpg",
    "features": ["Mathematical reasoning", "Coding", "Efficient compute"],
    "metrics": {
      "accuracy": 0.90,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "32 billion parameters",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Code", "Math"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Free (Open Source)",
      "apiKey": false,
      "authentication": false,
      "hardware": "Can be run on local hardware"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "Qwen2.5-Max",
        "comparison": "Focuses on coding and math with fewer parameters"
      }
    ]
  },
  {
    "id": "command-r-plus-plus",
    "name": "Command R++",
    "description": "Cohere’s Command R++ is the AI you want when you need answers grounded in real data. It’s a retrieval-augmented generation pro, pulling in external info to nail questions, summarize texts, or draft reports. Open-source and developer-friendly, it’s a hit for building apps that need to think fast and stay accurate. Its low-latency design keeps things snappy, so whether you’re powering a chatbot or a research tool, Command R++ delivers without dragging its feet.",
    "category": "rag-optimized",
    "provider": "Cohere",
    "documentationUrl": "https://docs.cohere.com/docs/command-r-plus",
    "testUrl": "https://cohere.com/command",
    "imageUrl": "https://cdn.prod.website-files.com/614c82ed388d53640613982e/66198a56ad48a0ea6b0ed75b_command-r-cover.webp",
    "features": ["Retrieval-Augmented Generation", "Open source", "Advanced reasoning"],
    "metrics": {
      "accuracy": 0.90,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based with RAG",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Code", "Other Data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Retrieval-Augmented Generation"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": true,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "OpenAI models",
        "comparison": "Good for a variety of tasks."
      }
    ]
  },
   {
    "id": "mixtral-8x22b",
    "name": "Mixtral 8x22B",
    "description": "Mistral AI’s Mixtral 8x22B is a clever beast, using a sparse Mixture of Experts setup to get big results without eating up all your compute. It’s like having a team of specialists on call—coding, writing, or analyzing data, it picks the right expert for the job. Open-source and efficient, it’s a dream for devs who want power without the hefty hardware bill. Mixtral’s perfect for scaling up projects, from startups to research labs, without losing speed or smarts.",
    "category": "expert-model",
    "provider": "Mistral AI",
    "documentationUrl": "https://mistral.ai/news/mixtral-8x22b/",
    "testUrl": "https://huggingface.co/mistralai/Mixtral-8x22B-v0.1",
    "imageUrl": "https://www.techzine.eu/wp-content/uploads/2024/02/Mistral-AI-768x432.jpg",
    "features": ["Sparse routing", "High throughput", "Efficient compute"],
    "metrics": {
      "accuracy": 0.90,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Mixture of Experts",
      "parameters": "8x22 billion parameters",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Code", "Other Data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Mixture of Experts"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Free (Open Source)",
      "apiKey": false,
      "authentication": false,
      "hardware": "Can be run on local hardware"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "DeepSeek R1",
        "comparison": "Another efficient open-source model, focuses on code"
      }
    ]
  },
   {
    "id": "falcon-180b",
    "name": "Falcon 180B",
    "description": "Falcon 180B, from the Technology Innovation Institute, is a 180-billion-parameter open-source titan that speaks multiple languages and handles images too. It’s your go-to for global projects—think translating content, analyzing multimedia, or creating apps for diverse markets. Its open-source roots mean you can customize it to fit your needs, whether you’re a researcher or a business. Falcon’s built to scale, so it powers through big tasks without choking, making it a solid pick for ambitious AI ventures.",
    "category": "multimodal-ai",
    "provider": "Technology Innovation Institute",
    "documentationUrl": "https://falconllm.tii.ae/",
    "testUrl": "https://huggingface.co/tiiuae/falcon-180B",
    "imageUrl": "https://chatgptprompt.cc/wp-content/uploads/2023/10/image-28.png",
    "features": ["Open source", "Multilingual", "Multimodal"],
    "metrics": {
      "accuracy": 0.90,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "180 billion parameters",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Images", "Multilingual Data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Free (Open Source)",
      "apiKey": false,
      "authentication": false,
      "hardware": "Can be run on local hardware"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "Mixtral 8x22B",
        "comparison": "Good for multimodal and multilingual tasks"
      }
    ]
  },
  {
    "id": "nemotron-4-340b",
    "name": "Nemotron-4 340B",
    "description": "Nvidia’s Nemotron-4 340B is a coding and tech wizard, built for enterprises that need serious AI muscle. With 340 billion parameters, it’s ready to crank out code, debug systems, or tackle scientific computing without blinking. Its open-weight setup lets companies tweak it for their specific needs, perfect for building custom tools. Nemotron’s all about precision and speed, so if you’re in tech or research, this model’s got the chops to keep your projects humming along.",
    "category": "expert-model",
    "provider": "Nvidia",
    "documentationUrl": "https://developer.nvidia.com/nemotron",
    "testUrl": "https://build.nvidia.com/explore/discover#nemotron-4-340b",
    "imageUrl": "https://didyouknowbg8.wordpress.com/wp-content/uploads/2024/06/nvidia-emblem.png?w=1024",
    "features": ["Open weights", "Coding", "Technical tasks"],
    "metrics": {
      "accuracy": 0.90,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "340 billion parameters",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Code", "Technical Data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Free (Open Weights)",
      "apiKey": false,
      "authentication": false,
      "hardware": "Can be run on local hardware"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "Qwen2.5-Max",
        "comparison": "Another great choice for coding and related tasks"
      }
    ]
  },
  {
    "id": "mistral-large-2",
    "name": "Mistral Large 2",
    "description": "Mistral Large 2 from Mistral AI is an open-source transformer that’s all about efficiency and global reach. It’s a multilingual pro, perfect for writing, translating, or supporting customers across languages. Its lean design means you don’t need a monster server to run it, whether you’re in the cloud or on your own hardware. Devs love its open-source flexibility, letting them tailor it for everything from research to real-time apps. Mistral Large 2’s got the smarts to make your projects shine.",
    "category": "text-generation",
    "provider": "Mistral AI",
    "documentationUrl": "https://mistral.ai/news/mistral-large-2/",
    "testUrl": "https://chat.mistral.ai/",
    "imageUrl": "https://www.cxodigitalpulse.com/wp-content/uploads/2024/07/feature-242.jpg",
    "features": ["Open source", "Multilingual", "Optimized compute"],
    "metrics": {
      "accuracy": 0.89,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Multilingual Data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": true,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "GPT-4",
        "comparison": "Multilingual text generation"
      }
    ]
  },
  {
    "id": "ernie-4.0",
    "name": "Ernie 4.0",
    "description": "Baidu’s Ernie 4.0 is a 10-trillion-parameter giant that’s practically fluent in Mandarin and pretty darn good at other languages too. It’s built for chatting, answering questions, or creating content, especially in Chinese markets. Whether you’re running a global business or a local startup, Ernie’s knack for natural conversation makes it a killer tool for customer service or educational apps. Its massive training gives it a deep well of knowledge, so it’s ready to tackle anything you throw its way.",
    "category": "conversational-ai",
    "provider": "Baidu",
    "documentationUrl": "https://cloud.baidu.com/product/wenxinworkshop",
    "testUrl": "https://yiyan.baidu.com/",
    "imageUrl": "https://aimode.co/wp-content/uploads/2023/11/Baidu-Earnie-Bot-AI.webp",
    "features": ["Multilingual", "Mandarin focus", "Conversational"],
    "metrics": {
      "accuracy": 0.89,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "10 trillion parameters",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Mandarin Text", "Other Data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": true,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "May occasionally generate incorrect information",
      "Cannot access real-time information",
      "Requires internet connection",
      "Cannot learn from conversations"
    ],
    "alternatives": [
      {
        "name": "GPT-4",
        "comparison": "Similar conversational ability, but with a focus on Chinese language"
      }
    ]
  },
  {
    "id": "dall-e-3",
    "name": "DALL-E 3",
    "description": "OpenAI's DALL-E 3 is an AI model that crafts stunningly detailed and nuanced images from simple text descriptions. It's a leap forward in understanding context and generating visuals that align closely with user intent. From photorealistic scenes to artistic expressions, DALL-E 3 empowers creators by turning imagination into high-quality imagery, and it's integrated into tools like ChatGPT for easy access.",
    "category": "image-generation",
    "provider": "OpenAI",
    "documentationUrl": "https://openai.com/dall-e-3",
    "testUrl": "https://labs.openai.com/",
    "imageUrl": "https://mspoweruser.com/wp-content/uploads/2023/09/dall-e-3-in-chatgpt.png",
    "features": ["Text-to-image generation", "High detail and coherence", "Nuance understanding"],
    "metrics": {
      "accuracy": 0.92,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Diffusion model",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Image-text pairs"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based, credits",
      "apiKey": true,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "Can generate incorrect or undesirable images",
      "Cannot create images of real people",
      "Requires internet connection"
    ],
    "alternatives": [
      {
        "name": "Midjourney",
        "comparison": "Different artistic style, also text-to-image"
      }
    ]
  },
  {
    "id": "midjourney-v6",
    "name": "Midjourney V6",
    "description": "Midjourney V6 is the latest iteration of the popular AI image generator known for its artistic and often surreal outputs. Accessed via Discord, it allows users to create highly detailed and aesthetically striking images using text prompts. V6 brings enhanced realism, better text rendering within images, and improved prompt understanding, making it a favorite among artists and designers for its unique visual style.",
    "category": "image-generation",
    "provider": "Midjourney",
    "documentationUrl": "https://docs.midjourney.com/",
    "testUrl": "https://www.midjourney.com/showcase/recent/",
    "imageUrl": "https://www.midjourney-v6.com/wp-content/uploads/2023/12/First-Look-at-Midjourney-v6.png",
    "features": ["Artistic image generation", "Discord integration", "High aesthetic quality", "Improved realism"],
    "metrics": {
      "accuracy": 0.90,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Diffusion model",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Image-text pairs"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": false,
      "authentication": false,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "Relies on Discord",
      "Artistic style may not suit all needs",
      "Requires internet connection"
    ],
    "alternatives": [
      {
        "name": "DALL-E 3",
        "comparison": "Different artistic style, also text-to-image"
      }
    ]
  },
{
  "id": "microsoft-copilot",
  "name": "Microsoft Copilot",
  "description": "Microsoft Copilot is an AI-powered assistant integrated across Microsoft's ecosystem, from Windows to Microsoft 365 apps. It leverages large language models to provide contextual help, generate content, summarize information, and automate tasks. Whether you're drafting an email in Outlook, analyzing data in Excel, or searching the web, Copilot aims to boost productivity and creativity by being your everyday AI companion.",
  "category": "conversational-ai",
  "provider": "Microsoft",
  "documentationUrl": "https://www.microsoft.com/en-us/microsoft-copilot",
  "testUrl": "https://copilot.microsoft.com/",
  "imageUrl": "https://ppc.land/content/images/2023/12/Microsoft-Copilot-Logo.webp",
  "features": [
    "Productivity assistant",
    "Content generation",
    "Task automation",
    "Contextual understanding"
  ],
  "metrics": {
    "accuracy": 0.89,
    "latency": "500ms"
  },
  "trainingParameters": {
    "architecture": "Transformer-based Large Language Model (e.g., GPT-4 via Azure OpenAI Service)",
    "parameters": "Not publicly disclosed (likely hundreds of billions, GPT-4 scale)",
    "trainingTokens": "Not publicly disclosed",
    "contextWindow": "Not officially disclosed (GPT-4 supports up to 32,000 tokens)",
    "trainingData": [
      "Text",
      "Code",
      "User interactions",
      "Microsoft Graph data"
    ],
    "computeUsed": "Not disclosed (runs on Azure cloud infrastructure)",
    "trainingTime": "Not disclosed",
    "optimizations": [
      "Adaptive learning",
      "Reinforcement learning from human feedback (RLHF)",
      "Plugin extensibility",
      "Contextual grounding"
    ],
    "modelSize": "Not disclosed (GPT-4 scale)",
    "quantization": "Not specified"
  },
  "requirements": {
    "pricing": "Subscription-based",
    "apiKey": false,
    "authentication": true,
    "hardware": "Cloud-based"
  },
  "limitations": [
    "May generate incorrect or irrelevant content",
    "Reliant on Microsoft ecosystem",
    "Requires internet connection"
  ],
  "alternatives": [
    {
      "name": "Other AI Assistants",
      "comparison": "Different features/integration with other platforms"
    }
  ]
},
  {
    "id": "runway-gen-2",
    "name": "Runway Gen-2",
    "description": "Runway Gen-2 is a groundbreaking AI model that generates video from text prompts or existing images. It allows creators to bring dynamic scenes to life without complex animation software. Whether you need a short clip for social media or a visual concept for a film, Gen-2 offers a powerful toolkit for text-to-video and image-to-video creation, pushing the boundaries of AI in filmmaking and content creation.",
    "category": "video-generation",
    "provider": "RunwayML",
    "documentationUrl": "https://runwayml.com/docs/gen-2/",
    "testUrl": "https://runwayml.com/ai-tools/gen-2/",
    "imageUrl": "https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/2bf21164-4029-4488-875d-f05aa32e6031.png",
    "features": ["Text-to-video", "Image-to-video", "AI video editing tools", "Creative content generation"],
    "metrics": {
      "accuracy": 0.88,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Diffusion Model",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Video", "Images", "Text"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": false,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "Limited video length",
      "Results can vary",
      "Requires internet connection"
    ],
    "alternatives": [
      {
        "name": "Pika Labs",
        "comparison": "Another text-to-video tool"
      }
    ]
  },
  {
    "id": "elevenlabs-speech-synthesis",
    "name": "ElevenLabs Speech Synthesis",
    "description": "ElevenLabs provides state-of-the-art AI voice generation and text-to-speech (TTS) technology. Known for its incredibly realistic and emotive voices, it allows users to clone voices, create custom voiceovers, and generate high-quality audio for videos, podcasts, and applications. Its focus on natural intonation and diverse voice options makes it a leader in the AI speech synthesis space.",
    "category": "speech-synthesis",
    "provider": "ElevenLabs",
    "documentationUrl": "https://elevenlabs.io/docs",
    "testUrl": "https://elevenlabs.io/",
    "imageUrl": "https://marcabraham.com/wp-content/uploads/2024/05/elevenlabs.png?w=1024",
    "features": ["Realistic TTS", "Voice cloning", "Multilingual support", "Emotional range"],
    "metrics": {
      "accuracy": 0.93,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Neural Network",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Speech Data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": true,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "Generated voices can sometimes sound artificial",
      "Requires internet connection"
    ],
    "alternatives": [
      {
        "name": "Murf AI",
        "comparison": "Another AI voice generation tool"
      }
    ]
  },
  {
    "id": "notion-ai",
    "name": "Notion AI",
    "description": "Notion AI integrates powerful generative AI capabilities directly into the Notion workspace. It helps users summarize notes, draft content, brainstorm ideas, translate text, and improve writing, all within their existing documents and databases. Notion AI aims to make knowledge workers more productive by seamlessly blending AI assistance with their daily workflows.",
    "category": "productivity-ai",
    "provider": "Notion",
    "documentationUrl": "https://www.notion.so/product/ai",
    "testUrl": "https://www.notion.so/",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
    "features": ["Content generation", "Summarization", "Brainstorming", "Integrated workflow"],
    "metrics": {
      "accuracy": 0.87,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Large Language Model",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Code", "User interactions"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": false,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "Relies on the Notion platform",
      "May produce inaccurate or irrelevant content",
      "Requires internet connection"
    ],
    "alternatives": [
      {
        "name": "Microsoft Copilot",
        "comparison": "AI tools integrated into productivity suites"
      }
    ]
  },
  {
    "id": "perplexity-ai",
    "name": "Perplexity AI",
    "description": "Perplexity AI is an AI-powered search engine and conversational assistant that provides direct answers to questions, complete with citations and sources. It aims to be a more accurate and transparent way to find information online, moving beyond traditional keyword search to deliver comprehensive, synthesized responses. It's great for research, learning, and getting quick, reliable answers.",
    "category": "conversational-search",
    "provider": "Perplexity AI",
    "documentationUrl": "https://docs.perplexity.ai/",
    "testUrl": "https://www.perplexity.ai/",
    "imageUrl": "https://logos-world.net/wp-content/uploads/2023/08/Perplexity-Logo.jpg",
    "features": ["Conversational search", "Cited sources", "Information synthesis", "Multilingual"],
    "metrics": {
      "accuracy": 0.90,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Large Language Model",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Text", "Web data"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based, Free Version",
      "apiKey": false,
      "authentication": false,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "Responses limited to available sources",
      "May be subject to biases in source material",
      "Requires internet connection"
    ],
    "alternatives": [
      {
        "name": "Google Search",
        "comparison": "Provides cited sources, which are not always possible with traditional search."
      }
    ]
  },
  {
    "id": "github-copilot",
    "name": "GitHub Copilot",
    "description": "GitHub Copilot is an AI pair programmer that offers autocomplete-style code suggestions right in your editor. Trained on billions of lines of code, it helps developers write code faster, learn new languages, and tackle complex problems. It can suggest entire functions, boilerplate code, and even help with comments and tests, significantly speeding up the development process.",
    "category": "coding-assistant",
    "provider": "GitHub (Microsoft)",
    "documentationUrl": "https://docs.github.com/en/copilot",
    "testUrl": "https://github.com/features/copilot",
    "imageUrl": "https://s3-sgn09.fptcloud.com/codelearnstorage/files/thumbnails/copilot_7700946946c14f74bf9a4c8a293a97be.png",
    "features": ["Code completion", "Boilerplate generation", "Multilingual support", "IDE integration"],
    "metrics": {
      "accuracy": 0.89,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Code Repositories"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": true,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "May generate incorrect code",
      "Requires an internet connection",
      "Can be limited by context in large codebases"
    ],
    "alternatives": [
      {
        "name": "Tabnine",
        "comparison": "Another AI-powered code completion tool"
      }
    ]
  },
  {
    "id": "tabnine",
    "name": "Tabnine",
    "description": "Tabnine is an AI code completion assistant that supports a wide array of programming languages and IDEs. It uses deep learning to predict and suggest your next lines of code, adapting to your coding style and project context. Tabnine offers both cloud-based and local models, providing flexibility for individual developers and enterprise teams focused on privacy and performance.",
    "category": "coding-assistant",
    "provider": "Tabnine",
    "documentationUrl": "https://www.tabnine.com/docs/",
    "testUrl": "https://www.tabnine.com/",
    "imageUrl": "https://cdn.prod.website-files.com/6315e930d2cfb6b1c8ea22c7/6315e930d2cfb65890ea23df_Tabnine.png",
    "features": ["AI code completion", "Personalized suggestions", "Multi-language support", "IDE integration", "Local model option"],
    "metrics": {
      "accuracy": 0.88,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Transformer-based",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Code Repositories"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based, free tier available",
      "apiKey": true,
      "authentication": true,
      "hardware": "Cloud-based and local models available"
    },
    "limitations": [
      "Suggestions can be incorrect",
      "Performance affected by internet connection (cloud model)",
      "Local model may require significant resources"
    ],
    "alternatives": [
      {
        "name": "GitHub Copilot",
        "comparison": "Another AI-powered code completion tool"
      }
    ]
  },
  {
    "id": "adobe-firefly",
    "name": "Adobe Firefly",
    "description": "Adobe Firefly is a family of creative generative AI models integrated into Adobe's Creative Cloud suite. It allows users to generate images, text effects, and vector graphics using text prompts, and edit content with AI-powered tools like Generative Fill. Firefly is designed to be commercially safe and ethically responsible, empowering creators while respecting artists' rights.",
    "category": "creative-ai",
    "provider": "Adobe",
    "documentationUrl": "https://www.adobe.com/sensei/generative-ai/firefly.html",
    "testUrl": "https://firefly.adobe.com/",
    "imageUrl": "https://aeg.alpineschools.org/wp-content/uploads/sites/45/2024/09/Adobe-Firefly.png?w=640",
    "features": ["Image generation", "Text effects", "Generative Fill", "Integration with Adobe apps", "Commercially safe"],
    "metrics": {
      "accuracy": 0.91,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Diffusion Model",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Images, Text", "Adobe Stock and Open Data Sets"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based (Adobe Creative Cloud)",
      "apiKey": false,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "Output quality can vary",
      "Requires Adobe Creative Cloud subscription",
      "May not always meet user expectations"
    ],
    "alternatives": [
      {
        "name": "Midjourney",
        "comparison": "Focuses on art-focused image generation"
      }
    ]
  },
  {
    "id": "synthesia",
    "name": "Synthesia",
    "description": "Synthesia is an AI video generation platform that allows users to create professional-looking videos with AI avatars and voiceovers in minutes. Simply type in your script, choose an avatar, and Synthesia generates a video, supporting multiple languages. It's widely used for corporate training, marketing, and informational videos, reducing the cost and complexity of traditional video production.",
    "category": "ai-video-avatar",
    "provider": "Synthesia",
    "documentationUrl": "https://www.synthesia.io/docs",
    "testUrl": "https://www.synthesia.io/create-ai-video",
    "imageUrl": "https://cdn.tech.eu/uploads/2025/04/synthesia-81.jpg",
    "features": ["AI avatar videos", "Text-to-video", "Multilingual voiceovers", "Custom avatars", "Template library"],
    "metrics": {
      "accuracy": 0.89,
      "latency": "500ms"
    },
    "trainingParameters": {
      "architecture": "Neural Networks",
      "parameters": "Unknown",
      "trainingTokens": "Unknown",
      "contextWindow": "Unknown",
      "trainingData": ["Video, Text, Speech"],
      "computeUsed": "Unknown",
      "trainingTime": "Unknown",
      "optimizations": ["Unknown"],
      "modelSize": "Unknown",
      "quantization": "Unknown"
    },
    "requirements": {
      "pricing": "Subscription-based",
      "apiKey": false,
      "authentication": true,
      "hardware": "Cloud-based"
    },
    "limitations": [
      "Avatar quality may not be fully photorealistic",
      "Limited customization options",
      "Requires internet connection"
    ],
    "alternatives": [
      {
        "name": "Runway Gen-2",
        "comparison": "Also text-to-video, with a focus on creative flexibility"
      }
    ]
  },
];