import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Sidebar from './useSidebar';
const generateSchedule = () => {
  const schedule = {};
  const today = new Date();
  const timeSlots = [
    "09:00", "10:00", "11:00",
    "13:00", "14:00", "15:00",
    "16:00", "17:00"
  ];

  for (let i = 0; i <= 6; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD formatı
    schedule[dateStr] = timeSlots;
  }

  return schedule;
};

const schedule = generateSchedule();

const SimpleSchedule = () => {
  return (
     <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-70">
        <h1 className="text-2xl font-semibold mb-4">Reservation List</h1>
    <div className="p-4">
      {Object.entries(schedule).map(([date, times]) => (
        <div key={date} className="mb-4 border-2 border-black-300 p-2 rounded shadow-sm">
          <h3 className="font-semibold mb-2">{date}</h3>
          <div className="flex flex-wrap gap-2">
            {times.map((time) => (
              <span
                key={time}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
              >
                {time}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
        </div>
        </div>
  );
};

export default SimpleSchedule;
