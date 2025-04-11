
import React from "react";
import Header from "@/components/Header";
import PaperSummary from "@/components/PaperSummary";

const PaperDetailsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto bg-scholar-cream">
        <PaperSummary />
      </main>
    </div>
  );
};

export default PaperDetailsPage;
