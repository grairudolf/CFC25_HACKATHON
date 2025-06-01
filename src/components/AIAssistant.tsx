import React, { useState, useEffect, useRef } from "react"; // Added useRef
import { MessageCircle, X, Send, Bot, Sparkles, Globe, Search } from "lucide-react"; // Added Globe, Search
import { Button } from "@/components/ui/button";
import { Service } from "@/types"; // Import Service type

type LanguageKey = "en" | "fr" | "pid";

interface AIAssistantProps {
  allServices: Service[];
  onSearchTrigger?: (searchQuery: string, category?: string) => void;
  // onViewService?: (serviceId: string) => void; // For future use
}

const languageResources = {
  en: {
    initialMessage:
      "Hello! I'm your SiliconHub assistant. I can help you discover local services, find what you're looking for, or guide you to training. What can I do for you today? 🇨🇲",
    quickSuggestions: [
      "🍽️ I want to eat",
      "💼 Find a job",
      // "📱 Create an app", // Replaced for new commands
      // "🎓 Learn to code", // Replaced for new commands
      "📍 Services in Yaoundé?",
      "ℹ️ Tell me about FastChops",
      "🔍 Search for food delivery",
      "💰 Payment services",
    ],
    responses: {
      food: "Perfect! FastChops is the best delivery service in Cameroon. They deliver throughout Douala and Yaoundé. You can order ndolé, roasted chicken, or even continental dishes. Would you like me to show you other options?",
      job: "237Jobs is THE platform to find a job in Cameroon! They have over 5000 offers in all sectors. I also recommend joining the Hustlers Engineering community for networking. What field are you looking in?",
      dev: "Excellent idea! lambda Solutions and TIC Cameroun specialize in app and website development. To learn yourself, DeltechHub offers comprehensive training. Do you want to develop or learn?",
      learn:
        "Knowledge Center has an excellent Cameroonian digital library. DeltechHub offers practical tech training. For international online courses adapted to the local context, I can guide you. What field interests you?",
      payment:
        "Nkwa.cm is perfect for that! They offer mobile payment solutions and digital financial services tailored for Cameroonians. It's secure and very convenient for all your transactions.",
      searchTriggered: "Okay, I'm searching for that now!",
      noServiceFound: "Sorry, I couldn't find a service called '{serviceName}'.",
      noLocationFound: "Sorry, I couldn't find any services in {location}.",
      servicesInLocation: "Okay, here are some services in {location}: {serviceList}.",
      default:
        "I'm here to help you navigate the Cameroonian digital ecosystem! You can ask me about delivery services, job opportunities, tech training, or even advice on local entrepreneurship. What do you want to explore? 🚀",
    },
    ui: {
      headerTitle: "SiliconHub Assistant",
      headerSubtitle: "here to help you 🇨🇲",
      quickSuggestTitle: "Quick suggestions:",
      inputPlaceholder: "Type your message...",
      langButtonEN: "EN",
      langButtonFR: "FR",
      langButtonPID: "PID",
    },
  },
  fr: {
    initialMessage:
      "Bonjour! Je suis votre assistant SiliconHub. Je peux vous aider à découvrir des services locaux, trouver ce que vous cherchez, ou vous orienter vers des formations. Que puis-je faire pour vous aujourd'hui? 🇨🇲",
    quickSuggestions: [
      "🍽️ Je veux manger",
      "💼 Chercher un job",
      "📍 Services à Yaoundé?",
      "ℹ️ Parle-moi de FastChops",
      "🔍 Cherche livraison de repas",
      "💰 Services de paiement",
    ],
    responses: {
      food: "Parfait ! FastChops est le meilleur service de livraison au Cameroun. Ils livrent partout à Douala et Yaoundé. Vous pouvez commander du ndolé, du poulet braisé, ou même des plats continentaux. Voulez-vous que je vous montre d'autres options ?",
      job: "237Jobs est LA plateforme pour trouver un emploi au Cameroun! Ils ont plus de 5000 offres dans tous les secteurs. Je recommande aussi de rejoindre la communauté Hustlers Engineering pour le networking. Dans quel domaine cherchez-vous ?",
      dev: "Excellente idée ! lambda Solutions et TIC Cameroun sont spécialisés dans le développement d'apps et sites web. Pour apprendre vous-même, DeltechHub offre des formations complètes. Voulez-vous développer ou apprendre ?",
      learn:
        "Knowledge Center a une excellente bibliothèque numérique camerounaise. DeltechHub offre des formations tech pratiques. Pour les cours en ligne internationaux mais adaptés au contexte local, je peux vous guider. Quel domaine vous intéresse ?",
      payment:
        "Nkwa.cm est parfait pour ça ! Ils offrent des solutions de paiement mobile et services financiers digitaux adaptés aux Camerounais. C'est sécurisé et très pratique pour toutes vos transactions.",
      searchTriggered: "D'accord, je recherche cela maintenant !",
      noServiceFound: "Désolé, je n'ai pas trouvé de service nommé '{serviceName}'.",
      noLocationFound: "Désolé, je n'ai pas trouvé de services à {location}.",
      servicesInLocation: "D'accord, voici quelques services à {location}: {serviceList}.",
      default:
        "Je suis là pour vous aider à naviguer dans l'écosystème numérique camerounais! Vous pouvez me demander des services de livraison, des opportunités d'emploi, des formations tech, ou même des conseils sur l'entrepreneuriat local. Que souhaitez-vous explorer? 🚀",
    },
    ui: {
      headerTitle: "Assistant SiliconHub",
      headerSubtitle: "là pour vous aider 🇨🇲",
      quickSuggestTitle: "Suggestions rapides:",
      inputPlaceholder: "Tapez votre message...",
      langButtonEN: "EN",
      langButtonFR: "FR",
      langButtonPID: "PID",
    },
  },
  pid: {
    initialMessage:
      "Salut! Na me be ya SiliconHub assistant. I fit helep you see local services, find wetin you dey find, or show you place for learn work. Wetin I fit do for you today? 🇨🇲",
    quickSuggestions: [
      "🍽️ I wan chop",
      "💼 Find work",
      "📍 Services for Yaoundé?",
      "ℹ️ Tell me about FastChops",
      "🔍 Find food delivery",
      "💰 Money services",
    ],
    responses: {
      food: "Correct! FastChops na correct delivery service for Cameroon. Dem dey deliver for Douala and Yaoundé. You fit order ndolé, roast chicken, or even oyibo food. You want make I show you other places?",
      job: "237Jobs na THE place for find work for Cameroon! Dem get pass 5000 jobs for all kind work. I go tell you say make you join Hustlers Engineering community for networking. Which kind work you dey find?",
      dev: "Good idea! lambda Solutions and TIC Cameroun dem sabi for make app and website. For learnam yourself, DeltechHub get correct training. You want make app or you want learn?",
      learn:
        "Knowledge Center get correct Cameroon digital library. DeltechHub get practical tech training. For online courses from oyibo people wey dem arrange for local style, I fit guide you. Which side you want learn?",
      payment:
        "Nkwa.cm correct for dat one! Dem get mobile money solutions and digital money services wey dem make for Cameroon people. E safe and e very easy for all ya transaction.",
      searchTriggered: "Okay, I dey find'am now!",
      noServiceFound: "Sorry, I no find any service wey dem call '{serviceName}'.",
      noLocationFound: "Sorry, I no find any service for {location}.",
      servicesInLocation: "Okay, here some services for {location}: {serviceList}.",
      default:
        "I dey here for helep you waka inside Cameroon digital world! You fit ask me for delivery services, work opportunities, tech training, or even advice for local business. Wetin you want check? 🚀",
    },
    ui: {
      headerTitle: "SiliconHub Assistant",
      headerSubtitle: "dey here for helep you 🇨🇲",
      quickSuggestTitle: "Quick suggestions:",
      inputPlaceholder: "Write ya message...",
      langButtonEN: "EN",
      langButtonFR: "FR",
      langButtonPID: "PID",
    },
  },
};

