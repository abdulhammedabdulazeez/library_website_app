import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ResearchSortOption } from "@/types/research";
import {
  Filter,
  RefreshCw,
  Search,
  Sparkles,
  UserRoundSearch,
} from "lucide-react";
import { useMemo } from "react";

type ResearchFilterBarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  years: number[];
  selectedYear: string;
  onYearChange: (value: string) => void;
  authors: string[];
  selectedAuthor: string;
  onAuthorChange: (value: string) => void;
  sortOption: ResearchSortOption;
  onSortChange: (value: ResearchSortOption) => void;
  onResetFilters: () => void;
  resultCount: number;
  totalCount: number;
};

export const ResearchFilterBar = ({
  searchTerm,
  onSearchChange,
  years,
  selectedYear,
  onYearChange,
  authors,
  selectedAuthor,
  onAuthorChange,
  sortOption,
  onSortChange,
  onResetFilters,
  resultCount,
  totalCount,
}: ResearchFilterBarProps) => {
  const yearFilters = useMemo(() => ["All", ...years.map(String)], [years]);
  const authorOptions = useMemo(
    () => ["All contributors", ...authors],
    [authors]
  );

  const resultLabel =
    resultCount === totalCount
      ? `${resultCount} publication${resultCount === 1 ? "" : "s"}`
      : `Showing ${resultCount} of ${totalCount} publications`;

  return (
    <section className="rounded-3xl border border-[#E1F3FF] bg-white px-6 py-6 shadow-sm md:px-8 md:py-8">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.28em] text-gray-500">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="size-4 text-[#D00D2D]" />
              Curate your view
            </span>
            <span className="hidden h-3 w-px bg-gray-300 lg:block" />
            <span>{resultLabel}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[240px] flex-1">
              <label htmlFor="research-search" className="sr-only">
                Search research outputs
              </label>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <input
                id="research-search"
                type="search"
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search by title, journal, or keyword"
                className="w-full rounded-full border border-[#CCE6FF] bg-[#F7FBFF] px-12 py-3 text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:border-[#891326] focus:outline-none focus:ring-2 focus:ring-[#F3CCD2]"
              />
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="research-sort"
                className="hidden text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 lg:inline-block"
              >
                Sort
              </label>
              <div className="relative">
                <select
                  id="research-sort"
                  value={sortOption}
                  onChange={(event) =>
                    onSortChange(event.target.value as ResearchSortOption)
                  }
                  className="rounded-full border border-[#CCE6FF] bg-white px-5 py-2 text-sm font-medium text-gray-700 focus:border-[#891326] focus:outline-none focus:ring-2 focus:ring-[#F3CCD2]"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="title">Title A-Z</option>
                </select>
                <Filter className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#D00D2D]" />
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="text-[#891326] hover:text-[#D00D2D]"
            >
              <RefreshCw className="size-4" />
              Reset
            </Button>
          </div>
        </header>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap gap-2 lg:max-w-3xl">
            {yearFilters.map((year) => {
              const isActive = selectedYear === year;

              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => onYearChange(year)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                    isActive
                      ? "border-[#D00D2D] bg-[#D00D2D] text-white shadow-md"
                      : "border-transparent bg-[#F7FBFF] text-gray-700 hover:border-[#D00D2D]/60 hover:text-[#D00D2D]"
                  )}
                >
                  {year === "All" ? "All years" : year}
                </button>
              );
            })}
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3 lg:w-auto">
            <label
              htmlFor="author-filter"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500"
            >
              <UserRoundSearch className="size-4 text-[#D00D2D]" />
              Author
            </label>
            <div className="relative w-full sm:w-64">
              <select
                id="author-filter"
                value={selectedAuthor}
                onChange={(event) => onAuthorChange(event.target.value)}
                className="w-full rounded-2xl border border-[#CCE6FF] bg-white px-5 py-3 text-sm font-medium text-gray-700 focus:border-[#891326] focus:outline-none focus:ring-2 focus:ring-[#F3CCD2]"
              >
                {authorOptions.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
