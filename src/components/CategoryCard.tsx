import React, { useState, useEffect } from 'react';
import { Model } from '../types/model';
import { Scale, Search, X, Zap, DollarSign, Cpu, Clock, Users, ExternalLink } from 'lucide-react';
import { modelApi } from '../services/api';

const CompareModels: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [model1, setModel1] = useState<string>('');
  const [model2, setModel2] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const selectedModel1 = models.find(m => m.id === model1);
  const selectedModel2 = models.find(m => m.id === model2);

  // Load models from API
  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await modelApi.getAll({ limit: 1000 });
        if (response && response.models) {
          setModels(response.models);
        } else {
          setModels([]);
        }
      } catch (err) {
        console.error('Error loading models:', err);
        setError('Failed to load models. Please try again later.');
        setModels([]);
      } finally {
        setLoading(false);
      }
    };

    loadModels();
  }, []);

  // Filter models based on search term
  const filteredModels = models.filter(model => 
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Clear selections
  const clearSelections = () => {
    setModel1('');
    setModel2('');
  };

  // Mobile-friendly card comparison
  const renderMobileComparison = (m1: Model, m2: Model) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Comparison</h3>
        <button
          onClick={clearSelections}
          className="p-2 text-blue-400 hover:text-white transition-colors"
          aria-label="Clear comparison"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Model 1 */}
      <div className="glass-card p-4 rounded-lg border border-blue-400/20">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-3 h-3 rounded-full bg-blue-400"></span>
          <h4 className="text-xl font-semibold text-white">{m1.name}</h4>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-400 font-medium">Provider</span>
            <p className="text-blue-200/80">{m1.provider}</p>
          </div>
          <div>
            <span className="text-blue-400 font-medium">Category</span>
            <p className="text-blue-200/80">{m1.category}</p>
          </div>
          <div>
            <span className="text-blue-400 font-medium">Parameters</span>
            <p className="text-blue-200/80">{m1.trainingParameters.parameters}</p>
          </div>
          <div>
            <span className="text-blue-400 font-medium">Context</span>
            <p className="text-blue-200/80">{m1.trainingParameters.contextWindow}</p>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-blue-400 font-medium">Pricing</span>
          <p className="text-blue-200/80">{m1.requirements.pricing}</p>
        </div>
      </div>

      {/* VS Divider */}
      <div className="text-center py-2">
        <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">VS</span>
      </div>

      {/* Model 2 */}
      <div className="glass-card p-4 rounded-lg border border-blue-400/20">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-3 h-3 rounded-full bg-purple-400"></span>
          <h4 className="text-xl font-semibold text-white">{m2.name}</h4>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-400 font-medium">Provider</span>
            <p className="text-blue-200/80">{m2.provider}</p>
          </div>
          <div>
            <span className="text-blue-400 font-medium">Category</span>
            <p className="text-blue-200/80">{m2.category}</p>
          </div>
          <div>
            <span className="text-blue-400 font-medium">Parameters</span>
            <p className="text-blue-200/80">{m2.trainingParameters.parameters}</p>
          </div>
          <div>
            <span className="text-blue-400 font-medium">Context</span>
            <p className="text-blue-200/80">{m2.trainingParameters.contextWindow}</p>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-blue-400 font-medium">Pricing</span>
          <p className="text-blue-200/80">{m2.requirements.pricing}</p>
        </div>
      </div>
    </div>
  );

  // Desktop table comparison
  const renderDesktopComparison = (m1: Model, m2: Model) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-white">Model Comparison</h3>
        <button
          onClick={clearSelections}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
          Clear
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full glass-card rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-900/30">
              <th className="text-left p-4 text-blue-400 font-medium">Feature</th>
              <th className="text-center p-4 text-blue-400 font-medium">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                  {m1.name}
                </div>
              </th>
              <th className="text-center p-4 text-blue-400 font-medium">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-400"></span>
                  {m2.name}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-400/10">
            <tr>
              <td className="p-4 text-blue-400 font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Provider
              </td>
              <td className="p-4 text-center text-blue-200/80">{m1.provider}</td>
              <td className="p-4 text-center text-blue-200/80">{m2.provider}</td>
            </tr>
            <tr>
              <td className="p-4 text-blue-400 font-medium">Category</td>
              <td className="p-4 text-center text-blue-200/80">{m1.category}</td>
              <td className="p-4 text-center text-blue-200/80">{m2.category}</td>
            </tr>
            <tr>
              <td className="p-4 text-blue-400 font-medium flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Parameters
              </td>
              <td className="p-4 text-center text-blue-200/80">{m1.trainingParameters.parameters}</td>
              <td className="p-4 text-center text-blue-200/80">{m2.trainingParameters.parameters}</td>
            </tr>
            <tr>
              <td className="p-4 text-blue-400 font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Context Window
              </td>
              <td className="p-4 text-center text-blue-200/80">{m1.trainingParameters.contextWindow}</td>
              <td className="p-4 text-center text-blue-200/80">{m2.trainingParameters.contextWindow}</td>
            </tr>
            <tr>
              <td className="p-4 text-blue-400 font-medium">Architecture</td>
              <td className="p-4 text-center text-blue-200/80">{m1.trainingParameters.architecture}</td>
              <td className="p-4 text-center text-blue-200/80">{m2.trainingParameters.architecture}</td>
            </tr>
            <tr>
              <td className="p-4 text-blue-400 font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Pricing
              </td>
              <td className="p-4 text-center text-blue-200/80">{m1.requirements.pricing}</td>
              <td className="p-4 text-center text-blue-200/80">{m2.requirements.pricing}</td>
            </tr>
            <tr>
              <td className="p-4 text-blue-400 font-medium">API Key Required</td>
              <td className="p-4 text-center text-blue-200/80">{m1.requirements.apiKey ? 'Yes' : 'No'}</td>
              <td className="p-4 text-center text-blue-200/80">{m2.requirements.apiKey ? 'Yes' : 'No'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Features comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="glass-card p-4 rounded-lg border border-blue-400/20">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-400"></span>
            {m1.name} Features
          </h4>
          <ul className="space-y-2">
            {m1.features.map((feature, index) => (
              <li key={index} className="text-blue-200/80 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-4 rounded-lg border border-blue-400/20">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-400"></span>
            {m2.name} Features
          </h4>
          <ul className="space-y-2">
            {m2.features.map((feature, index) => (
              <li key={index} className="text-blue-200/80 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <a
          href={m1.documentationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          {m1.name} Documentation
        </a>
        <a
          href={m2.documentationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          {m2.name} Documentation
        </a>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="glass-card p-4 sm:p-8 rounded-xl shadow-xl border border-blue-400/20">
        <div className="flex items-center mb-6 sm:mb-8 gap-3">
          <Scale className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Compare Models</h2>
        </div>
      
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-blue-200/80">Loading models...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Search and filters */}
          <div className="mb-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search models by name, provider, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Model selection */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-blue-200/80 text-sm font-medium" htmlFor="model1">
                  First Model
                </label>
              <select
                id="model1"
                value={model1}
                onChange={(e) => setModel1(e.target.value)}
                className="bg-zinc-900 border border-blue-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">Select first model</option>
                {filteredModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} ({model.provider})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-blue-200/80 text-sm font-medium" htmlFor="model2">
                Second Model
              </label>
              <select
                id="model2"
                value={model2}
                onChange={(e) => setModel2(e.target.value)}
                className="bg-zinc-900 border border-blue-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">Select second model</option>
                {filteredModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} ({model.provider})
                  </option>
                ))}
              </select>
            </div>
            </div>
          </div>

          {/* Quick stats */}
          {filteredModels.length > 0 && (
            <div className="mb-6 p-4 bg-blue-900/20 rounded-lg border border-blue-400/20">
              <p className="text-blue-200/80 text-sm">
                <span className="font-medium">{filteredModels.length}</span> models available for comparison
              </p>
            </div>
          )}

          {/* Comparison view */}
          {selectedModel1 && selectedModel2 ? (
            <div className="mt-8">
              {/* Mobile view */}
              <div className="block lg:hidden">
                {renderMobileComparison(selectedModel1, selectedModel2)}
              </div>
              
              {/* Desktop view */}
              <div className="hidden lg:block">
                {renderDesktopComparison(selectedModel1, selectedModel2)}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Scale className="w-16 h-16 text-blue-400/50 mx-auto mb-4" />
              <p className="text-blue-200/80 text-lg mb-2">Select two models to compare</p>
              <p className="text-blue-200/60 text-sm">
                Choose models from the dropdowns above to see a detailed comparison
              </p>
            </div>
          )}

          {/* Popular comparisons suggestions */}
          {!selectedModel1 && !selectedModel2 && filteredModels.length > 0 && (
            <div className="mt-8 max-w-4xl mx-auto">
              <div className="p-4 bg-zinc-900/50 rounded-lg border border-blue-400/10">
                <h3 className="text-lg font-semibold text-white mb-3">Popular Comparisons</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredModels.slice(0, 6).map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      if (!model1) setModel1(model.id);
                      else if (!model2 && model.id !== model1) setModel2(model.id);
                    }}
                    className="text-left p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg border border-blue-400/10 hover:border-blue-400/30 transition-all group"
                  >
                    <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                      {model.name}
                    </div>
                    <div className="text-sm text-blue-200/60">
                      {model.provider} • {model.category}
                    </div>
                  </button>
                ))}
              </div>
              </div>
            </div>
          )}
        </>
      )}
      </div>
    </div>
  );
};

export default CompareModels;
