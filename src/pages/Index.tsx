
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServiceSection from '@/components/ServiceSection';
import SkillSection from '@/components/SkillSection';
import ServiceSubmissionForm from '@/components/ServiceSubmissionForm';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServiceSection />
      <SkillSection />
      <ServiceSubmissionForm />
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
