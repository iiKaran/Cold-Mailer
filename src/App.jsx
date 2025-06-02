import React from 'react';
import EmailComposer from './Components/EmailComposer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6">
        <EmailComposer />
      </div>
    </ThemeProvider>
  );
}

export default App;