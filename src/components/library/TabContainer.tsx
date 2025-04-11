
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paper } from "@/store/paperStore";
import PaperGrid from "./PaperGrid";

interface TabContainerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  allPapers: Paper[];
  recentPapers: Paper[];
  savedPapers: Paper[];
  summarizedPapers: Paper[];
}

const TabContainer: React.FC<TabContainerProps> = ({
  activeTab,
  setActiveTab,
  allPapers,
  recentPapers,
  savedPapers,
  summarizedPapers
}) => {
  // Ensure we're working with arrays, even if undefined is passed
  const safeAllPapers = Array.isArray(allPapers) ? allPapers : [];
  const safeRecentPapers = Array.isArray(recentPapers) ? recentPapers : [];
  const safeSavedPapers = Array.isArray(savedPapers) ? savedPapers : [];
  const safeSummarizedPapers = Array.isArray(summarizedPapers) ? summarizedPapers : [];

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
    >
      <TabsList className="mb-6">
        <TabsTrigger value="all">All Papers</TabsTrigger>
        <TabsTrigger value="recent">Recently Added</TabsTrigger>
        <TabsTrigger value="saved">Saved</TabsTrigger>
        <TabsTrigger value="summarized">Summarized</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        <PaperGrid papers={safeAllPapers} />
      </TabsContent>
      
      <TabsContent value="recent" className="mt-0">
        <PaperGrid papers={safeRecentPapers} />
      </TabsContent>
      
      <TabsContent value="saved" className="mt-0">
        <PaperGrid papers={safeSavedPapers} />
      </TabsContent>
      
      <TabsContent value="summarized" className="mt-0">
        <PaperGrid papers={safeSummarizedPapers} />
      </TabsContent>
    </Tabs>
  );
};

export default TabContainer;