type Message = {
  type: "bot" | "user";
  content: string;
  timestamp: Date;
};

// Define a type for the bot response, which can be a string or an action object
type BotResponse =
  | string
  | { type: "search"; query: string; category?: string; responseText: string }
  | { type: "info"; responseText: string };


const AIAssistant: React.FC<AIAssistantProps> = ({ allServices, onSearchTrigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageKey>("fr"); // Default to French
  const messagesEndRef = useRef<null | HTMLDivElement>(null); // For auto-scrolling
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      type: "bot" as const,
      content: languageResources[currentLanguage].initialMessage, // Initialize with current language
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");

  // Effect to update initial message when language changes
  useEffect(() => {
    setMessages([
      {
        type: "bot" as const,
        content: languageResources[currentLanguage].initialMessage,
        timestamp: new Date(),
      },
    ]);
  }, [currentLanguage]);

  // Effect for auto-scrolling
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage: Message = {
        type: "user" as const,
        content: inputMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Simulate bot thinking time
      setTimeout(() => {
        const botAction = generateCameroonianBotResponse(
          inputMessage,
          currentLanguage,
          allServices
        );

        let botResponseContent: string;

        if (typeof botAction === "string") {
          botResponseContent = botAction;
        } else if (botAction.type === "search") {
          if (onSearchTrigger) {
            onSearchTrigger(botAction.query, botAction.category);
          }
          botResponseContent = botAction.responseText;
        } else { // info or other types
          botResponseContent = botAction.responseText;
        }

        const botMessage: Message = {
          type: "bot" as const,
          content: botResponseContent,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 800);

      setInputMessage("");
    }
  };

  // Enhanced NLU and response generation
  const generateCameroonianBotResponse = (
    userInput: string,
    lang: LanguageKey,
    services: Service[]
  ): BotResponse => {
    const lowerInput = userInput.toLowerCase();
    const responses = languageResources[lang].responses;
    const currentDescriptionLang = lang;

    // Helper function for extracting query after a keyword
    // Ensures keyword is followed by a space or is at the end of the input.
    const extractQueryAfterKeyword = (text: string, keywords: string[]): string | null => {
      for (const keyword of keywords) {
        const regex = new RegExp(`\\b${keyword}\\s+(.+)`, 'i'); // \b for word boundary
        const match = text.match(regex);
        if (match && match[1]) {
          return match[1].trim().replace(/\?$/g, ""); // Remove trailing question mark
        }
      }
      return null;
    };

    // 1. Find services in a specific location
    const locationTriggers = {
        en: ["in", "at", "near", "around", "services in", "find services in"],
        fr: ["à", "en", "près de", "autour de", "services à", "trouver services à", "services sur"],
        pid: ["for", "inside", "near", "around", "services for", "find services for", "dey for"]
    };

    const locationNameQuery = extractQueryAfterKeyword(lowerInput, locationTriggers[lang]);
    if (locationNameQuery) {
        const foundServices = services.filter(service =>
            service.location?.toLowerCase().includes(locationNameQuery.toLowerCase())
        );
        if (foundServices.length > 0) {
            const serviceNames = foundServices.map(s => s.name).join(", ");
            return {
                type: "info",
                responseText: responses.servicesInLocation
                    .replace("{location}", locationNameQuery)
                    .replace("{serviceList}", serviceNames),
            };
        }
        return {
            type: "info",
            responseText: responses.noLocationFound.replace("{location}", locationNameQuery),
        };
    }

    // 2. Summarize service description
    const summarizeTriggers = {
        en: ["summarize", "tell me about", "describe", "what is", "info on"],
        fr: ["résume", "parle-moi de", "décris", "c'est quoi", "infos sur"],
        pid: ["summarize", "tell me about", "describe", "wetin be", "info on"]
    };

    const serviceNameQueryForSummary = extractQueryAfterKeyword(lowerInput, summarizeTriggers[lang]);
    if (serviceNameQueryForSummary) {
        const serviceToSummarize = services.find(
          (s) => s.name.toLowerCase() === serviceNameQueryForSummary.toLowerCase()
        );
        if (serviceToSummarize) {
          return {
            type: "info",
            responseText: serviceToSummarize.description[currentDescriptionLang] || serviceToSummarize.description.en,
          };
        }
        return {
            type: "info",
            responseText: responses.noServiceFound.replace("{serviceName}", serviceNameQueryForSummary),
        };
    }

    // 3. Trigger search for categories/general queries
    const searchTriggers = {
        en: ["search for", "find", "look for", "search"],
        fr: ["cherche", "trouve", "recherche", "chercher"],
        pid: ["search for", "find", "look for", "search"]
    };

    const searchQueryFromTrigger = extractQueryAfterKeyword(lowerInput, searchTriggers[lang]);
    if (searchQueryFromTrigger) {
        let categoryToSearch: string | undefined = undefined;
        const catLower = searchQueryFromTrigger.toLowerCase();
        // Keywords for Food & Delivery
        const foodKeywords = ["food", "delivery", "restaurant", "eat", "manger", "nourriture", "livraison", "chop"];
        // Keywords for Jobs & Career
        const jobKeywords = ["job", "work", "career", "emploi", "travail", "carrière"];
        // Keywords for Tech Training
        const techKeywords = ["tech training", "learn code", "coding course", "formation tech", "apprendre à coder", "cours de code"];
        // Keywords for Fintech & Payments
        const paymentKeywords = ["payment", "fintech", "mobile money", "paiement", "argent"];

        if (foodKeywords.some(kw => catLower.includes(kw))) categoryToSearch = "Food & Delivery";
        else if (jobKeywords.some(kw => catLower.includes(kw))) categoryToSearch = "Jobs & Career";
        else if (techKeywords.some(kw => catLower.includes(kw))) categoryToSearch = "Tech Training";
        else if (paymentKeywords.some(kw => catLower.includes(kw))) categoryToSearch = "Fintech & Payments";

        return {
            type: "search",
            query: searchQueryFromTrigger,
            category: categoryToSearch,
            responseText: responses.searchTriggered,
        };
    }

    // Fallback to existing keyword matching (Original simple intents)
    // More language-specific checks
    if (
      (lang === 'en' && (lowerInput.includes("eat") || lowerInput.includes("food") || lowerInput.includes("dish"))) ||
      (lang === 'fr' && (lowerInput.includes("manger") || lowerInput.includes("plat") || lowerInput.includes("nourriture"))) ||
      (lang === 'pid' && (lowerInput.includes("chop") || lowerInput.includes("food")))
    ) {
      return responses.food;
    }
    if (
      (lang === 'en' && (lowerInput.includes("job") || lowerInput.includes("work") || lowerInput.includes("career"))) ||
      (lang === 'fr' && (lowerInput.includes("emploi") || lowerInput.includes("travail") || lowerInput.includes("carrière"))) ||
      (lang === 'pid' && (lowerInput.includes("work") || lowerInput.includes("job")))
    ) {
      return responses.job;
    }
    if (
      (lang === 'en' && (lowerInput.includes("site") || lowerInput.includes("app") || lowerInput.includes("develop"))) ||
      (lang === 'fr' && (lowerInput.includes("site") || lowerInput.includes("app") || lowerInput.includes("développement"))) ||
      (lang === 'pid' && (lowerInput.includes("app") || lowerInput.includes("develop") || lowerInput.includes("site")))
    ) {
      return responses.dev;
    }
    if (
      (lang === 'en' && (lowerInput.includes("learn") || lowerInput.includes("course") || lowerInput.includes("training"))) ||
      (lang === 'fr' && (lowerInput.includes("formation") || lowerInput.includes("apprendre") || lowerInput.includes("cours"))) ||
      (lang === 'pid' && (lowerInput.includes("learn") || lowerInput.includes("training"))))
    ) {
      return responses.learn;
    }
    if (
      (lang === 'en' && (lowerInput.includes("payment") || lowerInput.includes("money") || lowerInput.includes("fintech"))) ||
      (lang === 'fr' && (lowerInput.includes("paiement") || lowerInput.includes("argent") || lowerInput.includes("mobile money"))) ||
      (lang === 'pid' && (lowerInput.includes("money") || lowerInput.includes("payment") || lowerInput.includes("mobile money")))
    ) {
      return responses.payment;
    }

    return responses.default;
  };
dummy text to make the replace block valid
    }
    if (
      lowerInput.includes("job") ||
      lowerInput.includes("emploi") ||
      lowerInput.includes("travail") ||
      lowerInput.includes("work")
    ) {
      return responses.job;
    }
    if (
      lowerInput.includes("site") ||
      lowerInput.includes("app") ||
      lowerInput.includes("développement") ||
      lowerInput.includes("develop")
    ) {
      return responses.dev;
    }
    if (
      lowerInput.includes("formation") ||
      lowerInput.includes("apprendre") ||
      lowerInput.includes("cours") ||
      lowerInput.includes("learn")
    ) {
      return responses.learn;
    }
    if (
      lowerInput.includes("paiement") ||
      lowerInput.includes("argent") ||
      lowerInput.includes("mobile money") ||
      lowerInput.includes("payment")
    ) {
      return responses.payment;
    }
    return responses.default;
  };

  const handleQuickSuggestion = (suggestion: string) => {
    // The suggestion is already in the current language from quickSuggestions
    setInputMessage(suggestion);
    // Call handleSendMessage directly, it will use the current inputMessage
    // which is now set to the suggestion.
    setTimeout(() => {
      // Ensure state is set before sending
      handleSendMessage();
    }, 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const currentText = languageResources[currentLanguage];

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
          <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-500 animate-pulse" />
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-80 max-w-[calc(100vw-2rem)] h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-3 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              <div>
                <h3 className="font-semibold text-sm">
                  {currentText.ui.headerTitle}
                </h3>
                <p className="text-xs text-blue-100">
                  {currentText.ui.headerSubtitle}
                </p>
              </div>
            </div>
            {/* Language Selector */}
            <div className="flex items-center bg-black/20 rounded-md p-0.5">
              {(Object.keys(languageResources) as LanguageKey[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded text-xs font-medium transition-all ${
                    currentLanguage === lang
                      ? "bg-white text-blue-600"
                      : "text-white hover:bg-white/30"
                  }`}
                >
                  {
                    currentText.ui[
                      `langButton${lang.toUpperCase()}` as keyof typeof currentText.ui
                    ]
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="p-3 border-b border-gray-100">
            <p className="text-xs text-gray-500 mb-2">
              {currentText.ui.quickSuggestTitle}
            </p>
            <div className="grid grid-cols-2 gap-1">
              {currentText.quickSuggestions
                .slice(0, 4)
                .map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSuggestion(suggestion)}
                    className="text-xs bg-gray-50 hover:bg-blue-50 text-gray-700 p-2 rounded-lg transition-colors text-left" // text-left for better alignment
                  >
                    {suggestion}
                  </button>
                ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-blue-600 to-green-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={currentText.ui.inputPlaceholder}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-indigo-600 transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
