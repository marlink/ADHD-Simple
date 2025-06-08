import React from 'react';
import { Info, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2" size={20} />
              Disclaimer
            </h3>
            <p className="text-gray-300 text-sm">
              This tool is for educational purposes only and is not a substitute for professional medical advice, 
              diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li className="flex items-center">
                <ExternalLink size={16} className="mr-2" />
                <a href="https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd" 
                   className="hover:text-purple-300 transition-colors" target="_blank" rel="noopener noreferrer">
                  NIMH ADHD Information
                </a>
              </li>
              <li className="flex items-center">
                <ExternalLink size={16} className="mr-2" />
                <a href="https://chadd.org/" 
                   className="hover:text-purple-300 transition-colors" target="_blank" rel="noopener noreferrer">
                  CHADD - Children and Adults with ADHD
                </a>
              </li>
              <li className="flex items-center">
                <ExternalLink size={16} className="mr-2" />
                <a href="https://add.org/" 
                   className="hover:text-purple-300 transition-colors" target="_blank" rel="noopener noreferrer">
                  ADDA - Attention Deficit Disorder Association
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">About This Tool</h3>
            <p className="text-gray-300 text-sm">
              This interactive assessment is based on common ADHD symptoms and screening criteria. 
              The questions and scoring system are designed to provide educational insights, not clinical diagnoses.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} ADHD Assessment Tool. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;