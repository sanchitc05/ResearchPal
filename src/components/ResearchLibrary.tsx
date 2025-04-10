
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

const EmptyLibrary = () => (
  <div className="text-center py-16 px-4">
    <BookOpen className="h-16 w-16 mx-auto mb-4 text-scholar-navy opacity-30" />
    <h3 className="text-xl font-medium mb-2">Your research library is empty</h3>
    <p className="text-scholar-darkgray mb-6 max-w-lg mx-auto">
      Upload papers or provide URLs to build your personal research collection. 
      All papers will be processed by AI for easy searching and analysis.
    </p>
    <Button className="scholar-btn-primary">Upload Your First Paper</Button>
  </div>
);

// This would be populated with actual papers
const samplePapers = [
  // Empty for now - we'll add when needed
];

const ResearchLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
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
          {samplePapers.length === 0 ? (
            <EmptyLibrary />
          ) : (
            <div className="grid gap-4">
              {/* Paper items would go here */}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0">
          <EmptyLibrary />
        </TabsContent>
        
        <TabsContent value="saved" className="mt-0">
          <EmptyLibrary />
        </TabsContent>
        
        <TabsContent value="summarized" className="mt-0">
          <EmptyLibrary />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResearchLibrary;
