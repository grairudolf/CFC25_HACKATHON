
import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Bonjour! Je suis votre assistant IA camerounais. Je peux vous aider à découvrir des services locaux, trouver ce que vous cherchez, ou vous orienter vers des formations. Que puis-je faire pour vous aujourd'hui? 🇨🇲",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickSuggestions = [
    "🍽️ Je veux manger",
    "💼 Chercher un job", 
    "📱 Créer une app",
    "🎓 Apprendre le code",
    "💰 Services de paiement",
    "🚗 Livraison rapide"
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage = {
        type: 'user',
        content: inputMessage,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);

      // Simulate AI response with Cameroonian context
      setTimeout(() => {
        const botResponse = {
          type: 'bot',
          content: generateCameroonianBotResponse(inputMessage),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);

      setInputMessage('');
    }
  };

  const generateCameroonianBotResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('manger') || lowerInput.includes('food') || lowerInput.includes('plat')) {
      return "Perfect! FastChops est le meilleur service de livraison au Cameroun. Ils livrent partout à Douala et Yaoundé. Vous pouvez commander du ndolé, du poulet braisé, ou même des plats continentaux. Voulez-vous que je vous montre d'autres options?";
    }
    
    if (lowerInput.includes('job') || lowerInput.includes('emploi') || lowerInput.includes('travail')) {
      return "237Jobs est LA plateforme pour trouver un emploi au Cameroun! Ils ont plus de 5000 offres dans tous les secteurs. Je recommande aussi de rejoindre la communauté Hustlers Engineering pour le networking. Dans quel domaine cherchez-vous?";
    }
    
    if (lowerInput.includes('site') || lowerInput.includes('app') || lowerInput.includes('développement')) {
      return "Excellente idée! NervTek Solutions et TIC Cameroun sont spécialisés dans le développement d'apps et sites web. Pour apprendre vous-même, DeltechHub offre des formations complètes. Voulez-vous développer ou apprendre?";
    }
    
    if (lowerInput.includes('formation') || lowerInput.includes('apprendre') || lowerInput.includes('cours')) {
      return "Knowledge Center a une excellente bibliothèque numérique camerounaise. DeltechHub offre des formations tech pratiques. Pour les cours en ligne internationaux mais adaptés au contexte local, je peux vous guider. Quel domaine vous intéresse?";
    }
    
    if (lowerInput.includes('paiement') || lowerInput.includes('argent') || lowerInput.includes('mobile money')) {
      return "Nkwa.cm est parfait pour ça! Ils offrent des solutions de paiement mobile et services financiers digitaux adaptés aux Camerounais. C'est sécurisé et très pratique pour toutes vos transactions.";
    }
    
    return "Je suis là pour vous aider à naviguer dans l'écosystème numérique camerounais! Vous pouvez me demander des services de livraison, des opportunités d'emploi, des formations tech, ou même des conseils sur l'entrepreneuriat local. Que souhaitez-vous explorer? 🚀";
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-pink-300 animate-pulse" />
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-80 max-w-[calc(100vw-2rem)] h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-4 rounded-t-xl flex items-center">
            <Bot className="w-5 h-5 mr-2" />
            <div>
              <h3 className="font-semibold">Assistant IA Cameroun</h3>
              <p className="text-xs text-blue-100"> là pour vous aider 🇨🇲</p>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="p-3 border-b border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Suggestions rapides:</p>
            <div className="grid grid-cols-2 gap-1">
              {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSuggestion(suggestion)}
                  className="text-xs bg-gray-50 hover:bg-green-50 text-gray-700 p-2 rounded-lg transition-colors"
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
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-800'
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
                placeholder="Tapez votre message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 transition-all hover:scale-105"
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
