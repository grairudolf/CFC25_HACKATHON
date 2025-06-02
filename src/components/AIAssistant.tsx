import React, { useState, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Sparkles, Globe } from "lucide-react"; // Added Globe
import { Button } from "@/components/ui/button";

type LanguageKey = "en" | "fr" | "pid";

const languageResources = {
  en: {
    initialMessage:
      "Hello! I'm your SiliconHub assistant. I can help you discover local services, find what you're looking for, or guide you to training. What can I do for you today? 🇨🇲",
    quickSuggestions: [
      "🍽️ I want to eat",
      "💼 Find a job",
      "📱 Create an app",
      "🎓 Learn to code",
      "💰 Payment services",
      "🚗 Fast delivery",
      "🛍️ Shop online",
      "🤝 Find tech events",
    ],
    responses: {
      food: "Perfect! FastChops is the best delivery service in Cameroon. They deliver throughout Douala and Yaoundé. You can order ndolé, roasted chicken, or even continental dishes. Would you like me to show you other options?",
      ecommerce:
        "For online shopping in Cameroon, check out Jumia (general goods), Kikuu (fashion & electronics), or local Facebook groups for specific items. Many entrepreneurs also sell directly via WhatsApp!",
      techCommunity:
        "Cameroon has a vibrant tech scene! Look into Google Developer Groups (GDG), forLoop Africa, Silicon Mountain conferences, and local university tech clubs for meetups and events. Hustlers Engineering is also a great online community.",
      job: "237Jobs is THE platform to find a job in Cameroon! They have over 5000 offers in all sectors. I also recommend joining the Hustlers Engineering community for networking. What field are you looking in?",
      dev: "Excellent idea! lambda Solutions and TIC Cameroun specialize in app and website development. To learn yourself, DeltechHub offers comprehensive training. Do you want to develop or learn?",
      learn:
        "Knowledge Center has an excellent Cameroonian digital library. DeltechHub offers practical tech training. For international online courses adapted to the local context, I can guide you. What field interests you?",
      payment:
        "Nkwa.cm is perfect for payments! Would you like to try initiating a payment?",
      promptForPhoneNumber:
        "Okay, I can help with that. Please provide your phone number.",
      paymentInitiationNoted:
        "Got it. I'll use the next message as your phone number for the payment.",
      paymentApiSuccess:
        "Your payment request has been initiated successfully.",
      paymentApiFail:
        "Sorry, I couldn't initiate the payment. Please try again later.",
      invalidPhoneNumber:
        "The phone number provided seems invalid. Please provide a valid number.",
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
      typingIndicator: "Assistant is typing...",
    },
  },
  fr: {
    initialMessage:
      "Bonjour! Je suis votre assistant SiliconHub. Je peux vous aider à découvrir des services locaux, trouver ce que vous cherchez, ou vous orienter vers des formations. Que puis-je faire pour vous aujourd'hui? 🇨🇲",
    quickSuggestions: [
      "🍽️ Je veux manger",
      "💼 Chercher un job",
      "📱 Créer une app",
      "🎓 Apprendre le code",
      "💰 Services de paiement",
      "🚗 Livraison rapide",
      "🛍️ Acheter en ligne",
      "🤝 Trouver des événements tech",
    ],
    responses: {
      food: "Perfect! FastChops est le meilleur service de livraison au Cameroun. Ils livrent partout à Douala et Yaoundé. Vous pouvez commander du ndolé, du poulet braisé, ou même des plats continentaux. Voulez-vous que je vous montre d'autres options?",
      ecommerce:
        "Pour les achats en ligne au Cameroun, explorez Jumia (articles variés), Kikuu (mode & électronique), ou les groupes Facebook locaux pour des articles spécifiques. Beaucoup d'entrepreneurs vendent aussi directement via WhatsApp !",
      techCommunity:
        "Le Cameroun a une scène tech dynamique ! Renseignez-vous sur les Google Developer Groups (GDG), forLoop Africa, les conférences Silicon Mountain, et les clubs tech des universités locales pour des meetups et événements. Hustlers Engineering est aussi une excellente communauté en ligne.",
      job: "237Jobs est LA plateforme pour trouver un emploi au Cameroun! Ils ont plus de 5000 offres dans tous les secteurs. Je recommande aussi de rejoindre la communauté Hustlers Engineering pour le networking. Dans quel domaine cherchez-vous?",
      dev: "Excellente idée! lambda Solutions et TIC Cameroun sont spécialisés dans le développement d'apps et sites web. Pour apprendre vous-même, DeltechHub offre des formations complètes. Voulez-vous développer ou apprendre?",
      learn:
        "Knowledge Center a une excellente bibliothèque numérique camerounaise. DeltechHub offre des formations tech pratiques. Pour les cours en ligne internationaux mais adaptés au contexte local, je peux vous guider. Quel domaine vous intéresse?",
      payment:
        "Nkwa.cm est parfait pour les paiements! Voulez-vous essayer d'initier un paiement?",
      promptForPhoneNumber:
        "D'accord, je peux vous aider avec ça. Veuillez fournir votre numéro de téléphone.",
      paymentInitiationNoted:
        "Compris. J'utiliserai le prochain message comme numéro de téléphone pour le paiement.",
      paymentApiSuccess: "Votre demande de paiement a été initiée avec succès.",
      paymentApiFail:
        "Désolé, je n'ai pas pu initier le paiement. Veuillez réessayer plus tard.",
      invalidPhoneNumber:
        "Le numéro de téléphone fourni semble invalide. Veuillez fournir un numéro valide.",
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
      typingIndicator: "Assistant est en train d'écrire...",
    },
  },
  pid: {
    initialMessage:
      "Salut! Na me be ya SiliconHub assistant. I fit helep you see local services, find wetin you dey find, or show you place for learn work. Wetin I fit do for you today? 🇨🇲",
    quickSuggestions: [
      "🍽️ I wan chop",
      "💼 Find work",
      "📱 Make app",
      "🎓 Learn code",
      "💰 Money services",
      "🚗 Quick delivery",
      "🛍️ Buy for online",
      "🤝 Find tech events",
    ],
    responses: {
      food: "Correct! FastChops na correct delivery service for Cameroon. Dem dey deliver for Douala and Yaoundé. You fit order ndolé, roast chicken, or even oyibo food. You want make I show you other places?",
      ecommerce:
        "For online market for Cameroon, check Jumia (all kind ting), Kikuu (fashion & electronics), or local Facebook groups for specific items. Plenty people too di sell direct for WhatsApp!",
      techCommunity:
        "Cameroon get correct tech people! Check Google Developer Groups (GDG), forLoop Africa, Silicon Mountain conferences, and local university tech clubs for meetups and events. Hustlers Engineering too na better online group.",
      job: "237Jobs na THE place for find work for Cameroon! Dem get pass 5000 jobs for all kind work. I go tell you say make you join Hustlers Engineering community for networking. Which kind work you dey find?",
      dev: "Good idea! lambda Solutions and TIC Cameroun dem sabi for make app and website. For learnam yourself, DeltechHub get correct training. You want make app or you want learn?",
      learn:
        "Knowledge Center get correct Cameroon digital library. DeltechHub get practical tech training. For online courses from oyibo people wey dem arrange for local style, I fit guide you. Which side you want learn?",
      payment: "Nkwa.cm na fine for payment! You wan try initiate payment?",
      promptForPhoneNumber:
        "Okay, I fit help you with dat. Abeg, give me your phone number.",
      paymentInitiationNoted:
        "I don hear you. I go use the next message as your phone number for the payment.",
      paymentApiSuccess: "Your payment request don start successfully.",
      paymentApiFail:
        "Sorry, I no fit start the payment. Abeg try again later.",
      invalidPhoneNumber:
        "The phone number wey you give no be correct one. Abeg give correct number.",
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
      typingIndicator: "Assistant dey type...",
    },
  },
};

