import { Button } from "@/components/ui/button";
import { type LibraryEvent } from "@/types/events";
import { Clock, MapPin } from "lucide-react";

type EventCardProps = {
  event: LibraryEvent;
};

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <article className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg md:flex-row md:items-stretch">
      <div className="md:w-2/5">
        <div className="flex h-full items-center justify-center rounded-2xl bg-slate-50 p-4">
          <img
            src={event.image}
            alt={event.title}
            className="w-full max-h-80 object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#D00D2D]">
          {event.date}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
        <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Clock className="h-4 w-4 text-gray-500" />
          {event.time}
        </p>
        <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MapPin className="h-4 w-4 text-gray-500" />
          {event.location}
        </p>
        <p className="text-sm leading-relaxed text-gray-600">
          {event.description}
        </p>

        {event.registrationUrl ? (
          <Button
            asChild
            variant="outline"
            className="mt-auto w-full border-[#D00D2D] text-[#D00D2D] hover:bg-[#D00D2D] hover:text-white md:w-fit"
          >
            <a href={event.registrationUrl} target="_blank" rel="noreferrer">
              Register Now
            </a>
          </Button>
        ) : null}
      </div>
    </article>
  );
};
