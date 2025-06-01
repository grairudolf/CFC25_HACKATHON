
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServiceSection, { allServiceNamesForSearch } from '@/components/ServiceSection';
import SkillSection from '@/components/SkillSection';
import FAQSection from '@/components/FAQSection';
import ServiceSubmissionForm from '@/components/ServiceSubmissionForm';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';

const Index = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Optional: scroll to services section when a search is performed
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSearch={handleSearch} serviceSuggestions={allServiceNamesForSearch} />
      <HeroSection onSearch={handleSearch} />
      <ServiceSection searchQuery={searchQuery} />
      <SkillSection />
      <ServiceSubmissionForm />
      <FAQSection />
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
