import { describe, expect, it, vi } from 'vitest'

import {
  createTokenBuddy,
  createTokenBuddyHeaders,
  DEFAULT_TOKENBUDDY_BASE_URL,
  normalizeTokenBuddyBaseURL,
  resolveTokenBuddyConfig,
} from './index'

describe('@tokenbuddy/ai-sdk', () => {
  it('normalizes default, root, and white-label base URLs to /v1', () => {
    expect(normalizeTokenBuddyBaseURL()).toBe(DEFAULT_TOKENBUDDY_BASE_URL)
    expect(normalizeTokenBuddyBaseURL('https://tokenbuddy.site/')).toBe(
      'https://tokenbuddy.site/v1'
    )
    expect(normalizeTokenBuddyBaseURL('https://api.agency.example/v1/')).toBe(
      'https://api.agency.example/v1'
    )
  })

  it('resolves API key and base URL from environment variables', () => {
    const config = resolveTokenBuddyConfig(
      {},
      {
        TOKENBUDDY_API_KEY: 'sk-tb-test',
        TOKENBUDDY_BASE_URL: 'https://ai.partner.example',
      }
    )
    expect(config).toEqual({
      name: 'tokenbuddy',
      baseURL: 'https://ai.partner.example/v1',
      apiKey: 'sk-tb-test',
      headers: undefined,
      fetch: undefined,
    })
  })

  it('throws a clear error when API key is missing', () => {
    expect(() => resolveTokenBuddyConfig({}, {})).toThrow(
      /TOKENBUDDY_API_KEY/
    )
  })

  it('delegates cleanly to createOpenAICompatible with normalized options', () => {
    const factory = vi.fn((opts) => ({ providerOptions: opts }))
    const provider = createTokenBuddy(
      factory,
      {
        apiKey: 'sk-tb-live',
        headers: { 'X-Team': 'platform' },
      },
      {}
    )

    expect(factory).toHaveBeenCalledWith({
      name: 'tokenbuddy',
      baseURL: 'https://tokenbuddy.site/v1',
      apiKey: 'sk-tb-live',
      headers: { 'X-Team': 'platform' },
      fetch: undefined,
    })
    expect(provider.providerOptions.baseURL).toBe('https://tokenbuddy.site/v1')
  })

  it('builds bearer authorization headers for multimodal REST calls', () => {
    const headers = createTokenBuddyHeaders(
      { apiKey: 'sk-tb-media', headers: { 'X-Client': 'ci' } },
      {}
    )
    expect(headers).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer sk-tb-media',
      'X-Client': 'ci',
    })
  })
})
