import React from 'react';
import { Bell, Calendar, FileText, BookOpen } from 'lucide-react';

const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    type: 'event',
    title: 'Nouveau Hackathon',
    message: 'Un nouveau hackathon IA & Robotique a été annoncé',
    date: '2024-03-20',
    read: false,
  },
  {
    id: 2,
    type: 'document',
    title: 'Document Prêt',
    message: 'Votre certificat de scolarité est prêt',
    date: '2024-03-19',
    read: true,
  },
  {
    id: 3,
    type: 'course',
    title: 'Nouveau Cours',
    message: 'Le cours de Cybersécurité a été mis à jour',
    date: '2024-03-18',
    read: true,
  },
];

export function Notifications() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
      
      <div className="space-y-4">
        {SAMPLE_NOTIFICATIONS.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow p-4 ${
              !notification.read ? 'border-l-4 border-indigo-600' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-indigo-100 rounded-full">
                {notification.type === 'event' && <Calendar className="h-5 w-5 text-indigo-600" />}
                {notification.type === 'document' && <FileText className="h-5 w-5 text-indigo-600" />}
                {notification.type === 'course' && <BookOpen className="h-5 w-5 text-indigo-600" />}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                <p className="text-gray-600">{notification.message}</p>
                <span className="text-sm text-gray-500">
                  {new Date(notification.date).toLocaleDateString('fr-FR')}
                </span>
              </div>
              
              {!notification.read && (
                <div className="h-2 w-2 bg-indigo-600 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}