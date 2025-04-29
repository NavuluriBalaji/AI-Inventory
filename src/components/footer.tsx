import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="glass-card mt-16 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-white mb-2">Created by Navuluri Balaji</h3>
          <p className="text-blue-200/80">Full Stack Developer & AI Enthusiast</p>
        </div>
        
        <div className="flex space-x-6 mt-4">
          <a
            href="https://github.com/navuluribalaji"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/navuluribalaji"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com/navuluribalaji"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Twitter className="w-6 h-6" />
          </a>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-blue-200/60 text-sm">
            © {new Date().getFullYear()} LLM Models Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;