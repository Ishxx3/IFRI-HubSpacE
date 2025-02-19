import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Calendar, FileText, BookOpen, Users, Menu, Rocket, Sparkles } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export function Navbar({ isAuthenticated, onLogout }: NavbarProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'schedule', label: 'Emploi du temps', icon: Calendar, path: '/schedule', public: false },
    { id: 'events', label: 'Événements', icon: Calendar, path: '/events', public: true },
    { id: 'documents', label: 'Documents', icon: FileText, path: '/documents', public: false },
    { id: 'courses', label: 'Cours', icon: BookOpen, path: '/courses', public: false },
    { id: 'community', label: 'Communauté', icon: Users, path: '/community', public: false },
  ] as const;

  const handleNavigation = (path: string, isPublic: boolean) => {
    if (!isPublic && !isAuthenticated) {
      navigate('/login');
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-[#1a237e] to-[#004d40] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6 hover:text-orange-400 transition-colors duration-300" />
            </button>
            
            <div 
              className="flex items-center space-x-3 cursor-pointer group" 
              onClick={() => navigate('/')}
            >
              <div className="relative">
                <Rocket className="h-8 w-8 text-white transform group-hover:rotate-12 transition-transform duration-300" />
                <Sparkles className="h-4 w-4 text-orange-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div className="font-bold text-xl tracking-wider">
                <span className="text-white">IFRI</span>
                <span className="text-orange-400">hub</span>
                <span className="text-white">SpacE</span>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path, item.public)}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 hover:text-orange-400 transition-all duration-300"
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Bell 
                  className="h-5 w-5 cursor-pointer hover:text-orange-400 transition-colors duration-300" 
                  onClick={() => navigate('/notifications')}
                />
                <User 
                  className="h-5 w-5 cursor-pointer hover:text-orange-400 transition-colors duration-300" 
                  onClick={() => navigate('/profile')}
                />
                <LogOut 
                  className="h-5 w-5 cursor-pointer hover:text-orange-400 transition-colors duration-300" 
                  onClick={onLogout}
                />
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Connexion
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path, item.public)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 hover:text-orange-400 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}