import React, { useRef, useState } from 'react';
import { FileJson } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/json') {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 transition-all duration-200 text-center
        ${isDragging 
          ? 'border-blue-500 bg-blue-50' 
          : fileName 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={triggerFileInput}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="application/json"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
          <FileJson className="h-6 w-6 text-indigo-600" />
        </div>
        
        {fileName ? (
          <>
            <p className="text-sm font-medium text-gray-700">File loaded: <span className="font-semibold text-green-600">{fileName}</span></p>
            <p className="text-xs text-gray-500">Click to change file</p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-700">Upload your JSON file with company details</p>
            <p className="text-xs text-gray-500">Click to browse or drop your file here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploader;