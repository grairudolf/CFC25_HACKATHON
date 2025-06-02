import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';


const faqData = [
  {
    question: "What is SiliconHub?",
    answer: "SiliconHub is a collaborative platform designed to connect developers, innovators, and tech enthusiasts. It offers tools, resources, and a community space to share projects, find collaborators, and grow ideas from concept to launch."
  },
  {
    question: "Who can use SiliconHub?",
    answer: "Anyone! Whether you're a student, a professional developer, a startup founder, or just curious about tech, SiliconHub is built to help you learn, build, and connect."
  },
  {
    question: "Is SiliconHub free to use?",
    answer: "Yes! We offer a free tier with access to core features. We also offer premium plans with additional tools and benefits for individuals and teams."
  },
  {
    question: "What can I do on SiliconHub?",
    answer: "You can showcase your projects, discover others' work, join collaborative efforts, access developer resources, and grow your skills through curated content."
  },
  {
    question: "Can I collaborate with other users on projects?",
    answer: "Yes! SiliconHub encourages open collaboration. You can invite team members, assign roles, and work together on shared project dashboards."
  },
  {
    question: "Are there resources to help me learn or upskill?",
    answer: "Absolutely. We provide tutorials, code snippets, tools, and links to courses. We're also expanding into offering community-created learning content."
  },
  {
    question: "Is there a premium version of SiliconHub?",
    answer: "Yes. Our premium version includes advanced analytics, unlimited project uploads, priority support, and early access to new features."
  },
  {
    question: "How does SiliconHub make money?",
    answer: "We generate revenue through subscriptions, featured listings, and partnerships. This helps us keep the platform sustainable and growing."
  },
  {
    question: "Is SiliconHub open source?",
    answer: "Currently, the core platform is closed source, but we’re planning to release selected tools and components as open source in the near future."
  },
  {
    question: "What technologies is SiliconHub built with?",
    answer: "The platform uses modern web technologies like Next.js, TailwindCSS, and Node.js, and is deployed via Vercel."
  },
  {
    question: "I found a bug. How can I report it?",
    answer: "You can report issues directly through the 'Feedback' section on the platform or email us at support@siliconhub.dev."
  },
  {
    question: "Can I contribute to SiliconHub’s growth?",
    answer: "Yes! You can contribute by sharing your projects, giving feedback, spreading the word, or joining our beta testing team."
  },
  {
    question: "Is there a community I can join?",
    answer: "We’re building a vibrant Discord community and a monthly newsletter. Stay tuned for invites and announcements!"
  }
];


const FAQSection: React.FC = () => {
  return (
    <section className="py-12 bg-secondary sm:py-16 lg:py-20">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-foreground sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-border">
                <AccordionTrigger className="text-lg font-medium text-left text-foreground hover:text-primary hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.answer}
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
