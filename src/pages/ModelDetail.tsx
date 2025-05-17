import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Cpu, AlertCircle, Server, Compass } from 'lucide-react';
import { models } from '../data/models';
import AnimatedBackground from '../components/AnimatedBackground';

const ModelDetail: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const model = models.find((m) => m.id === modelId);

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-rethink">
        Model not found
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative font-rethink">
      <AnimatedBackground />
      <div className="absolute inset-0 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 z-10">
        <Link
          to={`/category/${model.category}`}
          className="inline-flex items-center text-blue-300 hover:text-blue-200 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Category
        </Link>

        <div className="flex flex-col lg:flex-row gap-10 mb-12">
          <div className="flex-shrink-0 w-full lg:w-1/3">
            <img
              src={model.imageUrl}
              alt={model.name}
              className="w-full h-72 object-cover object-center rounded-xl shadow-lg border border-blue-900"
              loading="lazy"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-5xl font-extrabold text-white mb-3">{model.name}</h1>
            <p className="text-xl text-white/80 mb-6">{model.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {model.features.map((feature, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-800/60 text-white rounded-full text-sm font-medium">
                  {feature}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={model.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all font-semibold"
              >
                Documentation <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a
                href={model.testUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg hover:from-blue-700 hover:to-purple-800 transition-all font-semibold"
              >
                Test It Now <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Cpu className="w-6 h-6 mr-2 text-blue-400" />
              Features
            </h2>
            <ul className="space-y-2">
              {model.features.map((feature, index) => (
                <li key={index} className="flex items-center text-white/90">
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
                    <p className="text-white/80">Accuracy</p>
                    <p className="text-2xl font-semibold text-blue-400">
                      {(model.metrics.accuracy * 100).toFixed(1)}%
                    </p>
                  </div>
                )}
                {model.metrics.f1Score && (
                  <div>
                    <p className="text-white/80">F1 Score</p>
                    <p className="text-2xl font-semibold text-blue-400">
                      {(model.metrics.f1Score * 100).toFixed(1)}%
                    </p>
                  </div>
                )}
                {model.metrics.latency && (
                  <div>
                    <p className="text-white/80">Latency</p>
                    <p className="text-2xl font-semibold text-blue-400">
                      {model.metrics.latency}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Server className="w-6 h-6 mr-2 text-blue-400" />
            Training Parameters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-2">Architecture</h3>
              <p className="text-white/80">{model.trainingParameters.architecture}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Model Size</h3>
              <p className="text-white/80">
                {model.trainingParameters.parameters}<br />
                ({model.trainingParameters.modelSize})
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Training Data</h3>
              <ul className="space-y-1">
                {model.trainingParameters.trainingData.map((data, index) => (
                  <li key={index} className="text-white/80">• {data}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Training Details</h3>
              <p className="text-white/80">
                Tokens: {model.trainingParameters.trainingTokens}<br />
                Context: {model.trainingParameters.contextWindow}<br />
                Time: {model.trainingParameters.trainingTime}<br />
                Compute: {model.trainingParameters.computeUsed}
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-white font-semibold mb-2">Optimizations</h3>
              <div className="flex flex-wrap gap-2">
                {model.trainingParameters.optimizations.map((opt, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-700/30 text-white rounded-full text-sm">
                    {opt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <AlertCircle className="w-6 h-6 mr-2 text-blue-400" />
            Limitations & Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-2">Limitations</h3>
              <ul className="space-y-2">
                {model.limitations.map((limitation, index) => (
                  <li
                    key={index}
                    className="flex items-center text-white/80"
                  >
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    {limitation}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Requirements</h3>
              <div className="space-y-2 text-white/80">
                <p>Pricing: {model.requirements.pricing}</p>
                <p>API Key Required: {model.requirements.apiKey ? 'Yes' : 'No'}</p>
                <p>Authentication: {model.requirements.authentication ? 'Yes' : 'No'}</p>
                <p>Hardware: {model.requirements.hardware}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Compass className="w-6 h-6 mr-2 text-blue-400" />
            Alternative Models
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {model.alternatives.map((alt, index) => (
              <div key={index} className="bg-blue-900/30 rounded-lg p-5 border border-blue-800">
                <h3 className="text-white font-semibold mb-2">{alt.name}</h3>
                <p className="text-white/80">{alt.comparison}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;