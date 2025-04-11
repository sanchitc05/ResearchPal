
import { create } from 'zustand';

export interface Paper {
  id: string;
  title: string;
  authors: string;
  publication: string;
  year: string;
  doi?: string;
  url?: string;
  abstract?: string;
  topics: string[];
  saved: boolean;
  summarized: boolean;
}

export interface PaperSummary {
  paperId: string;
  shortSummary: string;
  mediumSummary: string;
  detailedSummary: string;
}

export interface Citation {
  paperId: string;
  apa: string;
  mla: string;
  chicago: string;
  harvard: string;
  bibtex: string;
}

interface PaperStore {
  papers: Paper[];
  summaries: Record<string, PaperSummary>;
  citations: Record<string, Citation>;
  recentlyViewed: string[];
  
  // Actions
  addPaper: (paper: Paper) => void;
  uploadPaperFile: (file: File) => Promise<Paper>;
  uploadPaperUrl: (url: string) => Promise<Paper>;
  savePaper: (paperId: string) => void;
  unsavePaper: (paperId: string) => void;
  viewPaper: (paperId: string) => void;
  getPaperById: (id: string) => Paper | undefined;
  getCitation: (paperId: string, format: 'apa' | 'mla' | 'chicago' | 'harvard' | 'bibtex') => string;
  searchPapers: (query: string) => Paper[];
}

// Demo paper for development
const demoTransformerPaper: Paper = {
  id: "transformer-paper-001",
  title: "Attention Is All You Need: Transformers in Natural Language Processing",
  authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit et al.",
  publication: "NIPS",
  year: "2017",
  doi: "10.48550/arXiv.1706.03762",
  abstract: "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely...",
  topics: ["Machine Learning", "Natural Language Processing", "Transformers"],
  saved: false,
  summarized: true
};

// Demo citation
const demoCitation: Citation = {
  paperId: "transformer-paper-001",
  apa: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L., & Polosukhin, I. (2017). Attention is all you need. In Advances in Neural Information Processing Systems (pp. 5998-6008).",
  mla: "Vaswani, Ashish, et al. \"Attention is all you need.\" Advances in Neural Information Processing Systems. 2017.",
  chicago: "Vaswani, Ashish, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, and Illia Polosukhin. \"Attention is all you need.\" In Advances in Neural Information Processing Systems, pp. 5998-6008. 2017.",
  harvard: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, L. and Polosukhin, I., 2017. Attention is all you need. Advances in Neural Information Processing Systems, pp.5998-6008.",
  bibtex: "@inproceedings{vaswani2017attention,\n  title = {Attention is all you need},\n  author = {Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and Uszkoreit, Jakob and Jones, Llion and Gomez, Aidan N and Kaiser, Lukasz and Polosukhin, Illia},\n  booktitle = {Advances in Neural Information Processing Systems},\n  pages = {5998--6008},\n  year = {2017}\n}"
};

// Demo summary
const demoSummary: PaperSummary = {
  paperId: "transformer-paper-001",
  shortSummary: "The paper introduces the Transformer, a neural network architecture based entirely on attention mechanisms that outperforms previous models on translation tasks.",
  mediumSummary: "\"Attention Is All You Need\" introduces the Transformer, a novel neural network architecture based entirely on attention mechanisms, eliminating the need for recurrence and convolutions. The paper demonstrates that the Transformer outperforms previous state-of-the-art models on neural machine translation tasks while being more parallelizable and requiring significantly less training time.",
  detailedSummary: "\"Attention Is All You Need\" introduces the Transformer, a novel neural network architecture based entirely on attention mechanisms, eliminating the need for recurrence and convolutions. The paper demonstrates that the Transformer outperforms previous state-of-the-art models on neural machine translation tasks while being more parallelizable and requiring significantly less training time.\n\nThe key innovation is the \"multi-head self-attention mechanism\" which allows the model to focus on different parts of the input sequence simultaneously. This approach enables the model to capture long-range dependencies more effectively than RNNs or CNNs. The Transformer uses positional encodings to retain information about the sequence order, since it does not process tokens sequentially.\n\nThe architecture consists of an encoder and decoder, each containing stacks of identical layers with multi-head attention and position-wise feed-forward networks. The model achieves state-of-the-art BLEU scores on English-to-German and English-to-French translation tasks, while training significantly faster than previous architectures.\n\nThe Transformer architecture has since become the foundation for numerous advancements in NLP, including models like BERT, GPT, and T5. Its ability to process sequences in parallel has dramatically reduced training times for large language models and enabled breakthroughs in various language understanding tasks.\n\nThe impact of this paper extends beyond machine translation to virtually all areas of natural language processing, computer vision, and even computational biology, making it one of the most influential papers in modern artificial intelligence research."
};

