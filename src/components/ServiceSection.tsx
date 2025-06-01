import React, { useState, useEffect, useMemo } from "react";
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

// Define a type for the service object based on expected API response
// Ensure this matches the structure of objects in the `data` array from the API
interface Service {
  _id: string; // Backend uses _id
  name: string;
  description: {
    en: string;
    fr: string;
    pid: string; // Assuming pidgin is also part of description
  };
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  isVerified?: boolean;
  location?: string;
  website?: string;
  // Add any other fields that come from the API
}
interface ServiceSectionProps {
  searchQuery?: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ searchQuery }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(9); // Show more items by default
  const [isLoggedIn] = useState(true); // Placeholder

  const ITEMS_TO_LOAD_MORE = 6;

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/services`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result && result.data && Array.isArray(result.data)) {
          setServices(result.data);
        } else {
          // Handle cases where data might be nested differently or not an array
          console.error("Fetched data is not in expected format:", result);
          setServices([]); // Set to empty array if format is wrong
          setError("Unexpected data format from server.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    services.forEach((service) => categories.add(service.category));
    return ["all", ...Array.from(categories).sort()];
  }, [services]);

  useEffect(() => {
    // Reset visible count when search query or category changes, but not on initial load
    setVisibleCount(9);
  }, [searchQuery, selectedCategory]);

  const filteredServices = useMemo(() => {
    let currentServices = [...services];

    if (searchQuery) {
      currentServices = currentServices.filter((service) => {
        const query = searchQuery.toLowerCase();
        // Ensure description exists and has expected structure before accessing
        const desc = service.description || { en: "", fr: "", pid: "" };
        return (
          service.name.toLowerCase().includes(query) ||
          (desc.en && desc.en.toLowerCase().includes(query)) ||
          (desc.fr && desc.fr.toLowerCase().includes(query)) ||
          (desc.pid && desc.pid.toLowerCase().includes(query)) ||
          service.category.toLowerCase().includes(query) ||
          (service.location && service.location.toLowerCase().includes(query))
        );
      });
    }

    if (selectedCategory !== "all") {
      currentServices = currentServices.filter(
        (service) => service.category === selectedCategory
      );
    }
    return currentServices;
  }, [services, searchQuery, selectedCategory]);

  const servicesToDisplay = filteredServices.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_TO_LOAD_MORE);
  };

  if (loading) {
    return (
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Loading services...</h2>
          {/* You could add a spinner here */}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-red-600">Error loading services:</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

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

        {/* Services Grid / List */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 max-w-4xl mx-auto" // List view styling
          }`}
        >
          {servicesToDisplay.length > 0 ? (
            servicesToDisplay.map((service, index) => (
              <div
                key={service._id} // Use service._id for the key
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard
                  // Pass all service properties, ensuring id is mapped from _id
                  {...service}
                  id={service._id} // Explicitly pass _id as id
                  isLoggedIn={isLoggedIn}
                />
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
                  : "No services available at the moment. Please check back later."}
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
              View More Services ({visibleCount}/{filteredServices.length})
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceSection;
