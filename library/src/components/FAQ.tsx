import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ = () => {
  const faqItems: FAQItem[] = [
    {
      question: "What is the purpose of this website?",
      answer:
        "Whether conducting scholarly research or seeking entertainment, our user-friendly interface offers diverse options to enrich your learning experience. Start exploring today!",
    },
    {
      question: "How do I access the digital library resources?",
      answer:
        "You can access our digital library resources by logging in with your university credentials. Once logged in, you'll have access to over 263,300 journals, e-books, and databases including EBSCOHost, BUKU, and other educational resources.",
    },
    {
      question: "Can I reserve physical books through the website?",
      answer:
        "Yes! You can search for physical books in our collection using the LIBRARIKA system and reserve them for pickup. Simply search for your desired book, check its availability, and place a reservation.",
    },
    {
      question: "How do I book office hours with library staff?",
      answer:
        "You can book office hours directly on this website using the 'Book Office Hours' section. Select an available time slot that works for you, and you'll receive a confirmation email with all the details.",
    },
  ];

  return (
    <div className="flex gap-30 items-start">
      {/* Left Section - Header */}
      <div className="w-1/3 mx-auto">
        <hr className="border-2 border-[#D00D2D] w-24 mb-4" />
        <h2 className="mb-3 text-3xl font-light tracking-wide text-gray-900">
          Frequently <span className="text-[#891326]">Asked</span> Questions
        </h2>
        <p className="text-sm font-light tracking-wide text-gray-600">
          Find answers to common questions about our library services and
          resources.
        </p>
      </div>

      {/* Right Section - Accordion */}
      <div className="w-2/3 mx-auto">
        <Accordion type="multiple" className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-semibold text-gray-900">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm font-light text-gray-700">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
