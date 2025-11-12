import { EventCard } from "@/components/events/EventCard";
import { EventsEmptyState } from "@/components/events/EventsEmptyState";
import { type LibraryEvent } from "@/types/events";

type EventsListProps = {
  events: LibraryEvent[];
  emptyStateTitle: string;
  emptyStateMessage: string;
};

export const EventsList = ({
  events,
  emptyStateTitle,
  emptyStateMessage,
}: EventsListProps) => {
  if (!events.length) {
    return (
      <EventsEmptyState
        title={emptyStateTitle}
        message={emptyStateMessage}
      />
    );
  }

  return events.map((event) => (
    <EventCard key={event.id} event={event} />
  ));
};

