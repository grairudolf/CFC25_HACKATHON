
import React from 'react';
import { BookOpen, PlayCircle, Award, ArrowRight, GraduationCap, Briefcase, Palette, Code, TrendingUp, Heart, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

interface SkillCategory {
  id: number;
  titleKey: string; // Key for translation
  descriptionKey: string; // Key for translation
  icon: LucideIcon;
  courses: number;
  levelKey: string; // Key for translation
  color: string;
  resources: Resource[];
}
interface Resource {
  nameKey: string; // Key for translation
  url: string;
  typeKey: string; // Key for translation
}

const SkillSection = () => {
  const { translate } = useLanguage(); // Removed unused 'language' variable

  const languageResources = {
    en: {
      skillHubBadge: "Skill Development Hub",
      mainTitle: "Don't have a project or skill?",
      mainSubtitle: "No worries! Start your journey with our curated learning resources. From tech skills to business development, we've got everything you need to succeed.",
      journeyTitle: "🚀 Start Your Learning Journey Today",
      journeySubtitle: "Join thousands of Cameroonians who have transformed their careers through online learning. Pick a skill, follow a structured path, and start building your digital future.",
      getStartedButton: "Get Started Now",
      platformsTitle: "Recommended Learning Platforms",
      categoriesTitle: "Popular Skill Categories",
      startLearningButton: "Start Learning",
      ctaTitle: "Ready to Transform Your Career?",
      ctaSubtitle: "Choose your path, set your pace, and join a community of learners who are building Cameroon's digital future.",
      browseCoursesButton: "Browse All Courses",
      joinCommunityButton: "Join Learning Community",
      coursesSuffix: "courses",
      levelBeginnerAdvanced: "Beginner to Advanced",
      levelBeginnerIntermediate: "Beginner to Intermediate",
      levelAll: "All Levels",
      levelProfessional: "Beginner to Professional",
      // Skill Categories
      catWebDevTitle: "Web Development",
      catWebDevDesc: "Learn modern web technologies and frameworks",
      catDigiMarkTitle: "Digital Marketing",
      catDigiMarkDesc: "Master online marketing strategies for African markets",
      catGraphicDesignTitle: "Graphic Design",
      catGraphicDesignDesc: "Create stunning visuals and brand identities",
      catBusinessEntrepTitle: "Business & Entrepreneurship",
      catBusinessEntrepDesc: "Start and grow your own business",
      catFoodCulinaryTitle: "Food & Culinary Arts",
      catFoodCulinaryDesc: "Master cooking and food business skills",
      catLangSkillsTitle: "Language Skills",
      catLangSkillsDesc: "Learn new languages for global opportunities",
      // Resources Types
      resTypeFree: "Free",
      resTypePlatform: "Platform",
      resTypeYouTube: "YouTube",
      resTypeCertification: "Certification",
      resTypeCourse: "Course",
      resTypeTool: "Tool",
      resTypeBusiness: "Business",
      resTypeSkill: "Skill",
      resTypeApp: "App",
      resTypeCommunity: "Community",
      // Resource Names (examples, can be expanded)
      resNameFreeCodeCamp: "freeCodeCamp",
      resNameCoursera: "Coursera", // Used by skillCategories
      resNameYouTubeTutorials: "YouTube Tutorials",
      resNameGoogleDigitalGarage: "Google Digital Garage",
      resNameHubSpotAcademy: "HubSpot Academy",
      // Platform Names and Descriptions (for platforms array)
      platformCoursera: "Coursera",
      platformCourseraDesc: "World-class online courses",
      platformYouTube: "YouTube",
      platformYouTubeDesc: "Free video tutorials",
      platformFreeCodeCamp: "freeCodeCamp",
      platformFreeCodeCampDesc: "Free coding bootcamp",
      platformUdemy: "Udemy",
      platformUdemyDesc: "Skill-focused courses",
      platformKhanAcademy: "Khan Academy",
      platformKhanAcademyDesc: "Free education for all",
      platformEdX: "edX",
      platformEdXDesc: "University-level education",
      topResourcesLabel: "Top Resources:",
    },
    fr: {
      skillHubBadge: "Pôle de Développement de Compétences",
      mainTitle: "Pas de projet ou de compétence ?",
      mainSubtitle: "Pas de souci ! Commencez votre parcours avec nos ressources d'apprentissage sélectionnées. Des compétences techniques au développement commercial, nous avons tout ce qu'il faut pour réussir.",
      journeyTitle: "🚀 Commencez Votre Parcours d'Apprentissage Aujourd'hui",
      journeySubtitle: "Rejoignez des milliers de Camerounais qui ont transformé leur carrière grâce à l'apprentissage en ligne. Choisissez une compétence, suivez un parcours structuré et commencez à bâtir votre avenir numérique.",
      getStartedButton: "Commencer Maintenant",
      platformsTitle: "Plateformes d'Apprentissage Recommandées",
      categoriesTitle: "Catégories de Compétences Populaires",
      startLearningButton: "Commencer à Apprendre",
      ctaTitle: "Prêt à Transformer Votre Carrière ?",
      ctaSubtitle: "Choisissez votre voie, définissez votre rythme et rejoignez une communauté d'apprenants qui construisent l'avenir numérique du Cameroun.",
      browseCoursesButton: "Parcourir Tous les Cours",
      joinCommunityButton: "Rejoindre la Communauté",
      coursesSuffix: "cours",
      levelBeginnerAdvanced: "Débutant à Avancé",
      levelBeginnerIntermediate: "Débutant à Intermédiaire",
      levelAll: "Tous les Niveaux",
      levelProfessional: "Débutant à Professionnel",
      catWebDevTitle: "Développement Web",
      catWebDevDesc: "Apprenez les technologies et frameworks web modernes",
      catDigiMarkTitle: "Marketing Numérique",
      catDigiMarkDesc: "Maîtrisez les stratégies de marketing en ligne pour les marchés africains",
      catGraphicDesignTitle: "Design Graphique",
      catGraphicDesignDesc: "Créez des visuels et identités de marque époustouflants",
      catBusinessEntrepTitle: "Affaires & Entrepreneuriat",
      catBusinessEntrepDesc: "Lancez et développez votre propre entreprise",
      catFoodCulinaryTitle: "Arts Culinaires & Gastronomie",
      catFoodCulinaryDesc: "Maîtrisez la cuisine et les compétences en affaires culinaires",
      catLangSkillsTitle: "Compétences Linguistiques",
      catLangSkillsDesc: "Apprenez de nouvelles langues pour des opportunités mondiales",
      resTypeFree: "Gratuit",
      resTypePlatform: "Plateforme",
      resTypeYouTube: "YouTube",
      resTypeCertification: "Certification",
      resTypeCourse: "Cours",
      resTypeTool: "Outil",
      resTypeBusiness: "Affaires",
      resTypeSkill: "Compétence",
      resTypeApp: "Appli",
      resTypeCommunity: "Communauté",
      resNameFreeCodeCamp: "freeCodeCamp",
      resNameCoursera: "Coursera",
      resNameYouTubeTutorials: "Tutoriels YouTube",
      resNameGoogleDigitalGarage: "Google Ateliers Numériques",
      resNameHubSpotAcademy: "HubSpot Academy",
      platformCoursera: "Coursera",
      platformCourseraDesc: "Cours en ligne de classe mondiale",
      platformYouTube: "YouTube",
      platformYouTubeDesc: "Tutoriels vidéo gratuits",
      platformFreeCodeCamp: "freeCodeCamp",
      platformFreeCodeCampDesc: "Bootcamp de codage gratuit",
      platformUdemy: "Udemy",
      platformUdemyDesc: "Cours axés sur les compétences",
      platformKhanAcademy: "Khan Academy",
      platformKhanAcademyDesc: "Éducation gratuite pour tous",
      platformEdX: "edX",
      platformEdXDesc: "Éducation de niveau universitaire",
      topResourcesLabel: "Ressources Principales :",
    },
    pid: {
      skillHubBadge: "Place for Learn Work",
      mainTitle: "You no get project or work wey you sabi?",
      mainSubtitle: "No wahala! Start ya journey with our correct learning things. From tech work to business side, we get everything wey you need for succeed.",
      journeyTitle: "🚀 Start Ya Learning Journey Today",
      journeySubtitle: "Join plenty Cameroon people wey don change their career with online learning. Choose work, follow correct road, and start build ya digital future.",
      getStartedButton: "Start Now",
      platformsTitle: "Correct Places for Learn",
      categoriesTitle: "Work Wey People Like Learn",
      startLearningButton: "Start Learning",
      ctaTitle: "Ready for Change Ya Career?",
      ctaSubtitle: "Choose ya path, set ya time, and join people wey dey learn, wey dey build Cameroon digital future.",
      browseCoursesButton: "See All Courses",
      joinCommunityButton: "Join Learning Group",
      coursesSuffix: "courses",
      levelBeginnerAdvanced: "Beginner to Advanced",
      levelBeginnerIntermediate: "Beginner to Intermediate",
      levelAll: "All Levels",
      levelProfessional: "Beginner to Professional",
      catWebDevTitle: "Web Development",
      catWebDevDesc: "Learn new web tech and how dem dey work",
      catDigiMarkTitle: "Digital Marketing",
      catDigiMarkDesc: "Sabi online marketing for African market",
      catGraphicDesignTitle: "Graphic Design",
      catGraphicDesignDesc: "Make fine pictures and brand logo",
      catBusinessEntrepTitle: "Business & Entrepreneur",
      catBusinessEntrepDesc: "Start and grow ya own business",
      catFoodCulinaryTitle: "Food & Cook Work",
      catFoodCulinaryDesc: "Sabi cook and food business skills",
      catLangSkillsTitle: "Language Skills",
      catLangSkillsDesc: "Learn new languages for global chance",
      resTypeFree: "Free",
      resTypePlatform: "Platform",
      resTypeYouTube: "YouTube",
      resTypeCertification: "Certification",
      resTypeCourse: "Course",
      resTypeTool: "Tool",
      resTypeBusiness: "Business",
      resTypeSkill: "Skill",
      resTypeApp: "App",
      resTypeCommunity: "Community",
      resNameFreeCodeCamp: "freeCodeCamp",
      resNameCoursera: "Coursera",
      resNameYouTubeTutorials: "YouTube Tutorials",
      resNameGoogleDigitalGarage: "Google Digital Garage",
      resNameHubSpotAcademy: "HubSpot Academy",
      platformCoursera: "Coursera",
      platformCourseraDesc: "Correct online courses",
      platformYouTube: "YouTube",
      platformYouTubeDesc: "Free video tutorials",
      platformFreeCodeCamp: "freeCodeCamp",
      platformFreeCodeCampDesc: "Free coding classes",
      platformUdemy: "Udemy",
      platformUdemyDesc: "Courses for learn work",
      platformKhanAcademy: "Khan Academy",
      platformKhanAcademyDesc: "Free learn for everybody",
      platformEdX: "edX",
      platformEdXDesc: "University learn work",
      topResourcesLabel: "Correct Resources:",
    },
  };

  const t = (key: keyof typeof languageResources.en) => {
    return translate(languageResources, key);
  };


  const getSkillCategories = (): SkillCategory[] => [
    {
      id: 1, titleKey: 'catWebDevTitle', descriptionKey: 'catWebDevDesc', icon: Code, courses: 15, levelKey: 'levelBeginnerAdvanced', color: 'blue',
      resources: [
        { nameKey: 'resNameFreeCodeCamp', url: '#', typeKey: 'resTypeFree' }, { nameKey: 'resNameCoursera', url: '#', typeKey: 'resTypePlatform' }, { nameKey: 'resNameYouTubeTutorials', url: '#', typeKey: 'resTypeYouTube' }
      ]
    },
    {
      id: 2, titleKey: 'catDigiMarkTitle', descriptionKey: 'catDigiMarkDesc', icon: TrendingUp, courses: 12, levelKey: 'levelBeginnerIntermediate', color: 'green',
      resources: [
        { nameKey: 'resNameGoogleDigitalGarage', url: '#', typeKey: 'resTypeFree' }, { nameKey: 'resNameHubSpotAcademy', url: '#', typeKey: 'resTypeCertification' }, { nameKey: 'Social Media Marketing', url: '#', typeKey: 'resTypeCourse' } // Example of a non-keyed name
      ]
    },
    // Add other categories similarly, ensuring all text content uses translation keys
     {
      id: 3, titleKey: 'catGraphicDesignTitle', descriptionKey: 'catGraphicDesignDesc', icon: Palette, courses: 18, levelKey: 'levelAll', color: 'purple',
      resources: [ { nameKey: 'Canva Design School', url: '#', typeKey: 'resTypeFree' }, { nameKey: 'Adobe Creative Suite', url: '#', typeKey: 'resTypePlatform' }, { nameKey: 'Design Principles', url: '#', typeKey: 'resTypeCourse' } ]
    },
    {
      id: 4, titleKey: 'catBusinessEntrepTitle', descriptionKey: 'catBusinessEntrepDesc', icon: Briefcase, courses: 20, levelKey: 'levelAll', color: 'orange',
      resources: [ { nameKey: 'Business Model Canvas', url: '#', typeKey: 'resTypeTool' }, { nameKey: 'Startup School', url: '#', typeKey: 'resTypeCourse' }, { nameKey: 'Entrepreneurship 101', url: '#', typeKey: 'resTypeFree' } ]
    },
    {
      id: 5, titleKey: 'catFoodCulinaryTitle', descriptionKey: 'catFoodCulinaryDesc', icon: Heart, courses: 10, levelKey: 'levelProfessional', color: 'red',
      resources: [ { nameKey: 'Culinary Basics', url: '#', typeKey: 'resTypeCourse' }, { nameKey: 'Food Business', url: '#', typeKey: 'resTypeBusiness' }, { nameKey: 'Recipe Development', url: '#', typeKey: 'resTypeSkill' } ]
    },
    {
      id: 6, titleKey: 'catLangSkillsTitle', descriptionKey: 'catLangSkillsDesc', icon: GraduationCap, courses: 25, levelKey: 'levelAll', color: 'indigo',
      resources: [ { nameKey: 'Duolingo', url: '#', typeKey: 'resTypeApp' }, { nameKey: 'Language Exchange', url: '#', typeKey: 'resTypeCommunity' }, { nameKey: 'Business English', url: '#', typeKey: 'resTypeCourse' } ]
    }
  ];

  const skillCategories = getSkillCategories(); // Call the function to get categories

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

  // This data also needs to be part of languageResources or translated
  const platforms = [
    { nameKey: 'platformCoursera', logo: '📚', descriptionKey: 'platformCourseraDesc' },
    { nameKey: 'platformYouTube', logo: '▶️', descriptionKey: 'platformYouTubeDesc' },
    { nameKey: 'platformFreeCodeCamp', logo: '💻', descriptionKey: 'platformFreeCodeCampDesc' },
    { nameKey: 'platformUdemy', logo: '🎯', descriptionKey: 'platformUdemyDesc' },
    { nameKey: 'platformKhanAcademy', logo: '🎓', descriptionKey: 'platformKhanAcademyDesc' },
    { nameKey: 'platformEdX', logo: '🏛️', descriptionKey: 'platformEdXDesc' }
  ].map(p => ({...p, name: t(p.nameKey as keyof typeof languageResources.en), description: t(p.descriptionKey as keyof typeof languageResources.en)}));

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
            {t('skillHubBadge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('mainTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('mainSubtitle')}
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-4xl mx-auto border border-blue-200 shadow-xl animate-scale-in">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('journeyTitle')}
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              {t('journeySubtitle')}
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-4 transition-all hover:scale-105 shadow-lg"
            >
              {t('getStartedButton')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Learning Platforms */}
        <div className="mb-16 animate-fade-in delay-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('platformsTitle')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {platforms.map((platform, index) => ( // platforms is now already translated
              <div
                key={index}
                className="p-4 rounded-xl text-center bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-2 border border-blue-100 animate-scale-in"
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
            ))}
          </div>
        </div>

        {/* Skill Categories */}
        <div className="mb-16 animate-fade-in delay-400">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t('categoriesTitle')}
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
                        {category.courses} {t('coursesSuffix')}
                      </span>
                    </div>
                    <CardTitle className="text-xl text-gray-900">{translate(languageResources, category.titleKey as any)}</CardTitle>
                    <p className="text-gray-600 text-sm">{translate(languageResources, category.descriptionKey as any)}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Award className="w-4 h-4 mr-1" />
                        {translate(languageResources, category.levelKey as any)}
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-900">{t('topResourcesLabel')}</p>
                        {category.resources.map((resource, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{translate(languageResources, resource.nameKey as any, resource.nameKey)}</span> {/* Fallback to key if name not in main list */}
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {t(resource.typeKey as keyof typeof languageResources.en)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full hover:bg-blue-50 hover:border-blue-300 transition-all hover:scale-105"
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      {t('startLearningButton')}
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
            {t('ctaTitle')}
          </h3>
          <p className="mb-8 max-w-2xl mx-auto text-lg opacity-90">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 transition-all hover:scale-105 shadow-lg text-lg px-8 py-4"
            >
              {t('browseCoursesButton')}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all hover:scale-105 text-lg px-8 py-4" // text-white for outline button
            >
              {t('joinCommunityButton')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
