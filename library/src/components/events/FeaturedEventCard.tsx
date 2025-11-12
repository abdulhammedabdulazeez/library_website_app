import { Button } from "@/components/ui/button";
import { InfoPill } from "@/components/events/InfoPill";
import { type LibraryEvent } from "@/types/events";
import { CalendarDays, Clock, ExternalLink, MapPin } from "lucide-react";

type FeaturedEventCardProps = {
  event: LibraryEvent;
};

export const FeaturedEventCard = ({
  event,
}: FeaturedEventCardProps) => {
  return (
    <section className="rounded-3xl bg-[#CEF1FF] px-6 py-8 shadow-sm md:px-10 md:py-12">
      <div className="flex flex-col items-start gap-8 md:flex-row">
        <div className="w-full overflow-hidden rounded-2xl bg-white md:w-1/2">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex w-full flex-col gap-6 md:w-1/2">
          <div>
            <hr className="mb-4 w-16 border-2 border-[#D00D2D]" />
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-600">
              Featured Event
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              {event.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-700">
            <InfoPill icon={<CalendarDays className="h-4 w-4" />}>
              {event.date}
            </InfoPill>
            <InfoPill icon={<Clock className="h-4 w-4" />}>
              {event.time}
            </InfoPill>
            <InfoPill icon={<MapPin className="h-4 w-4" />}>
              {event.location}
            </InfoPill>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-gray-700">
            {event.description}
          </p>

          {event.speakers?.length ? (
            <div className="rounded-2xl bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Speakers & Facilitators
              </p>
              <ul className="mt-3 grid gap-3 text-sm text-gray-700 md:grid-cols-2">
                {event.speakers.map((speaker) => (
                  <li key={speaker.name}>
                    <p className="font-semibold text-gray-900">
                      {speaker.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {speaker.title}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {event.registrationUrl ? (
            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="bg-[#D00D2D] text-white hover:bg-[#A30B22]"
              >
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Register Now
                </a>
              </Button>
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#D00D2D] transition-colors hover:text-[#A30B22]"
              >
                Join via Google Meet
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

