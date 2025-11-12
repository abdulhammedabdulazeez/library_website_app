import ChatBot, { type Styles } from "react-chatbotify";
import {
  getSuggestedPrompts,
  matchLibraryQuestion,
} from "@/data/libraryChatbot";

const DEFAULT_SUGGESTIONS = [
  "What digital resources do you provide?",
  "How can I reserve a physical book?",
  "How do I book office hours with library staff?",
  "What events or workshops are coming up?",
  "How do I contact the library?",
];

const COMPILED_SUGGESTIONS = Array.from(
  new Set([...DEFAULT_SUGGESTIONS, ...getSuggestedPrompts()])
);

const formatSuggestions = (suggestions: string[], max = 3) => {
  const items = suggestions.filter(Boolean).slice(0, max);
  if (!items.length) {
    return "";
  }
  return `\n\nYou can also ask:\n- ${items.join("\n- ")}`;
};

const chatbotSettings = {
  general: {
    embedded: false,
  },
  header: {
    title: "Ask the ALU Library",
    showAvatar: false,
  },
  chatHistory: {
    storageKey: "alu-library-chat-history",
    storageType: "local",
  },
  chatWindow: {
    defaultOpen: false,
  },
};

const chatbotStyles: Styles = {
  tooltipStyle: {
    backgroundColor: "#052D73",
    // color: "#FFFFFF",
    // borderRadius: "9999px",
    // boxShadow: "0 4px 12px rgba(5, 45, 115, 0.25)",
    //     padding: "10px 18px",
    // display: "none",
  },
  chatWindowStyle: {
    backgroundColor: "#FFFFFF",
  },
  headerStyle: {
    backgroundColor: "#052D73",
    color: "#FFFFFF",
  },
  botBubbleStyle: {
    backgroundColor: "#F3F4F6",
    color: "#1F2937",
  },
  userBubbleStyle: {
    backgroundColor: "#891326",
    color: "#FFFFFF",
  },
  chatButtonStyle: {
    backgroundColor: "#052D73",
    color: "#FFFFFF",
  },
  chatButtonHoveredStyle: {
    backgroundColor: "#041F4E",
    color: "#FFFFFF",
  },
  sendButtonStyle: {
    backgroundColor: "#891326",
    color: "#FFFFFF",
  },
  sendButtonHoveredStyle: {
    backgroundColor: "#6d0f1e",
    color: "#FFFFFF",
  },
};

const chatbotFlow = {
  start: {
    message: `Hi! I'm the ALU Library assistant. Ask me anything about our services, events, or resources.${formatSuggestions(
      COMPILED_SUGGESTIONS,
      4
    )}`,
    path: "handleQuestion",
  },
  handleQuestion: {
    message: async ({ userInput }: { userInput?: string }) => {
      const question = userInput?.trim();

      if (!question) {
        return `Let me know how I can help—try asking about digital resources, events, or how to contact us.${formatSuggestions(
          DEFAULT_SUGGESTIONS
        )}`;
      }

      const match = matchLibraryQuestion(question);

      if (!match) {
        return `I'm not sure yet—try rephrasing or email the team at library_rw@comms.alueducation.com.${formatSuggestions(
          DEFAULT_SUGGESTIONS
        )}`;
      }

      const answer = await match.response(question);
      const followUps = match.followUps?.length
        ? match.followUps
        : COMPILED_SUGGESTIONS;

      return `${answer}${formatSuggestions(followUps)}`;
    },
    path: "handleQuestion",
  },
};

export const LibraryChatBot = () => (
  <ChatBot
    id="alu-library-chatbot"
    flow={chatbotFlow}
    settings={chatbotSettings}
    styles={chatbotStyles}
  />
);
