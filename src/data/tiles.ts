import { AssessmentTile, TestLength } from '../types';
import { getQuestionsByLength } from './questions';

export const generateTiles = (testLength: TestLength): AssessmentTile[] => {
  const questions = getQuestionsByLength(testLength);
  
  return [
    {
      id: 'inattention-survey',
      title: 'Attention Assessment',
      type: 'survey',
      category: 'inattention',
      questions: questions.filter(q => q.category === 'inattention'),
      icon: 'Brain',
      testLength
    },
    {
      id: 'hyperactivity-survey',
      title: 'Hyperactivity Assessment',
      type: 'survey',
      category: 'hyperactivity',
      questions: questions.filter(q => q.category === 'hyperactivity'),
      icon: 'Zap',
      testLength
    },
    {
      id: 'impulsivity-survey',
      title: 'Impulsivity Assessment',
      type: 'survey',
      category: 'impulsivity',
      questions: questions.filter(q => q.category === 'impulsivity'),
      icon: 'Rocket',
      testLength
    },
    {
      id: 'executive-survey',
      title: 'Executive Function Assessment',
      type: 'survey',
      category: 'executive',
      questions: questions.filter(q => q.category === 'executive'),
      icon: 'Briefcase',
      testLength
    },
    {
      id: 'category-comparison',
      title: 'Symptom Profile',
      type: 'chart',
      chartType: 'radar',
      icon: 'PieChart'
    },
    {
      id: 'score-breakdown',
      title: 'Score Breakdown',
      type: 'chart',
      chartType: 'bar',
      icon: 'BarChart'
    },
    {
      id: 'adhd-info',
      title: 'About ADHD',
      type: 'info',
      icon: 'Info'
    },
    {
      id: 'results-summary',
      title: 'Your Results',
      type: 'info',
      icon: 'FileText'
    }
  ];
};

// Default tiles with medium length
export const tiles = generateTiles('medium');