import React, { useState, useRef } from 'react';
import { Download, Mail, Loader2 } from 'lucide-react';
import { CategoryScore } from '../types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ResultsExportProps {
  scores: CategoryScore[];
  overallScore: number;
  overallPercentage: number;
}

const ResultsExport: React.FC<ResultsExportProps> = ({ 
  scores, 
  overallScore, 
  overallPercentage 
}) => {
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [isExporting, setIsExporting] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const getScoreInterpretation = (percentage: number) => {
    if (percentage < 25) return { text: 'Minimal', color: 'text-green-600' };
    if (percentage < 50) return { text: 'Mild', color: 'text-yellow-600' };
    if (percentage < 75) return { text: 'Moderate', color: 'text-orange-600' };
    return { text: 'Significant', color: 'text-red-600' };
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailStatus('sending');
    
    // Simulate email sending
    setTimeout(() => {
      setEmailStatus('success');
      setTimeout(() => {
        setShowEmailForm(false);
        setEmailStatus('idle');
        setEmail('');
      }, 2000);
    }, 1500);
  };

  const exportToPDF = async () => {
    if (!resultsRef.current) return;
    
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('ADHD-Assessment-Results.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const interpretation = getScoreInterpretation(overallPercentage);

  return (
    <div className="mt-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <button
          onClick={exportToPDF}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
        >
          {isExporting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Download size={18} />
          )}
          {isExporting ? 'Generating PDF...' : 'Download PDF Report'}
        </button>
        
        <button
          onClick={() => setShowEmailForm(true)}
          className="flex items-center justify-center gap-2 bg-white border border-indigo-600 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 transition-colors"
        >
          <Mail size={18} />
          Email Results
        </button>
      </div>
      
      {showEmailForm && (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h4 className="font-medium text-gray-800 mb-3">Email Your Results</h4>
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="your@email.com"
                disabled={emailStatus === 'sending' || emailStatus === 'success'}
              />
            </div>
            
            <div className="flex items-center">
              <button
                type="submit"
                disabled={emailStatus === 'sending' || emailStatus === 'success'}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 flex items-center gap-2"
              >
                {emailStatus === 'sending' && (
                  <Loader2 size={18} className="animate-spin" />
                )}
                {emailStatus === 'success' ? 'Email Sent!' : 'Send Results'}
              </button>
              
              {emailStatus === 'idle' && (
                <button
                  type="button"
                  onClick={() => setShowEmailForm(false)}
                  className="ml-3 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}
      
      {/* Results content for PDF export */}
      <div ref={resultsRef} className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">ADHD Assessment Results</h2>
          <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-6">
          <h3 className="text-gray-700 mb-2">Overall Assessment</h3>
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
          <h3 className="font-medium text-gray-800 mb-3">Domain Breakdown:</h3>
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
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="font-medium text-gray-800 mb-3">What These Results Mean:</h3>
          <p className="text-gray-700 mb-3">
            This assessment provides an educational overview of potential ADHD-related symptoms across four key domains:
            inattention, hyperactivity, impulsivity, and executive function.
          </p>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-green-600">Minimal (0-24%):</span> Few symptoms detected in this domain.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-yellow-600">Mild (25-49%):</span> Some symptoms present that may warrant attention.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-orange-600">Moderate (50-74%):</span> Notable symptoms that may impact daily functioning.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-red-600">Significant (75-100%):</span> Strong indication of symptoms in this domain.
            </p>
          </div>
          
          <p className="text-sm text-gray-600 italic">
            Note: This assessment is for educational purposes only and is not a clinical diagnosis.
            If you have concerns about ADHD, please consult with a healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsExport;