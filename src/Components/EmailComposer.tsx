import React, { useState } from "react";
import FileUploader from "./FileUploader";
import EmailPreview from "./EmailPreview";
import EmailControls from "./EmailControls";
import { JobApplication } from "../types";
import ProgressIndicator from "./ProgressIndicator";

const EmailComposer: React.FC = () => {
  const [jsonData, setJsonData] = useState<JobApplication[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finalEmail, setFinalEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [resumeLink, setResumeLink] = useState("");

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const json = JSON.parse(event.target.result as string);
        setJsonData(json);
        setCurrentIndex(0);
        setFinalEmail("");
        setIsSent(false);
      }
    };
    reader.readAsText(file);
  };

  const generateEmail = () => {
    if (!jsonData || !jsonData[currentIndex]) return;
    
    const { company, email, role } = jsonData[currentIndex];
    const resumeLinkText = resumeLink ? `\n\nYou can view my resume here: ${resumeLink}` : "";
    
    const message = `Dear Hiring Team at ${company},

My name is Karan Kumar, and I have hands-on experience working in the tech industry, with a strong foundation in full-stack development (MERN), cloud technologies, and scalable systems. I am actively seeking a ${role} opportunity where I can contribute effectively and grow with a forward-thinking team.

I've attached my resume for your consideration. I'd be grateful if you could let me know of any suitable openings at ${company}.${resumeLinkText}

Looking forward to hearing from you.

Warm regards,
Karan Kumar
📞 +91-9888563650
📧 karankumar560k@gmail.com
www.linkedin.com/in/karan-sehgal-tech | https://github.com/iiKaran \n
Resume Link: https://drive.google.com/file/d/1IL4KDMwoiaCxyIr7hMbQE5t7u0bK9D3A/view?usp=drive_link`;
    setFinalEmail(message);
    setIsSent(false);
  };
  
  const sendMail = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          to: jsonData![currentIndex].email,
          subject: `Exploring ${jsonData![currentIndex].role} Opportunities at ${jsonData![currentIndex].company}`,
          text: finalEmail
        })
      });

      const result = await response.text();
      console.log(result);
      setIsLoading(false);
      setIsSent(true);
    } catch (error) {
      console.error("Sending failed", error);
      setIsLoading(false);
    }
  };

  const nextEmail = () => {
    if (jsonData && currentIndex + 1 < jsonData.length) {
      setCurrentIndex(currentIndex + 1);
      setFinalEmail("");
      setIsSent(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
      <div className="p-1 bg-gradient-to-r from-indigo-800 to-blue-700"></div>
      <div className="p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Professional Email Composer</h1>
        <p className="text-gray-600 mb-6">Easily create and send job application emails</p>

        {jsonData && (
          <ProgressIndicator 
            currentIndex={currentIndex} 
            totalCount={jsonData.length} 
            isSent={isSent}
          />
        )}

        <div className="space-y-6">
          <FileUploader onFileSelect={handleFileChange} />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/3">
              {jsonData && jsonData[currentIndex] && (
                <EmailControls 
                  currentApplication={jsonData[currentIndex]}
                  resumeLink={resumeLink}
                  setResumeLink={setResumeLink}
                  onGenerateEmail={generateEmail}
                  onSendEmail={sendMail}
                  onNextEmail={nextEmail}
                  isLoading={isLoading}
                  isSent={isSent}
                  hasNext={jsonData && currentIndex + 1 < jsonData.length}
                  hasEmailContent={!!finalEmail}
                />
              )}
            </div>
            
            <div className="w-full sm:w-2/3">
              {finalEmail && (
                <EmailPreview 
                  emailContent={finalEmail} 
                  onEmailChange={setFinalEmail} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailComposer;