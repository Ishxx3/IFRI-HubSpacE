import React, { useState } from 'react';
import { Clock, MapPin, User } from 'lucide-react';

const SAMPLE_SCHEDULE = {
  weekNumber: 12,
  days: [
    {
      day: 'Lundi',
      courses: [
        {
          startTime: '08:00',
          endTime: '10:00',
          subject: 'Cybersécurité',
          professor: 'Dr. Johnson',
          room: 'Salle 101'
        },
        {
          startTime: '10:15',
          endTime: '12:15',
          subject: 'Développement Web',
          professor: 'Prof. Smith',
          room: 'Lab 3'
        }
      ]
    },
    {
      day: 'Mardi',
      courses: [
        {
          startTime: '13:00',
          endTime: '15:00',
          subject: 'Base de données',
          professor: 'Dr. Davis',
          room: 'Salle 205'
        }
      ]
    }
  ]
};

export function Schedule() {
  const [currentWeek] = useState(SAMPLE_SCHEDULE);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Emploi du temps - Semaine {currentWeek.weekNumber}
        </h2>
      </div>

      <div className="space-y-6">
        {currentWeek.days.map((day, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-600 text-white px-6 py-3">
              <h3 className="text-lg font-semibold">{day.day}</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {day.courses.map((course, courseIndex) => (
                <div key={courseIndex} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-indigo-600" />
                      <span className="text-gray-900">
                        {course.startTime} - {course.endTime}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                      {course.subject}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">{course.professor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">{course.room}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}