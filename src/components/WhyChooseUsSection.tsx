import React, { useState } from 'react';
import { Target, Users, Search, CheckCircle, Globe } from 'lucide-react';

const WhyChooseUsSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en"); // Assuming you might add a language switcher later or inherit

  const content = {
    en: {
      title: "Why Choose Silicon?",
      description: "Your central hub for discovering and accessing the best digital services Cameroon has to offer. We're dedicated to empowering our community by connecting users with innovative local businesses.",
      points: [
        {
          icon: <Target className="w-10 h-10 text-blue-600 mb-4" />,
          title: "Discover Local Gems",
          text: "Find services specifically tailored to the Cameroonian market, from hyper-local startups to established national players."
        },
        {
          icon: <Search className="w-10 h-10 text-green-500 mb-4" />,
          title: "Effortless Connection",
          text: "Our platform makes it simple to search, find detailed information, and connect directly with service providers."
        },
        {
          icon: <Users className="w-10 h-10 text-purple-500 mb-4" />,
          title: "Community-Driven",
          text: "By using Silicon, you're supporting local entrepreneurs and contributing to the growth of Cameroon's digital ecosystem."
        },
        {
          icon: <CheckCircle className="w-10 h-10 text-yellow-500 mb-4" />,
          title: "All-in-One Platform",
          text: "From daily needs like food delivery to specialized services like tech training, find it all in one convenient place."
        }
      ]
    },
    fr: {
      title: "Pourquoi Choisir Silicon ?",
      description: "Votre plateforme centrale pour découvrir et accéder aux meilleurs services numériques que le Cameroun a à offrir. Nous nous engageons à autonomiser notre communauté en connectant les utilisateurs avec des entreprises locales innovantes.",
      points: [
        {
          icon: <Target className="w-10 h-10 text-blue-600 mb-4" />,
          title: "Découvrez les Pépites Locales",
          text: "Trouvez des services spécifiquement adaptés au marché camerounais, des startups hyper-locales aux acteurs nationaux établis."
        },
        {
          icon: <Search className="w-10 h-10 text-green-500 mb-4" />,
          title: "Connexion Sans Effort",
          text: "Notre plateforme simplifie la recherche, l'accès à des informations détaillées et la connexion directe avec les fournisseurs de services."
        },
        {
          icon: <Users className="w-10 h-10 text-purple-500 mb-4" />,
          title: "Axé sur la Communauté",
          text: "En utilisant Silicon, vous soutenez les entrepreneurs locaux et contribuez à la croissance de l'écosystème numérique du Cameroun."
        },
        {
          icon: <CheckCircle className="w-10 h-10 text-yellow-500 mb-4" />,
          title: "Plateforme Tout-en-Un",
          text: "Des besoins quotidiens comme la livraison de repas aux services spécialisés comme la formation technologique, trouvez tout en un seul endroit pratique."
        }
      ]
    },
    pid: {
      title: "Why You Go Choose Silicon?",
      description: "Your main place for discover and access the best digital services wey Cameroon get for offer. We dey committed for empower our community by connecting users with local businesses wey get sense.",
      points: [
        {
          icon: <Target className="w-10 h-10 text-blue-600 mb-4" />,
          title: "Discover Local Correct Services",
          text: "Find services wey dem make just for Cameroon market, from small local startups to big national companies."
        },
        {
          icon: <Search className="w-10 h-10 text-green-500 mb-4" />,
          title: "Easy Connection",
          text: "Our platform e makeam simple for search, find detailed information, and connect direct with service providers."
        },
        {
          icon: <Users className="w-10 h-10 text-purple-500 mb-4" />,
          title: "Community Power",
          text: "When you use Silicon, you dey support local business people and help Cameroon digital system grow."
        },
        {
          icon: <CheckCircle className="w-10 h-10 text-yellow-500 mb-4" />,
          title: "All Services for One Place",
          text: "From everyday needs like food delivery to special services like tech training, find everything for one convenient place."
        }
      ]
    }
  };

  const currentText = content[currentLanguage as keyof typeof content];

  // Basic language switcher for demonstration if needed, or remove if language is global
  const toggleLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Language toggle example - remove or adapt based on global state management */}
        <div className="flex justify-end mb-8">
            <div className="flex items-center bg-white rounded-full shadow-md p-1">
                <Globe className="w-4 h-4 text-blue-600 mx-2" />
                {Object.keys(content).map((lang) => (
                <button
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    currentLanguage === lang
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-blue-50"
                    }`}
                >
                    {lang.toUpperCase()}
                </button>
                ))}
            </div>
        </div>

        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {currentText.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {currentText.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentText.points.map((point, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex justify-center md:justify-start mb-4">
                {point.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center md:text-left">{point.title}</h3>
              <p className="text-gray-600 text-sm text-center md:text-left">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
