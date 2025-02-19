import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket,
  Calendar, 
  FileText, 
  MessageSquare, 
  Clock,
  Download,
  Users,
  Bot,
  ChevronRight,
  GraduationCap,
  Building,
  Sparkles,
  Code,
  Shield,
  Globe,
  Cpu,
  Brain,
  Network
} from 'lucide-react';

const programs = {
  license: [
    {
      name: "Génie Logiciel",
      icon: Code,
      description: "Formation axée sur le développement de logiciels, la gestion de projets informatiques et l'ingénierie des systèmes.",
      careers: ["Développeur Full Stack", "Chef de Projet IT", "Architecte Logiciel", "Analyste Programmeur"]
    },
    {
      name: "Sécurité Informatique",
      icon: Shield,
      description: "Formation spécialisée dans la protection des systèmes d'information et la cybersécurité.",
      careers: ["Expert en Cybersécurité", "Pentesteur", "Analyste en Sécurité", "Consultant en Sécurité IT"]
    },
    {
      name: "Internet et Multimédia",
      icon: Globe,
      description: "Formation orientée vers le développement web, le design numérique et les technologies multimédia.",
      careers: ["Développeur Web", "Designer UX/UI", "Intégrateur Web", "Chef de Projet Digital"]
    },
    {
      name: "Systèmes Embarqués",
      icon: Cpu,
      description: "Formation focalisée sur la conception et le développement de systèmes électroniques programmables.",
      careers: ["Ingénieur IoT", "Développeur Embarqué", "Architecte Systèmes", "Ingénieur R&D"]
    },
    {
      name: "Intelligence Artificielle",
      icon: Brain,
      description: "Formation sur les technologies d'IA, le machine learning et le traitement des données.",
      careers: ["Data Scientist", "ML Engineer", "AI Developer", "Research Scientist"]
    },
    {
      name: "SIRI",
      icon: Network,
      description: "Formation en Systèmes d'Information et Réseaux Informatiques.",
      careers: ["Administrateur Réseau", "Architecte SI", "DevOps Engineer", "Cloud Engineer"]
    }
  ],
  master: [
    {
      name: "Systèmes d'Information et Réseaux Informatiques",
      icon: Network,
      description: "Master spécialisé dans la conception et la gestion des infrastructures IT complexes.",
      careers: ["Architecte Cloud", "Expert DevOps", "Consultant IT", "Directeur Technique"]
    },
    {
      name: "Génie Logiciel",
      icon: Code,
      description: "Master axé sur l'architecture logicielle avancée et la direction de projets complexes.",
      careers: ["Architecte Solutions", "Lead Developer", "CTO", "Expert Technique"]
    },
    {
      name: "Sécurité Informatique",
      icon: Shield,
      description: "Master focalisé sur la sécurité avancée et la gouvernance des systèmes d'information.",
      careers: ["RSSI", "Expert Forensics", "Auditeur Sécurité", "Consultant Senior"]
    }
  ]
};

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div 
        className="h-screen bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2944&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a237e]/90 to-[#004d40]/90">
          <div className="h-full flex flex-col items-center justify-center text-center px-4 relative">
            {/* Logo Animation */}
            <div className="mb-8 relative group">
              <div className="absolute inset-0 animate-pulse bg-orange-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <Rocket className="h-20 w-20 text-white transform group-hover:rotate-12 transition-transform duration-300" />
              <Sparkles className="h-8 w-8 text-orange-400 absolute -top-2 -right-2 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in relative">
              <span className="text-orange-400">IFRI</span>hub<span className="text-orange-400">SpacE</span>
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg font-light text-orange-200">
                Institut de Formation et de Recherche en Informatique
              </span>
            </h1>
            
            <p className="text-2xl text-orange-200 mb-4 animate-slide-up italic">
              "Nous façonnons les innovateurs du numérique de demain"
            </p>

            <p className="text-xl text-white mb-8 max-w-3xl animate-slide-up delay-200">
              L'IFRI est un institut d'excellence dédié à la formation en informatique,
              offrant des programmes de haute qualité pour former les leaders technologiques de demain.
            </p>

            <button 
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-bounce"
            >
              Découvrez nos formations
            </button>
          </div>
        </div>
      </div>

      {/* Histoire Section avec Design Moderne */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Notre <span className="text-orange-500">Histoire</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a237e] to-[#004d40] rounded-lg transform rotate-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              alt="IFRI Campus"
              className="relative rounded-lg shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300"
            />
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#1a237e] mb-4">Notre Genèse</h3>
              <p className="text-gray-700 leading-relaxed">
                L'Institut de Formation et de Recherche en Informatique est né d'une vision ambitieuse : 
                créer un centre d'excellence en informatique au cœur de l'Afrique de l'Ouest.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#004d40] mb-4">Notre Évolution</h3>
              <p className="text-gray-700 leading-relaxed">
                De sa création en 2013, l'IFRI n'a cessé d'évoluer, s'adaptant continuellement aux 
                nouvelles technologies et aux besoins du marché, formant des professionnels reconnus 
                dans toute la région.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Modal with Modern Design */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#1a237e]">Nos Formations</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 transform hover:rotate-90 transition-transform duration-300"
                >
                  ✕
                </button>
              </div>

              {/* License Programs */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
                  <GraduationCap className="h-6 w-6 mr-2" />
                  Licence (3 ans)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {programs.license.map((program, index) => (
                    <div 
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gradient-to-r hover:from-[#1a237e]/5 hover:to-[#004d40]/5 transition-colors cursor-pointer transform hover:-translate-y-1 duration-300"
                      onClick={() => setSelectedProgram(program)}
                    >
                      <div className="flex items-center mb-2">
                        <program.icon className="h-6 w-6 text-[#1a237e] mr-2" />
                        <h5 className="font-semibold text-gray-900">{program.name}</h5>
                      </div>
                      <p className="text-sm text-gray-600">{program.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Master Programs */}
              <div>
                <h4 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
                  <Building className="h-6 w-6 mr-2" />
                  Master (2 ans)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {programs.master.map((program, index) => (
                    <div 
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gradient-to-r hover:from-[#1a237e]/5 hover:to-[#004d40]/5 transition-colors cursor-pointer transform hover:-translate-y-1 duration-300"
                      onClick={() => setSelectedProgram(program)}
                    >
                      <div className="flex items-center mb-2">
                        <program.icon className="h-6 w-6 text-[#1a237e] mr-2" />
                        <h5 className="font-semibold text-gray-900">{program.name}</h5>
                      </div>
                      <p className="text-sm text-gray-600">{program.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <selectedProgram.icon className="h-8 w-8 text-[#1a237e] mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">{selectedProgram.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedProgram(null)}
                  className="text-gray-500 hover:text-gray-700 transform hover:rotate-90 transition-transform duration-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#1a237e]/5 to-[#004d40]/5 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1a237e] mb-2">Description</h4>
                  <p className="text-gray-700">{selectedProgram.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-[#1a237e] mb-3 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Débouchés
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProgram.careers.map((career, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-orange-50 p-2 rounded-lg">
                        <ChevronRight className="h-4 w-4 text-orange-500" />
                        <span className="text-gray-700">{career}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}