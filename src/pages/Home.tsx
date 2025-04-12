import React from 'react';
import { Brain } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import ModelCard from '../components/ModelCard';
import Footer from '../components/Footer';
import { categories, models } from '../data/models';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="glass-card p-4 rounded-2xl glow">
              <Brain className="w-16 h-16 text-blue-400" />
            </div>
          </div>
          <h1 className="text-5xl font-bold gradient-text sm:text-6xl mb-4">
            LLM Models Explorer
          </h1>
          <p className="mt-4 text-xl text-blue-200/80">
            Discover and explore the world's most advanced language models
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 gradient-text">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-8 gradient-text">Featured Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;