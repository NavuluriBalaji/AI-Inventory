import React from 'react';
import { Github, Linkedin, Twitter, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-20 border-t border-white/5 bg-black/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-outfit tracking-tight text-white">
              AI<span className="text-cyan-400">Inventory</span>
            </span>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-200 mb-1 font-outfit">Created by Navuluri Balaji</h3>
            <p className="text-gray-500 text-sm">Full Stack Developer & AI Engineer</p>
          </div>
          
          <div className="flex space-x-6">
            <a
              href="https://github.com/navuluribalaji"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/navuluribalaji"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/navuluribalaji"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all duration-300 hover:scale-110"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          
          <div className="pt-8 border-t border-white/5 w-full text-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} LLM Models Explorer. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;