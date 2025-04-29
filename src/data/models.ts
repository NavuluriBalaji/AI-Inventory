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
    "id": "gpt-5-orion",
    "name": "GPT-5 (Orion)",
    "description": "GPT-5, or Orion, is OpenAI's next big thing, expected to drop in mid-2025. Picture a model with over a trillion parameters, gobbling up text, images, and who-knows-what-else to tackle tasks most AIs can only dream of. It’s built to think deeper, connect dots faster, and churn out answers that feel almost human. Whether you’re diving into scientific puzzles, crafting stories, or designing games, Orion’s got the muscle to keep up. OpenAI’s betting on this to redefine what AI can do, and from what’s buzzing, it might just live up to the hype.",
    "category": "multimodal-ai",
    "provider": "OpenAI",
    "documentationUrl": "https://platform.openai.com/docs/api-reference/introduction",
    "testUrl": "https://chat.openai.com/",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    "features": ["Multimodal input", "Advanced reasoning", "Large-scale parameters"],
    "metrics": {
      "accuracy": 0.94,
      "f1Score": 0.96
    },
    architecture: {
      type: 'Transformer',
      layers: 'Unknown',
      parameters: 'Over 1 trillion',
      trainingData: 'Text, images, and other data',
    },
    capabilities: {
      strengths: [
        'Advanced Reasoning',
        'Multimodal understanding',
        'Large-scale parameter model'
      ],
      limitations: [
        'Limited real-world data',
        'Potential bias from training data',
        'High computational costs',
      ],
    },
    useCases: [
      'Complex Problem Solving',
      'Content Creation',
      'Game Design',
      'Scientific Research',
    ],
    ethicalConsiderations: [
      'Data bias',
      'Misinformation',
      'Job displacement',
      'Environmental impact'
    ],
    requirements: {
      compute: 'High-performance GPU or TPU recommended',
      memory: 'Varies based on usage',
      storage: 'Varies based on usage',
    },
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
      "f1Score": 0.95
    },
    architecture: {
      type: 'Transformer',
      layers: 'Unknown',
      parameters: 'Unknown',
      trainingData: 'Large-scale text data',
    },
    capabilities: {
      strengths: [
        'Text generation',
        'Reasoning',
        'Multilingual support',
      ],
      limitations: [
        'Potential for generating inaccurate information',
        'Bias in training data',
      ],
    },
    useCases: [
      'Blog post generation',
      'Translation',
      'Chatbot development',
      'Creative writing',
    ],
    ethicalConsiderations: [
      'Misinformation',
      'Bias in generated content',
      'Privacy concerns',
    ],
    requirements: {
      compute: 'GPU recommended',
      memory: '16GB+ RAM',
      storage: '500GB SSD',
    },
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
      "f1Score": 0.94
    },
    architecture: {
      type: 'Transformer',
      layers: 'Unknown',
      parameters: 'Unknown',
      trainingData: 'Text, images, code, and other data',
    },
    capabilities: {
      strengths: [
        'Multimodal input',
        'Long context understanding',
        'Code generation',
      ],
      limitations: [
        'Requires significant computational resources',
        'Potential for biased outputs',
      ],
    },
    useCases: [
      'Long-form article writing',
      'Code debugging',
      'Multimodal content creation',
      'Research',
    ],
    ethicalConsiderations: [
      'Data bias',
      'Misinformation',
      'Algorithmic bias',
    ],
    requirements: {
      compute: 'High-performance GPU or TPU recommended',
      memory: 'Varies based on usage',
      storage: 'Varies based on usage',
    },
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
      "f1Score": 0.93
    },
    architecture: {
      type: 'Transformer',
      layers: 'Unknown',
      parameters: 'Unknown',
      trainingData: 'Text and conversational data',
    },
    capabilities: {
      strengths: [
        'Natural dialogue',
        'Ethical reasoning',
        'Large context window',
      ],
      limitations: [
        'May exhibit biases from training data',
        'Potential for hallucinations',
      ],
    },
    useCases: [
      'Homework assistance',
      'Customer service chatbots',
      'Brainstorming and ideation',
    ],
    ethicalConsiderations: [
      'Data bias in conversations',
      'Potential for spreading misinformation',
      'Privacy concerns',
    ],
    requirements: {
      compute: 'GPU recommended',
      memory: '16GB+ RAM',
      storage: '500GB SSD',
    },
  },
  {
    "id": "deepseek-r1",
    "name": "DeepSeek R1",
    "description": "DeepSeek R1 is a giant open-source model with 671 billion parameters, ready to chew through math, science, or code like it’s breakfast. It’s the kind of AI researchers and devs love—free to tweak, perfect for digging into tough problems like quantum physics or software bugs. With a massive context window, it can keep track of sprawling datasets or long documents without losing the plot. DeepSeek’s gift to the open-source world is a game-changer for anyone who wants serious brainpower without a paywall.",
    "category": "text-generation",
    "provider": "DeepSeek",
    "documentationUrl": "https://github.com/bhancockio/deepseek-ai-web-crawler",
    "testUrl": "https://huggingface.co/deepseek-ai",
    "imageUrl": "https://i.bstr.es/drivingeco/2025/01/Deepseek-r1-logo-880x495.webp",
    "features": ["Open source", "Scientific reasoning", "Massive context"],
    "metrics": {
      "accuracy": 0.91,
      "f1Score": 0.93
    },
    architecture: {
      type: 'Transformer',
      layers: 'Unknown',
      parameters: '671 billion',
      trainingData: 'Mathematical, scientific, and code data',
    },
    capabilities: {
      strengths: [
        'Open source',
        'Scientific reasoning',
        'Massive context window',
      ],
      limitations: [
        'Needs significant computational resources',
        'Potential for biases from training data',
      ],
    },
    useCases: [
      'Research',
      'Scientific problem solving',
      'Code generation and debugging',
    ],
    ethicalConsiderations: [
      'Data bias',
      'Accessibility concerns',
      'Algorithmic bias',
    ],
    requirements: {
      compute: 'High-performance GPU recommended',
      memory: 'Varies based on usage',
      storage: 'Varies based on usage',
    },
  },
  {
    "id": "qwen2.5-max",
    "name": "Qwen2.5-Max",
    "description": "Alibaba’s Qwen2.5-Max is a 72-billion-parameter beast that’s all about coding and math. Got a tricky algorithm or a stats problem? This model’s your new best friend. It handles 128K tokens, so you can throw entire projects at it and still get clean, precise answers. Plus, it’s open-source, so devs can tinker to their heart’s content. Whether you’re building apps, crunching numbers, or teaching AI to think like a coder, Qwen2.5-Max delivers without the fuss.",
    "category": "text-generation",
    "provider": "Alibaba Cloud",
    "documentationUrl": "https://huggingface.co/Qwen",
    "testUrl": "https://huggingface.co/Qwen/Qwen2.5-72B",
    "imageUrl": "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/679c9c61e16f01001d971884.jpg",
    "features": ["Open source", "Coding", "Mathematical reasoning", "128K context"],
    "metrics": {
      "accuracy": 0.91,
      "f1Score": 0.93
    },
    architecture: {
      type: 'Transformer',
      layers: 'Unknown',
      parameters: '72 billion',
      trainingData: 'Code, math, and general text data',
    },
    capabilities: {
      strengths: [
        'Open source',
        'Coding and mathematical reasoning',
        '128K context',
      ],
      limitations: [
        'Requires significant computational power',
        'Potential for code generation errors',
      ],
    },
    useCases: [
      'Code generation and debugging',
      'Mathematical problem solving',
      'Building applications',
    ],
    ethicalConsiderations: [
      'Data bias in code and math',
      'Potential for misuse in malicious code generation',
    ],
    requirements: {
      compute: 'GPU recommended',
      memory: '16GB+ RAM',
      storage: '500GB SSD',
    },
  },
  {
    "id": "llama-4",
    "name": "LLaMA 4",
    "description": "Meta’s LLaMA 4 is the open-source hero researchers are waiting for, set to outshine LLaMA 3.1 with better reasoning and bigger context. It’s like giving your brain a turbo boost for tasks like coding, data analysis, or writing papers. Since it’s open-source, you can tweak it to fit your project perfectly, whether you’re in a university lab or a startup garage. LLaMA 4’s lean design means it runs smoothly even on modest hardware, making it a favorite for anyone who loves to experiment.",
    "category": "open-source-llm",
    "provider": "Meta AI",
    "documentationUrl": "https://www.llama.com/get-started/",
    "testUrl": "https://huggingface.co/meta-llama",
    "imageUrl": "https://en.saudishopper.com.sa/wp-content/uploads/2025/04/%D9%85%D9%8A%D8%AA%D8%A7-%D8%AA%D8%B9%D9%84%D9%86-%D8%B9%D9%86-%D9%84%D8%A7%D9%85%D8%A7-4-%D8%A7%D9%84%D8%AC%D9%8A%D9%84-%D8%A7%D9%84%D9%82%D8%A7%D8%AF%D9%85-%D9%85%D9%86-%D9%86%D9%85%D8%A7%D8%B0%D8%AC-%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A_ssict_1200_800.webp",
    "features": ["Open source", "Enhanced reasoning", "Large context"],
    "metrics": {
      "accuracy": 0.91,
      "f1Score": 0.93
    },
    architecture: {
      type: 'Transformer',
      layers: 'Unknown',
      parameters: 'Unknown',
      trainingData: 'Text data',
    },
    capabilities: {
      strengths: [
        'Open source',
        'Enhanced reasoning',
        'Large context',
      ],
      limitations: [
        'Can produce biased responses',
        'May be computationally expensive',
      ],
    },
    useCases: [
      'Coding',
      'Data analysis',
      'Writing and research',
    ],
    ethicalConsiderations: [
      'Data bias',
      'Misinformation',
      'Algorithmic bias',
    ],
    requirements: {
      compute: 'GPU recommended',
      memory: '16GB+ RAM',
      storage: '500GB SSD',
    },
  },
  {
    "id": "grok-4",
    "name": "Grok-4",
    "description": "xAI’s Grok-4, hitting the scene in mid-2025, is like a cosmic guide for curious minds. It’s built to handle text, images, and maybe more, answering questions with a mix of smarts and real-time flair. Want to explore the universe or just nail a tricky problem? Grok-4’s got your back. xAI’s mission to push human discovery shines here, with a model that’s as much about sparking ideas as it is about getting answers right. Expect it to be a game-changer for science, education, and beyond.",
    "category": "multimodal-ai",
    "provider": "xAI",
    "documentationUrl": "https://x.ai",
    "testUrl": "https://x.com",
    "imageUrl": "https://thumbs.dreamstime.com/b/grok-logo-new-chatbot-platform-created-elon-musk-social-network-formerly-called-twitter-artificial-intelligence-298668212.jpg",
    "features": ["Multimodal input", "Advanced reasoning", "Real-time chat"],
    "metrics": {
      "accuracy": 0.91,
      "f1Score": 0.93
    },
    architecture: {
      type: 'Transformer',
      layers: 'Unknown',
      parameters: 'Unknown',
      trainingData: 'Text and image data',
    },
    capabilities: {
      strengths: [
        'Multimodal input',
        'Advanced reasoning',
        'Real-time chat',
      ],
      limitations: [
        'Potential for biased results',
        'Requires high compute power',
      ],
    },
    useCases: [
      'Science exploration',
      'Education',
      'Problem solving',
    ],
    ethicalConsiderations: [
      'Data bias',
      'Misinformation',
      'Privacy concerns',
    ],
    requirements: {
      compute: 'High-performance GPU or TPU recommended',
      memory: 'Varies based on usage',
      storage: 'Varies based on usage',
    },
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
      "f1Score": 0.92
    },
    architecture: {
      type: 'Transformer',
      layers: 'Unknown',
      parameters: 'Unknown',
      trainingData: 'Text, code, images, and data',
    },
    capabilities: {
      strengths: [
        'Tool use',
        '1M token context',
        'Low latency',
      ],
      limitations: [
        'Potentially high computational cost',
        'Bias in generated data',
      ],
    },
    useCases: [
      'Automation',
      'Analytics',
      'Live applications',
    ],
    ethicalConsiderations: [
      'Data bias',
      'Misinformation',
      'Privacy concerns',
    ],
    requirements: {
      compute: 'High-performance GPU or TPU recommended',
      memory: 'Varies based on usage',
      storage: 'Varies based on usage',
    },
  },
  {
    "id": "llama-3.1",
    "name": "LLaMA 3.1",
    "description": "LLaMA 3.1 is Meta’s latest open-source gem, packing a punch with extended context and fine-tuned options for specific tasks. Whether you’re coding, analyzing data, or writing, this model keeps up without hogging resources. Its open-source vibe means anyone can dive in and tweak it, from university coders to startup dreamers. With a knack for handling long, tricky tasks, LLaMA 3.1 is the kind of AI that makes research and innovation feel like a breeze.",
    "category": "open-source-llm",
    "provider": "Meta AI",
    "documentationUrl": "https://www.llama.com/get-started/",
    "testUrl": "https://huggingface.co/meta-llama",
    "imageUrl": "https://en.saudishopper.com.sa/wp-content/uploads/2025/04/%D9%85%D9%8A%D8%AA%D8%A7-%D8%AA%D8%B9%D9%84%D9%86-%D8%B9%D9%86-%D9%84%D8%A7%D9%85%D8%A7-4-%D8%A7%D9%84%D8%AC%D9%8A%D9%84-%D8%A7%D9%84%D9%82%D8%A7%D8%AF%D9%85-%D9%85%D9%86-%D9%86%D9%85%D8%A7%D8%B0%D8%AC-%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A_ssict_1200_800.webp",
    "features": ["Open source", "Extended context", "Fine-tuned variants"],
    "metrics": {
      "accuracy": 0.90,
      "f1Score": 0.92
    },
    architecture: {
      type: 'Transformer',
      layers: 'Unknown',
      parameters: 'Unknown',
      trainingData: 'Text data',
    },
    capabilities: {
      strengths: [
        'Open source',
        'Extended context',
        'Fine-tuned variants',
      ],
      limitations: [
        'Bias from training data',
        'May require considerable compute',
      ],
    },
    useCases: [
      'Coding',
      'Data analysis',
      'Writing and research',
    ],
    ethicalConsiderations: [
      'Data bias',
      'Misinformation',
      'Algorithmic bias',
    ],
    requirements: {
      compute: 'GPU recommended',
      memory: '16GB+ RAM',
      storage: '500GB SSD',
    },
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
      "f1Score": 0.92
    },
    architecture: {
      type: 'Transformer',
      layers: 'Unknown',
      parameters: '340 billion',
      trainingData: 'Global data and multilingual data',
    },
    capabilities: {
      strengths: [
        'Reasoning',
        'Multilingual support',
        'Large-scale training',
      ],
      limitations: [
        'Can be computationally expensive',
        'Potentially biased based on training data',
      ],
    },
    useCases: [
      'Report summarization',
      'Language translation',
      'Technical document writing',
    ],
    ethicalConsiderations: [
      'Language bias',
      'Data bias',
      'Privacy concerns',
    ],
    requirements: {
      compute: 'High-performance GPU or TPU recommended',
      memory: 'Varies based on usage',
      storage: 'Varies based on usage',
    },
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
      "f1Score": 0.92
    },
    architecture: {
      type: 'Transformer',
      layers: 'Unknown',
      parameters: '32 billion',
      trainingData: 'Code, math, and general text data',
    },
    capabilities: {
      strengths: [
        'Mathematical reasoning',
        'Coding capabilities',
        'Efficient computing'
      ],
      limitations: [
        'May not be accurate for all mathematical problems',
        'Can exhibit code generation errors',
      ],
    },
    useCases: [
      'Mathematical problem solving',
      'Code debugging and optimization',
      'Data science',
    ],
    ethicalConsiderations: [
      'Data bias',
      'Potential for misuse in malicious code generation',
      'Algorithmic bias'
    ],
    requirements: {
      compute: 'GPU recommended',
      memory: '16GB+ RAM',
      storage: '500GB SSD',
    },
  },
  {
    "id": "command-r-plus-plus",
    "name": "Command R++",
    "description": "Cohere’s Command R++ is the AI you want when you need answers grounded in real data. It’s a retrieval-augmented generation pro, pulling in external info to nail questions, summarize texts, or draft reports. Open-source and developer-friendly, it’s a hit for building apps that need to think fast and stay accurate. Its low-latency design keeps things snappy, so whether you’re powering a chatbot or a research tool, Command R++ delivers without dragging its feet.",
    "category": "rag-optimized",
    "provider": "Cohere",
    "documentationUrl": "https://docs.cohere.com/v2/docs/command-r",
    "testUrl": "https://huggingface.co/CohereForAI/aya-vision-8b",
    "imageUrl": "https://cdn.prod.website-files.com/614c82ed388d53640613982e/66198a56ad48a0ea6b0ed75b_command-r-cover.webp",
    "features": ["Retrieval-Augmented Generation", "Open source", "Advanced reasoning"],
    "metrics": {
      "accuracy": 0.90,
      "f1Score": 0.92
    },
    architecture: {
      type: 'Retrieval-Augmented Generation',
      layers: 'Unknown',
      parameters: 'Unknown',
      trainingData: 'External knowledge and general text data',
    },
    capabilities: {
      strengths: [
        'Retrieval-Augmented Generation',
        'Open source',
        'Advanced reasoning',
      ],
      limitations: [
        'Performance relies heavily on the retrieval system',
        'May still produce inaccurate information',
      ],
    },
    useCases: [
      'Chatbots',
      'Research',
      'Report generation',
    ],
    ethicalConsiderations: [
      'Accuracy and reliability of external sources',
      'Data bias',
    ],
    requirements: {
      compute: 'GPU recommended',
      memory: '16GB+ RAM',
      storage: '500GB SSD',
    },
  },
  {
    "id": "mixtral-8x22b",
    "name": "Mixtral 8x22B",
    "description": "Mistral AI’s Mixtral 8x22B is a clever beast, using a sparse Mixture of Experts setup to get big results without eating up all your compute. It’s like having a team of specialists on call—coding, writing, or analyzing data, it picks the right expert for the job. Open-source and efficient, it’s a dream for devs who want power without the hefty hardware bill. Mixtral’s perfect for scaling up projects, from startups to research labs, without losing speed or smarts.",
    "category": "expert-model",
    "provider": "Mistral AI",
    "documentationUrl": "https://learn.microsoft.com/en-us/azure/ai-foundry/how-to/deploy-models-mistral-open",
    "testUrl": "https://huggingface.co/mistralai",
    "imageUrl": "https://www.techzine.eu/wp-content/uploads/2024/02/Mistral-AI-768x432.jpg",
    "features": ["Sparse routing", "High throughput", "Efficient compute"],
    "metrics": {
      "accuracy": 0.90,
      "f1Score": 0.91
    },
    architecture: {
      type: 'Mixture of Experts',
      layers: 'Unknown',
      parameters: '8x22B',
      trainingData: 'General text data',
    },
    capabilities: {
      strengths: [
        'Sparse routing',
        'High throughput',
        'Efficient compute'
      ],
      limitations: [
        'Potential for performance instability',
        'Requires careful configuration',
      ],
    },
    useCases: [
      'Scaling up projects',
      'Coding',
      'Data analysis',
    ],
    ethicalConsiderations: [
      'Data bias',
      'Algorithmic bias',
    ],
    requirements: {
      compute: 'High-performance GPU recommended',
      memory: 'Varies based on usage',
      storage: 'Varies based on usage',
    },
  },
];
