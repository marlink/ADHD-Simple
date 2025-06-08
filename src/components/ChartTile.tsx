import React from 'react';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement
} from 'chart.js';
import { Radar, Bar, Pie } from 'react-chartjs-2';
import { CategoryScore } from '../types';
import * as Icons from 'lucide-react';

ChartJS.register(
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement
);

interface ChartTileProps {
  title: string;
  chartType: 'radar' | 'bar' | 'pie';
  scores: CategoryScore[];
  icon?: string;
  completed: boolean;
}

const categoryColors = {
  inattention: 'rgba(255, 99, 132, 0.7)',
  hyperactivity: 'rgba(54, 162, 235, 0.7)',
  impulsivity: 'rgba(255, 206, 86, 0.7)',
  executive: 'rgba(75, 192, 192, 0.7)'
};

const categoryLabels = {
  inattention: 'Inattention',
  hyperactivity: 'Hyperactivity',
  impulsivity: 'Impulsivity',
  executive: 'Executive Function'
};

const ChartTile: React.FC<ChartTileProps> = ({ 
  title, 
  chartType, 
  scores, 
  icon,
  completed 
}) => {
  // Dynamically get the icon component
  const IconComponent = icon && Icons[icon as keyof typeof Icons] ? 
    Icons[icon as keyof typeof Icons] : 
    Icons.BarChart;

  const hasData = scores.length > 0;

  const radarData = {
    labels: scores.map(score => categoryLabels[score.category as keyof typeof categoryLabels] || score.category),
    datasets: [
      {
        label: 'Your Score',
        data: scores.map(score => score.percentage),
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)'
      }
    ]
  };

  const barData = {
    labels: scores.map(score => categoryLabels[score.category as keyof typeof categoryLabels] || score.category),
    datasets: [
      {
        label: 'Score',
        data: scores.map(score => score.score),
        backgroundColor: scores.map(score => 
          categoryColors[score.category as keyof typeof categoryColors] || 'rgba(153, 102, 255, 0.7)'
        ),
        borderWidth: 1
      },
      {
        label: 'Maximum',
        data: scores.map(score => score.maxScore),
        backgroundColor: 'rgba(201, 203, 207, 0.5)',
        borderWidth: 1
      }
    ]
  };

  const pieData = {
    labels: scores.map(score => categoryLabels[score.category as keyof typeof categoryLabels] || score.category),
    datasets: [
      {
        data: scores.map(score => score.percentage),
        backgroundColor: scores.map(score => 
          categoryColors[score.category as keyof typeof categoryColors] || 'rgba(153, 102, 255, 0.7)'
        ),
        borderWidth: 1
      }
    ]
  };

  const renderChart = () => {
    if (!hasData) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <IconComponent className="text-gray-400 mb-2" size={32} />
          <p className="text-gray-500">Complete assessments to see your results</p>
        </div>
      );
    }

    switch (chartType) {
      case 'radar':
        return <Radar data={radarData} options={{ 
          scales: { r: { min: 0, max: 100, ticks: { stepSize: 20 } } },
          plugins: { legend: { position: 'bottom' } }
        }} />;
      case 'bar':
        return <Bar data={barData} options={{ 
          scales: { y: { beginAtZero: true } },
          plugins: { legend: { position: 'bottom' } }
        }} />;
      case 'pie':
        return <Pie data={pieData} options={{ 
          plugins: { legend: { position: 'bottom' } }
        }} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <IconComponent className={hasData ? "text-indigo-600" : "text-gray-400"} size={24} />
      </div>
      
      <div className="flex-grow flex items-center justify-center">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartTile;