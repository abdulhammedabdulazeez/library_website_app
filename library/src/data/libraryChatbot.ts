import { PAST_EVENTS, UPCOMING_EVENTS } from "@/data/events";

export interface LibraryChatMatch {
  id: string;
  intents: string[];
  keywords: string[];
  response: (question: string) => string | Promise<string>;
  followUps?: string[];
}

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const keywordIncludes = (question: string, keyword: string) =>
  normalize(question).includes(normalize(keyword));

const lookupKeyword = (question: string, keywords: string[]) =>
  keywords.some((keyword) => keywordIncludes(question, keyword));

const formatEvents = (type: "upcoming" | "past") => {
  const events = type === "upcoming" ? UPCOMING_EVENTS : PAST_EVENTS;

  if (!events.length) {
    return `There are no ${type} events to show right now. Check the events page for updates.`;
  }

  return events
    .slice(0, 3)
    .map(
      ({ title, date, time, location, registrationUrl }) =>
        `• ${title}\n  ${date}${time ? ` | ${time}` : ""}\n  ${location}${
          registrationUrl && registrationUrl !== "#"
            ? `\n  Register: ${registrationUrl}`
            : ""
        }`
    )
    .join("\n\n");
};

export const LIBRARY_CHAT_MATCHERS: LibraryChatMatch[] = [
  {
    id: "welcome",
    intents: ["help", "hello", "start"],
    keywords: ["hello", "hi", "how do i", "help", "support", "guide"],
    response: () =>
      "Hi there! I'm the ALU Library assistant. Ask me about digital resources, reserving books, workshops, creative writing support, or how to contact a librarian.",
    followUps: [
      "What digital resources do you provide?",
      "How can I reserve a physical book?",
      "How do I book office hours with library staff?",
    ],
  },
  {
    id: "hours",
    intents: ["hours", "opening", "availability"],
    keywords: ["open", "hours", "time", "when", "schedule"],
    response: () =>
      "Our digital collections are available online 24/7. For in-person visits or pickups, book through the 'Book Office Hours' section so the team can plan a time that works for you.",
  },
  {
    id: "location",
    intents: ["location", "where"],
    keywords: ["where", "located", "address", "campus"],
    response: () =>
      "You'll find us at the ALU Rwanda Campus, Bumbogo, Kigali Innovation City, next to Azam. Need directions? Call +250 784 650 219 or email library_rw@comms.alueducation.com.",
  },
  {
    id: "digital-resources",
    intents: ["resources", "databases", "ebooks"],
    keywords: ["resource", "database", "ebook", "journal", "ebsco", "buku"],
    response: () =>
      "We subscribe to rich digital collections. Start with EBSCOHost for multidisciplinary journals, BUKU for e-textbooks, and LIBRARIKA for our physical holdings. You can also explore Google Scholar, SSRN, DOAJ, BASE, and Semantic Scholar from the Research Support page.",
    followUps: ["How do I access EBSCOHost?", "Tell me about Librarika."],
  },
  {
    id: "librarika",
    intents: ["librarika", "reserve books"],
    keywords: ["librarika", "reserve", "borrow", "pickup", "physical"],
    response: () =>
      "To reserve a physical book, search LIBRARIKA at https://alu.librarika.com/. Request the title you need and we'll confirm pickup details via email.",
  },
  {
    id: "office-hours",
    intents: ["office hours", "appointment"],
    keywords: ["office hour", "appointment", "book time", "meet librarian"],
    response: () =>
      "Book time with the library team using the 'Book Office Hours' widget on the home page. Choose a slot via the Google Calendar link, then complete the Research Office Hours form so we know how to support you.",
  },
  {
    id: "creative-writing",
    intents: ["writing support", "grammarly", "turnitin"],
    keywords: ["writing", "grammarly", "turnitin", "plagiarism", "creative"],
    response: () =>
      "Need writing support? Grammarly and Turnitin are ready for you. All new ALU students automatically get Grammarly access with their @alustudent.com account. Visit the Creative Writing Enhancement page for full details.",
  },
  {
    id: "research-support",
    intents: ["research help", "citation", "database support"],
    keywords: ["research", "citation", "support", "coach", "help"],
    response: () =>
      "Our research services cover database navigation, citation help, and tailored consultations. Use the Research Support page to explore guides and book a research office hour.",
    followUps: [
      "How do I prepare for research office hours?",
      "Where is the Zotero guide?",
    ],
  },
  {
    id: "events",
    intents: ["events", "workshops", "sessions"],
    keywords: ["event", "workshop", "session", "clinic", "lab"],
    response: () => `Here are the next events:\n\n${formatEvents("upcoming")}`,
    followUps: [
      "Show me past events.",
      "How do I register for the Academic Research Integrity Workshop?",
    ],
  },
  {
    id: "past-events",
    intents: ["past events", "previous workshops"],
    keywords: ["past", "previous", "last event"],
    response: () =>
      `Here's a snapshot of past sessions:\n\n${formatEvents("past")}`,
  },
  {
    id: "contact",
    intents: ["contact", "email", "phone"],
    keywords: ["contact", "email", "phone", "instagram", "reach", "whatsapp"],
    response: () =>
      "Reach the library at library_rw@comms.alueducation.com or call +250 784 650 219. Prefer social? DM @ALULibrary on Instagram. The team page lists individual contacts if you need someone specific.",
  },
  {
    id: "team",
    intents: ["staff", "team"],
    keywords: ["who", "team", "staff", "librarian", "henry", "intern"],
    response: () =>
      "Our team includes Henry Chukwudi John (Lead Library Services), plus library associates Youssouf Ouedraogo and Abdulazeez Abdulhammed. Explore the Team page for bios and contact links.",
  },
  {
    id: "forms",
    intents: ["forms", "support request"],
    keywords: ["form", "request", "support form"],
    response: () =>
      "Need general support? Fill the library services form so we can follow up quickly: https://docs.google.com/forms/d/e/1FAIpQLSd9Ij7VSGGxmo9kihcv8u-Or6LTCoUDippMPB9Arxufh03S0A/viewform",
  },
];

export const matchLibraryQuestion = (question: string) => {
  const trimmed = question ?? "";
  for (const entry of LIBRARY_CHAT_MATCHERS) {
    if (lookupKeyword(trimmed, entry.keywords)) {
      return entry;
    }
  }
  return null;
};

export const getSuggestedPrompts = () =>
  LIBRARY_CHAT_MATCHERS.filter(({ followUps }) => followUps?.length).flatMap(
    ({ followUps }) => followUps ?? []
  );
