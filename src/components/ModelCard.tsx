import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Model } from '../types/model';

interface ModelCardProps {
  model: Model;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-gray-900 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-gray-800/50 border border-gray-800 hover:border-gray-700 font-rethink">
      {/* Card content */}
      <div className="space-y-4">
        {/* Header with title and parameters */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white group-hover:text-gray-100 transition-colors duration-300 leading-tight">
              {model.name}
            </h3>
          </div>
          <div className="ml-4 px-3 py-1 bg-gray-800 rounded-lg border border-gray-700">
            <span className="text-gray-300 text-sm font-medium">
              {model.trainingParameters.parameters}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 min-h-[3rem]">
          {model.description}
        </p>

        {/* Features - Clean horizontal layout */}
        <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
          {model.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-xl text-xs font-medium border border-gray-700 hover:border-gray-600 hover:bg-gray-750 transition-all duration-200"
            >
              {feature}
            </span>
          ))}
          {model.features.length > 3 && (
            <span className="px-3 py-1.5 bg-gray-800/60 text-gray-400 rounded-xl text-xs font-medium border border-gray-700/50">
              +{model.features.length - 3} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => navigate(`/model/${encodeURIComponent(model.id)}`)}
            className="flex-1 px-4 py-2.5 bg-white text-gray-900 rounded-2xl font-semibold text-sm hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Learn More
          </button>
          
          <a
            href={model.testUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-700 text-gray-400 rounded-2xl text-sm font-medium hover:border-gray-600 hover:text-gray-300 transition-all duration-200"
          >
            <span>Test</span>
            <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;