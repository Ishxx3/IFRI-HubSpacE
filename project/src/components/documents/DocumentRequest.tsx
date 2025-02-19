import React, { useState } from 'react';
import { FileText, Clock, Check, X } from 'lucide-react';
import type { Document } from '../../types';

const SAMPLE_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Certificat de Scolarité 2023-2024',
    type: 'certificate',
    status: 'ready',
    requestDate: '2024-03-15',
    deliveryDate: '2024-03-17'
  },
  {
    id: '2',
    title: 'Relevé de Notes S1 2023-2024',
    type: 'transcript',
    status: 'pending',
    requestDate: '2024-03-18'
  },
  {
    id: '3',
    title: 'Attestation de Réussite',
    type: 'attestation',
    status: 'delivered',
    requestDate: '2024-03-10',
    deliveryDate: '2024-03-12'
  }
];

export function DocumentRequest() {
  const [documents] = useState<Document[]>(SAMPLE_DOCUMENTS);
  const [selectedType, setSelectedType] = useState<Document['type']>('certificate');

  const statusIcons = {
    pending: <Clock className="h-5 w-5 text-yellow-500" />,
    ready: <Check className="h-5 w-5 text-green-500" />,
    delivered: <FileText className="h-5 w-5 text-blue-500" />
  };

  const statusText = {
    pending: 'En attente',
    ready: 'Prêt',
    delivered: 'Délivré'
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Demande de Documents</h2>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de document
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as Document['type'])}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="certificate">Certificat de Scolarité</option>
              <option value="transcript">Relevé de Notes</option>
              <option value="attestation">Attestation</option>
            </select>
          </div>
          
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
            Soumettre la demande
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Mes Demandes</h3>
        
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                {statusIcons[doc.status]}
                <div>
                  <h4 className="font-medium text-gray-900">{doc.title}</h4>
                  <p className="text-sm text-gray-500">
                    Demandé le {new Date(doc.requestDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${doc.status === 'ready' ? 'bg-green-100 text-green-800' : ''}
                  ${doc.status === 'delivered' ? 'bg-blue-100 text-blue-800' : ''}
                `}>
                  {statusText[doc.status]}
                </span>
                
                {doc.status === 'ready' && (
                  <button className="ml-4 text-indigo-600 hover:text-indigo-800">
                    Télécharger
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}