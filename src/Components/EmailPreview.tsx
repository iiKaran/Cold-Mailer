import React, { useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';

interface EmailPreviewProps {
  emailContent: string;
  onEmailChange: (content: string) => void;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ emailContent, onEmailChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-resize the textarea based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [emailContent]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onEmailChange(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex items-center">
        <Mail className="h-5 w-5 text-indigo-600 mr-2" />
        <h3 className="text-md font-medium text-gray-800">Email Preview</h3>
      </div>
      
      <div className="p-5">
        <textarea
          ref={textareaRef}
          value={emailContent}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none font-mono text-sm leading-relaxed min-h-[300px] transition-all duration-200"
          placeholder="Your email content will appear here..."
        ></textarea>
      </div>
    </div>
  );
};

export default EmailPreview;