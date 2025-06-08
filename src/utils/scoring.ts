import { Answer, CategoryScore, UserProfile } from '../types';

export const calculateScores = (answers: Answer[]): UserProfile => {
  // Group answers by category
  const answersByCategory: Record<string, Answer[]> = {};
  
  answers.forEach(answer => {
    if (!answersByCategory[answer.category]) {
      answersByCategory[answer.category] = [];
    }
    answersByCategory[answer.category].push(answer);
  });
  
  // Calculate scores for each category
  const scores: CategoryScore[] = Object.keys(answersByCategory).map(category => {
    const categoryAnswers = answersByCategory[category];
    const score = categoryAnswers.reduce((sum, answer) => sum + answer.value, 0);
    const maxScore = categoryAnswers.length * 4; // Assuming max value per question is 4
    const percentage = (score / maxScore) * 100;
    
    return {
      category,
      score,
      maxScore,
      percentage
    };
  });
  
  // Calculate overall score
  const totalScore = scores.reduce((sum, category) => sum + category.score, 0);
  const totalMaxScore = scores.reduce((sum, category) => sum + category.maxScore, 0);
  const overallPercentage = totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0;
  
  // Get completed tile IDs
  const completedTiles = Object.keys(answersByCategory).map(category => `${category}-survey`);
  
  return {
    scores,
    completedTiles,
    answers,
    overallScore: totalScore,
    overallPercentage
  };
};