import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  { 
    id: 1, 
    text: "Bonjour! Je suis l'assistant virtuel de l'IFRI. Je peux vous aider avec :", 
    isBot: true 
  },
  {
    id: 2,
    text: "1. Informations sur les formations\n2. Procédures d'inscription\n3. Vie étudiante\n4. Événements à venir\n5. Questions fréquentes",
    isBot: true
  }
];

const KEYWORDS = {
  formations: ["formation", "licence", "master", "étude", "programme"],
  inscription: ["inscription", "admission", "candidature", "dossier"],
  contact: ["contact", "email", "téléphone", "adresse"],
  evenements: ["événement", "hackathon", "conférence", "workshop"],
};

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
   - Génie Logiciel
   - Sécurité Informatique
   - Internet et Multimédia
   - Systèmes Embarqués
   - Intelligence Artificielle
   - SIRI

2. Masters (2 ans) :
   - Systèmes d'Information et Réseaux Informatiques
   - Génie Logiciel
   - Sécurité Informatique

Quelle formation vous intéresse en particulier ?`;
    }

    // Check for inscription related questions
    if (KEYWORDS.inscription.some(keyword => lowercaseMsg.includes(keyword))) {
      return `Pour s'inscrire à l'IFRI, voici la procédure :

1. Remplir le formulaire de candidature en ligne
2. Fournir les documents requis :
   - Relevés de notes
   - Diplômes
   - Pièce d'identité
3. Passer l'entretien de sélection

Voulez-vous plus de détails sur une étape particulière ?`;
    }

    // Check for contact related questions
    if (KEYWORDS.contact.some(keyword => lowercaseMsg.includes(keyword))) {
      return `Vous pouvez contacter l'IFRI :

- Par email : contact@ifri-uac.bj
- Par téléphone : +229 XX XX XX XX
- Adresse : Campus d'Abomey-Calavi

Notre équipe est disponible du lundi au vendredi, de 8h à 18h.`;
    }

    // Check for events related questions
    if (KEYWORDS.evenements.some(keyword => lowercaseMsg.includes(keyword))) {
      return `Voici les prochains événements à l'IFRI :

1. Hackathon IA & Robotique - 15 avril 2024
2. Workshop Cybersécurité - 28 mars 2024
3. Rencontre Alumni - À venir

Souhaitez-vous plus d'informations sur un événement particulier ?`;
    }

    // Default response
    return "Je ne suis pas sûr de comprendre votre demande. Pouvez-vous reformuler ou choisir parmi ces sujets :\n\n1. Formations\n2. Inscription\n3. Contact\n4. Événements";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), text: newMessage, isBot: false }]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      const response = generateResponse(newMessage);
      setMessages(prev => [...prev, { id: Date.now(), text: response, isBot: true }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-12rem)]">
        <div className="bg-indigo-600 text-white p-4 flex items-center">
          <Bot className="h-6 w-6 mr-2" />
          <h2 className="text-lg font-semibold">Assistant IFRI</h2>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 animate-pulse">
                  Assistant IFRI est en train d'écrire...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="border-t p-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}