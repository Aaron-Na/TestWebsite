import React, { useState } from 'react';
import Calendar from './components/Calendar';
import Sidebar from './components/Sidebar';
import './App.css';

// Sample data for demonstration
const sampleAssignments = [
  {
    id: '1',
    title: 'Math Homework',
    course: 'Calculus I',
    dueDate: new Date(2025, 0, 22), // January 22, 2025
    priority: 'high' as const,
    weight: 15,
    difficulty: 7,
    completed: false
  },
  {
    id: '2',
    title: 'Essay Draft',
    course: 'English Literature',
    dueDate: new Date(2025, 0, 25), // January 25, 2025
    priority: 'medium' as const,
    weight: 25,
    difficulty: 6,
    completed: false
  },
  {
    id: '3',
    title: 'Lab Report',
    course: 'Chemistry',
    dueDate: new Date(2025, 0, 28), // January 28, 2025
    priority: 'high' as const,
    weight: 20,
    difficulty: 8,
    completed: false
  },
  {
    id: '4',
    title: 'Quiz Preparation',
    course: 'History',
    dueDate: new Date(2025, 0, 30), // January 30, 2025
    priority: 'low' as const,
    weight: 10,
    difficulty: 4,
    completed: false
  }
];

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Calendar assignments={sampleAssignments} />;
      case 'study-plans':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Study Plans</h1>
            <p className="text-gray-600">AI-generated study plans will appear here.</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Analytics</h1>
            <p className="text-gray-600">Your study analytics and progress tracking will appear here.</p>
          </div>
        );
      case 'add-assignment':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Add Assignment</h1>
            <p className="text-gray-600">Assignment creation form will appear here.</p>
          </div>
        );
      case 'generate-plan':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Generate Study Plan</h1>
            <p className="text-gray-600">AI study plan generation will appear here.</p>
          </div>
        );
      case 'import-syllabus':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Import Syllabus</h1>
            <p className="text-gray-600">Syllabus upload and parsing will appear here.</p>
          </div>
        );
      default:
        return <Calendar assignments={sampleAssignments} />;
    }
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="transition-all duration-300">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
