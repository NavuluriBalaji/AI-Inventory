import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, Users, Calendar, Cpu, Code, BookOpen, Zap, Globe, Shield, Info, Lightbulb, AlertCircle, CheckCircle, XCircle, Target, TrendingUp, Eye, DollarSign, Clock, HardDrive, Database, Brain, Sparkles, Loader, Bot } from 'lucide-react';
import { modelApi } from '../services/api';
import SEO from '../components/SEO';
import Footer from '../components/footer';
import AnimatedBackground from '../components/AnimatedBackground';

// Simple Loading Component
const SimpleLoadingScreen: React.FC<{ modelId: string }> = ({ modelId }) => {
  return (
    <div className="min-h-screen bg-black text-white font-rethink">
      <AnimatedBackground />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Animated loading icon */}
          <div className="relative mb-8">
            <Bot className="w-16 h-16 mx-auto text-green-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-spin"></div>
          </div>
          
          {/* Loading text */}
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Loading Model Details
          </h2>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-gray-400">Fetching enhanced AI model data</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">Model ID: {modelId}</p>
        </div>
      </div>
    </div>
  );
};

// Educational tooltip component
const Tooltip: React.FC<{ title: string; children: React.ReactNode; content: string }> = ({ title, children, content }) => (
  <div className="relative group inline-block">
    {children}
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 max-w-xs text-center">
      <div className="font-medium mb-1">{title}</div>
      <div className="text-xs text-gray-300">{content}</div>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
    </div>
  </div>
);

// Educational links component
const LearnMoreLinks: React.FC = () => (
  <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 mb-8">
    <h3 className="text-xl font-bold mb-4 flex items-center text-blue-400">
      <BookOpen className="w-5 h-5 mr-2" />
      🎓 New to AI? Learn the Basics
    </h3>
    <div className="grid md:grid-cols-2 gap-4">
      <a 
        href="https://www.youtube.com/watch?v=aircAruvnKk" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
      >
        <ExternalLink className="w-4 h-4 mr-2 text-blue-400" />
        <div>
          <div className="font-medium">What is a Neural Network?</div>
          <div className="text-sm text-gray-400">3Blue1Brown - Visual explanation</div>
        </div>
      </a>
      <a 
        href="https://www.ibm.com/topics/large-language-models" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
      >
        <ExternalLink className="w-4 h-4 mr-2 text-blue-400" />
        <div>
          <div className="font-medium">Large Language Models</div>
          <div className="text-sm text-gray-400">IBM - Complete guide</div>
        </div>
      </a>
      <a 
        href="https://huggingface.co/learn" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
      >
        <ExternalLink className="w-4 h-4 mr-2 text-blue-400" />
        <div>
          <div className="font-medium">Hugging Face Course</div>
          <div className="text-sm text-gray-400">Free NLP/AI course</div>
        </div>
      </a>
      <a 
        href="/terminology" 
        className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
      >
        <BookOpen className="w-4 h-4 mr-2 text-green-400" />
        <div>
          <div className="font-medium">AI Terminology</div>
          <div className="text-sm text-gray-400">Our glossary of AI terms</div>
        </div>
      </a>
    </div>
  </div>
);

