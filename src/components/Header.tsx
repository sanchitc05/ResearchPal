
import React from "react";
import { Search, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="w-full bg-white border-b border-scholar-lightgray px-4 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5 text-scholar-navy" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl text-scholar-navy">Scholar</span>
            <span className="font-serif text-xl text-scholar-burgundy">AI</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center relative max-w-xl w-full mx-4">
          <Search className="absolute left-3 text-scholar-darkgray h-4 w-4" />
          <Input 
            placeholder="Search papers, citations, or research questions..." 
            className="pl-10 py-2 pr-4 border border-scholar-lightgray rounded-full w-full"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-scholar-navy">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-scholar-navy">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
