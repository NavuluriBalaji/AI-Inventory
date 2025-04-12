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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={model.imageUrl}
        alt={model.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800">{model.name}</h3>
        <p className="text-gray-600 mt-2">{model.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {model.features.map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => navigate(`/model/${model.id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Learn More
          </button>
          <a
            href={model.testUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            Test It <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;