import React from 'react';
import ResumeForm from './components/ResumeForm';
import Header from './components/Header';
import Templates from './components/Templates';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
                Resume Generator
              </h1>
              <p className="text-center text-gray-600 mb-8">
                Create a professional resume tailored to your dream job in minutes
              </p>
              <ResumeForm />
            </div>
          </div>
        </div>
        <Templates />
      </main>
    </div>
  );
}

export default App; 