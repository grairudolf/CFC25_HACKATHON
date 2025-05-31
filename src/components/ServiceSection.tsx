
import React, { useState } from 'react';
import { Filter, Grid, List, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ServiceCard from './ServiceCard';

const ServiceSection = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoggedIn] = useState(true);

  // Cameroonian services data with multi-language support
  const services = {
    recommended: [
      {
        id: '1',
        name: 'FastChops',
        description: {
          en: 'Fast food delivery across Douala and Yaoundé. Order your favorite Cameroonian dishes in just a few clicks.',
          fr: 'Livraison rapide de nourriture camerounaise partout à Douala et Yaoundé. Commandez vos plats préférés en quelques clics.',
          pid: 'Quick chop delivery for Douala and Yaoundé. Order your favorite local food with small time.'
        },
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        rating: 4.8,
        reviewCount: 1247,
        category: 'Food & Delivery',
        isVerified: true,
        location: 'Douala, Yaoundé'
      },
      {
        id: '2',
        name: '237Jobs',
        description: {
          en: 'Cameroon\'s #1 job platform. Over 5000 job opportunities across all sectors.',
          fr: 'La plateforme #1 pour trouver un emploi au Cameroun. Plus de 5000 offres d\'emploi dans tous les secteurs.',
          pid: 'Number one place for find work for Cameroon. Plenty job opportunities for all sectors.'
        },
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
        rating: 4.7,
        reviewCount: 892,
        category: 'Jobs & Career',
        isVerified: true,
        location: 'All Cameroon'
      },
      {
        id: '3',
        name: 'Nkwa.cm',
        description: {
          en: 'Mobile payment solutions and digital financial services for all Cameroonians.',
          fr: 'Solutions de paiement mobile et services financiers digitaux pour tous les Camerounais.',
          pid: 'Mobile money and digital financial services for all Cameroon people.'
        },
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
        rating: 4.9,
        reviewCount: 2156,
        category: 'Fintech & Payments',
        isVerified: true,
        location: 'National'
      }
    ],
    latest: [
      {
        id: '4',
        name: 'DeltechHub',
        description: {
          en: 'Technology training and mentorship. Learn programming, design and tech entrepreneurship.',
          fr: 'Formation et accompagnement en technologie. Apprenez la programmation, le design et l\'entrepreneuriat tech.',
          pid: 'Tech training and support. Learn coding, design and how to start tech business.'
        },
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
        rating: 4.6,
        reviewCount: 343,
        category: 'Tech Training',
        location: 'Douala'
      },
      {
        id: '5',
        name: 'AjeBoCV',
        description: {
          en: 'Create your professional CV online easily. Templates adapted to the Cameroonian market.',
          fr: 'Créez votre CV professionnel en ligne facilement. Templates adaptés au marché camerounais.',
          pid: 'Make your professional CV online easy way. Templates fit for Cameroon job market.'
        },
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop',
        rating: 4.5,
        reviewCount: 567,
        category: 'Professional Services',
        isVerified: true,
        location: 'Online'
      },
      {
        id: '6',
        name: 'Knowledge Center',
        description: {
          en: 'Cameroonian digital library with thousands of books, courses and educational resources.',
          fr: 'Bibliothèque numérique camerounaise avec des milliers de livres, cours et ressources éducatives.',
          pid: 'Cameroon digital library with plenty books, courses and educational materials.'
        },
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
        rating: 4.7,
        reviewCount: 778,
        category: 'Education',
        location: 'Online'
      }
    ],
    popular: [
      {
        id: '7',
        name: 'TIC Cameroun',
        description: {
          en: 'Complete IT services: web development, system maintenance, digital training.',
          fr: 'Services informatiques complets: développement web, maintenance système, formation digitale.',
          pid: 'Complete IT services: website building, system maintenance, digital training.'
        },
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        rating: 4.8,
        reviewCount: 654,
        category: 'IT Services',
        isVerified: true,
        location: 'Yaoundé'
      },
      {
        id: '8',
        name: 'Hustlers Engineering',
        description: {
          en: 'Community of Cameroonian entrepreneurs and engineers. Networking, mentoring and business opportunities.',
          fr: 'Communauté d\'entrepreneurs et ingénieurs camerounais. Networking, mentoring et opportunités business.',
          pid: 'Community of Cameroon entrepreneurs and engineers. Networking, mentoring and business opportunities.'
        },
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
        rating: 4.9,
        reviewCount: 1203,
        category: 'Community & Network',
        location: 'Douala, Yaoundé'
      },
      {
        id: '9',
        name: 'NervTek Solutions',
        description: {
          en: 'Custom mobile and web application development for Cameroonian businesses.',
          fr: 'Développement d\'applications mobiles et web sur mesure pour entreprises camerounaises.',
          pid: 'Custom mobile and web app development for Cameroon businesses.'
        },
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
        rating: 4.6,
        reviewCount: 432,
        category: 'App Development',
        isVerified: true,
        location: 'Douala'
      }
    ]
  };

  const tabs = [
    { id: 'recommended', label: 'Recommended Services', count: services.recommended.length },
    { id: 'latest', label: 'Latest Services', count: services.latest.length },
    { id: 'popular', label: 'Popular Services', count: services.popular.length }
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
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food & Delivery</SelectItem>
                <SelectItem value="jobs">Jobs & Career</SelectItem>
                <SelectItem value="fintech">Fintech & Payments</SelectItem>
                <SelectItem value="tech">Tech Training</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="community">Community</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {services[activeTab as keyof typeof services].map((service, index) => (
            <div 
              key={service.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard
                {...service}
                isLoggedIn={isLoggedIn}
              />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 border-2 hover:bg-gray-50 hover:scale-105 transition-all"
          >
            View More Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
