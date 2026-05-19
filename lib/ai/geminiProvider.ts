import { GoogleGenAI } from '@google/genai';
import { MarketingReport, ProductInput } from '@/lib/types/marketing';
import { AIProviderInterface } from './types';
import { buildMainMarketingPrompt } from '@/lib/prompts/mainMarketingPrompt';
import { config } from '@/lib/config';

/**
 * Parse raw text from Gemini — strips markdown code fences if present.
 */
function parseJSON(raw: string): MarketingReport {
  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  return JSON.parse(cleaned) as MarketingReport;
}

export class GeminiProvider implements AIProviderInterface {
  private client: GoogleGenAI;
  private model: string;

  constructor() {
    if (!config.gemini.apiKey) {
      throw new Error(
        'GEMINI_API_KEY belum diisi. Isi .env.local atau aktifkan MOCK_AI=true.'
      );
    }
    this.client = new GoogleGenAI({ apiKey: config.gemini.apiKey });
    this.model = config.gemini.model;
  }

  async generateMarketingReport(input: ProductInput): Promise<MarketingReport> {
    const prompt = buildMainMarketingPrompt(input);

    const response = await this.client.models.generateContent({
      model: this.model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const raw = response.text ?? '';

    try {
      return parseJSON(raw);
    } catch {
      throw new Error(
        `Gemini returned a non-JSON response. Raw output:\n${raw.slice(0, 300)}`
      );
    }
  }
}
