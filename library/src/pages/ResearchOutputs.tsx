import { Hero } from "@/components/Hero";
import { ResearchFilterBar } from "@/components/research/ResearchFilterBar";
import { ResearchHighlights } from "@/components/research/ResearchHighlights";
import { ResearchPapersGrid } from "@/components/research/ResearchPapersGrid";
import { RESEARCH_PAPERS_DATA } from "@/data/researchPapers";
import type { ResearchPaper, ResearchSortOption } from "@/types/research";
import { useMemo, useState } from "react";

const collator = new Intl.Collator("en", { sensitivity: "base" });

const YEARS = Array.from(
  new Set(RESEARCH_PAPERS_DATA.map((paper) => paper.year))
).sort((a, b) => b - a);

const AUTHORS = Array.from(
  new Set(RESEARCH_PAPERS_DATA.flatMap((paper) => paper.authors))
).sort(collator.compare);

const TOTAL_PAPERS = RESEARCH_PAPERS_DATA.length;
const JOURNALS_COUNT = new Set(
  RESEARCH_PAPERS_DATA.map((paper) => paper.journal)
).size;

const LATEST_PUBLICATION_YEAR = YEARS[0] ?? new Date().getFullYear();

const OUTPUTS_IN_LATEST_YEAR = RESEARCH_PAPERS_DATA.filter(
  (paper) => paper.year === LATEST_PUBLICATION_YEAR
).length;

export const ResearchOutputs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedAuthor, setSelectedAuthor] =
    useState<string>("All contributors");
  const [sortOption, setSortOption] = useState<ResearchSortOption>("newest");

  const filteredPapers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const yearFilter =
      selectedYear === "All" ? null : Number.parseInt(selectedYear, 10);

    const matchesSearch = (paper: ResearchPaper) => {
      if (!normalizedSearch) return true;
      const combined = [paper.title, paper.journal, paper.doi, ...paper.authors]
        .join(" ")
        .toLowerCase();
      return combined.includes(normalizedSearch);
    };

    const filtered = RESEARCH_PAPERS_DATA.filter(
      (paper) =>
        matchesSearch(paper) &&
        (yearFilter === null || paper.year === yearFilter) &&
        (selectedAuthor === "All contributors"
          ? true
          : paper.authors.some(
              (author) => collator.compare(author, selectedAuthor) === 0
            ))
    );

    return filtered.sort((a, b) => {
      if (sortOption === "newest") {
        return b.year - a.year;
      }
      if (sortOption === "oldest") {
        return a.year - b.year;
      }
      return collator.compare(a.title, b.title);
    });
  }, [searchTerm, selectedYear, selectedAuthor, sortOption]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedYear("All");
    setSelectedAuthor("All contributors");
    setSortOption("newest");
  };

  return (
    <>
      <Hero
        backgroundImage="/assets/library_website_app/library/library-15.jpg"
        title="Research Outputs"
        description="Research outputs from the ALU Library"
        height="medium"
      />

      <main className="bg-[#F7FBFF] py-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
          <ResearchHighlights
            totalPapers={TOTAL_PAPERS}
            uniqueAuthors={AUTHORS.length}
            latestYear={LATEST_PUBLICATION_YEAR}
            outputsThisYear={OUTPUTS_IN_LATEST_YEAR}
            journalsCount={JOURNALS_COUNT}
          />

          <section className="space-y-8">
            <div className="max-w-3xl">
              <hr className="mb-4 w-16 border-2 border-[#D00D2D]" />
              <h2 className="text-3xl font-semibold tracking-wide text-gray-900 md:text-4xl">
                Discover the scholarship behind our mission
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Browse peer-reviewed articles, policy papers, and collaborative
                research that amplify African perspectives on leadership,
                entrepreneurship, and social impact. Use the filters to hone in
                on the work most relevant to your project or curiosity.
              </p>
            </div>

            <ResearchFilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              years={YEARS}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
              authors={AUTHORS}
              selectedAuthor={selectedAuthor}
              onAuthorChange={setSelectedAuthor}
              sortOption={sortOption}
              onSortChange={setSortOption}
              onResetFilters={handleResetFilters}
              resultCount={filteredPapers.length}
              totalCount={TOTAL_PAPERS}
            />

            <ResearchPapersGrid
              papers={filteredPapers}
              onResetFilters={handleResetFilters}
            />
          </section>
        </div>
      </main>
    </>
  );
};
