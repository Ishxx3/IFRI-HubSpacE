import React, { useState } from 'react';
import { EventCard } from './EventCard';
import type { Event } from '../../types';

const SAMPLE_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Hackathon IA & Robotique',
    description: 'Participez à notre hackathon annuel centré sur l\'intelligence artificielle et la robotique. Prix à gagner !',
    date: '2024-04-15',
    type: 'hackathon',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Workshop Cybersécurité',
    description: 'Découvrez les dernières tendances en matière de sécurité informatique avec nos experts.',
    date: '2024-03-28',
    type: 'workshop',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    status: 'current'
  },
  {
    id: '3',
    title: 'Rencontre Alumni IFRI',
    description: 'Échangez avec nos anciens étudiants sur leurs parcours professionnels.',
    date: '2024-03-10',
    type: 'alumni',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    status: 'past'
  }
];

export function EventsList() {
  const [filter, setFilter] = useState<'all' | 'past' | 'current' | 'upcoming'>('all');
  
  const filteredEvents = SAMPLE_EVENTS.filter(event => 
    filter === 'all' ? true : event.status === filter
  );

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Événements IFRI</h2>
          <p className="mt-4 text-lg text-gray-600">
            Découvrez tous les événements passés et à venir de l'institut
          </p>
        </div>

        <div className="flex justify-center mb-8 space-x-4">
          {(['all', 'upcoming', 'current', 'past'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md ${
                filter === status
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'Tous' 
               : status === 'upcoming' ? 'À venir'
               : status === 'current' ? 'En cours'
               : 'Passés'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}