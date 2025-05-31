
import React, { useState } from 'react';
import { Menu, X, Search, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = {
    en: {
      home: 'Home',
      services: 'Services',
      skills: 'Learn Skills',
      submit: 'Submit Service',
      search: 'Search services...',
      profile: 'Profile',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout'
    },
    fr: {
      home: 'Accueil',
      services: 'Services',
      skills: 'Apprendre',
      submit: 'Soumettre Service',
      search: 'Rechercher services...',
      profile: 'Profil',
      login: 'Connexion',
      signup: 'Inscription',
      logout: 'Déconnexion'
    },
    pid: {
      home: 'Home',
      services: 'Services',
      skills: 'Learn Skills',
      submit: 'Add Service',
      search: 'Search services...',
      profile: 'Profile',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout'
    }
  };

  const currentText = languages[currentLanguage as keyof typeof languages];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center animate-fade-in">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">DC</span>
              </div>
              <span className="ml-2 text-xl font-bold text-blue-900">Digital Cameroon</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-all duration-300 hover:scale-105">
              {currentText.home}
            </a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-all duration-300 hover:scale-105">
              {currentText.services}
            </a>
            <a href="#skills" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-all duration-300 hover:scale-105">
              {currentText.skills}
            </a>
            <a href="#submit" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-all duration-300 hover:scale-105">
              {currentText.submit}
            </a>
          </div>

          {/* Search, Language and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={currentText.search}
                className="pl-10 pr-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Language Selector */}
            <div className="flex items-center bg-blue-50 rounded-lg p-1">
              <Globe className="w-4 h-4 text-blue-600 mx-1" />
              {Object.keys(languages).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLanguage(lang)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    currentLanguage === lang
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'fr' ? 'FR' : 'PID'}
                </button>
              ))}
            </div>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-all hover:scale-105">
                  <User className="w-4 h-4 mr-2" />
                  {currentText.profile}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLoggedIn(false)}
                  className="border-blue-200 hover:bg-blue-50 transition-all hover:scale-105"
                >
                  {currentText.logout}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLoggedIn(true)}
                  className="hover:bg-blue-50 transition-all hover:scale-105"
                >
                  {currentText.login}
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
                  onClick={() => setIsLoggedIn(true)}
                >
                  {currentText.signup}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 transition-all hover:scale-110"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-blue-100">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                {currentText.home}
              </a>
              <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                {currentText.services}
              </a>
              <a href="#skills" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                {currentText.skills}
              </a>
              <a href="#submit" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                {currentText.submit}
              </a>

              {/* Mobile Language Selector */}
              <div className="flex items-center px-3 py-2 space-x-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Language:</span>
                {Object.keys(languages).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCurrentLanguage(lang)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                      currentLanguage === lang
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : lang === 'fr' ? 'FR' : 'PID'}
                  </button>
                ))}
              </div>

              <div className="pt-4 pb-2 space-y-2">
                {!isLoggedIn ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full hover:bg-blue-50"
                      onClick={() => setIsLoggedIn(true)}
                    >
                      {currentText.login}
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => setIsLoggedIn(true)}
                    >
                      {currentText.signup}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-200 hover:bg-blue-50"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    {currentText.logout}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
