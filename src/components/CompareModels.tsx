import React, { useState } from 'react';
import { models } from '../data/models';
import { Model } from '../types/model';
import { Scale } from 'lucide-react';

const CompareModels: React.FC = () => {
  const [model1, setModel1] = useState<string>('');
  const [model2, setModel2] = useState<string>('');

  const selectedModel1 = models.find(m => m.id === model1);
  const selectedModel2 = models.find(m => m.id === model2);

  const compareModels = (m1: Model, m2: Model) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        <div className="glass-card p-6 rounded-xl shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl border border-blue-400/20">
          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
            {m1.name}
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Architecture</h4>
              <p className="text-blue-200/80">{m1.trainingParameters.architecture}</p>
            </div>
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Model Size</h4>
              <p className="text-blue-200/80">{m1.trainingParameters.parameters}</p>
            </div>
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Context Window</h4>
              <p className="text-blue-200/80">{m1.trainingParameters.contextWindow}</p>
            </div>
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Features</h4>
              <ul className="list-disc list-inside text-blue-200/80 space-y-1">
                {m1.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Pricing</h4>
              <p className="text-blue-200/80">{m1.requirements.pricing}</p>
            </div>
          </div>
        </div>

        {/* Divider for desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-blue-400/30 via-blue-400/10 to-blue-400/30 z-10"></div>

        <div className="glass-card p-6 rounded-xl shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl border border-blue-400/20">
          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
            {m2.name}
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Architecture</h4>
              <p className="text-blue-200/80">{m2.trainingParameters.architecture}</p>
            </div>
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Model Size</h4>
              <p className="text-blue-200/80">{m2.trainingParameters.parameters}</p>
            </div>
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Context Window</h4>
              <p className="text-blue-200/80">{m2.trainingParameters.contextWindow}</p>
            </div>
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Features</h4>
              <ul className="list-disc list-inside text-blue-200/80 space-y-1">
                {m2.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Pricing</h4>
              <p className="text-blue-200/80">{m2.requirements.pricing}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="glass-card p-8 rounded-xl shadow-xl border border-blue-400/20">
      <div className="flex items-center mb-8 gap-3">
        <Scale className="w-7 h-7 text-blue-400 mr-2" />
        <h2 className="text-3xl font-bold text-white tracking-tight">Compare Models</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="flex flex-col gap-2">
          <label className="text-blue-200/80 text-sm font-medium mb-1" htmlFor="model1">First Model</label>
          <select
            id="model1"
            value={model1}
            onChange={(e) => setModel1(e.target.value)}
            className="bg-zinc-900 border border-blue-400/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm hover:bg-zinc-800"
          >
            <option value="" className="bg-zinc-900 text-white">Select first model</option>
            {models.map((model) => (
              <option key={model.id} value={model.id} className="bg-zinc-900 text-white">
                {model.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-blue-200/80 text-sm font-medium mb-1" htmlFor="model2">Second Model</label>
          <select
            id="model2"
            value={model2}
            onChange={(e) => setModel2(e.target.value)}
            className="bg-zinc-900 border border-blue-400/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm hover:bg-zinc-800"
          >
            <option value="" className="bg-zinc-900 text-white">Select second model</option>
            {models.map((model) => (
              <option key={model.id} value={model.id} className="bg-zinc-900 text-white">
                {model.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedModel1 && selectedModel2 ? (
        compareModels(selectedModel1, selectedModel2)
      ) : (
        <p className="text-blue-200/80 text-center py-8 text-lg">Select two models to compare</p>
      )}
    </div>
  );
};

export default CompareModels;