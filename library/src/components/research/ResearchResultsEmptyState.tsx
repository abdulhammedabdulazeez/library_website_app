import { Button } from "@/components/ui/button";
import { FileWarning } from "lucide-react";

type ResearchResultsEmptyStateProps = {
  onResetFilters: () => void;
};

export const ResearchResultsEmptyState = ({
  onResetFilters,
}: ResearchResultsEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#CCE6FF] bg-[#F7FBFF] px-8 py-16 text-center shadow-sm">
      <div className="flex size-16 items-center justify-center rounded-full bg-white shadow">
        <FileWarning className="size-7 text-[#D00D2D]" />
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-gray-900">
        No publications match these filters yet
      </h3>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-600">
        Try broadening your search by selecting a different year, exploring
        another contributor, or clearing all filters to view the full research
        catalogue.
      </p>
      <Button
        type="button"
        onClick={onResetFilters}
        className="mt-6 bg-[#D00D2D] text-white hover:bg-[#A30B22]"
      >
        Reset filters
      </Button>
    </div>
  );
};
