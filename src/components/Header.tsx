import React from 'react';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain size={32} className="text-white" />
          <h1 className="text-2xl font-bold">ADHD Assessment Tool</h1>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#about" className="hover:text-purple-200 transition-colors">About</a>
          <a href="#assessment" className="hover:text-purple-200 transition-colors">Assessment</a>
          <a href="#resources" className="hover:text-purple-200 transition-colors">Resources</a>
        </div>
      </div>
    </header>
  );
};

export default Header;