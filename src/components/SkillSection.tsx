
import React from 'react';
import { BookOpen, PlayCircle, Award, ArrowRight, GraduationCap, Briefcase, Palette, Code, TrendingUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import

const SkillSection = () => {
  const skillCategories = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Learn modern web technologies and frameworks',
      icon: Code,
      courses: 15,
      level: 'Beginner to Advanced',
      color: 'blue',
      resources: [
        { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/responsive-web-design/', type: 'Free' },
        { name: 'Coursera', url: 'https://www.coursera.org/browse/computer-science/web-development', type: 'Platform' },
        { name: 'YouTube Tutorials', url: 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbnSe1qUNMG7AbPmjIG5PKe-', type: 'YouTube' }
      ]
    },
    {
      id: 2,
      title: 'Digital Marketing',
      description: 'Master online marketing strategies for African markets',
      icon: TrendingUp,
      courses: 12,
      level: 'Beginner to Intermediate',
      color: 'green',
      resources: [
        { name: 'Google Digital Garage', url: 'https://learndigital.withgoogle.com/digitalgarage/', type: 'Free' },
        { name: 'HubSpot Academy', url: 'https://academy.hubspot.com/courses/digital-marketing', type: 'Certification' },
        { name: 'Social Media Marketing', url: 'https://www.coursera.org/learn/social-media-marketing', type: 'Course' }
      ]
    },
    {
      id: 3,
      title: 'Graphic Design',
      description: 'Create stunning visuals and brand identities',
      icon: Palette,
      courses: 18,
      level: 'All Levels',
      color: 'purple',
      resources: [
        { name: 'Canva Design School', url: 'https://www.canva.com/designschool/', type: 'Free' },
        { name: 'Adobe Creative Suite', url: 'https://www.adobe.com/creativecloud/all-apps.html', type: 'Platform' },
        { name: 'Design Principles', url: 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbnZ28GHKbA6I4q3EArbJSkv', type: 'Course' }
      ]
    },
    {
      id: 4,
      title: 'Business & Entrepreneurship',
      description: 'Start and grow your own business',
      icon: Briefcase,
      courses: 20,
      level: 'All Levels',
      color: 'orange',
      resources: [
        { name: 'Business Model Canvas', url: 'https://www.strategyzer.com/canvas/business-model-canvas', type: 'Tool' },
        { name: 'Startup School', url: 'https://www.startupschool.org/', type: 'Course' },
        { name: 'Entrepreneurship 101', url: 'https://www.edx.org/learn/entrepreneurship', type: 'Free' }
      ]
    },
    {
      id: 5,
      title: 'Food & Culinary Arts',
      description: 'Master cooking and food business skills',
      icon: Heart,
      courses: 10,
      level: 'Beginner to Professional',
      color: 'red',
      resources: [
        { name: 'Culinary Basics', url: 'https://www.youtube.com/playlist?list=PL60185393CB46F83A', type: 'Course' },
        { name: 'Food Business', url: 'https://www.coursera.org/courses?query=food%20business%20management', type: 'Business' },
        { name: 'Recipe Development', url: 'https://www.escoffier.edu/blog/culinary-arts/a-guide-to-recipe-development/', type: 'Skill' }
      ]
    },
    {
      id: 6,
      title: 'Language Skills',
      description: 'Learn new languages for global opportunities',
      icon: GraduationCap,
      courses: 25,
      level: 'All Levels',
      color: 'indigo',
      resources: [
        { name: 'Duolingo', url: 'https://www.duolingo.com/', type: 'App' },
        { name: 'Language Exchange', url: 'https://www.hellotalk.com/', type: 'Community' },
        { name: 'Business English', url: 'https://www.coursera.org/learn/business-english-communication-skills', type: 'Course' }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const platforms = [
    { name: 'Coursera', logo: '📚', description: 'World-class online courses', url: 'https://www.coursera.org/' },
    { name: 'YouTube', logo: '▶️', description: 'Free video tutorials', url: 'https://www.youtube.com/' },
    { name: 'freeCodeCamp', logo: '💻', description: 'Free coding bootcamp', url: 'https://www.freecodecamp.org/' },
    { name: 'Udemy', logo: '🎯', description: 'Skill-focused courses', url: 'https://www.udemy.com/' },
    { name: 'Khan Academy', logo: '🎓', description: 'Free education for all', url: 'https://www.khanacademy.org/' },
    { name: 'edX', logo: '🏛️', description: 'University-level education', url: 'https://www.edx.org/' }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-blue-400 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-6 animate-bounce">
            <BookOpen className="w-5 h-5 mr-2" />
            Skill Development Hub
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Don't have a project or skill?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            No worries! Start your journey with our curated learning resources. 
            From tech skills to business development, we've got everything you need to succeed.
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-4xl mx-auto border border-blue-200 shadow-xl animate-scale-in">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              🚀 Start Your Learning Journey Today
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              Join thousands of Cameroonians who have transformed their careers through online learning. 
              Pick a skill, follow a structured path, and start building your digital future.
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-4 transition-all hover:scale-105 shadow-lg"
            >
              <a href="#popular-skill-categories-heading">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>

        {/* Learning Platforms */}
        <div className="mb-16 animate-fade-in delay-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Recommended Learning Platforms
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {platforms.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl hover:no-underline focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div
                  className="p-4 rounded-xl text-center bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-blue-100 animate-scale-in h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl mb-2">{platform.logo}</div>
                <h4 className="font-semibold text-sm mb-1 text-gray-900">
                  {platform.name}
                </h4>
                <p className="text-xs text-gray-600">
                  {platform.description}
                </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Skill Categories */}
        <div className="mb-16 animate-fade-in delay-400">
          <h3 id="popular-skill-categories-heading" className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Popular Skill Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-blue-100 hover:border-blue-300 bg-white animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${getColorClasses(category.color)}`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                        {category.courses} courses
                      </span>
                    </div>
                    <CardTitle className="text-xl text-gray-900">{category.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Award className="w-4 h-4 mr-1" />
                        {category.level}
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-900">Top Resources:</p>
                        {category.resources.map((resource, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 underline">
                              {resource.name}
                            </a>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {resource.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      asChild
                      variant="outline" 
                      className="w-full hover:bg-blue-50 hover:border-blue-300 transition-all hover:scale-105"
                    >
                      <a href={category.resources[0].url} target="_blank" rel="noopener noreferrer">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Learning
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white shadow-2xl animate-fade-in delay-600">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your Career?
          </h3>
          <p className="mb-8 max-w-2xl mx-auto text-lg opacity-90">
            Choose your path, set your pace, and join a community of learners who are building Cameroon's digital future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 transition-all hover:scale-105 shadow-lg text-lg px-8 py-4"
            >
              <a href="#popular-skill-categories-heading">
                Browse All Courses
              </a>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-2 border-white text-blue-500 hover:bg-white hover:text-blue-600 transition-all hover:scale-105 text-lg px-8 py-4"
            >
              <a href="#">
                Join Learning Community
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
