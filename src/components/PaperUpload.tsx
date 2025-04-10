
import React, { useState } from "react";
import { Upload, Link, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const PaperUpload: React.FC = () => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [urlLoading, setUrlLoading] = useState(false);
  const [paperUrl, setPaperUrl] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploadLoading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploadLoading(false);
      toast.success(`"${file.name}" uploaded successfully!`);
    }, 1500);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperUrl.trim()) return;
    
    setUrlLoading(true);
    
    // Simulate URL processing
    setTimeout(() => {
      setUrlLoading(false);
      toast.success("Paper from URL processed successfully!");
      setPaperUrl("");
    }, 1500);
  };

  return (
    <Card className="border-2 border-scholar-lightgray">
      <CardContent className="pt-6">
        <Tabs defaultValue="upload">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="upload" className="font-medium">Upload PDF</TabsTrigger>
            <TabsTrigger value="url" className="font-medium">Paper URL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <div className="border-2 border-dashed border-scholar-lightgray rounded-lg p-8 text-center">
              <Upload className="h-10 w-10 mx-auto mb-4 text-scholar-navy opacity-70" />
              <h3 className="text-lg font-medium mb-2">Drop your PDF research paper here</h3>
              <p className="text-scholar-darkgray mb-6 max-w-md mx-auto">
                Supports PDF format up to 50MB. Your papers will be processed securely.
              </p>
              
              <div className="flex justify-center">
                <label className="scholar-btn-primary flex items-center cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  <span>Select PDF File</span>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    className="hidden" 
                    onChange={handleFileUpload}
                    disabled={uploadLoading}
                  />
                </label>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-scholar-burgundy" />
                <span className="text-sm text-scholar-darkgray">AI will process the paper in seconds</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="url">
            <div className="border-2 border-dashed border-scholar-lightgray rounded-lg p-8">
              <div className="text-center mb-6">
                <Link className="h-10 w-10 mx-auto mb-4 text-scholar-navy opacity-70" />
                <h3 className="text-lg font-medium mb-2">Enter paper URL or DOI</h3>
                <p className="text-scholar-darkgray max-w-md mx-auto">
                  Paste a link to a research paper from sources like arXiv, PubMed, or a DOI.
                </p>
              </div>
              
              <form onSubmit={handleUrlSubmit} className="max-w-xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="text"
                    placeholder="https://arxiv.org/abs/2303.08774"
                    className="scholar-input flex-grow"
                    value={paperUrl}
                    onChange={(e) => setPaperUrl(e.target.value)}
                    disabled={urlLoading}
                  />
                  <Button 
                    type="submit" 
                    className="scholar-btn-primary whitespace-nowrap"
                    disabled={urlLoading || !paperUrl.trim()}
                  >
                    {urlLoading ? "Processing..." : "Process Paper"}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-scholar-burgundy" />
                <span className="text-sm text-scholar-darkgray">Supports arXiv, PubMed, DOI and more</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaperUpload;
