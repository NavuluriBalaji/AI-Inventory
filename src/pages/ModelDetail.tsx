import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Cpu, Brain, AlertTriangle, Target, Server } from 'lucide-react';
import { models } from '../data/models';

const ModelDetail: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const model = models.find((m) => m.id === modelId);

  if (!model) {
    return <div>Model not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
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
            <p className="text-xl text-blue-200/80 mb-8">{model.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
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
                      <div>
                        <p className="text-blue-200/80">Accuracy</p>
                        <p className="text-2xl font-semibold text-blue-400">
                          {(model.metrics.accuracy * 100).toFixed(1)}%
                        </p>
                      </div>
                    )}
                    {model.metrics.f1Score && (
                      <div>
                        <p className="text-blue-200/80">F1 Score</p>
                        <p className="text-2xl font-semibold text-blue-400">
                          {(model.metrics.f1Score * 100).toFixed(1)}%
                        </p>
                      </div>
                    )}
                    {model.metrics.latency && (
                      <div>
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

            {model.architecture && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Brain className="w-6 h-6 text-blue-400 mr-2" />
                  <h2 className="text-2xl font-semibold text-white">Model Architecture</h2>
                </div>
                <div className="glass-card p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-blue-200/80">Type</p>
                      <p className="text-xl text-white">{model.architecture.type}</p>
                    </div>
                    <div>
                      <p className="text-blue-200/80">Layers</p>
                      <p className="text-xl text-white">{model.architecture.layers}</p>
                    </div>
                    <div>
                      <p className="text-blue-200/80">Parameters</p>
                      <p className="text-xl text-white">{model.architecture.parameters}</p>
                    </div>
                    <div>
                      <p className="text-blue-200/80">Training Data</p>
                      <p className="text-xl text-white">{model.architecture.trainingData}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {model.capabilities && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Target className="w-6 h-6 text-blue-400 mr-2" />
                  <h2 className="text-2xl font-semibold text-white">Capabilities</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl text-white mb-3">Strengths</h3>
                    <ul className="space-y-2">
                      {model.capabilities.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center text-blue-200/80">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-3">Limitations</h3>
                    <ul className="space-y-2">
                      {model.capabilities.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center text-blue-200/80">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {model.useCases && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Cpu className="w-6 h-6 text-blue-400 mr-2" />
                  <h2 className="text-2xl font-semibold text-white">Use Cases</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {model.useCases.map((useCase, index) => (
                    <div key={index} className="glass-card p-4 rounded-lg text-blue-200/80">
                      {useCase}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {model.ethicalConsiderations && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-blue-400 mr-2" />
                  <h2 className="text-2xl font-semibold text-white">Ethical Considerations</h2>
                </div>
                <div className="glass-card p-6 rounded-lg">
                  <ul className="space-y-2">
                    {model.ethicalConsiderations.map((consideration, index) => (
                      <li key={index} className="flex items-center text-blue-200/80">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {model.requirements && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Server className="w-6 h-6 text-blue-400 mr-2" />
                  <h2 className="text-2xl font-semibold text-white">System Requirements</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-card p-4 rounded-lg">
                    <p className="text-blue-200/80">Compute</p>
                    <p className="text-white mt-1">{model.requirements.compute}</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg">
                    <p className="text-blue-200/80">Memory</p>
                    <p className="text-white mt-1">{model.requirements.memory}</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg">
                    <p className="text-blue-200/80">Storage</p>
                    <p className="text-white mt-1">{model.requirements.storage}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={model.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center px-6 py-3 glass-card text-blue-400 rounded-lg hover:bg-white/15 transition-colors"
              >
                Documentation <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a
                href={model.testUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
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