// Generate a unique id for new papers
const generateId = () => `paper-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const usePaperStore = create<PaperStore>((set, get) => ({
  papers: [demoTransformerPaper],
  summaries: { [demoTransformerPaper.id]: demoSummary },
  citations: { [demoTransformerPaper.id]: demoCitation },
  recentlyViewed: [demoTransformerPaper.id],
  
  addPaper: (paper) => set((state) => ({
    papers: [...state.papers, paper],
    recentlyViewed: [paper.id, ...state.recentlyViewed.filter(id => id !== paper.id).slice(0, 9)]
  })),
  
  uploadPaperFile: async (file) => {
    // In a real app, this would upload the file to a server
    // For now, we'll simulate the process with a timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPaper: Paper = {
          id: generateId(),
          title: file.name.replace('.pdf', ''),
          authors: "Author information would be extracted from PDF",
          publication: "Publication info would be extracted",
          year: new Date().getFullYear().toString(),
          topics: ["Research"],
          saved: false,
          summarized: false
        };
        
        get().addPaper(newPaper);
        resolve(newPaper);
      }, 1500);
    });
  },
  
  uploadPaperUrl: async (url) => {
    // In a real app, this would fetch the paper from the URL
    // For now, we'll simulate the process with a timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPaper: Paper = {
          id: generateId(),
          title: url.includes('arxiv') ? 'ArXiv Paper Title' : 'Research Paper from URL',
          authors: "Authors extracted from metadata",
          publication: url.includes('arxiv') ? 'ArXiv' : 'Journal',
          year: new Date().getFullYear().toString(),
          url: url,
          topics: ["Research"],
          saved: false,
          summarized: false
        };
        
        get().addPaper(newPaper);
        resolve(newPaper);
      }, 1500);
    });
  },
  
  savePaper: (paperId) => set((state) => ({
    papers: state.papers.map(paper => 
      paper.id === paperId ? { ...paper, saved: true } : paper
    )
  })),
  
  unsavePaper: (paperId) => set((state) => ({
    papers: state.papers.map(paper => 
      paper.id === paperId ? { ...paper, saved: false } : paper
    )
  })),
  
  // Fix the viewPaper method to only update when necessary
  viewPaper: (paperId) => set((state) => {
    // Only update if the paper exists and isn't already at the top of recently viewed
    if (state.papers.some(paper => paper.id === paperId) && state.recentlyViewed[0] !== paperId) {
      return {
        recentlyViewed: [
          paperId, 
          ...state.recentlyViewed.filter(id => id !== paperId).slice(0, 9)
        ]
      };
    }
    // Return empty object to avoid state update when nothing changes
    return {};
  }),
  
  getPaperById: (id) => {
    return get().papers.find(paper => paper.id === id);
  },
  
  getCitation: (paperId, format) => {
    const citation = get().citations[paperId];
    if (!citation) return "";
    
    return citation[format];
  },
  
  searchPapers: (query) => {
    const lowerQuery = query.toLowerCase();
    return get().papers.filter(paper => 
      paper.title.toLowerCase().includes(lowerQuery) || 
      paper.authors.toLowerCase().includes(lowerQuery) ||
      paper.topics.some(topic => topic.toLowerCase().includes(lowerQuery))
    );
  }
}));
