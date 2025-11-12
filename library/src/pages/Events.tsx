import { useMemo, useState } from "react";
import { Hero } from "@/components/Hero";
import { FeaturedEventCard } from "@/components/events/FeaturedEventCard";
import { EventsToggle } from "@/components/events/EventsToggle";
import { EventsList } from "@/components/events/EventsList";
import { type LibraryEvent } from "@/types/events";
import { PAST_EVENTS, UPCOMING_EVENTS } from "@/data/events";

const TABS = [
  { id: "upcoming", label: "Upcoming Events" },
  { id: "past", label: "Past Events" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export const Events = () => {
  const [activeTab, setActiveTab] = useState<TabId>(
    UPCOMING_EVENTS.length ? "upcoming" : "past"
  );

  const featuredEvent = useMemo(() => UPCOMING_EVENTS[0], []);
  const upcomingList = useMemo(() => UPCOMING_EVENTS.slice(1), []);

  const tabEvents: Record<TabId, LibraryEvent[]> = {
    upcoming: upcomingList,
    past: PAST_EVENTS,
  };

  const eventsToShow = tabEvents[activeTab];

  return (
    <>
      <Hero
        backgroundImage="/assets/library_website_app/library/events-hero-img.png"
        title="Library Events"
        height="medium"
      />
      <main className="bg-white pb-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pt-16 md:px-6 lg:px-8">
          {featuredEvent && <FeaturedEventCard event={featuredEvent} />}

          <section className="-mx-4 border-b border-gray-200 bg-white px-4 py-4 shadow-sm md:sticky md:top-16 md:z-20 md:bg-white/95 md:backdrop-blur md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="w-full md:w-auto">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 md:text-sm">
                  Explore Our Calendar
                </p>
                <h2 className="text-lg font-bold text-gray-900 md:text-2xl">
                  Browse upcoming and past sessions
                </h2>
              </div>
              <EventsToggle
                className="w-full md:w-auto md:justify-end"
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={(tabId) => setActiveTab(tabId as TabId)}
              />
            </div>
          </section>

          <section aria-live="polite" className="space-y-6">
            <EventsList
              events={eventsToShow}
              emptyStateTitle={
                activeTab === "upcoming"
                  ? "No upcoming events yet"
                  : "No past events listed"
              }
              emptyStateMessage={
                activeTab === "upcoming"
                  ? "We’re lining up new workshops and clinics—check back soon or subscribe to our newsletter for updates."
                  : "Once events wrap up, you’ll find their highlights here. Browse upcoming sessions to see what’s next."
              }
            />
          </section>
        </div>
      </main>
    </>
  );
};
