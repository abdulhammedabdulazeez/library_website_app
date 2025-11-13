import { CalendarRange, GraduationCap, Library, Users2 } from "lucide-react";

type ResearchHighlightsProps = {
  totalPapers: number;
  uniqueAuthors: number;
  latestYear: number;
  outputsThisYear: number;
  journalsCount: number;
};

const numberFormatter = new Intl.NumberFormat("en-US");

export const ResearchHighlights = ({
  totalPapers,
  uniqueAuthors,
  latestYear,
  outputsThisYear,
  journalsCount,
}: ResearchHighlightsProps) => {
  const highlightItems = [
    {
      label: "Peer-reviewed outputs",
      value: numberFormatter.format(totalPapers),
      caption: "Curated within the ALU knowledge base",
      icon: <Library className="size-6 text-[#891326]" />,
    },
    {
      label: "Contributing authors",
      value: numberFormatter.format(uniqueAuthors),
      caption: "Faculty, researchers, and student scholars",
      icon: <Users2 className="size-6 text-[#891326]" />,
    },
    {
      label: `New in ${latestYear}`,
      value: numberFormatter.format(outputsThisYear),
      caption: "Fresh insights shaping regional impact",
      icon: <CalendarRange className="size-6 text-[#891326]" />,
    },
    {
      label: "Journals & platforms",
      value: numberFormatter.format(journalsCount),
      caption: "Where our community publishes and collaborates",
      icon: <GraduationCap className="size-6 text-[#891326]" />,
    },
  ];

  return (
    <section className="rounded-3xl bg-[#CEF1FF] px-6 py-8 shadow-sm md:px-10 md:py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <hr className="mb-4 w-16 border-2 border-[#D00D2D]" />
          <h2 className="text-3xl font-semibold tracking-wide text-gray-900 md:text-4xl">
            Scholarship that informs African innovation
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            Explore the latest research authored by our faculty and student
            collaborators. Each output is carefully curated by the library team
            to spotlight thought leadership that drives sustainable development
            across the continent.
          </p>
        </div>

        <div className="grid w-full max-w-xl grid-cols-2 gap-4">
          {highlightItems.map((item) => (
            <article
              key={item.label}
              className="group rounded-2xl bg-white/90 p-5 shadow-sm ring-1 ring-white/50 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg"
            >
              <div className="flex items-center gap-2 justify-between">
                <span className="rounded-full bg-[#F3CCD2] p-2">
                  {item.icon}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                  {item.label}
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold text-gray-900">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-gray-600">
                {item.caption}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
