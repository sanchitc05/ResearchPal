
import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Calendar, 
  Bookmark, 
  FileText, 
  MoreVertical,
  Download,
  Share,
  Trash2,
  Folder,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { usePaperStore, Paper } from "@/store/paperStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PaperCard: React.FC<{ paper: Paper }> = ({ paper }) => {
  const savePaper = usePaperStore(state => state.savePaper);
  const unsavePaper = usePaperStore(state => state.unsavePaper);
  const navigate = useNavigate();

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (paper.saved) {
      unsavePaper(paper.id);
      toast.success(`"${paper.title}" removed from saved papers`);
    } else {
      savePaper(paper.id);
      toast.success(`"${paper.title}" added to saved papers`);
    }
  };

  const handleViewPaper = () => {
    // In a real app, this would navigate to a paper details page with the ID
    navigate("/");
    toast.success(`Viewing paper: ${paper.title}`);
  };

  return (
    <div 
      className="border rounded-lg p-4 hover:border-scholar-navy transition-colors cursor-pointer bg-white"
      onClick={handleViewPaper}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {paper.topics.map((topic, i) => (
              <Badge key={i} variant="outline" className="text-xs">{topic}</Badge>
            ))}
          </div>
          <h3 className="text-lg font-medium mb-1">{paper.title}</h3>
          <p className="text-sm text-scholar-darkgray mb-2">{paper.authors}</p>
          <p className="text-xs text-scholar-darkgray">{paper.publication}, {paper.year}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              <FileText className="h-4 w-4 mr-2" />
              <span>View PDF</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSaveToggle}>
              <Bookmark className="h-4 w-4 mr-2" />
              <span>{paper.saved ? "Unsave Paper" : "Save Paper"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              <Download className="h-4 w-4 mr-2" />
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              <Share className="h-4 w-4 mr-2" />
              <span>Share</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
          <FileText className="h-3.5 w-3.5 mr-1" />
          <span>View</span>
        </Button>
        <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
          <BookOpen className="h-3.5 w-3.5 mr-1" />
          <span>Summary</span>
        </Button>
      </div>
    </div>
  );
};

const EmptyLibrary = () => (
  <div className="text-center py-16 px-4">
    <BookOpen className="h-16 w-16 mx-auto mb-4 text-scholar-navy opacity-30" />
    <h3 className="text-xl font-medium mb-2">Your research library is empty</h3>
    <p className="text-scholar-darkgray mb-6 max-w-lg mx-auto">
      Upload papers or provide URLs to build your personal research collection. 
      All papers will be processed by AI for easy searching and analysis.
    </p>
    <Button className="bg-scholar-navy hover:bg-scholar-navy/90 text-white">Upload Your First Paper</Button>
  </div>
);

const ResearchLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const papers = usePaperStore(state => state.papers);
  const recentlyViewed = usePaperStore(state => state.recentlyViewed);
  const searchPapers = usePaperStore(state => state.searchPapers);
  
  // Filter papers directly instead of using the removed helper functions
  const savedPapers = papers.filter(paper => paper.saved);
  const summarizedPapers = papers.filter(paper => paper.summarized);
  const recentPapers = recentlyViewed
    .map(id => papers.find(p => p.id === id))
    .filter(Boolean) as Paper[];
  
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>([]);
  
  // Update filtered papers when search term changes
  React.useEffect(() => {
    if (searchTerm.trim()) {
      setFilteredPapers(searchPapers(searchTerm));
    } else {
      setFilteredPapers(papers);
    }
  }, [searchTerm, papers, searchPapers]);
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Research Library</h1>
        <p className="text-scholar-darkgray">Organize and manage your research papers</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-scholar-darkgray h-4 w-4" />
          <Input 
            placeholder="Search papers by title, author, keywords..." 
            className="pl-10 py-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1.5">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                <span>Topics</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Topics</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Machine Learning</DropdownMenuItem>
              <DropdownMenuItem>Natural Language Processing</DropdownMenuItem>
              <DropdownMenuItem>Computer Vision</DropdownMenuItem>
              <DropdownMenuItem>Neuroscience</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1.5">
                <Folder className="h-4 w-4" />
                <span>Folders</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Folders</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Unorganized</DropdownMenuItem>
              <DropdownMenuItem>Current Project</DropdownMenuItem>
              <DropdownMenuItem>References</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Papers</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="summarized">Summarized</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {filteredPapers.length === 0 ? (
            <EmptyLibrary />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPapers.map(paper => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0">
          {recentPapers.length === 0 ? (
            <EmptyLibrary />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentPapers.map(paper => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved" className="mt-0">
          {savedPapers.length === 0 ? (
            <EmptyLibrary />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedPapers.map(paper => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="summarized" className="mt-0">
          {summarizedPapers.length === 0 ? (
            <EmptyLibrary />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {summarizedPapers.map(paper => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResearchLibrary;
