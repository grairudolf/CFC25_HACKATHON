import React, { useState } from "react";
import {
  Search,
  TrendingUp,
  Users,
  Award,
  Sparkles,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = ({ onSearch }: { onSearch: (query: string) => void }) => {
  // Added onSearch prop
  const [searchQuery, setSearchQuery] = useState("");
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const languages = {
    en: {
      title: "Welcome to SiliconHub",
      subtitle:
        "One hub for all things Cameroonian! Find food, jobs, tech & training from top local providers—support your community while simplifying your life. Discover, connect, thrive! 🚀 #ProudlyCameroonian",
      searchPlaceholder:
        "What are you looking for today? 'food', 'jobs', 'tech'...",
      searchButton: "Search",
      exploreServices: "Explore Services",
      addService: "Add My Service",
      services: "500+ Services",
      servicesDesc: "Cameroonian Services",
      users: "1000+ Users",
      usersDesc: "Active Users",
      rating: "4.8/5",
      ratingDesc: "Average Rating",
      aiSuggestions: "AI suggestions for you",
      suggestions: [
        "I want to eat something 🍽️",
        "I need a website 💻",
        "Help me find a job 💼",
        "Online training 📚",
        "Fast delivery 🚗",
        "Beauty services 💄",
      ],
    },
    fr: {
      title: "Bienvenue à SiliconHub",
      subtitle:
        "Un seul hub pour tout le Cameroun ! Trouvez nourriture, emplois, tech et formations auprès des meilleurs prestataires locaux - soutenez votre communauté tout en simplifiant votre vie. Découvrez, connectez-vous, prospérez ! 🚀 #FièrementCamerounais",
      searchPlaceholder:
        "Que cherchez-vous aujourd'hui? 'nourriture', 'emplois', 'tech'...",
      searchButton: "Chercher",
      exploreServices: "Explorer les Services",
      addService: "Ajouter Mon Service",
      services: "500+ Services",
      servicesDesc: "Services Camerounais",
      users: "1000+ Utilisateurs",
      usersDesc: "Utilisateurs Actifs",
      rating: "4.8/5",
      ratingDesc: "Note Moyenne",
      aiSuggestions: "Suggestions IA pour vous",
      suggestions: [
        "Je veux manger quelque chose 🍽️",
        "J'ai besoin d'un site web 💻",
        "Aide-moi à trouver un job 💼",
        "Formation en ligne 📚",
        "Livraison rapide 🚗",
        "Services de beauté 💄",
      ],
    },
    pid: {
      title: "We di glad for see you for Silicon",
      subtitle:
        "Join hand wit di best digital service dem for Cameroon. From chop, work, computer dem, to learn handiwork – all thing dey na for your corner. Make you support your own, sabi wetin dey, and enjoy better digital life wey e no get wahala.",
      searchPlaceholder: "Wetin you dey find today? 'chop', 'work', 'tech'...",
      searchButton: "Search",
      exploreServices: "Check our Services dem",
      addService: "You wan add you own handwork",
      services: "500+ Services",
      servicesDesc: "Cameroon Services",
      users: "1000+ Users",
      usersDesc: "Active Users",
      rating: "4.8/5",
      ratingDesc: "Average Rating",
      aiSuggestions: "AI suggestions for you",
      suggestions: [
        "I wan chop something 🍽️",
        "I need website 💻",
        "Help me find work 💼",
        "Online training 📚",
        "Quick delivery 🚗",
        "Beauty services 💄",
      ],
    },
  };

  const currentText = languages[currentLanguage as keyof typeof languages];

  const handleSearchFocus = () => {
    setShowAISuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowAISuggestions(false);
    // Optionally, trigger search immediately on suggestion click
    // onSearch(suggestion);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    // For now, we're calling onSearch. Navigation or filtering logic will be handled by the parent.
    console.log("Search submitted in HeroSection:", searchQuery);
    setShowAISuggestions(false); // Hide suggestions on submit
  };

  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Fallback if element not immediately found (e.g. different page)
      window.location.hash = id;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 px-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-400 rounded-full animate-bounce delay-100"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full animate-pulse delay-200"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Language Selector */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center bg-white rounded-full shadow-lg p-1">
            <Globe className="w-4 h-4 text-blue-600 mx-2" />
            {Object.keys(languages).map((lang) => (
              <button
                key={lang}
                onClick={() => setCurrentLanguage(lang)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  currentLanguage === lang
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                {lang === "en" ? "EN" : lang === "fr" ? "FR" : "PID"}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {currentText.title.split(" ").map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-2 ${
                  word === "SiliconHub" ? "text-blue-600" : ""
                } animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in delay-300">
            {currentText.subtitle}
          </p>

          {/* AI-Powered Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto mb-8 relative animate-scale-in delay-500"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Sparkles className="absolute right-20 sm:right-24 md:right-28 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 animate-pulse" />{" "}
              {/* Adjusted right padding for button */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={() =>
                  setTimeout(() => setShowAISuggestions(false), 100)
                } // Hide suggestions on blur with a delay
                placeholder={currentText.searchPlaceholder}
                className="w-full pl-12 pr-24 sm:pr-28 md:pr-32 py-4 text-lg border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg transition-all hover:shadow-xl" // Increased pr for button
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105 px-4 py-2 text-sm sm:text-base" // Adjusted padding and ensured it's vertically centered
                size="lg" // Made button larger to fit text better
              >
                {currentText.searchButton}
              </Button>
            </div>

            {/* AI Suggestions */}
            {showAISuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border-2 border-blue-100 z-50 animate-scale-in">
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      {currentText.aiSuggestions}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {currentText.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-left p-3 rounded-lg hover:bg-blue-50 transition-all text-gray-700 border border-blue-100 hover:border-blue-300 hover:scale-102 transform"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in delay-700">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 transition-all hover:scale-105 shadow-lg"
              onClick={() => smoothScrollTo("services")}
            >
              {currentText.exploreServices}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3 border-2 border-blue-300 hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
              onClick={() => smoothScrollTo("submit")}
            >
              {currentText.addService}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-fade-in delay-800">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {currentText.services.split(" ")[0]}
            </h3>
            <p className="text-gray-600">{currentText.servicesDesc}</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-fade-in delay-900">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {currentText.users.split(" ")[0]}
            </h3>
            <p className="text-gray-600">{currentText.usersDesc}</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-fade-in delay-1000">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {currentText.rating}
            </h3>
            <p className="text-gray-600">{currentText.ratingDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
