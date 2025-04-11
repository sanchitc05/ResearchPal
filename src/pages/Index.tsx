
import React, { useState, useCallback, useMemo } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import ResearchLibrary from "@/components/ResearchLibrary";
import PaperSummary from "@/components/PaperSummary";
import CitationGenerator from "@/components/CitationGenerator";
import { 
  FileText, 
  Home, 
  BookOpen, 
  Sparkles, 
  BookmarkPlus, 
  Clock,
  HelpCircle,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { usePaperStore } from "@/store/paperStore";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  
  // Use separate selectors with primitive returns to prevent unnecessary re-renders
  const savedCount = usePaperStore(state => 
    state.papers.filter(paper => paper.saved).length
  );
  
  const recentCount = usePaperStore(state => 
    new Set(state.recentlyViewed).size
  );
  
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);
  
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`bg-white border-r border-scholar-lightgray transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 -ml-64 md:w-20 md:ml-0'} flex-shrink-0`}>
          <div className="flex flex-col h-full py-4">
            <div className="px-4 mb-6 flex items-center justify-between">
              <h2 className={`font-medium ${sidebarOpen ? '' : 'hidden md:hidden'}`}>Navigation</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className="hidden md:flex"
              >
                {sidebarOpen ? (
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                )}
              </Button>
            </div>
            
            <nav className="flex-1 px-2 space-y-1">
              <Button 
                variant="ghost" 
                className={`w-full justify-start mb-1 ${!sidebarOpen && 'md:justify-center'} ${activeTab === "dashboard" ? "bg-scholar-cream text-scholar-navy" : ""}`}
                onClick={() => handleTabChange("dashboard")}
              >
                <Home className="h-5 w-5 mr-3" />
                <span className={`${!sidebarOpen && 'md:hidden'}`}>Dashboard</span>
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start mb-1 ${!sidebarOpen && 'md:justify-center'} ${activeTab === "library" ? "bg-scholar-cream text-scholar-navy" : ""}`}
                onClick={() => handleTabChange("library")}
              >
                <BookOpen className="h-5 w-5 mr-3" />
                <span className={`${!sidebarOpen && 'md:hidden'}`}>Research Library</span>
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start mb-1 ${!sidebarOpen && 'md:justify-center'}`}
                onClick={() => handleNavigate("/paper/transformer-paper-001")}
              >
                <Sparkles className="h-5 w-5 mr-3" />
                <span className={`${!sidebarOpen && 'md:hidden'}`}>AI Insights</span>
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start mb-1 ${!sidebarOpen && 'md:justify-center'}`}
                onClick={() => handleNavigate("/citation")}
              >
                <FileText className="h-5 w-5 mr-3" />
                <span className={`${!sidebarOpen && 'md:hidden'}`}>Citations</span>
              </Button>
              
              {sidebarOpen && (
                <>
                  <Separator className="my-4" />
                  <h3 className="px-3 text-xs uppercase text-scholar-darkgray font-medium mb-2">Collections</h3>
                </>
              )}
              {!sidebarOpen && <div className="my-4" />}
              
              <Button 
                variant="ghost" 
                className={`w-full justify-start mb-1 ${!sidebarOpen && 'md:justify-center'}`}
                onClick={() => {
                  handleTabChange("library");
                  // In a real app, this would select the saved papers tab in the library
                }}
              >
                <BookmarkPlus className="h-5 w-5 mr-3" />
                <span className={`${!sidebarOpen && 'md:hidden'}`}>
                  Saved Papers {savedCount > 0 && `(${savedCount})`}
                </span>
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start mb-1 ${!sidebarOpen && 'md:justify-center'}`}
                onClick={() => {
                  handleTabChange("library");
                  // In a real app, this would select the recent papers tab in the library
                }}
              >
                <Clock className="h-5 w-5 mr-3" />
                <span className={`${!sidebarOpen && 'md:hidden'}`}>
                  Recently Viewed {recentCount > 0 && `(${recentCount})`}
                </span>
              </Button>
            </nav>
            
            <div className="px-2 mt-auto space-y-1">
              <Button variant="ghost" className={`w-full justify-start ${!sidebarOpen && 'md:justify-center'}`}>
                <HelpCircle className="h-5 w-5 mr-3" />
                <span className={`${!sidebarOpen && 'md:hidden'}`}>Help</span>
              </Button>
              <Button variant="ghost" className={`w-full justify-start ${!sidebarOpen && 'md:justify-center'}`}>
                <Settings className="h-5 w-5 mr-3" />
                <span className={`${!sidebarOpen && 'md:hidden'}`}>Settings</span>
              </Button>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-scholar-cream">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsContent value="dashboard" className="mt-0">
              <Dashboard />
            </TabsContent>
            <TabsContent value="library" className="mt-0">
              <ResearchLibrary />
            </TabsContent>
            <TabsContent value="paper" className="mt-0">
              <PaperSummary />
            </TabsContent>
            <TabsContent value="citation" className="mt-0">
              <CitationGenerator />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
