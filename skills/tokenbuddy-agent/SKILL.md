---
name: tokenbuddy-agent
description: Connect coding agents and MCP clients to TokenBuddy (https://tokenbuddy.site) via OAuth Streamable HTTP MCP or OpenAI-compatible APIs for live model pricing, FinOps usage exports, balance alerts, and white-label reseller management.
---

# TokenBuddy Agent Skill

Use this skill when connecting an AI agent, IDE, or automation workflow to **TokenBuddy** (`https://tokenbuddy.site`).

## 1. Remote MCP Connection (Recommended)

TokenBuddy exposes a standards-compliant OAuth 2.0 Streamable HTTP MCP server:

- **MCP URL**: `https://tokenbuddy.site/api/agent/v1/mcp`
- **OAuth Protected Resource Metadata**: `https://tokenbuddy.site/.well-known/oauth-protected-resource`
- **Documentation**: `https://tokenbuddy.site/docs?article=agent-mcp`

### Connection Rules
1. Always authenticate through the host's OAuth 2.0 browser flow against `https://tokenbuddy.site`. Never ask the user to paste passwords, TOTP seeds, or plaintext API keys into chat.
2. Inspect the tools returned by the active MCP session before acting; only invoke operations permitted by the connected account's role.
3. For write operations (such as balance alerts or scoped changes), preserve server-issued `change_id`, `plan_hash`, and `idempotency_key` values and follow any owner-approval link returned by the server.

## 2. OpenAI-Compatible Inference Endpoint

For LLM, image, and async video calls:

- **Base URL**: `https://tokenbuddy.site/v1` (or a reseller's custom white-label domain)
- **Authentication**: `Authorization: Bearer $TOKENBUDDY_API_KEY`
- **Live Pricing**: `https://tokenbuddy.site/pricing`
- **Live Latency & Success-Rate Benchmarks**: `https://tokenbuddy.site/benchmarks` (`GET https://tokenbuddy.site/api/benchmarks?period=24h`)

### Supported Workflows
- **Text & Coding Agents**: `/v1/chat/completions`, `/v1/responses`, `/v1/messages` (with sticky prompt-cache affinity).
- **Images**: `/v1/images/generations` and `/v1/images/edits`.
- **Async Video**: `/v1/videos` (failed upstream generations automatically refund pre-reserved quota).

## 3. FinOps & Reliability Guidance

- Verify current pricing from the live pricing catalog or connected MCP pricing tool rather than hardcoding static rates.
- When exporting consumption CSVs via MCP, preserve exact decimal strings, date ranges, and timezone offsets.
- Never disclose or log API secrets in command arguments, URLs, or commit history.
