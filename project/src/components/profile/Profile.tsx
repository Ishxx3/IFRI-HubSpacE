import React from 'react';
import { User, Mail, BookOpen, Calendar, Phone, Users } from 'lucide-react';
import { getCurrentUser } from '../../lib/authService';

export function Profile() {
  const student = getCurrentUser();

  if (!student) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          Erreur: Impossible de charger le profil
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#1a237e] h-32"></div>
        <div className="px-6 py-4 relative">
          <div className="absolute -top-16 left-6">
            <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center">
              <User className="h-16 w-16 text-gray-400" />
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">
              {student.firstName} {student.lastName}
            </h2>
            <p className="text-gray-600">Matricule: {student.matricule}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#1a237e]" />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#1a237e]" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-[#1a237e]" />
                <span>{student.program}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-[#1a237e]" />
                <span>{student.year}ème année</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}