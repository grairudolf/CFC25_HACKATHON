import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  {
    question: "Is the service free?",
    answer: "Yes, our basic services are completely free for individuals and users. We also offer enterprise plans with additional features."
  },
  {
    question: "What are the premium features?",
    answer: "Premium features include advanced analytics, priority support, and dedicated infrastructure."
  },
  {
    question: "How do I contact support?",
    answer: "You can contact support through the help icon on the bottom right of the page or by emailing rtech777r@gmail.com."
  },
  {
    question: "Do I pay to upload my service",
    answer: "No, Service upload is completely free, After review you begin to pay when we bring you more than 30 customers"
  },
  {
    question: "How is my data protected?",
    answer: "We use industry-standard encryption and security protocols to protect your data. You can find more details in our privacy policy."
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
