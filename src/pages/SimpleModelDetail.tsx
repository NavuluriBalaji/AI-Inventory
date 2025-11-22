import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Star, Users, Cpu, BookOpen, 
  Zap, Globe, Shield, AlertCircle, CheckCircle, 
  TrendingUp, DollarSign, Database, Bot, Sparkles,
  Share2, Bookmark
} from 'lucide-react';
import { modelApi } from '../services/api';
import SEO from '../components/SEO';
import AnimatedBackground from '../components/AnimatedBackground';

// Loading Component
const LoadingScreen: React.FC<{ modelId: string }> = ({ modelId }) => (
  <div className="min-h-screen bg-deep text-white font-rethink flex flex-col items-center justify-center relative overflow-hidden">
    <AnimatedBackground />
    <div className="relative z-10 flex flex-col items-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse-glow"></div>
        <Bot className="w-20 h-20 text-cyan-400 animate-float relative z-10" />
      </div>
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 mb-4 font-outfit">
        Initializing Neural Link...
      </h2>
      <p className="text-gray-400 animate-pulse">Fetching data for model: {modelId}</p>
    </div>
  </div>
);

// Error Component
const ErrorScreen: React.FC<{ error: string }> = ({ error }) => (
  <div className="min-h-screen bg-deep text-white font-rethink flex flex-col items-center justify-center relative overflow-hidden">
    <AnimatedBackground />
    <div className="relative z-10 max-w-lg text-center px-6">
      <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
        <AlertCircle className="w-12 h-12 text-red-400" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-4 font-outfit">Connection Failed</h1>
      <p className="text-gray-400 mb-8 text-lg">{error || 'The requested model could not be found in our neural database.'}</p>
      <Link
        to="/"
        className="inline-flex items-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Return to Explorer
      </Link>
    </div>
  </div>
);

const SimpleModelDetail: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadModelDetails = async () => {
      if (!modelId) return;
      try {
        setLoading(true);
        const response = await modelApi.getDetailed(modelId);
        if (response && (response.model || response.data)) {
          setModel(response.model || response.data || response);
        } else if (response && response.success === false) {
          setError(response.message || 'Model not found');
        } else {
          setModel(response);
        }
      } catch (err) {
        setError('Failed to load model details');
      } finally {
        setLoading(false);
      }
    };
    loadModelDetails();
  }, [modelId]);

  if (loading) return <LoadingScreen modelId={modelId || 'unknown'} />;
  if (error || !model) return <ErrorScreen error={error} />;

  return (
    <div className="min-h-screen bg-deep text-gray-100 font-rethink selection:bg-cyan-500/30">
      <SEO
        title={`${model.name} - AI Model Details`}
        description={model.description}
        keywords={`${model.name}, AI model, ${model.category}`}
        url={window.location.href}
      />
      
      <AnimatedBackground />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-deep/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Explorer</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-cyan-400">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-violet-400">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 container mx-auto px-6 max-w-7xl">
        {/* Hero Section */}
        <div className="relative mb-20">
          <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-gradient-to-b from-cyan-500/10 to-violet-500/10 blur-3xl rounded-full opacity-50 animate-pulse-glow" />
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1 space-y-6 md:space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
                    {model.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {model.provider}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 leading-tight">
                  {model.name}
                </h1>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
                  {model.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {model.testUrl && (
                  <a
                    href={model.testUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center group w-full sm:w-auto"
                  >
                    <Zap className="w-5 h-5 mr-2 group-hover:text-yellow-300 transition-colors" />
                    Try Model Now
                  </a>
                )}
                {(model.documentationUrl || model.url) && (
                  <a
                    href={model.documentationUrl || model.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center justify-center w-full sm:w-auto"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Documentation
                  </a>
                )}
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="w-full lg:w-96 glass-card rounded-3xl p-8 space-y-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
                Model Intelligence
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center text-gray-400">
                    <Database className="w-5 h-5 mr-3 text-cyan-400" />
                    <span>Parameters</span>
                  </div>
                  <span className="font-mono font-bold text-white">
                    {model.trainingParameters?.parameters || 'Unknown'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center text-gray-400">
                    <Globe className="w-5 h-5 mr-3 text-violet-400" />
                    <span>Context Window</span>
                  </div>
                  <span className="font-mono font-bold text-white">
                    {model.trainingParameters?.contextWindow || 'Unknown'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center text-gray-400">
                    <DollarSign className="w-5 h-5 mr-3 text-emerald-400" />
                    <span>Pricing</span>
                  </div>
                  <span className="font-mono font-bold text-white">
                    {model.requirements?.pricing || 'Variable'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Features Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Features */}
            <section className="glass-panel rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center font-outfit">
                <Star className="w-6 h-6 mr-3 text-yellow-400" />
                Capabilities & Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {model.features?.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start p-4 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors group">
                    <CheckCircle className="w-5 h-5 text-cyan-500 mr-3 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Specs */}
            <section className="glass-panel rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center font-outfit">
                <Cpu className="w-6 h-6 mr-3 text-violet-400" />
                Technical Architecture
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Architecture Type</h3>
                  <p className="text-lg text-white font-medium">{model.trainingParameters?.architecture || 'Not specified'}</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Training Tokens</h3>
                  <p className="text-lg text-white font-medium">{model.trainingParameters?.trainingTokens || 'Not specified'}</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Model Size</h3>
                  <p className="text-lg text-white font-medium">{model.trainingParameters?.modelSize || 'Not specified'}</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Training Data</h3>
                  <div className="flex flex-wrap gap-2">
                    {model.trainingParameters?.trainingData?.map((data: string, i: number) => (
                      <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded-md text-gray-300">{data}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Requirements */}
            <section className="glass-panel rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center font-outfit">
                <Shield className="w-5 h-5 mr-3 text-emerald-400" />
                Requirements
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">API Key</span>
                  <span className={`px-2 py-1 rounded-md font-medium ${model.requirements?.apiKey ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                    {model.requirements?.apiKey ? 'Required' : 'Not Required'}
                  </span>
                </li>
                <li className="space-y-1">
                  <span className="text-gray-400 text-sm block">Memory</span>
                  <span className="text-white font-medium block">{model.requirements?.memoryUsage || 'Varies'}</span>
                </li>
              </ul>
            </section>

            {/* Limitations */}
            {model.limitations && (
              <section className="glass-panel rounded-3xl p-8 border-l-4 border-l-red-500/50">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center font-outfit">
                  <AlertCircle className="w-5 h-5 mr-3 text-red-400" />
                  Limitations
                </h2>
                <ul className="space-y-3">
                  {model.limitations.map((limit: string, i: number) => (
                    <li key={i} className="flex items-start text-sm text-gray-400">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                      {limit}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Performance */}
            {model.metrics && (
              <section className="glass-panel rounded-3xl p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center font-outfit">
                  <TrendingUp className="w-5 h-5 mr-3 text-blue-400" />
                  Performance
                </h2>
                <div className="space-y-4">
                  {Object.entries(model.metrics).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-white font-mono">{String(value)}</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" 
                          style={{ width: typeof value === 'number' && value <= 100 ? `${value}%` : '100%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SimpleModelDetail;
