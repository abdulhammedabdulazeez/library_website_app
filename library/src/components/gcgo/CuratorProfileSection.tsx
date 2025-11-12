import { Mail } from "lucide-react";

type CuratorInfo = {
  name: string;
  title: string;
  bio: string;
  image: string;
  email?: string;
  gmail?: string;
};

type CuratorProfileSectionProps = {
  curator: CuratorInfo;
  gcgoName: string;
};

export const CuratorProfileSection = ({
  curator,
  gcgoName,
}: CuratorProfileSectionProps) => {
  const bioParagraphs = curator.bio
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const email = curator.email ?? curator.gmail;

  return (
    <section className="flex w-full flex-col gap-10 rounded-[40px] bg-[#D8F1FF] px-6 py-10 shadow-sm md:flex-row md:items-stretch md:gap-0 md:py-0 md:px-0 lg:px-0">
      <div className="relative flex w-full items-end justify-center md:w-[50%] md:justify-start">
        <img
          src={curator.image}
          alt={curator.name}
          className="max-h-[22rem] w-auto object-contain md:absolute md:bottom-0 md:left-0 md:max-h-[32rem] scale-x-[-1]"
          loading="lazy"
        />
      </div>

      <div className="flex w-full flex-1 flex-col md:pr-10 md:py-10 gap-6">
        <div className="pt-2">
          <div className="h-0.5 w-32 bg-[#D00D2D]" />
          <h2 className="mt-4 text-3xl font-medium leading-tight text-gray-900 md:text-4xl">
            {curator.name}
          </h2>
          <p className="mt-2 text-base font-semibold text-gray-600">
            {curator.title}
          </p>
          <p className="text-sm uppercase tracking-wide text-gray-500">
            {gcgoName}
          </p>
        </div>

        <div>
          {bioParagraphs.length ? (
            <div className="mt-4 max-h-80 space-y-4 overflow-y-auto text-sm leading-relaxed text-gray-700 md:max-h-[420px]">
              {bioParagraphs.map((paragraph, index) => (
                <p key={`${curator.name}-bio-${index}`}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-600">
              More information coming soon.
            </p>
          )}
        </div>

        {email ? (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#9F001A] transition-colors hover:text-[#093B55]"
          >
            <Mail className="h-4 w-4" />
            {email}
          </a>
        ) : null}
      </div>
    </section>
  );
};
