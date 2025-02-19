import React, { useState } from 'react';
import { Book, FileText, Download, Search } from 'lucide-react';
import type { Course } from '../../types';

const SAMPLE_COURSES: Course[] = [
  {
    id: '1',
    title: 'Introduction à la Cybersécurité',
    program: 'Securite Informatique',
    year: 1,
    type: 'course',
    subject: 'Sécurité',
    uploadDate: '2024-03-01',
    downloadUrl: '#'
  },
  {
    id: '2',
    title: 'Développement Web Avancé',
    program: 'Internet et Multimedia',
    year: 2,
    type: 'course',
    subject: 'Web',
    uploadDate: '2024-03-05',
    downloadUrl: '#'
  },
  {
    id: '3',
    title: 'Examen IoT 2023',
    program: 'Systemes Embarques',
    year: 3,
    type: 'exam',
    subject: 'IoT',
    uploadDate: '2024-03-10',
    downloadUrl: '#'
  }
];

export function CourseLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'course' | 'exam'>('all');

  const filteredCourses = SAMPLE_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === 'all' || course.program === selectedProgram;
    const matchesType = selectedType === 'all' || course.type === selectedType;
    
    return matchesSearch && matchesProgram && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bibliothèque de Cours et Épreuves</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">Tous les programmes</option>
            <option value="Internet et Multimedia">Internet et Multimédia</option>
            <option value="Genie Logiciel">Génie Logiciel</option>
            <option value="Systemes Embarques">Systèmes Embarqués</option>
            <option value="Securite Informatique">Sécurité Informatique</option>
            <option value="SIRI">SIRI</option>
          </select>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as 'all' | 'course' | 'exam')}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">Tous les types</option>
            <option value="course">Cours</option>
            <option value="exam">Épreuves</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {course.type === 'course' ? (
                    <Book className="h-6 w-6 text-indigo-600" />
                  ) : (
                    <FileText className="h-6 w-6 text-indigo-600" />
                  )}
                  <span className="ml-2 text-sm font-medium text-indigo-600">
                    {course.type === 'course' ? 'Cours' : 'Épreuve'}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  Année {course.year}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
              
              <div className="mb-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                  {course.program}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Ajouté le {new Date(course.uploadDate).toLocaleDateString('fr-FR')}
                </span>
                <button className="flex items-center text-indigo-600 hover:text-indigo-800">
                  <Download className="h-5 w-5 mr-1" />
                  Télécharger
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}