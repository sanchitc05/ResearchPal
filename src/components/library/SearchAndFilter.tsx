
import React from "react";
import { 
  Search, 
  Filter, 
  Tag,
  Folder
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

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ 
  searchTerm, 
  setSearchTerm 
}) => {
  return (
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
  );
};

export default SearchAndFilter;
