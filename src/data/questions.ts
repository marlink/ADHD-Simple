import { Question } from '../types';

// Short test questions (1 per category)
const shortQuestions: Question[] = [
  {
    id: 'short-q1',
    text: 'How often do you have trouble keeping your attention when doing boring or repetitive work?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'inattention'
  },
  {
    id: 'short-q2',
    text: 'How often do you fidget with hands or feet or squirm in your seat?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'hyperactivity'
  },
  {
    id: 'short-q3',
    text: 'How often do you have difficulty waiting your turn?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'impulsivity'
  },
  {
    id: 'short-q4',
    text: 'How often do you have trouble planning ahead for tasks or activities?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'executive'
  }
];

// Medium test questions (3 per category)
const mediumQuestions: Question[] = [
  // Inattention Questions
  {
    id: 'q1',
    text: 'How often do you have trouble keeping your attention when doing boring or repetitive work?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'inattention'
  },
  {
    id: 'q2',
    text: 'How often do you have difficulty organizing tasks and activities?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'inattention'
  },
  {
    id: 'q3',
    text: 'How often are you easily distracted by external stimuli?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'inattention'
  },
  
  // Hyperactivity Questions
  {
    id: 'q4',
    text: 'How often do you fidget with hands or feet or squirm in your seat?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'hyperactivity'
  },
  {
    id: 'q5',
    text: 'How often do you feel restless or find it difficult to sit still for extended periods?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'hyperactivity'
  },
  {
    id: 'q6',
    text: 'How often do you find yourself talking excessively?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'hyperactivity'
  },
  
  // Impulsivity Questions
  {
    id: 'q7',
    text: 'How often do you have difficulty waiting your turn?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'impulsivity'
  },
  {
    id: 'q8',
    text: 'How often do you interrupt others when they are busy?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'impulsivity'
  },
  {
    id: 'q9',
    text: 'How often do you make decisions impulsively?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'impulsivity'
  },
  
  // Executive Function Questions
  {
    id: 'q10',
    text: 'How often do you have trouble planning ahead for tasks or activities?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'executive'
  },
  {
    id: 'q11',
    text: 'How often do you struggle to manage your time effectively?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'executive'
  },
  {
    id: 'q12',
    text: 'How often do you have difficulty completing tasks once you\'ve started them?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'executive'
  }
];

// Long test questions (5 per category)
const longQuestions: Question[] = [
  // All medium questions plus additional ones
  ...mediumQuestions,
  
  // Additional Inattention Questions
  {
    id: 'long-q1',
    text: 'How often do you make careless mistakes in work or other activities?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'inattention'
  },
  {
    id: 'long-q2',
    text: 'How often do you have trouble remembering appointments or obligations?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'inattention'
  },
  
  // Additional Hyperactivity Questions
  {
    id: 'long-q3',
    text: 'How often do you feel driven to move about or "on the go" as if driven by a motor?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'hyperactivity'
  },
  {
    id: 'long-q4',
    text: 'How often do you have difficulty engaging in leisure activities quietly?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'hyperactivity'
  },
  
  // Additional Impulsivity Questions
  {
    id: 'long-q5',
    text: 'How often do you blurt out answers before questions have been completed?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'impulsivity'
  },
  {
    id: 'long-q6',
    text: 'How often do you have difficulty resisting immediate temptations or opportunities?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'impulsivity'
  },
  
  // Additional Executive Function Questions
  {
    id: 'long-q7',
    text: 'How often do you have difficulty prioritizing tasks?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'executive'
  },
  {
    id: 'long-q8',
    text: 'How often do you struggle with mental flexibility or shifting between tasks?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ],
    category: 'executive'
  }
];

export const getQuestionsByLength = (testLength: 'short' | 'medium' | 'long') => {
  switch (testLength) {
    case 'short':
      return shortQuestions;
    case 'medium':
      return mediumQuestions;
    case 'long':
      return longQuestions;
    default:
      return mediumQuestions;
  }
};

export const questions = mediumQuestions;