import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, BookOpen, Clock, AlertCircle } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  weight: number;
  difficulty: number;
  completed: boolean;
}

interface CalendarProps {
  assignments?: Assignment[];
}

const Calendar: React.FC<CalendarProps> = ({ assignments = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Generate calendar days
  const calendarDays = [];
  
  // Previous month's trailing days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth, -i);
    calendarDays.push({ date, isCurrentMonth: false });
  }
  
  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    calendarDays.push({ date, isCurrentMonth: true });
  }
  
  // Next month's leading days
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(currentYear, currentMonth + 1, day);
    calendarDays.push({ date, isCurrentMonth: false });
  }

  const getAssignmentsForDate = (date: Date) => {
    return assignments.filter(assignment => 
      assignment.dueDate.toDateString() === date.toDateString()
    );
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div>
          <h1 className="title">Study Planner</h1>
          <p className="subtitle">Organize your academic success</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
        >
          <Plus size={20} className="inline mr-2 transition-transform duration-300 group-hover:rotate-90" />
          Add Assignment
        </button>
      </div>

      {/* Calendar Navigation */}
      <div className="nav">
        <button
          onClick={() => navigateMonth('prev')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-x-1 group"
        >
          <ChevronLeft size={24} className="transition-transform duration-300 group-hover:-translate-x-1" />
        </button>
        
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        
        <button
          onClick={() => navigateMonth('next')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:translate-x-1 group"
        >
          <ChevronRight size={24} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Week Day Headers */}
        <div className="grid grid-cols-7 calendar-header">
          {weekDays.map(day => (
            <div key={day} className="p-4 text-center font-semibold text-gray-700 border-r border-gray-200">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((dayInfo, index) => {
            const dayAssignments = getAssignmentsForDate(dayInfo.date);
            const hasAssignments = dayAssignments.length > 0;
            const isCurrentDay = isToday(dayInfo.date);
            
            return (
              <div
                key={index}
                onClick={() => setSelectedDate(dayInfo.date)}
                className={`
                  p-4 min-h-[100px] border-r border-b border-gray-200 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50
                  ${!dayInfo.isCurrentMonth ? 'text-gray-400 bg-gray-50 hover:bg-gray-100' : 'hover:-translate-y-1'}
                  ${isCurrentDay ? 'bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-400 shadow-md' : ''}
                  ${hasAssignments ? 'bg-gradient-to-br from-green-50 to-blue-50' : ''}
                `}
              >
                <div className="flex justify-between items-start h-full">
                  <span className={`font-bold text-lg transition-all duration-300 ${isCurrentDay ? 'text-blue-600 animate-pulse' : 'group-hover:text-purple-600'}`}>
                    {dayInfo.date.getDate()}
                  </span>
                  
                  {hasAssignments && (
                    <div className="flex flex-col gap-1">
                      {dayAssignments.slice(0, 2).map((assignment, idx) => (
                        <div
                          key={assignment.id}
                          className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-150 animate-pulse ${
                            assignment.priority === 'high' ? 'bg-gradient-to-r from-red-400 to-pink-500 shadow-lg' :
                            assignment.priority === 'medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md' :
                            'bg-gradient-to-r from-green-400 to-blue-500 shadow-sm'
                          }`}
                          title={`${assignment.title} - ${assignment.course}`}
                        />
                      ))}
                      {dayAssignments.length > 2 && (
                        <span className="text-xs text-gray-500">+{dayAssignments.length - 2}</span>
                      )}
                    </div>
                  )}
                </div>
                
                {hasAssignments && (
                  <div className="mt-1">
                    {dayAssignments.slice(0, 1).map(assignment => (
                      <div key={assignment.id} className="text-xs font-medium text-gray-700 truncate bg-white bg-opacity-70 px-2 py-1 rounded-md shadow-sm transition-all duration-300 hover:bg-opacity-100 hover:shadow-md">
                        {assignment.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md-grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-blue-50 to-purple-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer">
          <BookOpen className="text-blue-600 group-hover:text-purple-600 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Total Assignments</h3>
            <p className="text-2xl font-bold text-blue-600 group-hover:text-purple-600 transition-colors duration-300 animate-pulse">{assignments.length}</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer">
          <Clock className="text-yellow-600 group-hover:text-orange-600 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">Due This Week</h3>
            <p className="text-2xl font-bold text-yellow-600 group-hover:text-orange-600 transition-colors duration-300 animate-pulse">
              {assignments.filter(a => {
                const weekFromNow = new Date();
                weekFromNow.setDate(weekFromNow.getDate() + 7);
                return a.dueDate <= weekFromNow && a.dueDate >= today;
              }).length}
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-pink-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer">
          <AlertCircle className="text-red-600 group-hover:text-pink-600 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300">High Priority</h3>
            <p className="text-2xl font-bold text-red-600 group-hover:text-pink-600 transition-colors duration-300 animate-pulse">
              {assignments.filter(a => a.priority === 'high').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
