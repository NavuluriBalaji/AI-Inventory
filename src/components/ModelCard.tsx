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
    <div className="bg-gray-800 rounded-lg overflow-hidden font-semibold shadow-md transition-all hover:shadow-lg border border-gray-700 font-rethink">
      {/* <img
        src={model.imageUrl}
        alt={model.name}
        className="w-full h-48 object-cover"
      /> */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white">{model.name}</h3>
        <p className="text-gray-400 mt-2 text-sm">{model.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {model.features.map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-xs"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="mt-5 flex justify-between items-center">
          <button
            onClick={() => navigate(`/model/${model.id}`)}
            className="px-3 py-1.5 bg-green-700 text-white rounded-md hover:bg-green-900 transition-colors text-sm"
          >
            Learn More
          </button>
          <a
            href={model.testUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-400 hover:text-green-400 text-sm"
          >
            Test It <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;