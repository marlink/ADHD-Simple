import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AssessmentGrid from './components/AssessmentGrid';
import ProgressBar from './components/ProgressBar';
import CompletionConfetti from './components/CompletionConfetti';
import TestLengthSelector from './components/TestLengthSelector';
import { generateTiles } from './data/tiles';
import { Answer, UserProfile, TestLength } from './types';
import { calculateScores } from './utils/scoring';
import { Brain, ArrowDown } from 'lucide-react';

function App() {
  const [testLength, setTestLength] = useState<TestLength | null>(null);
  const [tiles, setTiles] = useState(generateTiles('medium'));
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    scores: [],
    completedTiles: [],
    answers: [],
    overallScore: 0,
    overallPercentage: 0
  });
  
  const [allComplete, setAllComplete] = useState(false);
  
  // Handle test length selection
  const handleTestLengthSelect = (length: TestLength) => {
    setTestLength(length);
    setTiles(generateTiles(length));
    
    // Reset user profile when changing test length
    setUserProfile({
      scores: [],
      completedTiles: [],
      answers: [],
      overallScore: 0,
      overallPercentage: 0
    });
    
    setAllComplete(false);
  };
  
  // Count survey tiles
  const surveyTiles = tiles.filter(tile => tile.type === 'survey');
  
  useEffect(() => {
    // Check if all surveys are complete
    const isComplete = surveyTiles.every(tile => 
      userProfile.completedTiles.includes(tile.id)
    );
    
    setAllComplete(isComplete);
  }, [userProfile.completedTiles, surveyTiles]);

  const handleSurveyComplete = (tileId: string, answers: Answer[]) => {
    // Add new answers to existing ones
    const updatedAnswers = [...userProfile.answers];
    
    // Remove any existing answers for the same questions
    const newQuestionIds = answers.map(a => a.questionId);
    const filteredAnswers = updatedAnswers.filter(
      a => !newQuestionIds.includes(a.questionId)
    );
    
    // Add new answers
    const combinedAnswers = [...filteredAnswers, ...answers];
    
    // Calculate updated scores
    const updatedProfile = calculateScores(combinedAnswers);
    
    // Ensure the tile is marked as completed
    if (!updatedProfile.completedTiles.includes(tileId)) {
      updatedProfile.completedTiles.push(tileId);
    }
    
    setUserProfile(updatedProfile);
  };

  // If test length is not selected, show the test length selector
  if (!testLength) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <section className="mb-12 text-center\" id="about">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Brain size={40} className="text-indigo-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">ADHD Self-Assessment Tool</h1>
              <p className="text-xl text-gray-600 mb-6">
                Explore your attention, focus, and executive function patterns through our interactive assessment.
              </p>
              <p className="text-gray-500 mb-8">
                This tool is for educational purposes only and does not provide a clinical diagnosis.
              </p>
            </div>
          </section>
          
          <section className="mb-12">
            <TestLengthSelector onSelect={handleTestLengthSelect} />
          </section>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center" id="about">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Brain size={40} className="text-indigo-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">ADHD Self-Assessment Tool</h1>
            <p className="text-xl text-gray-600 mb-6">
              Explore your attention, focus, and executive function patterns through our interactive assessment.
            </p>
            <p className="text-gray-500 mb-8">
              Complete all four assessments to receive a comprehensive overview of your ADHD symptom profile.
              This tool is for educational purposes only and does not provide a clinical diagnosis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#assessment" 
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Start Assessment
                <ArrowDown size={16} className="ml-1" />
              </a>
              
              <button 
                onClick={() => setTestLength(null)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Change Test Length ({testLength})
              </button>
            </div>
          </div>
        </section>
        
        <section id="assessment" className="mb-12">
          <ProgressBar 
            completedTiles={userProfile.completedTiles.length} 
            totalTiles={surveyTiles.length} 
          />
          
          <AssessmentGrid 
            tiles={tiles} 
            userProfile={userProfile} 
            onSurveyComplete={handleSurveyComplete} 
          />
        </section>
        
        <section id="resources" className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Additional Resources</h2>
            <p className="text-gray-600 mb-4">
              If you're concerned about ADHD symptoms, consider exploring these resources or consulting with a healthcare professional.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-800 mb-2">Understanding ADHD</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Learn about the science behind ADHD, its causes, and how it affects the brain.
                </p>
                <a 
                  href="https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Learn More →
                </a>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-800 mb-2">Professional Support</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Find qualified healthcare professionals who specialize in ADHD diagnosis and treatment.
                </p>
                <a 
                  href="https://chadd.org/professional-directory/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Find Professionals →
                </a>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-800 mb-2">Support Communities</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Connect with others who understand ADHD challenges and share experiences.
                </p>
                <a 
                  href="https://add.org/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Join Community →
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {allComplete && <CompletionConfetti isComplete={allComplete} />}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;