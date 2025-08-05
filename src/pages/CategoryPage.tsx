import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ModelCard from '../components/ModelCard';
import SEO from '../components/SEO';
import { categories } from '../data/models';
import apiService from '../services/api';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const category = categories.find((c) => c.id === categoryId);

  useEffect(() => {
    const fetchCategoryModels = async () => {
      if (!categoryId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch models from API with category filter
        const response = await apiService.getModels({
          category: categoryId,
          limit: 50 // Adjust as needed
        });
        
        setModels(response.models || []);
      } catch (err) {
        console.error('Failed to fetch category models:', err);
        setError('Failed to load models. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryModels();
  }, [categoryId]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-200 font-rethink">
        <SEO 
          title="Category Not Found | AI Inventory"
          description="The requested category was not found. Browse our available AI model categories."
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Category not found</h2>
          <Link to="/" className="text-blue-400 hover:underline">
            Go back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Structured data for category page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} AI Models`,
    "description": category.description,
    "url": window.location.href,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": models.length,
      "itemListElement": models.map((model: any, index: number) => ({
        "@type": "SoftwareApplication",
        "position": index + 1,
        "name": model.name,
        "description": model.description,
        "applicationCategory": "AI Model",
        "operatingSystem": "Web",
        "provider": {
          "@type": "Organization",
          "name": model.provider
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-gray-100 font-rethink">
      <SEO
        title={`${category.name} AI Models | AI Inventory`}
        description={`Explore ${category.name.toLowerCase()} AI models. ${category.description} Find the best ${category.name.toLowerCase()} models for your needs.`}
        keywords={`${category.name.toLowerCase()}, AI models, ${models.map((m: any) => m.name).join(', ')}, artificial intelligence`}
        url={window.location.href}
        jsonLd={structuredData}
      />
      <SEO title={category.name} description={category.description} />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white-300 mb-2 flex items-center gap-3">
            {category.name}
          </h1>
          <p className="text-lg text-gray-300">{category.description}</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading {category.name} models...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-2 text-red-400">Error</h2>
            <p className="mb-4 text-gray-400">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        ) : models.length === 0 ? (
          <div className="text-center text-gray-400 py-16 text-xl">
            No models found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model: any) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
