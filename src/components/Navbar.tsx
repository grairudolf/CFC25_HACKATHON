import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Search, User, Globe, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

interface ServiceSuggestion {
  id: string;
  name: string;
}

interface NavbarProps {
  onSearch: (query: string) => void;
  serviceSuggestions?: ServiceSuggestion[];
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, serviceSuggestions = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<ServiceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const languages = {
    en: {
      home: "Home",
      services: "Services",
      skills: "Learn Skills",
      submit: "Submit Service",
      search: "Search services...",
      profile: "Profile",
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      loggedInAs: "Logged in as:",
    },
    fr: {
      home: "Accueil",
      services: "Services",
      skills: "Apprendre",
      submit: "Soumettre Service",
      search: "Rechercher services...",
      profile: "Profil",
      login: "Connexion",
      signup: "Inscription",
      logout: "Déconnexion",
      loggedInAs: "Connecté en tant que:",
    },
    pid: {
      home: "Home",
      services: "Services",
      skills: "Learn Skills",
      submit: "Add Service",
      search: "Search services...",
      profile: "Profile",
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      loggedInAs: "Logged in as:",
    },
  };

  const currentText = languages[currentLanguage as keyof typeof languages];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    } else {
      const suggestions = serviceSuggestions
        .filter(service => service.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5); // Limit to 5 suggestions
      setFilteredSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    }
  };

  const handleSuggestionClick = (suggestion: ServiceSuggestion) => {
    setSearchQuery(suggestion.name);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    onSearch(suggestion.name);
     // Optional: scroll to services section when a search is performed via suggestion
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setShowSuggestions(false);
    // Optional: scroll to services section when a search is performed
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center animate-fade-in"> {/* Link logo to home */}
              <img
                src="/logo_transparent.png"
                alt="Logo"
                className="ml-2 h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-all duration-300 hover:scale-105"
            >
              {currentText.home}
            </Link>
            <a
              href="/#services" // Assuming services is an ID on the homepage
              className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-all duration-300 hover:scale-105"
            >
              {currentText.services}
            </a>
            <a
              href="/#skills" // Assuming skills is an ID on the homepage
              className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-all duration-300 hover:scale-105"
            >
              {currentText.skills}
            </a>
            <a
              href="/#submit" // Assuming submit is an ID on the homepage
              className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-all duration-300 hover:scale-105"
            >
              {currentText.submit}
            </a>
          </div>

          {/* Search, Language and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={searchContainerRef}>
              <form onSubmit={handleSearchSubmit}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <input
                  type="text"
                  placeholder={currentText.search}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if (searchQuery.trim() !== "" && filteredSuggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  className="pl-10 pr-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all w-full"
                />
              </form>
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="suggestions-list absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-20">
                  {filteredSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="suggestion-item px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={() => handleSuggestionClick(suggestion)} // Use onMouseDown to fire before onBlur
                    >
                      {suggestion.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center bg-blue-50 rounded-lg p-1">
              <Globe className="w-4 h-4 text-blue-600 mx-1" />
              {Object.keys(languages).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLanguage(lang)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    currentLanguage === lang
                      ? "bg-blue-600 text-white"
                      : "text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  {lang === "en" ? "EN" : lang === "fr" ? "FR" : "PID"}
                </button>
              ))}
            </div>

            {currentUser ? (
              <div className="flex items-center space-x-2">
                {currentUser.picture && (
                  <img src={currentUser.picture} alt="profile" className="w-8 h-8 rounded-full" />
                )}
                <span className="text-sm text-gray-700">
                  {currentUser.name || currentUser.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-blue-200 hover:bg-blue-50 transition-all hover:scale-105"
                >
                  <LogOut className="w-4 h-4 mr-2" /> {/* Added icon */}
                  {currentText.logout}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")} // Navigate to /login
                  className="hover:bg-blue-50 transition-all hover:scale-105"
                >
                  {currentText.login}
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
                  onClick={() => navigate("/signup")} // Navigate to /signup
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
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-blue-100">
              <Link // Changed from <a> to <Link>
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {currentText.home}
              </Link>
              <a
                href="/#services"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {currentText.services}
              </a>
              <a
                href="/#skills"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {currentText.skills}
              </a>
              <a
                href="/#submit"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {currentText.submit}
              </a>

              <div className="flex items-center px-3 py-2 space-x-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Language:
                </span>
                {Object.keys(languages).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {setCurrentLanguage(lang); /* setIsMenuOpen(false); */}} // Keep menu open on lang change for mobile
                    className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                      currentLanguage === lang
                        ? "bg-blue-600 text-white"
                        : "text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    {lang === "en" ? "EN" : lang === "fr" ? "FR" : "PID"}
                  </button>
                ))}
              </div>

              <div className="pt-4 pb-2 space-y-2 border-t mt-2">
                {currentUser ? (
                  <>
                    <div className="flex items-center space-x-2 px-3 py-2">
                      {currentUser.picture && (
                        <img src={currentUser.picture} alt="profile" className="w-8 h-8 rounded-full" />
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        {currentUser.name || currentUser.email}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-blue-200 hover:bg-blue-50"
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {currentText.logout}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full hover:bg-blue-50"
                      onClick={() => { navigate("/login"); setIsMenuOpen(false); }}
                    >
                      {currentText.login}
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => { navigate("/signup"); setIsMenuOpen(false); }}
                    >
                      {currentText.signup}
                    </Button>
                  </>
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
