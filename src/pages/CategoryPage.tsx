import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ModelCard from '../components/ModelCard';
import SEO from '../components/SEO';
import { models, categories } from '../data/models';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find((c) => c.id === categoryId);
  const categoryModels = models.filter((model) => model.category === categoryId);

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
      "numberOfItems": categoryModels.length,
      "itemListElement": categoryModels.map((model, index) => ({
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
        keywords={`${category.name.toLowerCase()}, AI models, ${categoryModels.map(m => m.name).join(', ')}, artificial intelligence`}
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

        {categoryModels.length === 0 ? (
          <div className="text-center text-gray-400 py-16 text-xl">
            No models found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;