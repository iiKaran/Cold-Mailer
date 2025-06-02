import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface ProgressIndicatorProps {
  currentIndex: number;
  totalCount: number;
  isSent: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentIndex, 
  totalCount,
  isSent
}) => {
  const percentage = ((currentIndex + (isSent ? 1 : 0)) / totalCount) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Progress: {currentIndex + 1} of {totalCount} emails
        </span>
        <span className="text-sm font-medium text-indigo-600">
          {Math.round(percentage)}% Complete
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="flex mt-4 justify-center">
        {Array.from({ length: Math.min(totalCount, 10) }).map((_, index) => {
          // Only show a few indicators if there are many emails
          if (totalCount > 10 && index > 4 && index < totalCount - 3) {
            return index === 5 ? (
              <div key={index} className="mx-1 text-gray-400">...</div>
            ) : null;
          }
          
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div 
              key={index} 
              className={`mx-1 transition-all duration-300 ${
                isCurrent ? 'scale-110 text-indigo-600' : 
                isCompleted ? 'text-green-500' : 'text-gray-300'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;