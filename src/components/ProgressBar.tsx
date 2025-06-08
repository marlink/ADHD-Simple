import React from 'react';

interface ProgressBarProps {
  completedTiles: number;
  totalTiles: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completedTiles, totalTiles }) => {
  const percentage = (completedTiles / totalTiles) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">Your Progress</h3>
        <span className="text-indigo-600 font-medium">{completedTiles} of {totalTiles} completed</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {completedTiles === totalTiles && (
        <div className="mt-2 text-center text-green-600 font-medium">
          All assessments completed! View your results below.
        </div>
      )}
    </div>
  );
};

export default ProgressBar;