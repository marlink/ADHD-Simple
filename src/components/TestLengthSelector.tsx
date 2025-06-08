import React from 'react';
import { Clock, Clock as ClockHour3, Clock as ClockHour9 } from 'lucide-react';
import { TestLength } from '../types';

interface TestLengthSelectorProps {
  onSelect: (length: TestLength) => void;
}

const TestLengthSelector: React.FC<TestLengthSelectorProps> = ({ onSelect }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose Assessment Length</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => onSelect('short')}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-indigo-300"
        >
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <Clock size={32} className="text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Short</h3>
          <p className="text-gray-600 text-center mb-2">Quick 2-minute assessment</p>
          <p className="text-sm text-gray-500">4 questions total</p>
        </div>
        
        <div 
          onClick={() => onSelect('medium')}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-indigo-300"
        >
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <ClockHour3 size={32} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Medium</h3>
          <p className="text-gray-600 text-center mb-2">Standard 5-minute assessment</p>
          <p className="text-sm text-gray-500">12 questions total</p>
        </div>
        
        <div 
          onClick={() => onSelect('long')}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-indigo-300"
        >
          <div className="bg-purple-100 p-3 rounded-full mb-4">
            <ClockHour9 size={32} className="text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Long</h3>
          <p className="text-gray-600 text-center mb-2">Comprehensive 10-minute assessment</p>
          <p className="text-sm text-gray-500">20 questions total</p>
        </div>
      </div>
      
      <p className="text-gray-500 text-center mt-6">
        All assessment lengths provide valuable insights. Choose based on your available time.
      </p>
    </div>
  );
};

export default TestLengthSelector;