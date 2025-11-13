export type ResearchPaper = {
  id: number;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  doi: string;
};

export type ResearchSortOption = "newest" | "oldest" | "title";
