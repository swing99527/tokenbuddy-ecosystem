export const DEFAULT_TOKENBUDDY_BASE_URL = 'https://tokenbuddy.site/v1'

export type TokenBuddyChatModelId =
  | 'claude-sonnet-4-5'
  | 'claude-opus-4-5'
  | 'gpt-5'
  | 'gpt-5-mini'
  | 'gpt-4.1'
  | 'gemini-2.5-pro'
  | 'gemini-2.5-flash'
  | 'deepseek-v3'
  | 'deepseek-r1'
  | (string & {})

export interface TokenBuddyProviderSettings {
  /**
   * TokenBuddy API key. Defaults to `process.env.TOKENBUDDY_API_KEY`.
   */
  apiKey?: string
  /**
   * Gateway base URL. Defaults to `https://tokenbuddy.site/v1`.
   * White-label resellers can pass their custom domain (e.g. `https://api.yourbrand.com/v1`).
   */
  baseURL?: string
  /**
   * Extra HTTP headers sent on every gateway request.
   */
  headers?: Record<string, string>
  /**
   * Optional custom fetch implementation.
   */
  fetch?: typeof globalThis.fetch
  /**
   * Optional provider name override (defaults to `'tokenbuddy'`).
   */
  name?: string
}

export interface OpenAICompatibleProviderFactory<TProvider = unknown> {
  (options: {
    name: string
    baseURL: string
    apiKey: string
    headers?: Record<string, string>
    fetch?: typeof globalThis.fetch
  }): TProvider
}

export interface ResolvedTokenBuddyConfig {
  name: string
  baseURL: string
  apiKey: string
  headers?: Record<string, string>
  fetch?: typeof globalThis.fetch
}

/**
 * Normalizes a TokenBuddy gateway base URL so both `https://tokenbuddy.site`
 * and `https://tokenbuddy.site/v1/` resolve consistently to `.../v1`.
 */
export function normalizeTokenBuddyBaseURL(baseURL?: string): string {
  const raw = (baseURL ?? DEFAULT_TOKENBUDDY_BASE_URL).trim()
  if (!raw) return DEFAULT_TOKENBUDDY_BASE_URL
  const withoutTrailingSlash = raw.replace(/\/+$/, '')
  if (withoutTrailingSlash.endsWith('/v1')) {
    return withoutTrailingSlash
  }
  return `${withoutTrailingSlash}/v1`
}

/**
 * Resolves TokenBuddy provider configuration from explicit options or
 * `TOKENBUDDY_API_KEY` / `TOKENBUDDY_BASE_URL` environment variables.
 */
export function resolveTokenBuddyConfig(
  settings: TokenBuddyProviderSettings = {},
  env: Record<string, string | undefined> =
    (globalThis as { process?: { env?: Record<string, string | undefined> } })
      .process?.env ?? {}
): ResolvedTokenBuddyConfig {
  const apiKey = (settings.apiKey ?? env.TOKENBUDDY_API_KEY ?? '').trim()
  if (!apiKey) {
    throw new Error(
      'TokenBuddy API key is missing. Pass `apiKey` to `createTokenBuddy(...)` or set `TOKENBUDDY_API_KEY`.'
    )
  }

  return {
    name: settings.name?.trim() || 'tokenbuddy',
    baseURL: normalizeTokenBuddyBaseURL(
      settings.baseURL ?? env.TOKENBUDDY_BASE_URL
    ),
    apiKey,
    headers: settings.headers,
    fetch: settings.fetch,
  }
}

/**
 * Creates a Vercel AI SDK OpenAI-compatible provider configured for TokenBuddy.
 *
 * Example:
 * ```ts
 * import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
 * import { createTokenBuddy } from '@tokenbuddy/ai-sdk'
 * import { generateText } from 'ai'
 *
 * const tokenbuddy = createTokenBuddy(createOpenAICompatible, {
 *   apiKey: process.env.TOKENBUDDY_API_KEY,
 * })
 *
 * const { text } = await generateText({
 *   model: tokenbuddy('claude-sonnet-4-5'),
 *   prompt: 'Summarize our Q3 cloud spend.',
 * })
 * ```
 */
export function createTokenBuddy<TProvider>(
  createOpenAICompatible: OpenAICompatibleProviderFactory<TProvider>,
  settings: TokenBuddyProviderSettings = {},
  env?: Record<string, string | undefined>
): TProvider {
  const config = resolveTokenBuddyConfig(settings, env)
  return createOpenAICompatible(config)
}

/**
 * Builds standard JSON request headers for direct `fetch` calls against
 * TokenBuddy endpoints (including `/v1/videos` and `/v1/images/generations`).
 */
export function createTokenBuddyHeaders(
  settings: Pick<TokenBuddyProviderSettings, 'apiKey' | 'headers'> = {},
  env?: Record<string, string | undefined>
): Record<string, string> {
  const { apiKey, headers } = resolveTokenBuddyConfig(settings, env)
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
    ...headers,
  }
}
