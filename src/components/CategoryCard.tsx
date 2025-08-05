import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Tag, MessageSquare, TrendingUp, Cpu, FileText, Code, Image, Video, Mic, 
  Briefcase, Search, Palette, User, Database, Users, Settings, BookOpen, 
  Layers, Globe, Smartphone, Github, MessageCircle
} from 'lucide-react';
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
  'code': Code,
  'image': Image,
  'video': Video,
  'mic': Mic,
  'briefcase': Briefcase,
  'search': Search,
  'palette': Palette,
  'user': User,
  'database': Database,
  'users': Users,
  'settings': Settings,
  'book-open': BookOpen,
  'layers': Layers,
  'globe': Globe,
  'smartphone': Smartphone,
  'github': Github,
  'message-circle': MessageCircle,
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
      className="group bg-gray-900 rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-gray-800/50 border border-gray-800 hover:border-gray-700"
      onClick={() => navigate(`/category/${category.id}`)}
    >
      {/* Main content */}
      <div className="space-y-4">
        {/* Icon and header */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gray-800 rounded-2xl group-hover:bg-gray-750 transition-all duration-300 border border-gray-700">
            <Icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white group-hover:text-gray-100 transition-colors duration-300">
              {category.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
          {category.description}
        </p>

        {/* Explore indicator */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center space-x-2 text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
            <span className="text-sm font-medium">Explore Category</span>
          </div>
          <div className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-gray-750 group-hover:border-gray-600 transition-all duration-300">
            <svg className="w-3 h-3 text-gray-400 group-hover:text-gray-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
