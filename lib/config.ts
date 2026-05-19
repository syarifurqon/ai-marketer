/**
 * Central config for AI provider selection.
 * All env reading happens here — dynamically via getters to avoid static hoisting evaluation bugs.
 */

export type AIProvider = 'gemini' | 'anthropic' | 'mock';

export const config = {
  get mockAI(): boolean {
    return process.env.MOCK_AI === 'true';
  },
  get aiProvider(): AIProvider {
    return (process.env.AI_PROVIDER ?? 'gemini') as AIProvider;
  },

  gemini: {
    get apiKey(): string {
      return process.env.GEMINI_API_KEY ?? '';
    },
    get model(): string {
      return process.env.GEMINI_MODEL ?? 'gemini-2.5-flash';
    },
  },

  anthropic: {
    get apiKey(): string {
      return process.env.ANTHROPIC_API_KEY ?? '';
    },
    get model(): string {
      return process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-6';
    },
  },
};
