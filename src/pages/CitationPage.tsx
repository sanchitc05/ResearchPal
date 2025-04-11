
import React from "react";
import Header from "@/components/Header";
import CitationGenerator from "@/components/CitationGenerator";

const CitationPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto bg-scholar-cream">
        <CitationGenerator />
      </main>
    </div>
  );
};

export default CitationPage;
