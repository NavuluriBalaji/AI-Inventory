import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Cpu, AlertCircle, Server, Compass } from 'lucide-react';
import { models } from '../data/models';

const ModelDetail: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const model = models.find((m) => m.id === modelId);

  if (!model) {
    return <div>Model not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 font-rethink">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Link
          to={`/category/${model.category}`}
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Category
        </Link>

        <div className="glass-card rounded-xl overflow-hidden">
          <img
            src={model.imageUrl}
            alt={model.name}
            className="w-full h-64 object-cover opacity-80"
          />
          <div className="p-8">
            <h1 className="text-4xl font-bold text-white mb-4">{model.name}</h1>
            <p className="text-xl text-blue-200/80 mb-6">{model.description}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <Cpu className="w-6 h-6 mr-2 text-blue-400" />
                  Features
                </h2>
                <ul className="space-y-2">
                  {model.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-blue-200/80"
                    >
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {model.metrics && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Performance Metrics</h2>
                  <div className="space-y-4">
                    {model.metrics.accuracy && (
                      <div className="glass-card p-4 rounded-lg">
                        <p className="text-blue-200/80">Accuracy</p>
                        <p className="text-2xl font-semibold text-blue-400">
                          {(model.metrics.accuracy * 100).toFixed(1)}%
                        </p>
                      </div>
                    )}
                    {model.metrics.f1Score && (
                      <div className="glass-card p-4 rounded-lg">
                        <p className="text-blue-200/80">F1 Score</p>
                        <p className="text-2xl font-semibold text-blue-400">
                          {(model.metrics.f1Score * 100).toFixed(1)}%
                        </p>
                      </div>
                    )}
                    {model.metrics.latency && (
                      <div className="glass-card p-4 rounded-lg">
                        <p className="text-blue-200/80">Latency</p>
                        <p className="text-2xl font-semibold text-blue-400">
                          {model.metrics.latency}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Server className="w-6 h-6 mr-2 text-blue-400" />
                Training Parameters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Architecture</h3>
                  <p className="text-blue-200/80">{model.trainingParameters.architecture}</p>
                </div>
                <div className="glass-card p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Model Size</h3>
                  <p className="text-blue-200/80">
                    {model.trainingParameters.parameters}<br />
                    ({model.trainingParameters.modelSize})
                  </p>
                </div>
                <div className="glass-card p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Training Data</h3>
                  <ul className="space-y-1">
                    {model.trainingParameters.trainingData.map((data, index) => (
                      <li key={index} className="text-blue-200/80">• {data}</li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Training Details</h3>
                  <p className="text-blue-200/80">
                    Tokens: {model.trainingParameters.trainingTokens}<br />
                    Context: {model.trainingParameters.contextWindow}<br />
                    Time: {model.trainingParameters.trainingTime}<br />
                    Compute: {model.trainingParameters.computeUsed}
                  </p>
                </div>
                <div className="glass-card p-4 rounded-lg col-span-2">
                  <h3 className="text-white font-semibold mb-2">Optimizations</h3>
                  <div className="flex flex-wrap gap-2">
                    {model.trainingParameters.optimizations.map((opt, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-blue-400" />
                Limitations & Requirements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2">Limitations</h3>
                  <ul className="space-y-2">
                    {model.limitations.map((limitation, index) => (
                      <li
                        key={index}
                        className="flex items-center text-blue-200/80"
                      >
                        <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Requirements</h3>
                  <div className="space-y-2 text-blue-200/80">
                    <p>Pricing: {model.requirements.pricing}</p>
                    <p>API Key Required: {model.requirements.apiKey ? 'Yes' : 'No'}</p>
                    <p>Authentication: {model.requirements.authentication ? 'Yes' : 'No'}</p>
                    <p>Hardware: {model.requirements.hardware}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Compass className="w-6 h-6 mr-2 text-blue-400" />
                Alternative Models
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {model.alternatives.map((alt, index) => (
                  <div key={index} className="glass-card p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">{alt.name}</h3>
                    <p className="text-blue-200/80">{alt.comparison}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={model.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center px-6 py-3 glass-card text-blue-400 rounded-lg hover:bg-white/15 transition-all"
              >
                Documentation <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a
                href={model.testUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
              >
                Test It Now <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;