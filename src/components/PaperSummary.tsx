
import React, { useState } from "react";
import { 
  ChevronDown, 
  Copy, 
  Download, 
  Bookmark, 
  Share, 
  Zap,
  BookOpen,
  ListChecks,
  MessagesSquare,
  FileText,
  FileQuestion,
  Lightbulb,
  BarChart4
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const PaperSummary = () => {
  const [summaryLength, setSummaryLength] = useState<"short" | "medium" | "detailed">("medium");
  const [question, setQuestion] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  
  const handleCopySummary = () => {
    // In a real app, this would copy the actual summary text
    navigator.clipboard.writeText("Summary text would be copied here.");
    toast.success("Summary copied to clipboard");
  };
  
  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsAsking(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsAsking(false);
      toast.success("Question answered!");
      // In a real app, this would display the answer
    }, 1500);
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-scholar-burgundy mb-1">
          <Badge variant="outline" className="text-xs">Machine Learning</Badge>
          <Badge variant="outline" className="text-xs">Natural Language Processing</Badge>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">
          Attention Is All You Need: Transformers in Natural Language Processing
        </h1>
        <div className="text-scholar-darkgray">
          <p className="mb-2">Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit et al.</p>
          <p className="mb-1">Published in: NIPS 2017</p>
          <p>DOI: 10.48550/arXiv.1706.03762</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Button className="scholar-btn-secondary flex items-center gap-1.5">
          <FileText className="h-4 w-4" />
          <span>View PDF</span>
        </Button>
        <Button className="scholar-btn-secondary flex items-center gap-1.5">
          <Bookmark className="h-4 w-4" />
          <span>Save</span>
        </Button>
        <Button className="scholar-btn-secondary flex items-center gap-1.5">
          <Download className="h-4 w-4" />
          <span>Download</span>
        </Button>
        <Button className="scholar-btn-secondary flex items-center gap-1.5">
          <Share className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>
      
      <Tabs defaultValue="summary">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="summary" className="flex items-center gap-1.5">
            <Zap className="h-4 w-4" />
            <span>AI Summary</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-1.5">
            <Lightbulb className="h-4 w-4" />
            <span>Key Insights</span>
          </TabsTrigger>
          <TabsTrigger value="qa" className="flex items-center gap-1.5">
            <MessagesSquare className="h-4 w-4" />
            <span>Ask Questions</span>
          </TabsTrigger>
          <TabsTrigger value="references" className="flex items-center gap-1.5">
            <ListChecks className="h-4 w-4" />
            <span>References</span>
          </TabsTrigger>
          <TabsTrigger value="citations" className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>Cite</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="font-medium">AI-Generated Summary</div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-scholar-darkgray mr-2">Length:</div>
                  <div className="flex rounded-md overflow-hidden border">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`rounded-none px-3 ${summaryLength === "short" ? "bg-scholar-navy text-white" : ""}`}
                      onClick={() => setSummaryLength("short")}
                    >
                      Short
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`rounded-none px-3 ${summaryLength === "medium" ? "bg-scholar-navy text-white" : ""}`}
                      onClick={() => setSummaryLength("medium")}
                    >
                      Medium
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`rounded-none px-3 ${summaryLength === "detailed" ? "bg-scholar-navy text-white" : ""}`}
                      onClick={() => setSummaryLength("detailed")}
                    >
                      Detailed
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleCopySummary}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p>
                  "Attention Is All You Need" introduces the Transformer, a novel neural network architecture based entirely on attention mechanisms, eliminating the need for recurrence and convolutions. The paper demonstrates that the Transformer outperforms previous state-of-the-art models on neural machine translation tasks while being more parallelizable and requiring significantly less training time.
                </p>
                <p>
                  The key innovation is the "multi-head self-attention mechanism" which allows the model to focus on different parts of the input sequence simultaneously. This approach enables the model to capture long-range dependencies more effectively than RNNs or CNNs. The Transformer uses positional encodings to retain information about the sequence order, since it does not process tokens sequentially.
                </p>
                <p>
                  The architecture consists of an encoder and decoder, each containing stacks of identical layers with multi-head attention and position-wise feed-forward networks. The model achieves state-of-the-art BLEU scores on English-to-German and English-to-French translation tasks, while training significantly faster than previous architectures.
                </p>
                {summaryLength === "detailed" && (
                  <>
                    <p>
                      The Transformer architecture has since become the foundation for numerous advancements in NLP, including models like BERT, GPT, and T5. Its ability to process sequences in parallel has dramatically reduced training times for large language models and enabled breakthroughs in various language understanding tasks.
                    </p>
                    <p>
                      The impact of this paper extends beyond machine translation to virtually all areas of natural language processing, computer vision, and even computational biology, making it one of the most influential papers in modern artificial intelligence research.
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="font-medium mb-4">Key Research Insights</div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Core Innovation</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      The paper introduces a novel architecture called the Transformer that relies entirely on attention mechanisms, eliminating recurrence and convolutions completely. This was revolutionary as previous sequence models relied heavily on RNNs and CNNs.
                    </p>
                    <p>
                      The multi-head self-attention mechanism allows the model to focus on different parts of the input sequence simultaneously, which is particularly effective for capturing long-range dependencies in text.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Architectural Details</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      The Transformer architecture consists of an encoder and decoder, each containing stacks of identical layers. Each layer has a multi-head self-attention mechanism and a position-wise fully connected feed-forward network.
                    </p>
                    <p>
                      Since the model does not use recurrence, positional encodings are added to the input embeddings to provide information about the sequence order.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Performance Achievements</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      The Transformer achieved state-of-the-art BLEU scores on English-to-German and English-to-French translation tasks, outperforming previous models including those based on recurrent and convolutional architectures.
                    </p>
                    <p>
                      A key advantage was training efficiency - the model required significantly less time to train due to its parallelizable nature, compared to sequential RNN processing.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Historical Impact</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      The Transformer architecture has become the foundation for most modern NLP models including BERT, GPT, T5, and many others.
                    </p>
                    <p>
                      The attention mechanism concept introduced in this paper has expanded beyond NLP to computer vision, multimodal systems, and even computational biology, making it one of the most influential AI papers in recent history.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="qa" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="font-medium mb-4">Ask Questions About This Paper</div>
              <p className="text-scholar-darkgray mb-4">
                Use AI to ask specific questions about methodology, results, or implications of this research paper.
              </p>
              
              <form onSubmit={handleAskQuestion}>
                <div className="flex flex-col gap-3">
                  <Textarea 
                    placeholder="Ask a question about this paper, e.g., 'What are the limitations of the Transformer model?'"
                    className="min-h-[100px]"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="scholar-btn-primary"
                      disabled={isAsking || !question.trim()}
                    >
                      {isAsking ? "Processing..." : "Ask AI Assistant"}
                    </Button>
                  </div>
                </div>
              </form>
              
              <div className="mt-8">
                <div className="font-medium mb-3">Example Questions</div>
                <div className="grid gap-2">
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-2 px-3"
                    onClick={() => setQuestion("What are the key advantages of the Transformer model over RNNs for NLP tasks?")}
                  >
                    <FileQuestion className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-left">What are the key advantages of the Transformer model over RNNs for NLP tasks?</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-2 px-3"
                    onClick={() => setQuestion("Explain the multi-head attention mechanism in simple terms.")}
                  >
                    <FileQuestion className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-left">Explain the multi-head attention mechanism in simple terms.</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-2 px-3"
                    onClick={() => setQuestion("What are potential limitations or weaknesses of the Transformer architecture?")}
                  >
                    <FileQuestion className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-left">What are potential limitations or weaknesses of the Transformer architecture?</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="references" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="font-medium mb-4">References & Related Papers</div>
              <p className="text-scholar-darkgray mb-6">
                Key references cited in this paper and related research you might find interesting.
              </p>
              
              <div className="space-y-4">
                <div className="scholar-card">
                  <div className="text-sm text-scholar-burgundy mb-1">Cited Reference</div>
                  <h3 className="font-medium mb-1">Neural Machine Translation by Jointly Learning to Align and Translate</h3>
                  <p className="text-sm text-scholar-darkgray mb-2">Dzmitry Bahdanau, Kyunghyun Cho, Yoshua Bengio (2014)</p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">View Paper</Button>
                    <Button variant="outline" size="sm">Add to Library</Button>
                  </div>
                </div>
                
                <div className="scholar-card">
                  <div className="text-sm text-scholar-burgundy mb-1">Cited Reference</div>
                  <h3 className="font-medium mb-1">Sequence to Sequence Learning with Neural Networks</h3>
                  <p className="text-sm text-scholar-darkgray mb-2">Ilya Sutskever, Oriol Vinyals, Quoc V. Le (2014)</p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">View Paper</Button>
                    <Button variant="outline" size="sm">Add to Library</Button>
                  </div>
                </div>
                
                <div className="mt-8 mb-4 font-medium">Related Research</div>
                
                <div className="scholar-card">
                  <div className="text-sm text-scholar-green mb-1">AI Recommendation</div>
                  <h3 className="font-medium mb-1">BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding</h3>
                  <p className="text-sm text-scholar-darkgray mb-2">Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova (2018)</p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">View Paper</Button>
                    <Button variant="outline" size="sm">Add to Library</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="citations" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="font-medium mb-4">Citation Formats</div>
              <p className="text-scholar-darkgray mb-6">
                Generate citations for this paper in various academic formats.
              </p>
              
              <Tabs defaultValue="apa">
                <TabsList>
                  <TabsTrigger value="apa">APA</TabsTrigger>
                  <TabsTrigger value="mla">MLA</TabsTrigger>
                  <TabsTrigger value="chicago">Chicago</TabsTrigger>
                  <TabsTrigger value="harvard">Harvard</TabsTrigger>
                  <TabsTrigger value="bibtex">BibTeX</TabsTrigger>
                </TabsList>
                
                <TabsContent value="apa" className="mt-4">
                  <div className="bg-scholar-cream/50 p-4 rounded-md font-mono text-sm mb-3">
                    {`Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L., & Polosukhin, I. (2017). Attention is all you need. In Advances in Neural Information Processing Systems (pp. 5998-6008).`}
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <Copy className="h-4 w-4" />
                    <span>Copy Citation</span>
                  </Button>
                </TabsContent>
                
                <TabsContent value="mla" className="mt-4">
                  <div className="bg-scholar-cream/50 p-4 rounded-md font-mono text-sm mb-3">
                    {`Vaswani, Ashish, et al. "Attention is all you need." Advances in Neural Information Processing Systems. 2017.`}
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <Copy className="h-4 w-4" />
                    <span>Copy Citation</span>
                  </Button>
                </TabsContent>
                
                <TabsContent value="chicago" className="mt-4">
                  <div className="bg-scholar-cream/50 p-4 rounded-md font-mono text-sm mb-3">
                    {`Vaswani, Ashish, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, and Illia Polosukhin. "Attention is all you need." In Advances in Neural Information Processing Systems, pp. 5998-6008. 2017.`}
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <Copy className="h-4 w-4" />
                    <span>Copy Citation</span>
                  </Button>
                </TabsContent>
                
                <TabsContent value="harvard" className="mt-4">
                  <div className="bg-scholar-cream/50 p-4 rounded-md font-mono text-sm mb-3">
                    {`Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, L. and Polosukhin, I., 2017. Attention is all you need. Advances in Neural Information Processing Systems, pp.5998-6008.`}
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <Copy className="h-4 w-4" />
                    <span>Copy Citation</span>
                  </Button>
                </TabsContent>
                
                <TabsContent value="bibtex" className="mt-4">
                  <div className="bg-scholar-cream/50 p-4 rounded-md font-mono text-sm mb-3 overflow-x-auto">
                    {`@inproceedings{vaswani2017attention,
  title = {Attention is all you need},
  author = {Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and Uszkoreit, Jakob and Jones, Llion and Gomez, Aidan N and Kaiser, Lukasz and Polosukhin, Illia},
  booktitle = {Advances in Neural Information Processing Systems},
  pages = {5998--6008},
  year = {2017}
}`}
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <Copy className="h-4 w-4" />
                    <span>Copy Citation</span>
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaperSummary;
