
import React, { useState } from "react";
import { 
  Copy, 
  FileText, 
  Search,
  ClipboardCheck,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const CitationGenerator: React.FC = () => {
  const [paperIdentifier, setPaperIdentifier] = useState("");
  const [citationFormat, setCitationFormat] = useState("apa");
  const [searchLoading, setSearchLoading] = useState(false);
  
  const handleGenerateCitation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperIdentifier.trim()) return;
    
    setSearchLoading(true);
    
    // Simulate citation generation
    setTimeout(() => {
      setSearchLoading(false);
      toast.success("Citation generated successfully!");
      // In a real app, this would display the generated citation
    }, 1500);
  };
  
  const handleCopyCitation = () => {
    // In a real app, this would copy the actual citation
    navigator.clipboard.writeText("Citation would be copied here.");
    toast.success("Citation copied to clipboard");
  };
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Citation Generator</h1>
        <p className="text-scholar-darkgray">Generate properly formatted citations for any research paper</p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <Tabs defaultValue="search">
            <TabsList className="mb-4">
              <TabsTrigger value="search" className="flex items-center gap-1.5">
                <Search className="h-4 w-4" />
                <span>Search Paper</span>
              </TabsTrigger>
              <TabsTrigger value="doi" className="flex items-center gap-1.5">
                <FileText className="h-4 w-4" />
                <span>DOI</span>
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                <span>URL</span>
              </TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleGenerateCitation}>
              <TabsContent value="search" className="space-y-4 mt-0">
                <div>
                  <Label htmlFor="paper-search">Search by paper title or author</Label>
                  <Input 
                    id="paper-search"
                    placeholder="Enter paper title or author name..." 
                    className="scholar-input mt-2"
                    value={paperIdentifier}
                    onChange={(e) => setPaperIdentifier(e.target.value)}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="doi" className="space-y-4 mt-0">
                <div>
                  <Label htmlFor="paper-doi">Enter DOI</Label>
                  <Input 
                    id="paper-doi"
                    placeholder="10.48550/arXiv.1706.03762" 
                    className="scholar-input mt-2"
                    value={paperIdentifier}
                    onChange={(e) => setPaperIdentifier(e.target.value)}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="url" className="space-y-4 mt-0">
                <div>
                  <Label htmlFor="paper-url">Enter paper URL</Label>
                  <Input 
                    id="paper-url"
                    placeholder="https://arxiv.org/abs/1706.03762" 
                    className="scholar-input mt-2"
                    value={paperIdentifier}
                    onChange={(e) => setPaperIdentifier(e.target.value)}
                  />
                </div>
              </TabsContent>
              
              <div className="mt-6">
                <div className="font-medium mb-3">Citation Format</div>
                <RadioGroup 
                  defaultValue="apa" 
                  value={citationFormat}
                  onValueChange={setCitationFormat}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="apa" id="apa" />
                    <Label htmlFor="apa">APA</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mla" id="mla" />
                    <Label htmlFor="mla">MLA</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="chicago" id="chicago" />
                    <Label htmlFor="chicago">Chicago</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="harvard" id="harvard" />
                    <Label htmlFor="harvard">Harvard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bibtex" id="bibtex" />
                    <Label htmlFor="bibtex">BibTeX</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="scholar-btn-primary"
                  disabled={searchLoading || !paperIdentifier.trim()}
                >
                  {searchLoading ? "Generating..." : "Generate Citation"}
                </Button>
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="mb-4 text-lg font-medium">Result</div>
      {paperIdentifier ? (
        <Card>
          <CardContent className="pt-6">
            <div className="bg-scholar-cream/50 p-4 rounded-md font-mono text-sm mb-3">
              {citationFormat === "apa" && "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L., & Polosukhin, I. (2017). Attention is all you need. In Advances in Neural Information Processing Systems (pp. 5998-6008)."}
              {citationFormat === "mla" && "Vaswani, Ashish, et al. \"Attention is all you need.\" Advances in Neural Information Processing Systems. 2017."}
              {citationFormat === "chicago" && "Vaswani, Ashish, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, and Illia Polosukhin. \"Attention is all you need.\" In Advances in Neural Information Processing Systems, pp. 5998-6008. 2017."}
              {citationFormat === "harvard" && "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, L. and Polosukhin, I., 2017. Attention is all you need. Advances in Neural Information Processing Systems, pp.5998-6008."}
              {citationFormat === "bibtex" && (
                <>
                  @inproceedings{vaswani2017attention,<br />
                  &nbsp;&nbsp;title = {Attention is all you need},<br />
                  &nbsp;&nbsp;author = {Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and Uszkoreit, Jakob and Jones, Llion and Gomez, Aidan N and Kaiser, Lukasz and Polosukhin, Illia},<br />
                  &nbsp;&nbsp;booktitle = {Advances in Neural Information Processing Systems},<br />
                  &nbsp;&nbsp;pages = {5998--6008},<br />
                  &nbsp;&nbsp;year = {2017}<br />
                  }
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5"
                onClick={handleCopyCitation}
              >
                <Copy className="h-4 w-4" />
                <span>Copy to Clipboard</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <ClipboardCheck className="h-4 w-4" />
                <span>Save to Citations</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-10 px-4 border border-dashed border-scholar-lightgray rounded-lg">
          <FileText className="h-12 w-12 mx-auto mb-3 text-scholar-darkgray opacity-30" />
          <p className="text-scholar-darkgray">
            Enter paper details above to generate a citation
          </p>
        </div>
      )}
    </div>
  );
};

export default CitationGenerator;
