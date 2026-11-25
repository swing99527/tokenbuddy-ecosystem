# `@tokenbuddy/ai-sdk`

Vercel AI SDK provider helper for **TokenBuddy** (`https://tokenbuddy.site`) — unified OpenAI-compatible gateway across 40+ LLM, image, and video models with **0% top-up surcharge**, **sticky prompt caching**, **per-key hard spend caps**, and **white-label reseller domain support**.

## Install

```bash
npm install @tokenbuddy/ai-sdk @ai-sdk/openai-compatible ai
```

## Quickstart

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { createTokenBuddy } from '@tokenbuddy/ai-sdk'
import { generateText, streamText } from 'ai'

const tokenbuddy = createTokenBuddy(createOpenAICompatible, {
  apiKey: process.env.TOKENBUDDY_API_KEY,
})

const { text } = await generateText({
  model: tokenbuddy('claude-sonnet-5-5'),
  prompt: 'Explain how sticky prompt cache routing lowers coding agent cost.',
})

console.log(text)
```

## White-Label Partner Domains

Resellers operating a branded TokenBuddy storefront can point directly to their custom domain:

```ts
const partnerGateway = createTokenBuddy(createOpenAICompatible, {
  apiKey: process.env.PARTNER_API_KEY,
  baseURL: 'https://api.youragency.com', // automatically normalized to /v1
})
```

## Links

- Get an API key: https://tokenbuddy.site
- Live model pricing: https://tokenbuddy.site/pricing
- Documentation: https://tokenbuddy.site/docs
- White-label partner program: https://tokenbuddy.site/partners
