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
    <div className="flex flex-col items-start gap-10 rounded-3xl bg-white px-6 py-8 shadow-sm sm:px-8 lg:flex-row lg:items-stretch lg:gap-16 lg:px-12">
      {/* Left Section - Header */}
      <div className="w-full lg:w-1/3">
        <hr className="mb-4 w-20 border-2 border-[#D00D2D] sm:w-24" />
        <h2 className="mb-3 text-2xl font-semibold tracking-wide text-gray-900 sm:text-3xl">
          Frequently <span className="text-[#891326]">Asked</span> Questions
        </h2>
        <p className="text-sm font-light leading-relaxed tracking-wide text-gray-600 sm:text-base">
          Find answers to common questions about our library services and
          resources.
        </p>
      </div>

      {/* Right Section - Accordion */}
      <div className="w-full lg:w-2/3">
        <Accordion type="multiple" className="w-full space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
            >
              <AccordionTrigger className="text-left text-base font-semibold text-gray-900 sm:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm font-light leading-relaxed text-gray-700 sm:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
