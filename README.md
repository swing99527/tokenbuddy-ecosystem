# TokenBuddy Ecosystem — SDKs, MCP Registry, n8n Templates & Integrations

[![TokenBuddy MCP connector](https://glama.ai/mcp/connectors/site.tokenbuddy/mcp/badges/score.svg)](https://glama.ai/mcp/connectors/site.tokenbuddy/mcp)

Official public ecosystem integrations for **[TokenBuddy](https://tokenbuddy.site)** — a unified AI API gateway for LLMs, image generation, and video generation with **0% top-up surcharge**, sticky prompt caching, hard spend caps, automatic failed-job refunds, and white-label reseller sub-accounts.

## Links

- **Website & Console**: https://tokenbuddy.site
- **Live Pricing Catalog**: https://tokenbuddy.site/pricing
- **Live Latency & Reliability Benchmarks**: https://tokenbuddy.site/benchmarks
- **Cost Calculator & Gateway Comparisons**: https://tokenbuddy.site/compare
- **English API Documentation**: https://tokenbuddy.site/docs?lang=en
- **White-Label Partner Program**: https://tokenbuddy.site/partners
- **Enterprise Volume Procurement**: https://tokenbuddy.site/enterprise
- **Trust & Security Center**: https://tokenbuddy.site/trust
- **AI Discovery**: [`/llms.txt`](https://tokenbuddy.site/llms.txt) · [`/sitemap.xml`](https://tokenbuddy.site/sitemap.xml)

## What's Inside

| Directory | Description |
| --- | --- |
| [`.mcp/server.json`](.mcp/server.json) & [`mcp-registry/`](mcp-registry/) | Official MCP Registry manifest (`site.tokenbuddy/mcp`), Glama (`glama.json`), and Smithery (`smithery.yaml`) metadata for TokenBuddy's OAuth 2.0 Streamable HTTP MCP endpoint (`https://tokenbuddy.site/api/agent/v1/mcp`). |
| [`vercel-ai-sdk/`](vercel-ai-sdk/) | `@tokenbuddy/ai-sdk` — lightweight TypeScript provider wrapper for the Vercel AI SDK (`@ai-sdk/openai-compatible`) and multimodal REST headers. |
| [`n8n-templates/`](n8n-templates/) | 3 copy-paste n8n workflow templates: LLM Chat & Fallback, Async Video Generation (`/v1/videos`) with Auto-Refunds, and Batch Image Generation (`/v1/images/generations`). |
| [`litellm/`](litellm/) | Drop-in LiteLLM Proxy `config.yaml` routing Claude, GPT, Gemini, and DeepSeek through TokenBuddy with sticky prompt caching. |
| [`dify-and-clients/`](dify-and-clients/) | Quick configuration snippets for Dify, Claude Code, Cline, Cursor, Roo Code, Open WebUI, Cherry Studio, and LobeChat. |
| [`skills/tokenbuddy-agent/`](skills/tokenbuddy-agent/) | Public Agent Skill (`SKILL.md`) for connecting Claude Code, Cursor, Codex, and MCP-compatible agents to TokenBuddy FinOps tools. |

## Quickstart (OpenAI-Compatible API)

```bash
curl https://tokenbuddy.site/v1/chat/completions \
  -H "Authorization: Bearer $TOKENBUDDY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-sonnet-4-5",
    "messages": [{"role": "user", "content": "Hello from TokenBuddy"}]
  }'
```

## Remote MCP Endpoint (OAuth 2.0 Streamable HTTP)

- **Endpoint**: `https://tokenbuddy.site/api/agent/v1/mcp`
- **Protected Resource Metadata**: `https://tokenbuddy.site/.well-known/oauth-protected-resource`
- **Capabilities**: Scoped live model pricing, usage & cost CSV exports, balance alert configuration, and white-label reseller read/plan operations.

## License

MIT — see [LICENSE](LICENSE).
