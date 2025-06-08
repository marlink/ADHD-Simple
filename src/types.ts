export interface Question {
  id: string;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
  category: 'inattention' | 'hyperactivity' | 'impulsivity' | 'executive';
}

export interface Answer {
  questionId: string;
  value: number;
  category: string;
}

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface AssessmentTile {
  id: string;
  title: string;
  type: 'survey' | 'chart' | 'info';
  category?: 'inattention' | 'hyperactivity' | 'impulsivity' | 'executive';
  questions?: Question[];
  chartType?: 'radar' | 'bar' | 'pie';
  completed?: boolean;
  icon?: string;
  testLength?: 'short' | 'medium' | 'long';
}

export interface UserProfile {
  scores: CategoryScore[];
  completedTiles: string[];
  answers: Answer[];
  overallScore: number;
  overallPercentage: number;
}

export type TestLength = 'short' | 'medium' | 'long';