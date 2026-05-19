import { MarketingReport, ProductInput } from '@/lib/types/marketing';

/**
 * Contract every AI provider must fulfill.
 */
export interface AIProviderInterface {
  generateMarketingReport(input: ProductInput): Promise<MarketingReport>;
}
