import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const CONTACT_INFO = {
  email: 'contact@ifri-uac.bj',
  phone: '+229 XX XX XX XX',
  address: 'Campus d\'Abomey-Calavi',
  hours: 'Lundi - Vendredi: 8h - 18h'
};

const KEYWORDS = {
  formations: ['formation', 'licence', 'master', 'étude', 'programme', 'filière'],
  inscription: ['inscription', 'admission', 'candidature', 'dossier'],
  contact: ['contact', 'email', 'téléphone', 'adresse', 'horaire'],
  evenements: ['événement', 'hackathon', 'conférence', 'workshop'],
  cours: ['cours', 'matière', 'programme', 'enseignement'],
  examens: ['examen', 'évaluation', 'contrôle', 'note'],
  stages: ['stage', 'entreprise', 'pratique', 'expérience']
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour! Je suis l'assistant virtuel de l'IFRI. Comment puis-je vous aider?",
      isBot: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (message: string): string => {
    const lowercaseMsg = message.toLowerCase();

    // Check for formations related questions
    if (KEYWORDS.formations.some(keyword => lowercaseMsg.includes(keyword))) {
      return `L'IFRI propose plusieurs formations :

1. Licences (3 ans) :
   - Génie Logiciel : Développement logiciel et gestion de projets
   - Sécurité Informatique : Protection des systèmes et cybersécurité
   - Internet et Multimédia : Développement web et design numérique
   - Systèmes Embarqués : IoT et systèmes programmables
   - Intelligence Artificielle : IA et machine learning
   - SIRI : Systèmes d'information et réseaux

2. Masters (2 ans) :
   - SIRI : Systèmes d'Information et Réseaux avancés
   - Génie Logiciel : Architecture et direction de projets
   - Sécurité Informatique : Sécurité avancée et gouvernance

Quelle formation vous intéresse en particulier ?`;
    }

    // Check for inscription related questions
    if (KEYWORDS.inscription.some(keyword => lowercaseMsg.includes(keyword))) {
      return `Pour s'inscrire à l'IFRI :

1. Prérequis :
   - Baccalauréat pour la Licence
   - Licence pour le Master
2. Procédure :
   - Créer un compte sur la plateforme
   - Fournir les documents requis
   - Passer l'entretien de sélection

Besoin de plus de détails ?`;
    }

    // Check for contact related questions
    if (KEYWORDS.contact.some(keyword => lowercaseMsg.includes(keyword))) {
      setShowContactInfo(true);
      return `Voici nos informations de contact. Vous pouvez également cliquer sur l'icône de contact pour plus de détails.`;
    }

    // Check for cours related questions
    if (KEYWORDS.cours.some(keyword => lowercaseMsg.includes(keyword))) {
      return `Nos cours sont dispensés par des professeurs expérimentés et des professionnels du secteur. Chaque formation comprend :

- Des cours théoriques
- Des travaux pratiques
- Des projets en groupe
- Des stages en entreprise

Consultez la section "Cours" pour plus de détails.`;
    }

    // Default response
    return `Je comprends votre question sur "${message}". Pour mieux vous aider, pourriez-vous préciser parmi ces sujets :

1. Formations et programmes
2. Procédure d'inscription
3. Contact et informations
4. Cours et enseignements
5. Événements et actualités`;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), text: newMessage, isBot: false }]);
    setNewMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(newMessage);
      setMessages(prev => [...prev, { id: Date.now(), text: response, isBot: true }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#1a237e] text-white p-4 rounded-full shadow-lg hover:bg-primary-hover transition-all duration-300 animate-bounce"
          >
            <Bot className="h-6 w-6" />
          </button>
        )}

        {isOpen && (
          <div className="bg-white rounded-lg shadow-xl w-full sm:w-96 max-h-[80vh] flex flex-col animate-slide-up">
            <div className="bg-[#1a237e] text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center">
                <Bot className="h-6 w-6 mr-2" />
                <h3 className="font-semibold">Assistant IFRI</h3>
              </div>
              <div className="flex items-center space-x-2">
                {showContactInfo && (
                  <button
                    onClick={() => setShowContactInfo(false)}
                    className="text-white hover:text-accent-DEFAULT transition-colors duration-300"
                  >
                    <MapPin className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-accent-DEFAULT transition-colors duration-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-[#1a237e] text-white'
                    }`}
                  >
                    <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start animate-pulse">
                  <div className="bg-gray-100 rounded-lg p-3">
                    Assistant IFRI est en train d'écrire...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {showContactInfo && (
              <div className="border-t border-gray-200 p-4 animate-fade-in">
                <h4 className="font-semibold text-[#1a237e] mb-3">Contact IFRI</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-accent-DEFAULT mr-2" />
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-600 hover:text-[#1a237e]">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-accent-DEFAULT mr-2" />
                    <span className="text-gray-600">{CONTACT_INFO.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-accent-DEFAULT mr-2" />
                    <span className="text-gray-600">{CONTACT_INFO.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 text-accent-DEFAULT mr-2" />
                    <span className="text-gray-600">{CONTACT_INFO.hours}</span>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSend} className="border-t p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 rounded-lg border-gray-300 focus:ring-[#1a237e] focus:border-[#1a237e]"
                />
                <button
                  type="submit"
                  className="bg-[#1a237e] text-white rounded-lg px-4 py-2 hover:bg-primary-hover transition-colors duration-300"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}