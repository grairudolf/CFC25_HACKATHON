import React, { useState, useContext } from "react";
import { Star, ExternalLink, Badge, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Create a simple language context for now
const LanguageContext = React.createContext("en");

interface ServiceCardProps {
  id: string;
  name: string;
  description: {
    en: string;
    fr: string;
    pid: string;
  };
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  location?: string;
  website: string;
  isVerified?: boolean;
  isLoggedIn?: boolean;
}

const ServiceCard = ({
  id,
  name,
  description,
  image,
  rating,
  reviewCount,
  category,
  location,
  website,
  isVerified = false,
  isLoggedIn = false,
}: ServiceCardProps) => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const currentLanguage = useContext(LanguageContext);

  const handleRating = (ratingValue: number) => {
    if (isLoggedIn) {
      setUserRating(ratingValue);
      console.log(`User rated ${name} with ${ratingValue} stars`);
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <Star
          key={index}
          className={`w-4 h-4 cursor-pointer transition-all duration-300 ${
            starValue <= (interactive ? hoverRating || userRating : rating)
              ? "text-blue-400 fill-current"
              : "text-gray-300"
          } ${interactive ? "hover:scale-125 hover:rotate-12" : ""}`}
          onClick={() => interactive && handleRating(starValue)}
          onMouseEnter={() => interactive && setHoverRating(starValue)}
          onMouseLeave={() => interactive && setHoverRating(0)}
        />
      );
    });
  };

  // Get description based on current language, defaulting to English
  const getCurrentDescription = () => {
    return (
      description[currentLanguage as keyof typeof description] || description.en
    );
  };

  return (
    <a
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Card className="group hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 bg-white border-2 border-blue-100 hover:border-blue-300 rounded-xl overflow-hidden animate-fade-in">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-3 left-3">
            <span className="bg-white/95 backdrop-blur-sm text-blue-800 text-xs font-medium px-3 py-1 rounded-full shadow-lg border border-blue-200">
              {category}
            </span>
          </div>

          {isVerified && (
            <div className="absolute top-3 right-3 animate-bounce">
              <div className="bg-blue-100 rounded-full p-2 shadow-lg">
                <Badge className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          )}

          {location && (
            <div className="absolute bottom-3 left-3">
              <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-blue-200">
                <MapPin className="w-3 h-3 text-blue-600 mr-1" />
                <span className="text-xs text-blue-700 font-medium">
                  {location}
                </span>
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {name}
            </h3>
            {isVerified && (
              <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full border border-blue-200">
                Verified
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {getCurrentDescription()}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              {renderStars(rating)}
              <span className="text-sm text-gray-500 ml-2">
                ({reviewCount} reviews)
              </span>
            </div>
          </div>

          {isLoggedIn && (
            <div className="border-t border-blue-100 pt-4 animate-fade-in">
              <p className="text-xs text-gray-500 mb-2">Rate this service:</p>
              <div className="flex items-center space-x-1">
                {renderStars(userRating, true)}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 pt-0 flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-blue-50 hover:border-blue-300 transition-all hover:scale-105 duration-300 border-blue-200"
          >
            Learn More
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105 duration-300 shadow-lg"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Use Service
          </Button>
        </CardFooter>
      </Card>
    </a>
  );
};

export default ServiceCard;
