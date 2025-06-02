import React from 'react';
import { Link } from 'react-router-dom';
import FeedbackForm from '@/components/FeedbackForm';
import Navbar from '@/components/Navbar'; // Assuming you want the Navbar here
import Footer from '@/components/Footer';   // Assuming you want the Footer here
import AIAssistant from '@/components/AIAssistant'; // Assuming you want the AI Assistant here

const FeedbackPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar onSearch={() => {}} allServices={[]} /> {/* Basic props for Navbar */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Submit Your Feedback</h1>
          <FeedbackForm />
          <div className="mt-8 text-center">
            <Link to="/" className="text-blue-600 hover:text-blue-700 underline">
              &larr; Go to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default FeedbackPage;
