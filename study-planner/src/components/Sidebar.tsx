import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  Calendar, 
  BarChart3, 
  Plus, 
  Brain, 
  Upload,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'study-plans', label: 'Study Plans', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const quickActions = [
    { id: 'add-assignment', label: 'Add Assignment', icon: Plus },
    { id: 'generate-plan', label: 'Generate Plan', icon: Brain },
    { id: 'import-syllabus', label: 'Import Syllabus', icon: Upload },
  ];

  const handleItemClick = (itemId: string) => {
    onViewChange(itemId);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-3 group"
      >
        <div className="transition-all duration-300 group-hover:scale-110">
          {isOpen ? 
            <X size={24} className="text-white transition-transform duration-300 rotate-0 group-hover:rotate-90" /> : 
            <Menu size={24} className="text-white transition-transform duration-300 group-hover:rotate-12" />
          }
        </div>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white shadow-2xl z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 md:w-72
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">Study Planner</h2>
            <p className="text-sm text-gray-600 mt-1 animate-fade-in">Organize your success</p>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Navigation
              </h3>
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`
                        w-full flex items-center px-3 py-2.5 text-left rounded-lg transition-all duration-300 transform
                        ${isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105' 
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900 hover:scale-105 hover:shadow-md'
                        }
                        group relative overflow-hidden hover:-translate-y-1
                      `}
                    >
                      <Icon 
                        size={20} 
                        className={`mr-3 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12 ${
                          isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'
                        }`} 
                      />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <ChevronRight 
                          size={16} 
                          className="ml-auto text-white animate-bounce" 
                        />
                      )}
                      
                      {/* Animated hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10 animate-pulse" />
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-20" />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-1">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleItemClick(action.id)}
                      className="
                        w-full flex items-center px-3 py-2.5 text-left rounded-lg transition-all duration-300 transform
                        text-gray-700 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 
                        hover:text-white hover:shadow-lg hover:scale-105 hover:-translate-y-1
                        group relative overflow-hidden
                      "
                    >
                      <Icon 
                        size={18} 
                        className="mr-3 text-gray-500 group-hover:text-white transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12" 
                      />
                      <span className="font-medium">{action.label}</span>
                      
                      {/* Animated hover effect */}
                      <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <ChevronRight size={14} className="text-white animate-pulse" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-all duration-300">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg">
                <span className="text-white text-sm font-bold group-hover:animate-pulse">A</span>
              </div>
              <div className="transition-all duration-300 group-hover:translate-x-1">
                <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600">Aaron Nash</p>
                <p className="text-xs text-gray-600 group-hover:text-purple-600">Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
