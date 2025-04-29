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
    <div className="glass-card rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:bg-white/15">
      <img
        src={model.imageUrl}
        alt={model.name}
        className="w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">{model.name}</h3>
        <p className="text-blue-200/80 mt-2">{model.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {model.features.map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => navigate(`/model/${model.id}`)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            Learn More
          </button>
          <a
            href={model.testUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-400 hover:text-blue-300"
          >
            Test It <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;