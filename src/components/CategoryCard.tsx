import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, MessageSquare, TrendingUp } from 'lucide-react';
import { Category } from '../types/model';

interface CategoryCardProps {
  category: Category;
}

const iconMap = {
  'tag': Tag,
  'message-square': MessageSquare,
  'trending-up': TrendingUp,
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();
  const Icon = iconMap[category.icon as keyof typeof iconMap];

  if (!Icon) {
    console.warn(`Icon "${category.icon}" not found`);
    return null;
  }

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all hover:scale-105"
      onClick={() => navigate(`/category/${category.id}`)}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
          <p className="text-gray-600 mt-1">{category.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;