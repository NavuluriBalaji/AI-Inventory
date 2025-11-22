import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Zap, Box } from 'lucide-react';
import { Model } from '../types/model';

interface ModelCardProps {
  model: Model;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const navigate = useNavigate();

  return (
    <div className="group glass-card rounded-3xl p-6 relative overflow-hidden">
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Card content */}
      <div className="relative z-10 space-y-5">
        {/* Header with title and parameters */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 leading-tight font-outfit">
              {model.name}
            </h3>
            <div className="flex items-center mt-2 space-x-2 text-sm text-gray-400">
              <Box className="w-4 h-4 text-cyan-500" />
              <span>{model.provider}</span>
            </div>
          </div>
          <div className="ml-4 px-3 py-1 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
            <span className="text-cyan-300 text-xs font-bold font-mono">
              {model.trainingParameters.parameters}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {model.description}
        </p>

        {/* Features - Clean horizontal layout */}
        <div className="flex flex-wrap gap-2">
          {model.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-white/5 text-gray-300 rounded-md text-xs font-medium border border-white/5 group-hover:border-cyan-500/30 transition-colors duration-300 flex items-center"
            >
              <Zap className="w-3 h-3 mr-1 text-cyan-400" />
              {feature}
            </span>
          ))}
          {model.features.length > 3 && (
            <span className="px-2.5 py-1 bg-white/5 text-gray-400 rounded-md text-xs font-medium border border-white/5">
              +{model.features.length - 3}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => navigate(`/model/${encodeURIComponent(model.id)}`)}
            className="flex-1 px-4 py-2.5 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-cyan-50 transition-all duration-200 shadow-lg shadow-cyan-500/10"
          >
            View Details
          </button>
          
          <a
            href={model.testUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center justify-center w-10 h-10 border border-white/10 text-gray-400 rounded-xl hover:bg-white/5 hover:text-cyan-300 hover:border-cyan-500/30 transition-all duration-200"
            title="Test Model"
          >
            <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover/link:scale-110" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;