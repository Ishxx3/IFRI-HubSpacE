import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import { signIn, signUp, resetPassword, verifyStudent } from '../../lib/authService';

interface LoginFormProps {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [isNewStudent, setIsNewStudent] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    matricule: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const student = verifyStudent(formData.matricule);
      if (!student) {
        setError('Ce matricule n\'est pas reconnu. Veuillez vérifier votre numéro matricule.');
        return;
      }

      await signUp(formData.matricule, formData.email, formData.password);
      onLogin();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(formData.email, formData.password);
      onLogin();
    } catch (err: any) {
      setError(err.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await resetPassword(formData.email);
      alert('Un email de réinitialisation a été envoyé à votre adresse.');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
         style={{
           backgroundImage: 'url("https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80")',
           backgroundBlendMode: 'overlay',
           backgroundColor: 'rgba(26, 35, 126, 0.9)'
         }}>
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          {!showForgotPassword ? (
            <>
              <h2 className="text-2xl font-bold text-[#1a237e]">
                {isNewStudent ? 'Nouvelle Inscription' : 'Connexion'}
              </h2>
              <p className="text-gray-600 mt-2">
                {isNewStudent 
                  ? 'Créez votre compte étudiant IFRI'
                  : 'Connectez-vous à votre espace étudiant'}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#1a237e]">
                Mot de passe oublié
              </h2>
              <p className="text-gray-600 mt-2">
                Entrez votre email pour réinitialiser votre mot de passe
              </p>
            </>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={showForgotPassword ? handleForgotPassword : (isNewStudent ? handleSignUp : handleLogin)} className="space-y-6">
          {isNewStudent && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Matricule</label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  value={formData.matricule}
                  onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1a237e] focus:border-[#1a237e]"
                  placeholder="12345678"
                  maxLength={8}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1a237e] focus:border-[#1a237e]"
                placeholder="exemple@gmail.com"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {!showForgotPassword && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1a237e] focus:border-[#1a237e]"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a237e] hover:bg-[#004d40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a237e] transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Chargement...' : (
              showForgotPassword ? 'Réinitialiser' : (isNewStudent ? 'Créer mon compte' : 'Se connecter')
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {!showForgotPassword && (
            <>
              <button
                onClick={() => setIsNewStudent(!isNewStudent)}
                className="text-sm text-[#1a237e] hover:text-[#004d40] transition-colors duration-300"
              >
                {isNewStudent 
                  ? 'Déjà inscrit ? Connectez-vous'
                  : 'Nouveau à IFRI ? Inscrivez-vous'}
              </button>
              {!isNewStudent && (
                <>
                  <br />
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-orange-500 hover:text-orange-600 transition-colors duration-300"
                  >
                    Mot de passe oublié ?
                  </button>
                </>
              )}
            </>
          )}
          {showForgotPassword && (
            <button
              onClick={() => setShowForgotPassword(false)}
              className="text-sm text-[#1a237e] hover:text-[#004d40] transition-colors duration-300"
            >
              Retour à la connexion
            </button>
          )}
        </div>
      </div>
    </div>
  );
}