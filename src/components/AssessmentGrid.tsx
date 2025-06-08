import React from 'react';
import SurveyTile from './SurveyTile';
import ChartTile from './ChartTile';
import InfoTile from './InfoTile';
import { AssessmentTile, Answer, CategoryScore, UserProfile } from '../types';

interface AssessmentGridProps {
  tiles: AssessmentTile[];
  userProfile: UserProfile;
  onSurveyComplete: (tileId: string, answers: Answer[]) => void;
}

const AssessmentGrid: React.FC<AssessmentGridProps> = ({ 
  tiles, 
  userProfile, 
  onSurveyComplete 
}) => {
  const handleTileComplete = (tileId: string, answers: Answer[]) => {
    onSurveyComplete(tileId, answers);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tiles.map((tile) => {
        const isCompleted = userProfile.completedTiles.includes(tile.id);
        
        switch (tile.type) {
          case 'survey':
            return (
              <SurveyTile
                key={tile.id}
                title={tile.title}
                questions={tile.questions || []}
                category={tile.category || ''}
                icon={tile.icon}
                onComplete={(answers) => handleTileComplete(tile.id, answers)}
                completed={isCompleted}
              />
            );
            
          case 'chart':
            return (
              <ChartTile
                key={tile.id}
                title={tile.title}
                chartType={tile.chartType || 'bar'}
                scores={userProfile.scores}
                icon={tile.icon}
                completed={userProfile.scores.length > 0}
              />
            );
            
          case 'info':
            if (tile.id === 'results-summary') {
              return (
                <InfoTile
                  key={tile.id}
                  title={tile.title}
                  type={tile.id as 'results-summary'}
                  icon={tile.icon}
                  scores={userProfile.scores}
                  overallScore={userProfile.overallScore}
                  overallPercentage={userProfile.overallPercentage}
                />
              );
            }
            
            return (
              <InfoTile
                key={tile.id}
                title={tile.title}
                type={tile.id as 'adhd-info'}
                icon={tile.icon}
              />
            );
            
          default:
            return null;
        }
      })}
    </div>
  );
};

export default AssessmentGrid;