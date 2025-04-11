
import React, { useState, useMemo } from "react";
import { usePaperStore } from "@/store/paperStore";
import SearchAndFilter from "./library/SearchAndFilter";
import TabContainer from "./library/TabContainer";

const ResearchLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Get data from store once
  const papers = usePaperStore(state => state.papers || []);
  const recentlyViewed = usePaperStore(state => state.recentlyViewed || []);
  const searchPapers = usePaperStore(state => state.searchPapers);
  
  // Memoize derived data
  const filteredPapers = useMemo(() => {
    if (searchTerm.trim()) {
      return searchPapers(searchTerm);
    }
    return papers;
  }, [searchTerm, papers, searchPapers]);
  
  const savedPapers = useMemo(() => 
    papers.filter(paper => paper.saved),
    [papers]
  );
  
  const summarizedPapers = useMemo(() => 
    papers.filter(paper => paper.summarized),
    [papers]
  );
  
  const recentPapers = useMemo(() => {
    if (!recentlyViewed.length) return [];
    return recentlyViewed
      .map(id => papers.find(p => p.id === id))
      .filter(Boolean) as typeof papers;
  }, [recentlyViewed, papers]);
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Research Library</h1>
        <p className="text-scholar-darkgray">Organize and manage your research papers</p>
      </div>
      
      <SearchAndFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <TabContainer
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        allPapers={filteredPapers}
        recentPapers={recentPapers}
        savedPapers={savedPapers}
        summarizedPapers={summarizedPapers}
      />
    </div>
  );
};

export default ResearchLibrary;
