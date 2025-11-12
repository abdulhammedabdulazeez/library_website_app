import { cn } from "@/lib/utils";

export type EventsToggleTab = {
  id: string;
  label: string;
};

type EventsToggleProps = {
  tabs: readonly EventsToggleTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
};

export const EventsToggle = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}: EventsToggleProps) => {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 rounded-full border border-gray-200 bg-white p-1 md:inline-flex md:gap-0",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 md:flex-none",
            activeTab === tab.id
              ? "bg-[#D00D2D] text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
