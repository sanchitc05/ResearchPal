
import React, { useMemo } from "react";
import { 
  BookOpen, 
  FilePlus, 
  FileText, 
  TrendingUp, 
  Zap, 
  AlertCircle,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PaperUpload from "./PaperUpload";
import { usePaperStore } from "@/store/paperStore";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Get papers array once from the store
  const papers = usePaperStore(state => state.papers);
  
  // Memoize derived values to prevent recalculation on each render
  const papersCount = useMemo(() => papers.length, [papers]);
  const savedCount = useMemo(() => papers.filter(p => p.saved).length, [papers]);
  const summarizedCount = useMemo(() => papers.filter(p => p.summarized).length, [papers]);
  
  // Memoize sample papers
  const samplePapers = useMemo(() => papers.slice(0, 3), [papers]);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Research Dashboard</h1>
        <p className="text-scholar-darkgray">Welcome back! Let's enhance your research workflow.</p>
      </div>

      <PaperUpload />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <BookOpen className="h-5 w-5 mr-2 text-scholar-navy" />
              Library Overview
            </CardTitle>
            <CardDescription>Your research collection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Papers</span>
                <span className="font-medium">{papersCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Citations</span>
                <span className="font-medium">{papersCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Saved summaries</span>
                <span className="font-medium">{summarizedCount}</span>
              </div>
              <Button 
                className="w-full mt-4 bg-scholar-navy hover:bg-scholar-navy/90 text-white"
                onClick={() => navigate("/library")}
              >
                <FileText className="h-4 w-4 mr-2" />
                View Library
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Zap className="h-5 w-5 mr-2 text-scholar-burgundy" />
              Research Assistant
            </CardTitle>
            <CardDescription>AI-powered tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  navigate("/paper/transformer-paper-001");
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                Summarize a paper
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  navigate("/paper/transformer-paper-001");
                }}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Answer research question
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  // In a real app, this would navigate to a trends page
                  navigate("/");
                }}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Analyze research trends
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="h-5 w-5 mr-2 text-scholar-green" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your research journey</CardDescription>
          </CardHeader>
          <CardContent>
            {samplePapers.length > 1 ? (
              <div className="space-y-3">
                {samplePapers.map((paper, index) => (
                  <div key={paper.id} className="flex items-start gap-3 pb-2 border-b border-gray-100 last:border-0">
                    <div className="bg-scholar-cream/50 rounded-full p-2 mt-1">
                      <FileText className="h-4 w-4 text-scholar-navy" />
                    </div>
                    <div>
                      <p className="text-sm font-medium line-clamp-1">{paper.title}</p>
                      <p className="text-xs text-scholar-darkgray">{paper.authors}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-scholar-darkgray">
                <FilePlus className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No recent activity</p>
                <p className="text-sm mt-1">Upload your first paper to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
