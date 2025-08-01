import React, { useState, useEffect } from 'react';
// import { Brain } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import ModelCard from '../components/ModelCard';
import Footer from '../components/footer';
import AnimatedBackground from '../components/AnimatedBackground';
import SEO from '../components/SEO';
import CompareModels from '../components/CompareModels';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { modelApi } from '../services/api';
import { Model, Category } from '../types/model';

// Default categories for fallback
const defaultCategories: Category[] = [
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
  }
];

// Add icons (use any icon library or SVGs, here using Heroicons SVGs for demo)
const HamburgerIcon = () => (
  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const UpArrowIcon = () => (
  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const [models, setModels] = useState<Model[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [loadingModels, setLoadingModels] = useState(true);
  const [loadingMoreModels, setLoadingMoreModels] = useState(false);
  const [modelsError, setModelsError] = useState('');
  const [aiSummaries, setAiSummaries] = useState<{id: number, title: string, summary: string, link: string, image?: string}[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreModels, setHasMoreModels] = useState(true);
  const [totalModels, setTotalModels] = useState(0);

  // Load models from API
  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoadingModels(true);
        setModelsError('');
        
        const response = await modelApi.getAll({ limit: 20, page: 1 });
        if (response && response.models) {
          setModels(response.models);
          setTotalModels(response.pagination?.totalModels || response.models.length);
          setHasMoreModels(response.pagination ? response.pagination.current < response.pagination.total : false);
        }
      } catch (error) {
        console.error('Error loading models:', error);
        setModelsError('Failed to load models. Please try again later.');
        // Keep default empty array if API fails
        setModels([]);
      } finally {
        setLoadingModels(false);
      }
    };

    loadModels();
  }, []);

  // Load more models function
  const loadMoreModels = async () => {
    if (loadingMoreModels || !hasMoreModels) return;
    
    try {
      setLoadingMoreModels(true);
      const nextPage = currentPage + 1;
      
      const response = await modelApi.getAll({ limit: 20, page: nextPage });
      if (response && response.models) {
        setModels(prevModels => [...prevModels, ...response.models]);
        setCurrentPage(nextPage);
        setHasMoreModels(response.pagination ? response.pagination.current < response.pagination.total : false);
      }
    } catch (error) {
      console.error('Error loading more models:', error);
    } finally {
      setLoadingMoreModels(false);
    }
  };

  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(search.toLowerCase()) ||
    model.features.some(feature =>
      feature.toLowerCase().includes(search.toLowerCase())
    )
  );

  useEffect(() => {
    setLoadingNews(true);
    fetch('https://fetchnews-ejz5.onrender.com/api/ai-news-rss')
      .then(res => res.json())
      .then(data => setAiSummaries(data))
      .catch(() => setAiSummaries([]))
      .finally(() => setLoadingNews(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to split news into two rows
  const splitNewsRows = (news: typeof aiSummaries) => {
    const half = Math.ceil(news.length / 2);
    return [news.slice(0, half), news.slice(half)];
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: aiSummaries.length > 5,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    autoplay: true, // enable auto sliding
    autoplaySpeed: 5000, // slide every 5 seconds (5000 ms)
  };

  const terminology = [
    {
      id: 1,
      term: "Mixture of Experts",
      image: "https://media.licdn.com/dms/image/v2/D4D12AQGAElCH8gD08g/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1709821617807?e=2147483647&v=beta&t=n9R9d_Z8367uJJvfdiHiYvX4rQ_Hd6bZrkzve4YO3qk",
      description:
        "A Mixture of Experts (MoE) is a neural network architecture that routes inputs to different 'expert' subnetworks, allowing for more efficient and specialized processing. This technique enables large models to scale efficiently by activating only a subset of parameters for each input.",
      source: "https://medium.com/@bijit211987/mixture-of-experts-moe-scaling-ai-horizons-44de79ba2e89"
    },
    {
      id: 2,
      term: "State-of-the-Art Models",
      image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*A7G739cVw4C9lSzwApxuvw.png",
      description:
        "State-of-the-art (SOTA) models are the most advanced and effective models available for a specific task, often achieving the best performance on benchmark datasets. Examples include GPT-4, PaLM, and Llama 2.",
      source: "https://medium.com/@balajinbtt/decoding-state-of-the-art-sota-models-49352087e871"
    },
    {
      id: 3,
      term: "Vectorization",
      image: "https://cdn.prod.website-files.com/64b3ee21cac9398c75e5d3ac/66e9918c2dfe77807c0a492c_65d4734f284089e516b145fe_arya_vector_databases_important_llms_3.png",
      description:
        "Vectorization is the process of converting data (such as text or images) into numerical vectors so that machine learning models can process them. In NLP, this often involves embedding words or sentences into high-dimensional spaces.",
      source: "https://www.geeksforgeeks.org/vectorization-techniques-in-nlp/"
    },
    {
      id: 4,
      term: "Fine-tuning",
      image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*M7BlWvqu5UPCNLw8yhV9IQ.png",
      description:
        "Fine-tuning is the process of taking a pre-trained model and training it further on a specific dataset to adapt it for a particular task, improving its performance on domain-specific data.",
      source: "https://rahulrajpvr7d.medium.com/what-is-fine-tuning-language-models-a-simple-explanation-8054685a4218"
    },
    {
      id: 5,
      term: "Prompt Engineering",
      image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*8w1kLTlaX2UjsFvdcGaVbA.png",
      description:
        "Prompt engineering involves designing and optimizing input prompts to elicit the best possible responses from language models. It's a key technique for leveraging the capabilities of large language models.",
      source: "https://medium.com/@promptengineering/prompt-engineering-101-1c1f5a7e3b2"
    }
  ];

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubscribe = async () => {
    setSubscribeError('');
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubscribeError('Please enter a valid email address.');
      return;
    }
    try {
      const res = await fetch('https://nodemailer-g70d.onrender.com/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      } else {
        const data = await res.json();
        setSubscribeError(data.details || 'Subscription failed. Try again.');
      }
    } catch {
      setSubscribeError('Server error. Try again later.');
    }
  };

  // Structured data for homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AI Inventory",
    "description": "Comprehensive database of AI models and tools. Discover, compare, and explore the latest artificial intelligence technologies.",
    "url": window.location.origin,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${window.location.origin}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "author": {
      "@type": "Organization",
      "name": "AI Inventory Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Inventory",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.webp`
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-gray-100 font-rethink flex flex-col relative">
      {/* SEO Component */}
      <SEO
        title="AI Inventory - Comprehensive Database of AI Models and Tools"
        description="Discover, compare, and explore the latest AI models and tools. Your comprehensive resource for artificial intelligence technologies, from GPT to BERT and beyond."
        keywords="AI models, artificial intelligence, machine learning, GPT, BERT, AI tools, deep learning, natural language processing, computer vision, AI database, LLM, transformer models"
        url={window.location.href}
        image={`${window.location.origin}/logo.webp`}
        jsonLd={structuredData}
      />

      {/* Enhanced Hamburger Menu with updated colors */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-3 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all duration-200 focus:outline-none shadow-lg"
        >
          <HamburgerIcon />
        </button>
        {menuOpen && (
          <div className="absolute mt-4 left-0 bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl w-64 p-6 z-50">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('featured-models')} 
                className="text-white text-lg text-left p-3 rounded-xl hover:bg-cyan-500/15 hover:text-cyan-300 transition-all duration-200"
              >
                <span className="mr-3">🤖</span>Featured Models
              </button>
              <button 
                onClick={() => scrollToSection('categories')} 
                className="text-white text-lg text-left p-3 rounded-xl hover:bg-emerald-500/15 hover:text-emerald-300 transition-all duration-200"
              >
                <span className="mr-3">📂</span>Categories
              </button>
              <button 
                onClick={() => scrollToSection('ai-inventions')} 
                className="text-white text-lg text-left p-3 rounded-xl hover:bg-purple-500/15 hover:text-purple-300 transition-all duration-200"
              >
                <span className="mr-3">🚀</span>Latest AI Inventions
              </button>
              <button 
                onClick={() => scrollToSection('compare-models')} 
                className="text-white text-lg text-left p-3 rounded-xl hover:bg-blue-500/15 hover:text-blue-300 transition-all duration-200"
              >
                <span className="mr-3">⚖️</span>Compare Models
              </button>
              <button 
                onClick={() => scrollToSection('terminology')} 
                className="text-white text-lg text-left p-3 rounded-xl hover:bg-green-500/10 hover:text-green-400 transition-all duration-200"
              >
                <span className="mr-3">📚</span>AI Terminology
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Scroll Up Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl shadow-2xl hover:shadow-green-500/25 hover:scale-110 transition-all duration-200 group"
          aria-label="Scroll to top"
        >
          <UpArrowIcon />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
        </button>
      )}

      <AnimatedBackground />
      
      {/* Enhanced Hero Section with proper z-index */}
      <div className="flex-1 flex flex-col justify-center items-center py-12 relative z-10">
        <div className="text-center mb-16 w-full relative">
          {/* Hero Badge */}
          {/* Enhanced notification badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/25 to-emerald-500/25 border border-cyan-400/40 mb-8 backdrop-blur-sm shadow-lg">
            <span className="w-2 h-2 bg-cyan-300 rounded-full mr-2 animate-pulse shadow-cyan-300/50 shadow-lg"></span>
            <span className="text-cyan-200 text-sm font-medium">Updated with latest AI models</span>
          </div>
          
          {/* Main Title with Enhanced Gradient */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 pt-8 font-rethink">
            <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-purple-300 bg-clip-text text-transparent animate-pulse drop-shadow-lg">
              LLM Models
            </span>
            <br />
            <span className="text-white drop-shadow-lg">Explorer</span>
          </h1>
          
          {/* Subtitle with enhanced contrast */}
          <p className="text-gray-200 text-lg md:text-xl pt-4 font-rethink max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Discover and explore the world's most advanced language models with our comprehensive database
          </p>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button 
              onClick={() => scrollToSection('featured-models')}
              className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-200 backdrop-blur-sm border border-cyan-400/20"
            >
              Explore Models
            </button>
            <button
              onClick={() => scrollToSection('compare-models')}
              className="px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-300 rounded-xl font-semibold text-lg hover:bg-cyan-500 hover:text-white transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-cyan-400/30"
            >
              Compare Models
            </button>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="w-full flex justify-center mb-16 px-4">
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search models, features, or capabilities..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-800/80 backdrop-blur-sm text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        

        <div id="featured-models" className="mb-16 w-full px-4 relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white font-rethink drop-shadow-lg">Featured Models</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full shadow-lg shadow-cyan-400/20"></div>
              <p className="text-gray-300 mt-2 drop-shadow-md">Discover the most advanced AI models</p>
            </div>
          </div>
          
          {loadingModels ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-semibold font-rethink">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-6 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-2 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-2 bg-gray-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : modelsError ? (
            <div className="col-span-full text-center text-red-400 py-8">
              <div className="text-2xl font-bold mb-2">⚠️ Error Loading Models</div>
              <div className="mb-2">{modelsError}</div>
              <button
                onClick={() => window.location.reload()}
                className="inline-block mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-semibold font-rethink">
                {filteredModels.length > 0 ? (
                  filteredModels.map((model) => (
                    <ModelCard key={model.id} model={model} />
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400 py-8">
                    <div className="text-2xl font-bold text-green-400 mb-2">Oops! We can't find your search.</div>
                    <div className="mb-2">You can drop us what you are looking for and we'll update it soon.</div>
                    <a
                      href="mailto:balajinbtt@gmail.com"
                      className="inline-block mt-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                    >
                      Contact Us
                    </a>
                  </div>
                )}
              </div>
              
              {/* Load More Button - only show when there are more models and no search filter */}
              {!search && hasMoreModels && filteredModels.length > 0 && (
                <div className="flex flex-col items-center mt-12 space-y-4">
                  <div className="text-center text-gray-400 text-sm">
                    Showing {models.length} of {totalModels} models
                  </div>
                  <button
                    onClick={loadMoreModels}
                    disabled={loadingMoreModels}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-200 backdrop-blur-sm border border-green-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loadingMoreModels ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Loading More Models...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Load More Models
                      </>
                    )}
                  </button>
                  {loadingMoreModels && (
                    <div className="text-gray-500 text-sm animate-pulse">
                      🤖 Fetching more amazing AI models for you...
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div id="categories" className="mb-16 w-full px-4 font-rethink relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white font-rethink drop-shadow-lg">Explore by Category</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full shadow-lg shadow-emerald-400/20"></div>
              <p className="text-gray-300 mt-2 drop-shadow-md">Find models organized by their specialization</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 font-rethink">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Latest AI Inventions Section */}
        <div id="ai-inventions" className="mb-16 w-full px-4 font-rethink relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white font-rethink">Latest AI Inventions</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-2">Stay updated with cutting-edge AI developments</p>
            </div>
          </div>
          {loadingNews ? (
            <div className="text-white-400">Loading latest AI news...</div>
          ) : aiSummaries.length > 0 ? (
            <Slider {...sliderSettings}>
              {splitNewsRows(aiSummaries).map((row, idx) => (
                <div key={idx}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                    {row.map(summary => (
                      <div
                        key={summary.id}
                        className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700 flex flex-col justify-between hover:shadow-2xl hover:border-green-500/50 hover:scale-105 transition-all duration-300 group"
                      >
                        {summary.image && (
                          <div className="relative overflow-hidden rounded-xl mb-4">
                            <img
                              src={summary.image}
                              alt={summary.title}
                              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                              style={{ background: "#222" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors">{summary.title}</h3>
                          <p className="text-gray-300 mb-4 line-clamp-4 leading-relaxed">{summary.summary}</p>
                        </div>
                        <a
                          href={summary.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center mt-auto text-green-400 font-medium hover:text-green-300 transition-colors group"
                        >
                          Read more
                          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="text-gray-400">No news found.</div>
          )}
        </div>

        <div id="terminology" className="mb-16 w-full px-4 font-rethink relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white font-rethink">
                AI Terminology Explained
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto md:mx-0 rounded-full"></div>
              <p className="text-gray-400 mt-2">Understanding the language of AI</p>
            </div>
            <Link
              to="/terminology"
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-green-500/25 hover:scale-105 transition-all duration-200"
            >
              Explore More
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {terminology.slice(0, 4).map(term => (
              <div
                key={term.id}
                className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700 flex flex-col hover:shadow-2xl hover:border-green-500/50 hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={term.image}
                    alt={term.term}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "#222" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{term.term}</h3>
                <p className="text-gray-300 mb-4 flex-1 leading-relaxed">{term.description}</p>
                <a
                  href={term.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-400 font-medium hover:text-green-300 transition-colors group"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div id="compare-models" className="mb-16 relative z-10">
          <CompareModels />
        </div>
        
        <div className="mb-12 w-full px-4">
          {/* Empty div for spacing */}
        </div>
        {/* Enhanced Subscribe Section */}
        <div className="w-full flex flex-col items-center">
          <div className="relative flex flex-col items-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-purple-300 text-sm font-medium">Join our community</span>
            </div>
            <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text mb-2 tracking-tight drop-shadow-lg font-rethink">
              Subscribe for LLM Updates!
            </span>
            <p className="text-gray-400 text-center max-w-2xl">
              Get the latest LLM news, model releases, and breakthrough discoveries delivered weekly
            </p>
          </div>
          <div className="w-full max-w-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700 p-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            {subscribed ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Welcome aboard! 🚀</h3>
                <p className="text-green-400 text-lg">Thank you for subscribing to our newsletter!</p>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center space-y-6">
                  <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-600 bg-gray-800/80 backdrop-blur-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 text-lg"
                      />
                    </div>
                    <button
                      className="relative group px-8 py-4 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 overflow-hidden"
                      onClick={handleSubscribe}
                    >
                      <span>🚀</span>
                      <span>Subscribe</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  {subscribeError && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-center backdrop-blur-sm">
                      {subscribeError}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {/* Thank you message */}
        {/* <div className="w-full flex justify-center mb-8">
          <span className="text-xl md:text-2xl font-bold text-green-300 font-handwritten text-center">
            {"Thank you for visiting the website! 🚀"}
          </span>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
