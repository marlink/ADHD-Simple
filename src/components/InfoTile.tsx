import React from 'react';
import * as Icons from 'lucide-react';
import { CategoryScore } from '../types';
import ResultsExport from './ResultsExport';

interface InfoTileProps {
  title: string;
  type: 'adhd-info' | 'results-summary';
  icon?: string;
  scores?: CategoryScore[];
  overallScore?: number;
  overallPercentage?: number;
}

const InfoTile: React.FC<InfoTileProps> = ({ 
  title, 
  type, 
  icon, 
  scores = [], 
  overallScore = 0,
  overallPercentage = 0
}) => {
  // Dynamically get the icon component
  const IconComponent = icon && Icons[icon as keyof typeof Icons] ? 
    Icons[icon as keyof typeof Icons] : 
    Icons.Info;

  const hasScores = scores.length > 0;

  const getScoreInterpretation = (percentage: number) => {
    if (percentage < 25) return { text: 'Minimal', color: 'text-green-600' };
    if (percentage < 50) return { text: 'Mild', color: 'text-yellow-600' };
    if (percentage < 75) return { text: 'Moderate', color: 'text-orange-600' };
    return { text: 'Significant', color: 'text-red-600' };
  };

  const renderADHDInfo = () => (
    <div className="space-y-4">
      <p className="text-gray-700">
        Attention-deficit/hyperactivity disorder (ADHD) is a neurodevelopmental disorder characterized by patterns of inattention, hyperactivity, and impulsivity that interfere with functioning or development.
      </p>
      
      <div className="mt-4">
        <h4 className="font-medium text-gray-800 mb-2">Common Symptoms:</h4>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Difficulty sustaining attention</li>
          <li>Excessive activity or restlessness</li>
          <li>Impulsive actions</li>
          <li>Difficulty with organization and time management</li>
          <li>Forgetfulness in daily activities</li>
        </ul>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-700">
          This assessment tool helps identify potential ADHD symptoms across four key domains. Complete all assessments for a comprehensive overview.
        </p>
      </div>
    </div>
  );

  const renderResultsSummary = () => {
    if (!hasScores) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <IconComponent className="text-gray-400 mb-2" size={32} />
          <p className="text-gray-500">Complete assessments to see your results</p>
        </div>
      );
    }

    const interpretation = getScoreInterpretation(overallPercentage);

    return (
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <h4 className="text-gray-700 mb-2">Overall Assessment</h4>
          <div className="text-2xl font-bold mb-1 flex items-center justify-center">
            <span className={interpretation.color}>{interpretation.text}</span>
            <span className="text-gray-500 text-base ml-2">({Math.round(overallPercentage)}%)</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
            <div 
              className={`h-2.5 rounded-full ${
                overallPercentage < 25 ? 'bg-green-500' : 
                overallPercentage < 50 ? 'bg-yellow-500' : 
                overallPercentage < 75 ? 'bg-orange-500' : 'bg-red-500'
              }`} 
              style={{ width: `${overallPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Domain Breakdown:</h4>
          <div className="space-y-3">
            {scores.map((score) => {
              const domainInterpretation = getScoreInterpretation(score.percentage);
              const categoryLabel = 
                score.category === 'inattention' ? 'Inattention' :
                score.category === 'hyperactivity' ? 'Hyperactivity' :
                score.category === 'impulsivity' ? 'Impulsivity' :
                score.category === 'executive' ? 'Executive Function' :
                score.category;
                
              return (
                <div key={score.category} className="flex justify-between items-center">
                  <span className="text-gray-700">{categoryLabel}:</span>
                  <span className={`font-medium ${domainInterpretation.color}`}>
                    {domainInterpretation.text} ({Math.round(score.percentage)}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 italic mb-4">
            Note: This assessment is for educational purposes only and is not a clinical diagnosis.
            If you have concerns about ADHD, please consult with a healthcare professional.
          </p>
          
          {/* Export options */}
          <ResultsExport 
            scores={scores}
            overallScore={overallScore}
            overallPercentage={overallPercentage}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <IconComponent className="text-indigo-600" size={24} />
      </div>
      
      <div className="flex-grow">
        {type === 'adhd-info' ? renderADHDInfo() : renderResultsSummary()}
      </div>
    </div>
  );
};

export default InfoTile;