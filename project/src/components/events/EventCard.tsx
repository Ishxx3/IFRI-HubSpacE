import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { Event } from '../../types';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const statusColors = {
    past: 'bg-gray-100 text-gray-800',
    current: 'bg-green-100 text-green-800',
    upcoming: 'bg-blue-100 text-blue-800'
  };

  const typeIcons = {
    conference: '🎤',
    hackathon: '💻',
    workshop: '🔧',
    alumni: '👥'
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={event.image} 
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[event.status]}`}>
            {event.status === 'past' ? 'Passé' : event.status === 'current' ? 'En cours' : 'À venir'}
          </span>
          <span className="text-2xl" role="img" aria-label={event.type}>
            {typeIcons[event.type]}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-500">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{new Date(event.date).toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          {event.status !== 'past' && (
            <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
              {event.status === 'current' ? 'Rejoindre maintenant' : 'S\'inscrire'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}