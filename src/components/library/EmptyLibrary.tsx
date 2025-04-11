
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default EmptyLibrary;
