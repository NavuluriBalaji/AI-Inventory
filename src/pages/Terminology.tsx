import React from 'react';

const terminology = [
  {
    id: 1,
    term: "Large Language Model (LLM)",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*A7G739cVw4C9lSzwApxuvw.png",
    description:
      "A Large Language Model (LLM) is a type of AI that uses deep learning, typically based on transformer architectures, to understand and generate human language. LLMs are trained on vast text datasets and can perform tasks like text generation, summarization, translation, and more.",
    source: "https://maddevs.io/glossary/large-language-model/"
  },
  {
    id: 2,
    term: "Transformer",
    image: "https://blog.roboflow.com/content/images/2023/02/Blog-Image-Template---James--1-.jpg",
    description:
      "The transformer is a neural network architecture introduced in 2017, foundational for modern LLMs. It uses self-attention mechanisms to process input data in parallel, enabling efficient handling of long-range dependencies in text.",
    source: "https://medium.com/@thomascountz/transformers-explained-visually-part-1-overview-of-functionality-95a6dd460452"
  },
  {
    id: 3,
    term: "Attention Mechanism",
    image: "https://i.ytimg.com/vi/lOrTlKrdmkQ/maxresdefault.jpg",
    description:
      "The attention mechanism allows models to focus on relevant parts of the input sequence when making predictions. In transformers, self-attention helps the model weigh the importance of each word relative to others in a sentence.",
    source: "https://towardsdatascience.com/illustrated-self-attention-2d627e33b20a"
  },
  {
    id: 4,
    term: "Tokenization",
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20240124125624/Tokenization-in-NLP.png",
    description:
      "Tokenization is the process of splitting text into smaller units, such as words or subwords, called tokens. LLMs process and generate text at the token level, enabling them to handle diverse languages and structures.",
    source: "https://www.datacamp.com/blog/what-is-tokenization"
  },
  {
    id: 5,
    term: "Context Window",
    image: "https://incubity.ambilio.com/wp-content/uploads/2024/11/What-is-Context-Window-in-LLMs.png",
    description:
      "The context window refers to the maximum number of tokens an LLM can consider at once. Larger context windows enable models to understand and generate more coherent and contextually relevant responses.",
    source: "https://medium.com/@crskilpatrick807/context-windows-the-short-term-memory-of-large-language-models-ab878fc6f9b5"
  },
  {
    id: 6,
    term: "Prompt Engineering",
    image: "https://miro.medium.com/v2/resize:fit:750/1*jOtc1Qf_U6bY8xo_VdHa3Q.jpeg",
    description:
      "Prompt engineering involves crafting and optimizing input prompts to guide LLMs toward producing desired outputs. This technique is crucial for maximizing the effectiveness of large language models.",
    source: "https://medium.com/@promptengineering/prompt-engineering-101-1c1f5a7e3b2"
  },
  {
    id: 7,
    term: "Fine-tuning",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*M7BlWvqu5UPCNLw8yhV9IQ.png",
    description:
      "Fine-tuning is the process of adapting a pre-trained LLM to a specific task or domain by training it further on a smaller, task-specific dataset. This improves performance on specialized tasks.",
    source: "https://rahulrajpvr7d.medium.com/what-is-fine-tuning-language-models-a-simple-explanation-8054685a4218"
  },
  {
    id: 8,
    term: "Mixture of Experts (MoE)",
    image: "https://media.licdn.com/dms/image/v2/D4D12AQGAElCH8gD08g/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1709821617807?e=2147483647&v=beta&t=n9R9d_Z8367uJJvfdiHiYvX4rQ_Hd6bZrkzve4YO3qk",
    description:
      "A Mixture of Experts (MoE) is an architecture where inputs are routed to different expert subnetworks, allowing efficient scaling and specialization. Only a subset of parameters is activated for each input, making large models more efficient.",
    source: "https://medium.com/@bijit211987/mixture-of-experts-moe-scaling-ai-horizons-44de79ba2e89"
  },
  {
    id: 9,
    term: "Vectorization",
    image: "https://cdn.prod.website-files.com/64b3ee21cac9398c75e5d3ac/66e9918c2dfe77807c0a492c_65d4734f284089e516b145fe_arya_vector_databases_important_llms_3.png",
    description:
      "Vectorization is the process of converting data (text, images, etc.) into numerical vectors for processing by machine learning models. In NLP, this often means embedding words or sentences in high-dimensional spaces.",
    source: "https://www.geeksforgeeks.org/vectorization-techniques-in-nlp/"
  },
  {
    id: 10,
    term: "Multimodality",
    image: "https://d3r5yd0374231.cloudfront.net/images-tek/uploads/2024/09/Multimodal-AI-%E2%80%93-How-it-Works.jpg",
    description:
      "Multimodality refers to models that can process and generate multiple types of data, such as text, images, and audio. Multimodal LLMs enable richer interactions and broader applications.",
    source: "https://www.tekrevol.com/blogs/multimodal-ai-how-it-works-use-cases-examples/"
  },
  {
  id: 11,
  term: "Reinforcement Learning from Human Feedback (RLHF)",
  image: "https://media.geeksforgeeks.org/wp-content/uploads/20240215172754/Reinforcement-learning-from-human-feedback.webp",
  description:
    "Reinforcement Learning from Human Feedback (RLHF) is a technique where models learn from human feedback to improve their performance. It combines reinforcement learning with human evaluations to align model outputs with human preferences.",
  source: "https://aws.amazon.com/what-is/reinforcement-learning-from-human-feedback/"
  },
  {
    id: 12,
    term: "Zero-shot Learning",
    image: "https://www.dremio.com/wp-content/uploads/2023/07/Wiki-Zero-Shot-Learning-Featured-Image.png",
    description:
      "Zero-shot learning is the ability of a model to perform tasks it has not been explicitly trained on by leveraging its understanding of related tasks or concepts. This is a key feature of many LLMs, allowing them to generalize across diverse tasks.",
    source: "https://www.oreilly.com/radar/zero-shot-learning/"
  },
  
];


const Terminology: React.FC = () => (
  <div className="min-h-screen w-full bg-black text-gray-100 font-rethink flex flex-col items-center py-12">
    <h2 className="text-3xl font-bold mb-8 text-green-500">AI Terminology Explained</h2>
    <div className="w-full max-w-7xl px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {terminology.map(term => (
          <div
            key={term.id}
            className="bg-gray-900/80 rounded-xl p-6 shadow border border-green-900 flex flex-col hover:shadow-lg transition"
            style={{ minWidth: 0, width: '100%' }}
          >
            <div className="w-full mb-4" style={{ aspectRatio: '16/9' }}>
              <img
                src={term.image}
                alt={term.term}
                className="w-full h-full object-cover rounded"
                style={{ background: "#222", aspectRatio: '16/9', width: '100%' }}
              />
            </div>
            <h3 className="text-lg font-bold text-green-400 mb-2">{term.term}</h3>
            <p className="text-gray-200 mb-4">{term.description}</p>
            <a
              href={term.source}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto text-green-400 underline hover:text-green-300 font-medium"
            >
              Learn more
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Terminology;
