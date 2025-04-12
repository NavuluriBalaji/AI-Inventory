import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { models } from '../data/models';

const ModelDetail: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const model = models.find((m) => m.id === modelId);

  if (!model) {
    return <div>Model not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Link
          to={`/category/${model.category}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Category
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={model.imageUrl}
            alt={model.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{model.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{model.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <ul className="space-y-2">
                  {model.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-700"
                    >
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {model.metrics && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
                  <div className="space-y-4">
                    {model.metrics.accuracy && (
                      <div>
                        <p className="text-gray-600">Accuracy</p>
                        <p className="text-2xl font-semibold text-blue-600">
                          {(model.metrics.accuracy * 100).toFixed(1)}%
                        </p>
                      </div>
                    )}
                    {model.metrics.f1Score && (
                      <div>
                        <p className="text-gray-600">F1 Score</p>
                        <p className="text-2xl font-semibold text-blue-600">
                          {(model.metrics.f1Score * 100).toFixed(1)}%
                        </p>
                      </div>
                    )}
                    {model.metrics.latency && (
                      <div>
                        <p className="text-gray-600">Latency</p>
                        <p className="text-2xl font-semibold text-blue-600">
                          {model.metrics.latency}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={model.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Documentation <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a
                href={model.testUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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