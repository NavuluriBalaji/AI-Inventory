import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ModelCard from '../components/ModelCard';
import { models, categories } from '../data/models';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find((c) => c.id === categoryId);
  const categoryModels = models.filter((model) => model.category === categoryId);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">{category.name}</h1>
        <p className="text-xl text-gray-600 mb-8">{category.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;