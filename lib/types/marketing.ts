export type ProductType = 'jasa' | 'digital' | 'fisik';

export interface ProductInput {
  productName: string;
  category: string;
  productType: ProductType;
  price: string; // Using string to allow things like "$50" or "Rp 1.000.000"
  targetAudience: string;
  usp: string; // Unique Selling Proposition
  problemSolved: string;
  websiteUrl?: string; // Optional
  campaignGoal: string;
  competitorUrls?: string[]; // Optional
}

export interface MarketingReport {
  executiveSummary: string;
  audiencePersona: string;
  positioning: string;
  hooks: string[];
  copywriting: string;
  campaignIdeas: string[];
  landingPageSuggestions: string[];
  nextActions: string[];
  landingPageAudit?: string; // Optional – only present when websiteUrl was provided and scraping succeeded
  competitorAnalysis?: string; // Optional – competitor research qualitative overview
  competitorCards?: Array<{    // Optional – competitor structured analysis cards
    url: string;
    title: string;
    summary: string;
    strengths: string[];
    opportunities: string[];
  }>;
}
