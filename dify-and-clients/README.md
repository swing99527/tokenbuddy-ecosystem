# TokenBuddy Client & App Ecosystem Presets

Verified copy-paste connection configurations for Dify, Open WebUI, Continue, LibreChat, LobeChat, Cherry Studio, Claude Code, Cline, and Cursor.

- **OpenAI-compatible Base URL**: `https://tokenbuddy.site/v1`
- **Anthropic-compatible Base URL**: `https://tokenbuddy.site`
- **Gemini-compatible Base URL**: `https://tokenbuddy.site/v1beta`
- **Remote MCP Server (OAuth Streamable HTTP)**: `https://tokenbuddy.site/api/agent/v1/mcp`

> White-label resellers: replace `https://tokenbuddy.site` with your custom partner domain (e.g., `https://api.yourbrand.com`).

## 1. Dify (OpenAI-API-Compatible Provider)

1. Go to **Settings → Model Provider → OpenAI-API-compatible**.
2. Set **API Endpoint URL** to `https://tokenbuddy.site/v1`.
3. Paste your `TOKENBUDDY_API_KEY` and enter model IDs from https://tokenbuddy.site/pricing (e.g., `claude-sonnet-4-5`, `gpt-5`, `gemini-2.5-pro`, `deepseek-v3`).

## 2. Open WebUI

```bash
OPENAI_API_BASE_URL=https://tokenbuddy.site/v1
OPENAI_API_KEY=sk-your-tokenbuddy-key
```

## 3. Continue (`~/.continue/config.yaml`)

```yaml
name: TokenBuddy
version: 1.0.0
schema: v1
models:
  - name: Claude Sonnet 4.5 (TokenBuddy)
    provider: openai
    model: claude-sonnet-4-5
    apiBase: https://tokenbuddy.site/v1
    apiKey: ${TOKENBUDDY_API_KEY}
  - name: GPT-5 (TokenBuddy)
    provider: openai
    model: gpt-5
    apiBase: https://tokenbuddy.site/v1
    apiKey: ${TOKENBUDDY_API_KEY}
```

## 4. LibreChat (`librechat.yaml`)

```yaml
endpoints:
  custom:
    - name: "TokenBuddy"
      apiKey: "${TOKENBUDDY_API_KEY}"
      baseURL: "https://tokenbuddy.site/v1"
      models:
        default: ["claude-sonnet-4-5", "gpt-5", "gemini-2.5-pro", "deepseek-v3"]
        fetch: true
      titleConvo: true
      titleModel: "gpt-5-mini"
```

## 5. Claude Code (Native Anthropic Messages + Prompt Caching)

```bash
export ANTHROPIC_BASE_URL="https://tokenbuddy.site"
export ANTHROPIC_API_KEY="sk-your-tokenbuddy-key"
claude
```

## 6. Cline / Cursor / LobeChat / Cherry Studio

- **Provider**: OpenAI Compatible
- **Base URL**: `https://tokenbuddy.site/v1`
- **API Key**: `sk-your-tokenbuddy-key`
- **Recommended Models**: `claude-sonnet-4-5`, `gpt-5`, `gemini-2.5-pro`, `deepseek-v3`
