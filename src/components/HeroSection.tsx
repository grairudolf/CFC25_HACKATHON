import React, { useState } from "react";
import {
  Search,
  TrendingUp,
  Users,
  Award,
  Sparkles,
  Globe,
  CheckCircle, // For benefits section
  Zap,         // For benefits section
  Users2,      // For benefits section
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const languages = {
    en: {
      title: "SiliconHub: Your Gateway to Cameroon's Digital Best",
      subtitle:
        "Discover, connect, and thrive with a curated selection of top-tier Cameroonian digital services, training, and job opportunities. Your success starts here.",
      searchPlaceholder:
        "Search services, skills, or jobs...", // Updated placeholder
      searchButton: "Search",
      // Why Choose Us / Benefits
      whyChooseUsTitle: "Why Choose SiliconHub?",
      benefit1Icon: "CheckCircle",
      benefit1Title: "Local Focus, Global Standards",
      benefit1Desc: "Access services and talent that understand the Cameroonian market, delivered with quality you can trust.",
      benefit2Icon: "Zap",
      benefit2Title: "All-In-One Platform",
      benefit2Desc: "From finding a service to learning new skills and landing jobs – everything you need in one place.",
      benefit3Icon: "Users2",
      benefit3Title: "Community & Growth",
      benefit3Desc: "Join a vibrant ecosystem of innovators, entrepreneurs, and learners. Grow with us.",
      exploreServices: "Explore Services",
      addService: "Add My Service",
      services: "500+ Services",
      servicesDesc: "Cameroonian Services",
      users: "1000+ Users",
      usersDesc: "Active Users",
      rating: "4.8/5",
      ratingDesc: "Average Rating",
      aiSuggestions: "AI suggestions for you",
      suggestions: [ // Kept suggestions, can be fine-tuned later
        "I want to eat something 🍽️",
        "I need a website 💻",
        "Help me find a job 💼",
        "Online training 📚",
        "Fast delivery 🚗",
        "Beauty services 💄",
      ],
    },
    fr: {
      title: "SiliconHub : Votre Portail vers l'Excellence Numérique au Cameroun",
      subtitle:
        "Découvrez, connectez-vous et prospérez avec une sélection de services numériques, formations et opportunités d'emploi camerounais de premier plan. Votre succès commence ici.",
      searchPlaceholder:
        "Rechercher services, compétences, emplois...", // Updated placeholder
      searchButton: "Chercher",
      // Why Choose Us / Benefits
      whyChooseUsTitle: "Pourquoi Choisir SiliconHub ?",
      benefit1Icon: "CheckCircle",
      benefit1Title: "Expertise Locale, Normes Globales",
      benefit1Desc: "Accédez à des services et talents qui comprennent le marché camerounais, avec une qualité fiable.",
      benefit2Icon: "Zap",
      benefit2Title: "Plateforme Tout-En-Un",
      benefit2Desc: "Trouver un service, acquérir de nouvelles compétences, décrocher un emploi – tout au même endroit.",
      benefit3Icon: "Users2",
      benefit3Title: "Communauté & Croissance",
      benefit3Desc: "Rejoignez un écosystème dynamique d'innovateurs, d'entrepreneurs et d'apprenants. Grandissez avec nous.",
      exploreServices: "Explorer les Services",
      addService: "Ajouter Mon Service",
      services: "500+ Services",
      servicesDesc: "Services Camerounais",
      users: "1000+ Utilisateurs",
      usersDesc: "Utilisateurs Actifs",
      rating: "4.8/5",
      ratingDesc: "Note Moyenne",
      aiSuggestions: "Suggestions IA pour vous",
      suggestions: [ // Kept suggestions
        "Je veux manger quelque chose 🍽️",
        "J'ai besoin d'un site web 💻",
        "Aide-moi à trouver un job 💼",
        "Formation en ligne 📚",
        "Livraison rapide 🚗",
        "Services de beauté 💄",
      ],
    },
    pid: {
      title: "SiliconHub: Ya Gate for Cameroon Digital Correct Things",
      subtitle:
        "Discover, connect, and grow with correct selection of Cameroon digital services, training, and work opportunities. Ya success start here.",
      searchPlaceholder:
        "Find services, skills, or work...", // Updated placeholder
      searchButton: "Search",
      // Why Choose Us / Benefits
      whyChooseUsTitle: "Why You Go Choose SiliconHub?",
      benefit1Icon: "CheckCircle",
      benefit1Title: "Local Sabi, Global Standard",
      benefit1Desc: "Access services and people wey sabi Cameroon market, with quality wey you fit trust.",
      benefit2Icon: "Zap",
      benefit2Title: "All-Inside Platform",
      benefit2Desc: "From find service to learn new skill and catch work – everything for one place.",
      benefit3Icon: "Users2",
      benefit3Title: "Community & Growth",
      benefit3Desc: "Join correct group of innovators, entrepreneurs, and learners. Grow with us.",
      exploreServices: "Check Services",
      addService: "Add My Service",
      services: "500+ Services",
      servicesDesc: "Cameroon Services",
      users: "1000+ Users",
      usersDesc: "Active Users",
      rating: "4.8/5",
      ratingDesc: "Average Rating",
      aiSuggestions: "AI suggestions for you",
      suggestions: [ // Kept suggestions
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

  const BenefitIcon = ({ iconName }: { iconName: string }) => {
    switch (iconName) {
      case "CheckCircle": return <CheckCircle className="w-8 h-8 text-blue-600" />;
      case "Zap": return <Zap className="w-8 h-8 text-green-500" />;
      case "Users2": return <Users2 className="w-8 h-8 text-purple-500" />;
      default: return <Sparkles className="w-8 h-8 text-yellow-500" />;
    }
  };

  const handleSearchFocus = () => {
    setShowAISuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowAISuggestions(false);
    // Trigger search immediately on suggestion click
    onSearch(suggestion);
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
                  word === "Silicon" ? "text-blue-600" : ""
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
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8 relative animate-scale-in delay-500">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Sparkles className="absolute right-20 sm:right-24 md:right-28 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 animate-pulse" /> {/* Adjusted right padding for button */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                // onBlur={() => setTimeout(() => setShowAISuggestions(false), 100)} // Hide suggestions on blur with a delay
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

        {/* Why Choose Us Section */}
        <div className="py-12 animate-fade-in delay-[1200ms]">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            {currentText.whyChooseUsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: currentText.benefit1Title, desc: currentText.benefit1Desc, icon: currentText.benefit1Icon },
              { title: currentText.benefit2Title, desc: currentText.benefit2Desc, icon: currentText.benefit2Icon },
              { title: currentText.benefit3Title, desc: currentText.benefit3Desc, icon: currentText.benefit3Icon },
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-opacity-20"
                     style={{ backgroundColor: benefit.icon === "CheckCircle" ? 'rgba(59, 130, 246, 0.1)' : benefit.icon === "Zap" ? 'rgba(16, 185, 129, 0.1)' : 'rgba(168, 85, 247, 0.1)' }}>
                  <BenefitIcon iconName={benefit.icon} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats - Kept for continuity, can be integrated into "Why Choose Us" or a dedicated impact section later if desired */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-10">
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in delay-[1500ms]">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {currentText.services.split(" ")[0]} {/* Assuming format "500+ Services" */}
            </h3>
            <p className="text-gray-600">{currentText.servicesDesc}</p>
          </div>

          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in delay-[1600ms]">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {currentText.users.split(" ")[0]} {/* Assuming format "1000+ Users" */}
            </h3>
            <p className="text-gray-600">{currentText.usersDesc}</p>
          </div>

          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in delay-[1700ms]">
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
