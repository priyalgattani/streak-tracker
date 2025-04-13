import { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/calendar.css';

const StreakCalendar = ({ activityData, currentMonth: initialMonth }) => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth || new Date());
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push({ empty: true });
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        day,
      });
    }

    // Add empty cells to complete the last week if needed
    const remainingDays = (7 - (days.length % 7)) % 7;
    for (let i = 0; i < remainingDays; i++) {
      days.push({ empty: true });
    }

    return days;
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isActive = (date) => {
    if (!date || !activityData) return false;
    return activityData.some(activity => 
      new Date(activity.date).toDateString() === date.toDateString()
    );
  };

  return (
    <div className="calendar-container">
      <div className="flex items-center justify-center gap-8 mb-8" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <button 
          className="calendar-navigation" 
          onClick={prevMonth}
        >
          {'<'}
        </button>
        <span className="text-base font-normal">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button 
          className="calendar-navigation" 
          onClick={nextMonth}
        >
          {'>'}
        </button>
      </div>

      <div className="calendar-grid">
        {weekDays.map(day => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        
        {getDaysInMonth().map((dayData, index) => (
          <motion.div
            key={index}
            className={`calendar-day ${dayData.empty ? 'inactive bg-gray-50' : ''} 
              ${isToday(dayData.date) ? 'today' : ''} 
              ${isActive(dayData.date) ? 'active' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.01 }}
          >
            {!dayData.empty && dayData.day}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StreakCalendar; 