const ModelDetail: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadModelDetails = async () => {
      console.log('🔍 ModelDetail: Starting to load model details');
      console.log('📋 ModelDetail: Model ID from params:', modelId);
      
      if (!modelId) {
        console.error('❌ ModelDetail: No model ID provided');
        setError('No model ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        console.log('🌐 ModelDetail: Calling API for detailed model data...');
        
        const response = await modelApi.getDetailed(modelId);
        console.log('📦 ModelDetail: API response received:', response);
        
        // Check if we have a model in the response, regardless of success flag
        if (response && (response.model || response.data)) {
          const modelData = response.model || response.data || response;
          console.log('✅ ModelDetail: Successfully loaded model:', modelData);
          setModel(modelData);
        } else if (response && response.success === false) {
          console.error('❌ ModelDetail: API response indicates failure:', response);
          setError(response.message || 'Model not found');
        } else {
          // If we get any response with data, try to use it
          console.log('🔄 ModelDetail: Trying to use response as model data:', response);
          setModel(response);
        }
      } catch (err) {
        console.error('💥 ModelDetail: Error loading model details:', err);
        setError('Failed to load model details');
      } finally {
        setLoading(false);
        console.log('🏁 ModelDetail: Loading complete');
      }
    };

    loadModelDetails();
  }, [modelId]);

  if (loading) {
    return <SimpleLoadingScreen modelId={modelId || 'unknown'} />;
  }

  if (error || !model) {
    return (
      <div className="min-h-screen bg-black text-white font-rethink">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-2xl mx-auto px-4">
            <div className="text-6xl mb-4">🤖</div>
            <h1 className="text-3xl font-bold mb-4 text-red-400">Model Not Found</h1>
            <p className="text-gray-400 mb-4">
              {error || 'The requested model could not be found.'}
            </p>
            <div className="bg-gray-900 p-4 rounded-lg mb-8 text-left">
              <h3 className="text-green-400 mb-2">Debug Information:</h3>
              <p className="text-sm text-gray-300">Model ID: {modelId}</p>
              <p className="text-sm text-gray-300">Error: {error || 'No error, but model is null/undefined'}</p>
              <p className="text-sm text-gray-300">Model data type: {typeof model}</p>
              <p className="text-sm text-gray-300">Model value: {JSON.stringify(model, null, 2)}</p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": model.name,
    "description": model.description,
    "applicationCategory": "AI Model",
    "operatingSystem": "Cross-platform",
    "author": {
      "@type": "Organization",
      "name": model.provider || model.organization
    },
    "url": model.documentationUrl || model.url
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-rethink">
      <SEO
        title={`${model.name} - AI Model Details | AI Inventory`}
        description={model.description}
        keywords={`${model.name}, AI model, ${model.category}, ${model.features?.join(', ') || ''}`}
        url={window.location.href}
        jsonLd={jsonLd}
      />
      
      <AnimatedBackground />
      
      <div className="relative z-10 pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header with Back Button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-green-400 hover:text-green-300 mb-6 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Models
            </Link>
            
            {/* Hero Section */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {model.name}
                  </h1>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    {model.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg border border-green-500/30 text-sm font-medium">
                      {model.category}
                    </span>
                    {model.provider && (
                      <span className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30 text-sm font-medium">
                        {model.provider}
                      </span>
                    )}
                    {model.trainingParameters?.parameters && (
                      <span className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg border border-purple-500/30 text-sm font-medium">
                        {model.trainingParameters.parameters}
                      </span>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    {(model.documentationUrl || model.url) && (
                      <a
                        href={model.documentationUrl || model.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 group"
                      >
                        <ExternalLink className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                        Visit Documentation
                      </a>
                    )}
                    {model.testUrl && (
                      <a
                        href={model.testUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        Try Model
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Info Sidebar */}
                <div className="lg:w-80">
                  <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-600">
                    <h3 className="text-lg font-semibold mb-4 text-green-400 flex items-center">
                      <Cpu className="w-5 h-5 mr-2" />
                      Model Info
                    </h3>
                    <div className="space-y-4">
                      {model.provider && (
                        <div className="flex items-start">
                          <Users className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-400">Provider</div>
                            <div className="text-gray-300">{model.provider}</div>
                          </div>
                        </div>
                      )}
                      
                      {model.requirements?.pricing && (
                        <div className="flex items-start">
                          <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-400">Pricing</div>
                            <div className="text-gray-300">{model.requirements.pricing}</div>
                          </div>
                        </div>
                      )}
                      
                      {model.trainingParameters?.contextWindow && (
                        <div className="flex items-start">
                          <Globe className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-400">Context Window</div>
                            <div className="text-gray-300">{model.trainingParameters.contextWindow}</div>
                          </div>
                        </div>
                      )}
                      
                      {model.requirements?.apiKey && (
                        <div className="flex items-start">
                          <Shield className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-400">API Key Required</div>
                            <div className="text-green-400">Yes</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Section for Beginners */}
          <LearnMoreLinks />

          {/* Features Section */}
          {model.features && model.features.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center">
                  <Star className="w-7 h-7 mr-3 text-yellow-400" />
                  Key Features
                </h2>
                <Tooltip 
                  title="What are Model Features?" 
                  content="Features are the specific capabilities and functionalities that an AI model can perform, like understanding text, generating images, or processing multiple languages."
                >
                  <Info className="w-5 h-5 ml-2 text-blue-400 cursor-help" />
                </Tooltip>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {model.features.map((feature: string, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-green-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-green-500/10"
                  >
                    <span className="text-green-400 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Details */}
          {model.trainingParameters && (
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center">
                  <BookOpen className="w-7 h-7 mr-3 text-purple-400" />
                  Technical Specifications
                </h2>
                <Tooltip 
                  title="Technical Specifications" 
                  content="These are the technical details about how the AI model was built, including its architecture, size, and training parameters. Think of it like the 'specs' of a computer."
                >
                  <Info className="w-5 h-5 ml-2 text-blue-400 cursor-help" />
                </Tooltip>
              </div>
              
              {/* Beginner-friendly explanation */}
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-4 mb-6 border border-purple-500/30">
                <div className="flex items-start">
                  <Lightbulb className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-400 mb-2">💡 For Beginners</h4>
                    <p className="text-sm text-gray-300">
                      These technical details tell you how the AI model was built. Think of it like reading the specifications of a car - 
                      the engine size, horsepower, etc. Here you'll see the AI's "brain size" (parameters), what type of "engine" it uses (architecture), 
                      and how much "training" it received.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {model.trainingParameters.architecture && (
                  <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center mb-3">
                      <h3 className="font-semibold text-purple-400 flex items-center">
                        <Code className="w-5 h-5 mr-2" />
                        Architecture
                      </h3>
                      <Tooltip 
                        title="Model Architecture" 
                        content="The architecture is like the AI's brain design - how the artificial neurons are connected. Popular types include Transformer (great for language), CNN (good for images), and RNN (good for sequences)."
                      >
                        <Info className="w-4 h-4 ml-2 text-blue-400 cursor-help" />
                      </Tooltip>
                    </div>
                    <p className="text-gray-300">{model.trainingParameters.architecture}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      The blueprint that defines how the AI processes information
                    </p>
                  </div>
                )}
                
                {model.trainingParameters.modelSize && (
                  <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center mb-3">
                      <h3 className="font-semibold text-purple-400 flex items-center">
                        <HardDrive className="w-5 h-5 mr-2" />
                        Model Size
                      </h3>
                      <Tooltip 
                        title="Model Size" 
                        content="This tells you how much storage space the AI model takes up, usually measured in GB (gigabytes) or by the number of parameters (like 7B = 7 billion parameters). Bigger usually means more capable but requires more powerful computers."
                      >
                        <Info className="w-4 h-4 ml-2 text-blue-400 cursor-help" />
                      </Tooltip>
                    </div>
                    <p className="text-gray-300">{model.trainingParameters.modelSize}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      How much space the AI model takes up on a computer
                    </p>
                  </div>
                )}
                
                {model.trainingParameters.trainingTokens && (
                  <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center mb-3">
                      <h3 className="font-semibold text-purple-400 flex items-center">
                        <Database className="w-5 h-5 mr-2" />
                        Training Tokens
                      </h3>
                      <Tooltip 
                        title="Training Tokens" 
                        content="Tokens are like 'words' that the AI learned from. This number shows how much text the AI studied during training. More tokens usually means the AI learned from more diverse content."
                      >
                        <Info className="w-4 h-4 ml-2 text-blue-400 cursor-help" />
                      </Tooltip>
                    </div>
                    <p className="text-gray-300">{model.trainingParameters.trainingTokens}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Amount of text data used to train the AI
                    </p>
                  </div>
                )}
                
                {model.trainingParameters.computeUsed && (
                  <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                    <h3 className="font-semibold text-purple-400 mb-3">Compute Used</h3>
                    <p className="text-gray-300">{model.trainingParameters.computeUsed}</p>
                  </div>
                )}
              </div>
              
              {/* Performance Metrics */}
              {model.metrics && (
                <div className="mt-6 bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center mb-4">
                    <h3 className="font-semibold text-purple-400 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Performance Metrics
                    </h3>
                    <Tooltip 
                      title="Performance Metrics" 
                      content="These numbers show how well the AI performs on standardized tests. Think of them like test scores - higher numbers usually mean better performance."
                    >
                      <Info className="w-4 h-4 ml-2 text-blue-400 cursor-help" />
                    </Tooltip>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {model.metrics.accuracy && (
                      <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-3xl font-bold text-green-400">{model.metrics.accuracy}%</div>
                        <div className="text-sm text-gray-400 mt-1">Accuracy</div>
                        <div className="text-xs text-gray-500 mt-1">How often it gets the right answer</div>
                      </div>
                    )}
                    {model.metrics.f1Score && (
                      <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-400">{model.metrics.f1Score}</div>
                        <div className="text-sm text-gray-400 mt-1">F1 Score</div>
                        <div className="text-xs text-gray-500 mt-1">Balance of precision and recall</div>
                      </div>
                    )}
                    {model.metrics.latency && (
                      <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-3xl font-bold text-yellow-400">{model.metrics.latency}</div>
                        <div className="text-sm text-gray-400 mt-1">Latency</div>
                        <div className="text-xs text-gray-500 mt-1">How fast it responds</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Requirements Section */}
          {model.requirements && (
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center">
                  <Shield className="w-7 h-7 mr-3 text-red-400" />
                  Requirements & Costs
                </h2>
                <Tooltip 
                  title="Requirements & Costs" 
                  content="These are the things you need to use this AI model - like whether you need an API key, how much it costs, and what kind of computer you need."
                >
                  <Info className="w-5 h-5 ml-2 text-blue-400 cursor-help" />
                </Tooltip>
              </div>
              
              {/* Beginner explanation */}
              <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg p-4 mb-6 border border-red-500/30">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-orange-400 mb-2">🚨 Before You Start</h4>
                    <p className="text-sm text-gray-300">
                      Check these requirements first! Some AI models are free to use, others require payment. 
                      Some need powerful computers, others can run on your phone. This section tells you exactly what you need.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {model.requirements.pricing && (
                  <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center mb-3">
                      <h3 className="font-semibold text-red-400 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Pricing
                      </h3>
                      <Tooltip 
                        title="Pricing Model" 
                        content="This tells you how much it costs to use the AI. 'Free' means no cost, 'API costs' means you pay per use, and specific prices show monthly or per-use costs."
                      >
                        <Info className="w-4 h-4 ml-2 text-blue-400 cursor-help" />
                      </Tooltip>
                    </div>
                    <p className="text-gray-300 text-lg font-medium">{model.requirements.pricing}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {model.requirements.pricing.toLowerCase().includes('free') ? 
                        '✅ Great for beginners and experimentation' : 
                        '💰 Consider costs for regular usage'
                      }
                    </p>
                  </div>
                )}

                {model.requirements.apiKey !== undefined && (
                  <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center mb-3">
                      <h3 className="font-semibold text-red-400 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        API Key Required
                      </h3>
                      <Tooltip 
                        title="API Key" 
                        content="An API key is like a password that identifies you to the AI service. If required, you'll need to sign up and get a unique key to use the model."
                      >
                        <Info className="w-4 h-4 ml-2 text-blue-400 cursor-help" />
                      </Tooltip>
                    </div>
                    <div className="flex items-center">
                      {model.requirements.apiKey ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 mr-2" />
                      )}
                      <p className="text-gray-300">{model.requirements.apiKey ? 'Yes' : 'No'}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {model.requirements.apiKey ? 
                        'You need to register and get an API key' : 
                        '✅ No registration required'
                      }
                    </p>
                  </div>
                )}

                {model.requirements.memoryUsage && (
                  <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center mb-3">
                      <h3 className="font-semibold text-red-400 flex items-center">
                        <Cpu className="w-5 h-5 mr-2" />
                        Memory Requirements
                      </h3>
                      <Tooltip 
                        title="Memory Requirements" 
                        content="This is how much RAM (memory) your computer needs to run the model. More memory = bigger, more capable models. 8GB is typical for small models, 32GB+ for large ones."
                      >
                        <Info className="w-4 h-4 ml-2 text-blue-400 cursor-help" />
                      </Tooltip>
                    </div>
                    <p className="text-gray-300">{model.requirements.memoryUsage}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      RAM needed to run this model
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Training Data */}
          {model.trainingParameters?.trainingData && model.trainingParameters.trainingData.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center">
                  <Globe className="w-7 h-7 mr-3 text-blue-400" />
                  Training Data
                </h2>
                <Tooltip 
                  title="Training Data" 
                  content="This shows what kinds of information the AI learned from. Think of it like the 'textbooks' the AI studied - websites, books, conversations, etc."
                >
                  <Info className="w-5 h-5 ml-2 text-blue-400 cursor-help" />
                </Tooltip>
              </div>
              
              {/* Educational explanation */}
              <div className="bg-gradient-to-r from-blue-900/20 to-teal-900/20 rounded-lg p-4 mb-6 border border-blue-500/30">
                <div className="flex items-start">
                  <BookOpen className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">📚 What is Training Data?</h4>
                    <p className="text-sm text-gray-300">
                      Training data is like the "education" an AI model receives. Just like how you learned to speak by listening to people, 
                      AI models learn by reading massive amounts of text from books, websites, and other sources. 
                      The quality and variety of training data directly affects how smart and useful the AI becomes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {model.trainingParameters.trainingData.map((data: string, index: number) => (
                    <div key={index} className="flex items-start p-3 bg-gray-800/50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="text-gray-300">{data}</span>
                        <div className="text-xs text-gray-500 mt-1">
                          {data.toLowerCase().includes('web') && 'Content from websites and online sources'}
                          {data.toLowerCase().includes('book') && 'Published books and literature'}
                          {data.toLowerCase().includes('wikipedia') && 'Encyclopedia articles and factual content'}
                          {data.toLowerCase().includes('code') && 'Programming code and technical documentation'}
                          {data.toLowerCase().includes('conversation') && 'Dialogue and conversational patterns'}
                          {data.toLowerCase().includes('academic') && 'Research papers and scholarly articles'}
                          {(!data.toLowerCase().includes('web') && !data.toLowerCase().includes('book') && 
                            !data.toLowerCase().includes('wikipedia') && !data.toLowerCase().includes('code') && 
                            !data.toLowerCase().includes('conversation') && !data.toLowerCase().includes('academic')) && 
                            'Specialized training dataset'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Limitations */}
          {model.limitations && model.limitations.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
                <Shield className="w-7 h-7 mr-3 text-red-400" />
                Limitations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {model.limitations.map((limitation: string, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-4 border border-gray-700 border-l-4 border-l-red-400"
                  >
                    <span className="text-red-400 font-medium">{limitation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps for Beginners */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/30">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-green-400">
                <Target className="w-7 h-7 mr-3" />
                🚀 Ready to Try This Model?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-300">For Beginners:</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      Start with our <Link to="/terminology" className="text-blue-400 hover:underline">AI Terminology Guide</Link>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      Watch the educational videos linked above
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      {model.requirements?.pricing?.toLowerCase().includes('free') ? 
                        'This model is free - perfect for learning!' : 
                        'Consider starting with free models first'
                      }
                    </li>
                    {model.testUrl && (
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        Try the model using the "Try Model" button above
                      </li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-300">For Developers:</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {(model.documentationUrl || model.url) && (
                      <li className="flex items-start">
                        <Code className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                        Read the official documentation
                      </li>
                    )}
                    {model.requirements?.apiKey && (
                      <li className="flex items-start">
                        <Shield className="w-4 h-4 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                        Sign up and get your API key
                      </li>
                    )}
                    <li className="flex items-start">
                      <Cpu className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                      Check system requirements: {model.requirements?.memoryUsage || 'See documentation'}
                    </li>
                    <li className="flex items-start">
                      <DollarSign className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                      Review pricing: {model.requirements?.pricing || 'Check official pricing'}
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-medium text-blue-400 mb-2 flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  💡 Pro Tip for Beginners
                </h4>
                <p className="text-sm text-gray-300">
                  Start by experimenting with the model through its web interface or demo before diving into coding. 
                  This helps you understand what the AI can do before you integrate it into your projects. 
                  Remember: every expert was once a beginner!
                </p>
              </div>
            </div>
          </div>

          {/* Related Models */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Related Models</h2>
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-700 text-center">
              <p className="text-gray-400">
                Explore similar models in the{' '}
                <Link
                  to={`/category/${model.category}`}
                  className="text-green-400 hover:text-green-300 underline transition-colors"
                >
                  {model.category}
                </Link>{' '}
                category
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ModelDetail;
