import React, { useState, useMemo, useEffect } from "react";
import { Filter, Grid, List, MapPin, ChevronDown, ChevronUp } from "lucide-react"; // Added Chevrons
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ServiceCard from "./ServiceCard";
import { Service } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext"; // Import useLanguage

interface ServiceSectionProps {
  searchQuery?: string;
  allServicesDataProp?: Service[]; // Optional: if services are fetched from a higher component
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  searchQuery,
  allServicesDataProp
}) => {
  const { translate } = useLanguage();
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const ITEMS_PER_CATEGORY_INITIAL = 3;
  const [visibleServicesPerCategory, setVisibleServicesPerCategory] = useState<number>(ITEMS_PER_CATEGORY_INITIAL);
  const [showAllPerCategory, setShowAllPerCategory] = useState(false);

  // Use predefined services data or prop
  const internalServicesData = useMemo(
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
          image: "/fastchops.jpeg", // Assuming images are in public folder
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
          image: "/237jobs.jpg",
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
          image: "/nkwa.jpg",
          rating: 4.9,
          reviewCount: 2156,
          category: "Fintech & Payments",
          isVerified: true,
          location: "National",
          website: "https://mynkwa.com",
        },
        {
          id: "7",
          name: "Food Delivery",
          description: {
            en: "Order your favorite meals from local restaurants.",
            fr: "Commandez vos plats préférés auprès des restaurants locaux.",
            pid: "Order your chop chop from local restaurants.",
          },
          image: "/switchn.png",
          rating: 4.5,
          reviewCount: 150,
          category: "Food & Delivery",
          isVerified: true,
          location: "Online",
          website: "/food-delivery-order",
        }
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
          image: "/deltech.jpeg",
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
          image: "/ajebocv.png",
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
          image: "/skolarr.png",
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

  const allServices = useMemo(() => {
    if (allServicesDataProp) return allServicesDataProp;
    return [...internalServicesData.recommended, ...internalServicesData.latest];
  }, [allServicesDataProp, internalServicesData]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    allServices.forEach((service) => categories.add(service.category));
    return ["all", ...Array.from(categories).sort()];
  }, [allServices]);

  useEffect(() => {
    setVisibleServicesPerCategory(ITEMS_PER_CATEGORY_INITIAL);
    setShowAllPerCategory(false);
  }, [searchQuery, selectedCategory]);

  const filteredAndCategorizedServices = useMemo(() => {
    let servicesToFilter = [...allServices];

    if (searchQuery) {
      servicesToFilter = servicesToFilter.filter((service) => {
        const query = searchQuery.toLowerCase();
        // Ensure description is an object before accessing its properties
        const desc = typeof service.description === 'object' && service.description !== null
          ? service.description
          : { en: '', fr: '', pid: '' };
        return (
          service.name.toLowerCase().includes(query) ||
          (desc.en && desc.en.toLowerCase().includes(query)) ||
          (desc.fr && desc.fr.toLowerCase().includes(query)) ||
          (desc.pid && desc.pid.toLowerCase().includes(query)) ||
          service.category.toLowerCase().includes(query) ||
          service.location?.toLowerCase().includes(query)
        );
      });
    }

    const categorized: { [key: string]: Service[] } = {};
    if (selectedCategory === "all") {
      servicesToFilter.forEach(service => {
        if (!categorized[service.category]) {
          categorized[service.category] = [];
        }
        categorized[service.category].push(service);
      });
    } else {
      categorized[selectedCategory] = servicesToFilter.filter(
        (service) => service.category === selectedCategory
      );
      // If a category is selected and it has no services after search, it might be empty.
      if (categorized[selectedCategory]?.length === 0) {
         delete categorized[selectedCategory]; // Remove empty category
      }
    }
    return categorized;
  }, [searchQuery, selectedCategory, allServices]);

  const totalFilteredServicesCount = useMemo(() => {
    return Object.values(filteredAndCategorizedServices).reduce((sum, services) => sum + services.length, 0);
  }, [filteredAndCategorizedServices]);


  const handleViewMoreToggle = () => {
    setShowAllPerCategory(!showAllPerCategory);
    if (!showAllPerCategory) {
      // This means we are going to "View More", so set visible to a large number
      setVisibleServicesPerCategory(1000); // Effectively show all
    } else {
      // This means we are going to "View Less", so reset to initial
      setVisibleServicesPerCategory(ITEMS_PER_CATEGORY_INITIAL);
    }
  };

  const anyCategoryHasMore = useMemo(() => {
    if (showAllPerCategory) return false; // If showing all, no category has "more" hidden items
    for (const category in filteredAndCategorizedServices) {
      if (filteredAndCategorizedServices[category].length > visibleServicesPerCategory) {
        return true;
      }
    }
    return false;
  }, [filteredAndCategorizedServices, visibleServicesPerCategory, showAllPerCategory]);


  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {translate({ en: "Quality Cameroonian Services", fr: "Services Camerounais de Qualité", pid: "Quality Cameroon Services" })}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {translate({
              en: "Discover the best digital services created by and for Cameroonians.",
              fr: "Découvrez les meilleurs services numériques créés par et pour les Camerounais.",
              pid: "Find fine digital services wey dem make for Cameroon people."
            })}
          </p>
        </div>

        {/* Intro text for filters */}
        <p className="text-md text-gray-700 max-w-3xl mx-auto text-center mb-8">
          {translate({
            en: "Explore a wide variety of services, neatly organized by category, or use the filters to find exactly what you need.",
            fr: "Explorez une grande variété de services, soigneusement organisés par catégorie, ou utilisez les filtres pour trouver exactement ce dont vous avez besoin.",
            pid: "Check plenty services, dem arrange am fine fine by category, or use filter for find exactly wetin you need."
          }, "Explore services by category or use filters.")}
        </p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-auto">
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
                // Reset view more when category changes
                setShowAllPerCategory(false);
                setVisibleServicesPerCategory(ITEMS_PER_CATEGORY_INITIAL);
              }}
            >
              <SelectTrigger className="w-full md:w-auto min-w-[200px] sm:w-56 bg-white border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-primary focus:border-primary">
                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                <SelectValue placeholder={translate({en: "Filter by Category", fr:"Filtrer par Catégorie", pid:"Choose Category"})}/>
              </SelectTrigger>
              <SelectContent>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? translate({en: "All Categories", fr: "Toutes les catégories", pid:"All Categories"}) : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => setViewMode("grid")}
              title={translate({en: "Grid View", fr:"Vue Grille", pid:"Grid View"})}
              className={`p-2 transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              title={translate({en: "List View", fr:"Vue Liste", pid:"List View"})}
              className={`p-2 transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Services Display */}
        {Object.keys(filteredAndCategorizedServices).length > 0 ? (
          Object.entries(filteredAndCategorizedServices).map(([categoryName, servicesInCategory]) => {
            if (servicesInCategory.length === 0) return null; // Don't render empty categories

            const servicesToDisplayForCategory = showAllPerCategory
              ? servicesInCategory
              : servicesInCategory.slice(0, visibleServicesPerCategory);

            return (
              <div key={categoryName} className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 capitalize">
                  {categoryName} ({servicesInCategory.length})
                </h3>
                <div
                  className={`grid gap-x-6 gap-y-10 ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1 max-w-4xl mx-auto space-y-6"
                  }`}
                >
                  {servicesToDisplayForCategory.map((service, index) => (
                    <div
                      key={service.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ServiceCard {...service} image={service.image || '/placeholder.png'} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {translate({en: "No services found", fr:"Aucun service trouvé", pid: "No service find"})}
            </h3>
            <p className="text-gray-500">
              {searchQuery || selectedCategory !== "all"
                ? translate({en:"Try adjusting your search or category filters.", fr:"Essayez d'ajuster vos filtres de recherche ou de catégorie.", pid: "Try change how you search or filter."})
                : translate({en:"More services coming soon!", fr:"Plus de services bientôt disponibles!", pid: "More services dey come!"})}
            </p>
          </div>
        )}

        {/* View More Button - Conditionally render if any category has more items than initially visible and not "showAll" */}
        {anyCategoryHasMore && totalFilteredServicesCount > ITEMS_PER_CATEGORY_INITIAL && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary/5 hover:scale-105 transition-all group"
              onClick={handleViewMoreToggle}
            >
              {showAllPerCategory ? (
                <>
                  <ChevronUp className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  {translate({en: "View Less", fr: "Voir Moins", pid: "See Less"})}
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  {translate({en: "View More", fr: "Voir Plus", pid: "See More"})}
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceSection;
