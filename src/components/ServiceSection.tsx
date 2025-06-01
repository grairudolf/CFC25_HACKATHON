import React, { useState, useMemo, useEffect } from "react";
import { Filter, Grid, List, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ServiceCard from "./ServiceCard";
import { Service } from "@/types"; // Import Service type

interface ServiceSectionProps {
  searchQuery?: string;
  // If we were to pass allServicesData as a prop, it would be defined here
  // allServicesData?: { recommended: Service[]; latest: Service[] };
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ searchQuery }) => {
  const [activeTab, setActiveTab] = useState("recommended");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [showAll, setShowAll] = useState(false);

  const ITEMS_TO_LOAD_MORE = 3;

  // Predefined services data
  const allServicesData = useMemo(
    () => ({
      recommended: [
        {
          id: "1",
          name: "FastChops",
          description: {
            en: "Fast food delivery across Douala and Yaoundé. Order your favorite Cameroonian dishes in just a few clicks.",
            fr: "Livraison rapide de nourriture camerounaise partout à Douala et Yaoundé. Commandez vos plats préférés en quelques clics.",
            pid: "Quick chop delivery for Douala and Yaoundé. Order your favorite local food with small time.",
          },
          image: "fastchops.jpeg",
          rating: 4.8,
          reviewCount: 1247,
          category: "Food & Delivery",
          isVerified: true,
          location: "Buea",
          website: "https://www.f6s.com/company/fastchops",
        },
        {
          id: "2",
          name: "237Jobs",
          description: {
            en: "Cameroon's #1 job platform. Over 5000 job opportunities across all sectors.",
            fr: "La plateforme #1 pour trouver un emploi au Cameroun. Plus de 5000 offres d'emploi dans tous les secteurs.",
            pid: "Number one place for find work for Cameroon. Plenty job opportunities for all sectors.",
          },
          image: "237jobs.jpg",
          rating: 4.7,
          reviewCount: 892,
          category: "Jobs & Career",
          isVerified: true,
          location: "All Cameroon",
          website: "https://237jobs.com",
        },
        {
          id: "3",
          name: "Nkwa",
          description: {
            en: "Mobile payment solutions and digital financial services for all Cameroonians.",
            fr: "Solutions de paiement mobile et services financiers digitaux pour tous les Camerounais.",
            pid: "Mobile money and digital financial services for all Cameroon people.",
          },
          image: "nkwa.jpg",
          rating: 4.9,
          reviewCount: 2156,
          category: "Fintech & Payments",
          isVerified: true,
          location: "National",
          website: "https://mynkwa.com",
        },
      ],
      latest: [
        {
          id: "4",
          name: "DelTechHub",
          description: {
            en: "Technology training and mentorship. Learn programming, design and tech entrepreneurship.",
            fr: "Formation et accompagnement en technologie. Apprenez la programmation, le design et l'entrepreneuriat tech.",
            pid: "Tech training and support. Learn coding, design and how to start tech business.",
          },
          image: "deltech.jpeg",
          rating: 4.6,
          reviewCount: 343,
          category: "Tech Training",
          location: "Douala",
          website: "https://deltechhub.com",
        },
        {
          id: "5",
          name: "AjeBoCV",
          description: {
            en: "Create your professional CV online easily. Templates adapted to the Cameroonian market.",
            fr: "Créez votre CV professionnel en ligne facilement. Templates adaptés au marché camerounais.",
            pid: "Make your professional CV online easy way. Templates fit for Cameroon job market.",
          },
          image: "ajebocv.png",
          rating: 4.5,
          reviewCount: 567,
          category: "Professional Services",
          isVerified: true,
          location: "Online",
          website: "https://ajebocv.com",
        },
        {
          id: "6",
          name: "skolarr",
          description: {
            en: "Cameroonian digital library with thousands of books, courses and educational resources.",
            fr: "Bibliothèque numérique camerounaise avec des milliers de livres, cours et ressources éducatives.",
            pid: "Cameroon digital library with plenty books, courses and educational materials.",
          },
          image: "skolarr.png",
          rating: 4.7,
          reviewCount: 778,
          category: "Education",
          location: "Online",
          website: "https://skolarr.com",
        },
      ],
    }),
    []
  );

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    Object.values(allServicesData).forEach((tabServices) => {
      tabServices.forEach((service) => categories.add(service.category));
    });
    return ["all", ...Array.from(categories).sort()];
  }, [allServicesData]);

  useEffect(() => {
    setVisibleCount(ITEMS_TO_LOAD_MORE);
    setShowAll(false);
  }, [activeTab, searchQuery, selectedCategory]);

  const filteredServices = useMemo(() => {
    let services =
      allServicesData[activeTab as keyof typeof allServicesData] || [];

    if (searchQuery) {
      services = services.filter((service) => {
        const query = searchQuery.toLowerCase();
        const desc = service.description;
        return (
          service.name.toLowerCase().includes(query) ||
          desc.en.toLowerCase().includes(query) ||
          desc.fr.toLowerCase().includes(query) ||
          desc.pid.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query) ||
          service.location?.toLowerCase().includes(query)
        );
      });
    }

    if (selectedCategory !== "all") {
      services = services.filter(
        (service) => service.category === selectedCategory
      );
    }
    return services;
  }, [activeTab, searchQuery, selectedCategory, allServicesData]);

  const servicesToDisplay = filteredServices.slice(0, visibleCount);

  const handleViewMore = () => {
    if (showAll) {
      setVisibleCount(ITEMS_TO_LOAD_MORE);
      setShowAll(false);
    } else {
      setVisibleCount(filteredServices.length);
      setShowAll(true);
    }
  };

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quality Cameroonian Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the best digital services created by and for Cameroonians.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-end items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-full md:w-auto min-w-[180px] sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}
        >
          {servicesToDisplay.length > 0 ? (
            servicesToDisplay.map((service, index) => (
              <div
                key={service.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No services found
              </h3>
              <p className="text-gray-500">
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search or category filters."
                  : "More services coming soon!"}
              </p>
            </div>
          )}
        </div>

        {/* View More Button */}
        {filteredServices.length > visibleCount && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 border-2 hover:bg-gray-50 hover:scale-105 transition-all"
              onClick={handleViewMore}
            >
              {showAll ? "View Less" : "View More"} ({visibleCount}/{filteredServices.length})
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceSection;
