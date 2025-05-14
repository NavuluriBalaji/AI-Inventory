import React from 'react';
import { Brain } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import ModelCard from '../components/ModelCard';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { categories, models } from '../data/models';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black text-gray-100 font-rethink flex flex-col">
      <AnimatedBackground />
      <div className="flex-1 flex flex-col justify-center items-center py-12">
        <div className="text-center mb-12 w-full">
          <div className="flex justify-center mb-6">
            <Brain className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-8xl font-semibold mb-1 pt-20 text-green-1000 font-rethink">
            LLM Models Explorer
          </h1>
          <p className="text-gray-400 pt-4 font-rethink">
            Discover and explore the world's most advanced language models
          </p>
        </div>

        <div className="mb-12 w-full px-4">
          <h2 className="text-xl font-semibold mb-6 border-b border-green-900 pb-2 text-green-500 font-rethink">Featured Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-semibold font-rethink">
            {models.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>

        <div className="mb-12 w-full px-4 font-rethink">
          <h1 className="text-xl font-medium mb-6 border-b border-green-900 pb-2 text-green-500 font-rethink">Search Models by categories</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-rethink">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;