import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Question, Answer } from '../types';
import * as Icons from 'lucide-react';

interface SurveyTileProps {
  title: string;
  questions: Question[];
  category: string;
  icon?: string;
  onComplete: (answers: Answer[]) => void;
  completed: boolean;
}

const SurveyTile: React.FC<SurveyTileProps> = ({ 
  title, 
  questions, 
  category, 
  icon, 
  onComplete, 
  completed 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex].id,
      value,
      category
    };
    
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        onComplete(newAnswers);
        setIsSubmitting(false);
      }, 800);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  
  // Dynamically get the icon component
  const IconComponent = icon && Icons[icon as keyof typeof Icons] ? 
    Icons[icon as keyof typeof Icons] : 
    Icons.HelpCircle;

  if (completed) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <IconComponent className="text-green-500" size={24} />
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <p className="text-gray-600">Assessment completed!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <IconComponent className="text-indigo-600" size={24} />
      </div>
      
      <div className="flex-grow">
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 font-medium mb-4">{currentQuestion.text}</p>
          
          <div className="space-y-2">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left p-3 rounded-md border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-colors flex justify-between items-center"
                disabled={isSubmitting}
              >
                <span>{option.label}</span>
                <ArrowRight size={16} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {isSubmitting && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
          <span className="ml-2 text-indigo-600">Submitting...</span>
        </div>
      )}
    </div>
  );
};

export default SurveyTile;