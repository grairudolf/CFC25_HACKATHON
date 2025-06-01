import React, { useState, useEffect, useRef } from "react"; // Added useEffect, useRef
import { Menu, X, Search, User, Globe, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Service } from "@/types"; // Import Service type

interface NavbarProps {
  onSearch: (query: string) => void;
  allServices: Service[]; // Prop for all services data
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, allServices }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Service[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null); // Ref for the search container

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

  // Effect to handle clicks outside of search suggestions
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

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filteredSuggestions = allServices.filter(service =>
      service.name.toLowerCase().includes(query.toLowerCase()) ||
      service.description.en.toLowerCase().includes(query.toLowerCase()) ||
      service.description.fr.toLowerCase().includes(query.toLowerCase()) ||
      service.description.pid.toLowerCase().includes(query.toLowerCase()) ||
      service.category.toLowerCase().includes(query.toLowerCase()) ||
      service.location?.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions.slice(0, 5)); // Limit to 5 suggestions
    setShowSuggestions(filteredSuggestions.length > 0);
  };

  const handleSuggestionClick = (service: Service) => {
    setSearchQuery(service.name);
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(service.name);
    // Optionally, navigate to the service or a search results page for that service
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false); // Hide suggestions on submit
    onSearch(searchQuery);
    // console.log("Search submitted in Navbar:", searchQuery); // Debug log removed
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
  };

  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    if (href && href.startsWith("/#")) { // Ensure it's an internal hash link for the current page
      const id = href.substring(2); // Remove '/#'
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update hash in URL without causing a page jump, after scrolling
        // Using setTimeout to ensure scroll has initiated
        setTimeout(() => {
          // Check if the path is indeed the root path before setting hash
          if (window.location.pathname === '/') {
            window.history.pushState(null, "", `#${id}`);
          } else {
            // If not on the homepage, navigate to homepage with hash
            navigate(`/#${id}`);
          }
        }, 0);
      } else {
        // Element with ID not found on the current page.
        // If the link intended to go to the homepage's section (e.g. /#services):
        if (href.startsWith("/#")) {
             navigate(href); // Let React Router handle navigation to the path with hash.
                             // If on another page, it navigates to home + hash.
                             // If on home and element is missing, it navigates to home + hash (URL updates, no scroll).
        }
        console.warn(`Smooth scroll: Element with ID '${id}' not found on the current page.`);
      }
    } else if (href) {
        // For other types of hrefs if any (e.g. /login, /signup, or external links)
        // This part might need adjustment based on whether these are internal SPA routes or external links
        if (href.startsWith("/")) {
             navigate(href); // Assumes it's an internal route handled by react-router
        } else {
            window.location.href = href; // External link
        }
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-border">
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
            <Link // Changed from <a> to <Link>
              to="/"
              className="text-gray-700 hover:text-primary px-3 py-2 font-medium transition-all duration-300 hover:scale-105"
            >
              {currentText.home}
            </Link>
            <a
              href="/#services"
              onClick={handleSmoothScroll}
              className="text-gray-700 hover:text-primary px-3 py-2 font-medium transition-all duration-300 hover:scale-105"
            >
              {currentText.services}
            </a>
            <a
              href="/#skills"
              onClick={handleSmoothScroll}
              className="text-gray-700 hover:text-primary px-3 py-2 font-medium transition-all duration-300 hover:scale-105"
            >
              {currentText.skills}
            </a>
            <a
              href="/#submit"
              onClick={handleSmoothScroll}
              className="text-gray-700 hover:text-primary px-3 py-2 font-medium transition-all duration-300 hover:scale-105"
            >
              {currentText.submit}
            </a>
          </div>

          {/* Search, Language and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div ref={searchContainerRef} className="relative"> {/* Added ref to this container */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={currentText.search}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={() => setShowSuggestions(suggestions.length > 0 && searchQuery.trim() !== "")} // Show on focus if query exists
                  className="pl-10 pr-4 py-2 border-2 border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-primary transition-all w-64" // Increased width
                />
              </form>
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto">
                  {suggestions.map((service) => (
                    <li
                      key={service.id}
                      className="px-4 py-2 hover:bg-accent cursor-pointer text-sm text-gray-700"
                      onClick={() => handleSuggestionClick(service)}
                    >
                      {service.name}
                      <p className="text-xs text-gray-500">{service.category} - {service.location}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center bg-accent rounded-lg p-1">
              <Globe className="w-4 h-4 text-primary mx-1" />
              {Object.keys(languages).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLanguage(lang)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    currentLanguage === lang
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-primary/10"
                  }`}
                >
                  {lang === "en" ? "EN" : lang === "fr" ? "FR" : "PID"}
                </button>
              ))}
            </div>

            {/* User Authentication UI */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                {currentUser.picture && (
                  <img src={currentUser.picture} alt="profile" className="w-8 h-8 rounded-full" />
                )}
                <span className="text-sm text-gray-700 truncate max-w-28" title={currentUser.name || currentUser.email}>
                  {currentUser.name || currentUser.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-input hover:bg-accent transition-all hover:scale-105"
                >
                  <LogOut className="w-4 h-4 mr-1 md:mr-2" />
                  {currentText.logout}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")} // Navigate to /login
                  className="hover:bg-accent transition-all hover:scale-105"
                >
                  {currentText.login}
                </Button>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
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
              className="text-gray-700 hover:text-primary p-2 transition-all hover:scale-110"
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
          <div className="md:hidden animate-fade-in"> {/* Mobile Menu Container */}
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-border">
              {/* Mobile Search Form - Simplified, no suggestions for now to keep it clean */}
              <form onSubmit={handleSearchSubmit} className="relative px-3 py-2">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={currentText.search}
                  value={searchQuery}
                  onChange={handleSearchInputChange} // Re-use input change, suggestions won't show unless styled for mobile
                  className="w-full pl-10 pr-4 py-2 border-2 border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-primary transition-all"
                />
              </form>
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {currentText.home}
              </Link>
              <a
                href="/#services"
                className="block px-3 py-2 text-gray-700 hover:text-primary font-medium transition-colors"
                onClick={(e) => { handleSmoothScroll(e); setIsMenuOpen(false); }}
              >
                {currentText.services}
              </a>
              <a
                href="/#skills"
                className="block px-3 py-2 text-gray-700 hover:text-primary font-medium transition-colors"
                onClick={(e) => { handleSmoothScroll(e); setIsMenuOpen(false); }}
              >
                {currentText.skills}
              </a>
              <a
                href="/#submit"
                className="block px-3 py-2 text-gray-700 hover:text-primary font-medium transition-colors"
                onClick={(e) => { handleSmoothScroll(e); setIsMenuOpen(false); }}
              >
                {currentText.submit}
              </a>

              <div className="flex items-center px-3 py-2 space-x-2">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-gray-700">
                  Language:
                </span>
                {Object.keys(languages).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {setCurrentLanguage(lang); /* setIsMenuOpen(false); */}} // Keep menu open on lang change for mobile
                    className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                      currentLanguage === lang
                        ? "bg-primary text-white"
                        : "text-primary hover:bg-primary/10"
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
                      className="w-full border-input hover:bg-accent"
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
                      className="w-full hover:bg-accent"
                      onClick={() => { navigate("/login"); setIsMenuOpen(false); }}
                    >
                      {currentText.login}
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-primary hover:bg-primary/90"
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
