import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

const FAQSection: React.FC = () => {
  const { translate } = useLanguage();

  const languageResources = {
    en: {
      faqTitle: "Frequently Asked Questions",
      q1: "Is SiliconHub free to use?",
      a1: "Yes, browsing services, skills, and job listings on SiliconHub is completely free for users. Service providers might have their own charges for their actual services.",
      q2: "How do I list my service or company?",
      a2: "You can submit your service or company details through the 'Submit Service' form on our platform. Our team will review it before it goes live.",
      q3: "How are services verified?",
      a3: "Verified services have a badge indicating they've met certain criteria set by our team, ensuring a higher level of trust and quality.",
      q4: "Can I find job opportunities here?",
      a4: "Yes! SiliconHub lists job opportunities from various tech and digital companies in Cameroon. Check the 'Jobs & Career' category.",
      q5: "How can I learn new digital skills?",
      a5: "Our 'Learn Skills' section provides curated resources and links to platforms where you can acquire new digital skills, from coding to marketing."
    },
    fr: {
      faqTitle: "Questions Fréquemment Posées",
      q1: "L'utilisation de SiliconHub est-elle gratuite ?",
      a1: "Oui, la consultation des services, compétences et offres d'emploi sur SiliconHub est entièrement gratuite pour les utilisateurs. Les fournisseurs de services peuvent avoir leurs propres tarifs pour leurs services effectifs.",
      q2: "Comment puis-je lister mon service ou mon entreprise ?",
      a2: "Vous pouvez soumettre les détails de votre service ou entreprise via le formulaire 'Soumettre Service' sur notre plateforme. Notre équipe l'examinera avant sa mise en ligne.",
      q3: "Comment les services sont-ils vérifiés ?",
      a3: "Les services vérifiés arborent un badge indiquant qu'ils ont satisfait à certains critères établis par notre équipe, garantissant un niveau de confiance et de qualité supérieur.",
      q4: "Puis-je trouver des opportunités d'emploi ici ?",
      a4: "Oui ! SiliconHub répertorie les opportunités d'emploi de diverses entreprises technologiques et numériques au Cameroun. Consultez la catégorie 'Emplois & Carrières'.",
      q5: "Comment puis-je acquérir de nouvelles compétences numériques ?",
      a5: "Notre section 'Apprendre des Compétences' propose des ressources et des liens vers des plateformes où vous pouvez acquérir de nouvelles compétences numériques, du codage au marketing."
    },
    pid: {
      faqTitle: "Questions Wey People Dey Ask Plenty",
      q1: "SiliconHub na free for use?",
      a1: "Yes, for look services, skills, and work for SiliconHub na free for users. People wey get service fit get their own price for the service dem dey give.",
      q2: "How I fit put my service or company for inside?",
      a2: "You fit submit ya service or company details through the 'Submit Service' form for our platform. Our team go check'am before e show.",
      q3: "How dem dey verify services?",
      a3: "Verified services get badge wey show say dem don meet some kind condition wey our team put, for make sure say trust and quality high.",
      q4: "I fit find work here?",
      a4: "Yes! SiliconHub list work from different tech and digital companies for Cameroon. Check the 'Jobs & Career' category.",
      q5: "How I fit learn new digital skills?",
      a5: "Our 'Learn Skills' section get correct resources and links for places wey you fit learn new digital skills, from coding to marketing."
    }
  };

  const faqData = [
    { questionKey: 'q1', answerKey: 'a1' },
    { questionKey: 'q2', answerKey: 'a2' },
    { questionKey: 'q3', answerKey: 'a3' },
    { questionKey: 'q4', answerKey: 'a4' },
    { questionKey: 'q5', answerKey: 'a5' },
  ];

  const t = (key: keyof typeof languageResources.en) => {
    return translate(languageResources, key);
  };

  return (
    <section className="py-12 bg-slate-50 sm:py-16 lg:py-20" id="faq"> {/* Added ID for potential navigation */}
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl">
          {t('faqTitle')}
        </h2>
        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqData.map((item, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="border-2 border-blue-100 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-lg font-medium text-left text-gray-800 hover:text-primary hover:no-underline px-6 py-4">
                  {t(item.questionKey as keyof typeof languageResources.en)}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-600 px-6 pb-4">
                  {t(item.answerKey as keyof typeof languageResources.en)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
