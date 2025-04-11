
import React from "react";
import { 
  Bookmark, 
  FileText, 
  BookOpen, 
  MoreVertical,
  Download,
  Share
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Paper } from "@/store/paperStore";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { usePaperStore } from "@/store/paperStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface PaperCardProps {
  paper: Paper;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {
  const navigate = useNavigate();
  
  // Use separate selectors to minimize re-renders
  const savePaper = usePaperStore(state => state.savePaper);
  const unsavePaper = usePaperStore(state => state.unsavePaper);

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

export default PaperCard;
