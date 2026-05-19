import { config } from '@/lib/config';
import { AIProviderInterface } from './types';
import { MockProvider } from './mockProvider';
import { GeminiProvider } from './geminiProvider';

/**
 * Returns the correct AI provider based on environment variables.
 *
 * Priority:
 * 1. MOCK_AI=true → MockProvider (always, regardless of AI_PROVIDER)
 * 2. AI_PROVIDER=gemini → GeminiProvider
 * 3. fallback → error (unsupported provider)
 */
export function getAIProvider(): AIProviderInterface {
  if (config.mockAI) {
    return new MockProvider();
  }

  switch (config.aiProvider) {
    case 'gemini':
      return new GeminiProvider();
    default:
      throw new Error(
        `Unsupported AI_PROVIDER: "${config.aiProvider}". Supported values: gemini. Or set MOCK_AI=true.`
      );
  }
}
