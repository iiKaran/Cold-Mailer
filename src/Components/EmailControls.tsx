import React from 'react';
import { Send, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { JobApplication } from '../types'

interface EmailControlsProps {
  currentApplication: JobApplication;
  resumeLink: string;
  setResumeLink: (link: string) => void;
  onGenerateEmail: () => void;
  onSendEmail: () => Promise<void>;
  onNextEmail: () => void;
  isLoading: boolean;
  isSent: boolean;
  hasNext: boolean;
  hasEmailContent: boolean;
}

const EmailControls: React.FC<EmailControlsProps> = ({
  currentApplication,
  resumeLink,
  setResumeLink,
  onGenerateEmail,
  onSendEmail,
  onNextEmail,
  isLoading,
  isSent,
  hasNext,
  hasEmailContent
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-5 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Application Details</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <div className="bg-white px-3 py-2 rounded border border-gray-300 text-gray-800">
            {currentApplication.company}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="bg-white px-3 py-2 rounded border border-gray-300 text-gray-800 truncate">
            {currentApplication.email}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <div className="bg-white px-3 py-2 rounded border border-gray-300 text-gray-800">
            {currentApplication.role}
          </div>
        </div>
        
        <div>
          <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700 mb-1">
            Resume Link (Optional)
          </label>
          <input
            id="resumeLink"
            type="text"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
            placeholder="https://resume.com/my-resume"
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>
        
        <div className="pt-2 space-y-3">
          <button
            onClick={onGenerateEmail}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
          >
            <FileText className="h-4 w-4" />
            Generate Email
          </button>
          
          {hasEmailContent && (
            <>
              {isLoading ? (
                <div className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-500 font-medium py-2 px-4 rounded">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </div>
              ) : isSent ? (
                <div className="w-full flex items-center justify-center gap-2 bg-green-100 text-green-700 font-medium py-2 px-4 rounded">
                  ✅ Email marked as sent!
                </div>
              ) : (
                <button
                  onClick={onSendEmail}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                >
                  <Send className="h-4 w-4" />
                  Send Email
                </button>
              )}
              
              {isSent && hasNext && (
                <button
                  onClick={onNextEmail}
                  className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                >
                  Next Application
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailControls;