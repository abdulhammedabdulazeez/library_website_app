import type { ResearchPaper } from "@/types/research";

import { ResearchPaperCard } from "./ResearchPaperCard";
import { ResearchResultsEmptyState } from "./ResearchResultsEmptyState";

type ResearchPapersGridProps = {
  papers: ResearchPaper[];
  onResetFilters: () => void;
};

export const ResearchPapersGrid = ({
  papers,
  onResetFilters,
}: ResearchPapersGridProps) => {
  if (!papers.length) {
    return <ResearchResultsEmptyState onResetFilters={onResetFilters} />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
      {papers.map((paper) => (
        <ResearchPaperCard key={paper.id} paper={paper} />
      ))}
    </div>
  );
};
