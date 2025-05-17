import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, MessageSquare, TrendingUp, Cpu, FileText } from 'lucide-react';
import { Category } from '../types/model';


interface CategoryCardProps {
  category: Category;
}

const iconMap = {
  'tag': Tag,
  'message-square': MessageSquare,
  'trending-up': TrendingUp,
  'Cpu': Cpu,
  'file-text': FileText,
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
      className="glass-card rounded-xl p-6 cursor-pointer transform transition-all hover:scale-105 hover:bg-white/15"
      onClick={() => navigate(`/category/${category.id}`)}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-500/20 rounded-lg">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{category.name}</h3>
          <p className="text-blue-200/80 mt-1">{category.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;