type Message = {
  type: "bot" | "user";
  content: string;
  timestamp: Date;
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageKey>("en");
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      type: "bot" as const,
      content: languageResources[currentLanguage].initialMessage,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAwaitingPhoneNumberForPayment, setIsAwaitingPhoneNumberForPayment] =
    useState(false);

  useEffect(() => {
    setMessages([
      {
        type: "bot" as const,
        content: languageResources[currentLanguage].initialMessage,
        timestamp: new Date(),
      },
    ]);
  }, [currentLanguage]);

  const handleSendMessage = () => {
    const currentText = languageResources[currentLanguage];
    if (inputMessage.trim()) {
      const userMessage = {
        type: "user" as const,
        content: inputMessage,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputMessage(""); // Clear input after sending user message

      if (isAwaitingPhoneNumberForPayment) {
        setIsTyping(true);
        const phoneNumber = inputMessage.trim();
        // Basic phone number validation (digits only, and perhaps a reasonable length)
        const phoneRegex = /^\d{9,15}$/; // Example: 9 to 15 digits
        if (!phoneRegex.test(phoneNumber)) {
          const botResponse = {
            type: "bot" as const,
            content:
              languageResources[currentLanguage].responses.invalidPhoneNumber,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
          setIsAwaitingPhoneNumberForPayment(false);
          setIsTyping(false);
          return;
        }

        // Confirmation message before API call
        const confirmationMessage = {
          type: "bot" as const,
          content:
            languageResources[currentLanguage].responses.paymentInitiationNoted, // Using this as a placeholder for "Okay, I have your number..."
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, confirmationMessage]);

        // API Call
        fetch(`/api/nkwa/pay/${phoneNumber}`, { method: "GET" })
          .then(async (response) => {
            let responseKey: keyof (typeof languageResources)[typeof currentLanguage]["responses"];
            if (response.ok) {
              // Optionally check response body if backend sends a specific success flag
              // const data = await response.json();
              // if (data.success) { ... }
              responseKey = "paymentApiSuccess";
            } else {
              responseKey = "paymentApiFail";
            }
            const botResponse = {
              type: "bot" as const,
              content:
                languageResources[currentLanguage].responses[responseKey],
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
          })
          .catch(() => {
            const botResponse = {
              type: "bot" as const,
              content:
                languageResources[currentLanguage].responses.paymentApiFail,
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
          })
          .finally(() => {
            setIsAwaitingPhoneNumberForPayment(false);
            setIsTyping(false);
          });
      } else {
        setIsTyping(true);
        setTimeout(() => {
          const botResponseContent = generateCameroonianBotResponse(
            inputMessage,
            currentLanguage
          );
          const botResponse = {
            type: "bot" as const,
            content: botResponseContent,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
          setIsTyping(false);
        }, 1000);
      }
    }
  };

  const generateCameroonianBotResponse = (
    userInput: string,
    lang: LanguageKey
  ): string => {
    const lowerInput = userInput.toLowerCase();
    const responses = languageResources[lang].responses;

    // E-commerce
    if (
      lowerInput.includes("buy online") ||
      lowerInput.includes("ecommerce") ||
      lowerInput.includes("shopping") ||
      lowerInput.includes("market") ||
      lowerInput.includes("acheter en ligne") || // fr
      lowerInput.includes("marché") // fr
    ) {
      return responses.ecommerce;
    }

    // Tech Communities/Events
    if (
      lowerInput.includes("tech community") ||
      lowerInput.includes("meetup") ||
      lowerInput.includes("hackathon") ||
      lowerInput.includes("conference") ||
      lowerInput.includes("developer group") ||
      lowerInput.includes("communauté tech") || // fr
      lowerInput.includes("groupe de développeurs") // fr
    ) {
      return responses.techCommunity;
    }

    if (
      lowerInput.includes("manger") ||
      lowerInput.includes("food") ||
      lowerInput.includes("plat") ||
      lowerInput.includes("chop")
    ) {
      return responses.food;
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
      lowerInput.includes("payment") ||
      lowerInput.includes("start payment") ||
      lowerInput.includes("initiate payment") ||
      lowerInput.includes("pay now") ||
      lowerInput.includes("make payment") ||
      lowerInput.includes("begin payment") ||
      lowerInput.includes("commencer le paiement") || // fr
      lowerInput.includes("initier le paiement") || // fr
      lowerInput.includes("payer maintenant") || // fr
      lowerInput.includes("effectuer le paiement") || // fr
      lowerInput.includes("commencer paiement") || // fr
      lowerInput.includes("start payment") || // pid
      lowerInput.includes("initiate payment") || // pid
      lowerInput.includes("pay now") || // pid
      lowerInput.includes("make payment") || // pid
      lowerInput.includes("begin payment") // pid
    ) {
      if (
        lowerInput.includes("start payment") ||
        lowerInput.includes("initiate payment") ||
        lowerInput.includes("pay now") ||
        lowerInput.includes("make payment") ||
        lowerInput.includes("begin payment") ||
        lowerInput.includes("commencer le paiement") || // fr
        lowerInput.includes("initier le paiement") || // fr
        lowerInput.includes("payer maintenant") || // fr
        lowerInput.includes("effectuer le paiement") || // fr
        lowerInput.includes("commencer paiement") // fr
      ) {
        setIsAwaitingPhoneNumberForPayment(true);
        return responses.promptForPhoneNumber;
      }
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
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="max-w-[85%] p-3 rounded-lg bg-gray-100 text-gray-800">
                  <p className="text-sm leading-relaxed italic">
                    {currentText.ui.typingIndicator}
                  </p>
                </div>
              </div>
            )}
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
