
import React from "react";
import { Paper } from "@/store/paperStore";
import PaperCard from "./PaperCard";
import EmptyLibrary from "./EmptyLibrary";

interface PaperGridProps {
  papers: Paper[];
}

const PaperGrid: React.FC<PaperGridProps> = ({ papers }) => {
  if (papers.length === 0) {
    return <EmptyLibrary />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {papers.map(paper => (
        <PaperCard key={paper.id} paper={paper} />
      ))}
    </div>
  );
};

export default PaperGrid;
