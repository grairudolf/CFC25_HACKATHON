
import React, { useMemo } from 'react'; // Import useMemo
import Navbar from '@/components/Navbar';
import { Service } from '@/types'; // Import Service type
import HeroSection from '@/components/HeroSection';
import ServiceSection from '@/components/ServiceSection';
import SkillSection from '@/components/SkillSection';
import FAQSection from '@/components/FAQSection';
import ServiceSubmissionForm from '@/components/ServiceSubmissionForm';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';

const Index = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  // Define allServicesData (copied from ServiceSection.tsx for now)
  // In a real app, this would likely come from an API or a global store
  const allServicesData = useMemo((): { recommended: Service[]; latest: Service[] } => ({
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
      {
        id: "7", // Assuming existing services go up to 6
        name: "Food Delivery",
        description: {
          en: "Order your favorite meals from local restaurants.",
          fr: "Commandez vos plats préférés auprès des restaurants locaux.",
          pid: "Order your chop chop from local restaurants.",
        },
        image: "public/food-delivery-placeholder.jpg", // We'll need to add this image later
        rating: 4.5,
        reviewCount: 150,
        category: "Food & Delivery",
        isVerified: true,
        location: "Online",
        website: "/food-delivery-order", // Route to the new page
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
  }), []);

  const flattenedServices = useMemo(() => {
    return Object.values(allServicesData).flat();
  }, [allServicesData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSearch={handleSearch} allServices={flattenedServices} />
      <HeroSection onSearch={handleSearch} />
      <ServiceSection searchQuery={searchQuery} /> {/* ServiceSection can keep its own data for now */}
      <SkillSection />
      <ServiceSubmissionForm />
      <FAQSection />
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
