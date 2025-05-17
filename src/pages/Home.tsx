import React,{ useState } from 'react';
import { Brain } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import ModelCard from '../components/ModelCard';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { categories, models } from '../data/models';

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
const filteredModels = models.filter(model =>
  model.name.toLowerCase().includes(search.toLowerCase()) ||
  model.features.some(feature =>
    feature.toLowerCase().includes(search.toLowerCase())
  )
);
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

        {/* Search Bar */}
        <div className="w-full flex justify-center mb-8 px-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search models..."
            className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>
        

        <div className="mb-12 w-full px-4">
          <h2 className="text-xl font-semibold mb-6 border-b border-green-900 pb-2 text-green-500 font-rethink">Featured Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-semibold font-rethink">
            {filteredModels.length > 0 ? (
              filteredModels.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-8">
                <div className="text-2xl font-bold text-green-400 mb-2">Oops! We can't find your search.</div>
                <div className="mb-2">You can drop us what you are looking for and we'll update it soon.</div>
                <a
                  href="balajinbtt@gmail.com"
                  className="inline-block mt-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                >
                  Contact Us
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="mb-12 w-full px-4 font-rethink">
          <h1 className="text-xl font-medium mb-6 border-b border-green-900 pb-2 text-green-500 font-rethink">Search Models by categories</h1>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 font-rethink">
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