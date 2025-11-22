import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Tag, MessageSquare, TrendingUp, Cpu, FileText, Code, Image, Video, Mic, 
  Briefcase, Search, Palette, User, Database, Users, Settings, BookOpen, 
  Layers, Globe, Smartphone, Github, MessageCircle, ArrowRight
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
      className="group glass-card rounded-3xl p-6 cursor-pointer relative overflow-hidden"
      onClick={() => navigate(`/category/${category.id}`)}
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main content */}
      <div className="relative z-10 space-y-4">
        {/* Icon and header */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/5 rounded-xl group-hover:bg-cyan-500/10 transition-all duration-300 border border-white/10 group-hover:border-cyan-500/30">
            <Icon className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 font-outfit">
              {category.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed line-clamp-2">
          {category.description}
        </p>

        {/* Explore indicator */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs font-medium text-gray-500 group-hover:text-cyan-400 transition-colors duration-300 uppercase tracking-wider">
            Explore
          </span>
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
