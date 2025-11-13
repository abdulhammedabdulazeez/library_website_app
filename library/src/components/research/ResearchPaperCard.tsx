import { Button } from "@/components/ui/button";
import type { ResearchPaper } from "@/types/research";
import { ExternalLink, Link2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type ResearchPaperCardProps = {
  paper: ResearchPaper;
};

export const ResearchPaperCard = ({ paper }: ResearchPaperCardProps) => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  const timeoutRef = useRef<number | null>(null);

  const primaryAuthor = useMemo(() => paper.authors[0], [paper.authors]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopyDoi = async () => {
    try {
      if (!navigator?.clipboard) {
        throw new Error("Clipboard not available");
      }
      await navigator.clipboard.writeText(paper.doi);
      setCopyStatus("copied");
    } catch (error) {
      console.error("Failed to copy DOI", error);
      setCopyStatus("error");
    } finally {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setCopyStatus("idle"), 2400);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "Copied!"
      : copyStatus === "error"
      ? "Copy failed"
      : "Copy DOI";

  return (
    <article className="group flex h-full flex-col justify-between rounded-3xl border border-[#E1F3FF] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg md:p-8">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F3CCD2] px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#891326]">
            {paper.year}
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
            {paper.journal}
          </span>
        </div>

        <h3 className="mt-5 text-2xl font-semibold leading-snug text-gray-900 transition-colors group-hover:text-[#891326]">
          {paper.title}
        </h3>

        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Authors
          </p>
          <ul className="flex flex-wrap gap-2">
            {paper.authors.map((author) => (
              <li
                key={author}
                className="rounded-full bg-[#F7FBFF] px-3 py-1 text-xs font-medium text-gray-700"
              >
                {author}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-gray-600">
          {primaryAuthor} and collaborators investigate emerging challenges and
          opportunities connected to African leadership, innovation, and
          inclusive growth.
        </p>
      </div>

      <footer className="mt-8 flex flex-wrap items-center gap-3">
        <Button
          asChild
          variant="outline"
          className="border-[#D00D2D] bg-white text-[#D00D2D] hover:bg-[#D00D2D] hover:text-white"
        >
          <a
            href={paper.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            View publication
            <ExternalLink className="size-4" />
          </a>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleCopyDoi}
          className="text-sm font-semibold text-[#891326] hover:text-[#D00D2D]"
        >
          <Link2 className="size-4" />
          {copyLabel}
        </Button>
      </footer>
    </article>
  );
};
