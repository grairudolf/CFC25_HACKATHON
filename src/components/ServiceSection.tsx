import React, { useState } from "react";
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

interface ServiceSectionProps {
  searchQuery?: string; // Added searchQuery prop
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ searchQuery }) => {
  const [activeTab, setActiveTab] = useState("recommended");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); // State for selected category
  const [visibleCount, setVisibleCount] = useState<number>(3); // State for "View More"
  const [isLoggedIn] = useState(true); // This should ideally come from context or props

  const INITIAL_ITEMS_PER_TAB = 3;
  const ITEMS_TO_LOAD_MORE = 3;

  // Cameroonian services data with multi-language support
  // In a real app, this would come from an API or a global state
  const allServicesData = React.useMemo(
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
      popular: [
        {
          id: "7",
          name: "Skaleway",
          description: {
            en: "Complete IT services: web development, system maintenance, digital training.",
            fr: "Services informatiques complets: développement web, maintenance système, formation digitale.",
            pid: "Complete IT services: website building, system maintenance, digital training.",
          },
          image: "skaleway.jpeg",
          rating: 4.8,
          reviewCount: 654,
          category: "IT Services",
          isVerified: true,
          location: "Buea",
          website: "https://skaleway.com",
        },
        {
          id: "8",
          name: "Hustlers Engineering",
          description: {
            en: "Community of Cameroonian entrepreneurs and engineers. Networking, mentoring and business opportunities.",
            fr: "Communauté d'entrepreneurs et ingénieurs camerounais. Networking, mentoring et opportunités business.",
            pid: "Community of Cameroon entrepreneurs and engineers. Networking, mentoring and business opportunities.",
          },
          image: "hustler.png",
          rating: 4.9,
          reviewCount: 1203,
          category: "Engineering Community",
          location: "Buea",
          website: "https://hustlersconf.com",
        },
        {
          id: "9",
          name: "lam bdaa",
          description: {
            en: "Custom mobile and web application development for Cameroonian businesses.",
            fr: "Développement d'applications mobiles et web sur mesure pour entreprises camerounaises.",
            pid: "Custom mobile and web app development for Cameroon businesses.",
          },
          image: "lambda.png",
          rating: 4.6,
          reviewCount: 432,
          category: "App Development",
          isVerified: true,
          location: "Buea",
          website: "https://lambdaa.org",
        },
      ],
    }),
    []
  );

  // Memoize unique categories
  const uniqueCategories = React.useMemo(() => {
    const categories = new Set<string>();
    Object.values(allServicesData).forEach((tabServices) => {
      tabServices.forEach((service) => categories.add(service.category));
    });
    return ["all", ...Array.from(categories).sort()];
  }, [allServicesData]);

  // Reset visible count when tab, search query, or category changes
  React.useEffect(() => {
    setVisibleCount(INITIAL_ITEMS_PER_TAB);
  }, [activeTab, searchQuery, selectedCategory]);

  // Filtering logic
  const finalFilteredServices = React.useMemo(() => {
    let services =
      allServicesData[activeTab as keyof typeof allServicesData] || [];

    // Filter by search query
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
          service.location.toLowerCase().includes(query)
        );
      });
    }

    // Filter by category
    if (selectedCategory !== "all") {
      services = services.filter(
        (service) => service.category === selectedCategory
      );
    }
    return services;
  }, [activeTab, searchQuery, selectedCategory, allServicesData]);

  const servicesToDisplay = finalFilteredServices.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_TO_LOAD_MORE);
  };

  const tabs = [
    {
      id: "recommended",
      label: "Recommended Services",
      count: allServicesData.recommended.length, // Show total count for the tab
    },
    {
      id: "latest",
      label: "Latest Services",
      count: allServicesData.latest.length,
    },
    {
      id: "popular",
      label: "Popular Services",
      count: allServicesData.popular.length,
    },
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quality Cameroonian Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the best digital services created by and for Cameroonians.
          </p>
        </div>

        {/* Tabs and Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                // onClick={() => setActiveTab(tab.id)} // setActiveTab will also reset visibleCount due to useEffect
                onClick={() => {
                  setActiveTab(tab.id);
                  // setSelectedCategory("all"); // Optionally reset category on tab change
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-auto min-w-[180px] sm:w-48">
                {" "}
                {/* Adjusted width */}
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
                <ServiceCard {...service} isLoggedIn={isLoggedIn} />
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
        {finalFilteredServices.length > visibleCount && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 border-2 hover:bg-gray-50 hover:scale-105 transition-all"
              onClick={handleViewMore}
            >
              View More Services ({visibleCount}/{finalFilteredServices.length})
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceSection;
