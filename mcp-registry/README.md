# TokenBuddy MCP & Agent Skill Registry Publishing Kit

This directory contains ready-to-submit registry manifests and exact commands for publishing TokenBuddy's remote Streamable HTTP MCP server (`https://tokenbuddy.site/api/agent/v1/mcp`) and Agent Skill (`.agents/skills/tokenbuddy-agent/SKILL.md`).

## 1. Pre-Publish Verification Checklist

- [x] Remote Streamable HTTP endpoint: `https://tokenbuddy.site/api/agent/v1/mcp`
- [x] OAuth Protected Resource Metadata: `https://tokenbuddy.site/.well-known/oauth-protected-resource`
- [x] `resources/list` and `prompts/list` return empty lists (`200 OK`) rather than `-32601`
- [x] All MCP tools declare `readOnlyHint`, `destructiveHint`, `idempotentHint`, and `openWorldHint` annotations
- [x] Official MCP Registry manifest at repo root: `.mcp/server.json` (`site.tokenbuddy/mcp`)
- [x] Credentials are never returned over MCP; write plans require explicit idempotency keys / owner console approval

## 2. Official MCP Registry (`registry.modelcontextprotocol.io`)

1. Install `mcp-publisher`:
   ```bash
   brew install mcp-publisher
   ```
2. Verify domain ownership for `site.tokenbuddy` (DNS TXT record on `tokenbuddy.site`):
   ```bash
   mcp-publisher login dns --domain tokenbuddy.site --private-key <hex-ed25519-key>
   ```
3. Publish from repository root:
   ```bash
   mcp-publisher publish .mcp/server.json
   ```

## 3. Glama, Smithery, `mcp.so`, `awesome-mcp-servers`, `skills.sh`

- **Glama**: Submit repository `https://github.com/swing99527/tokenbuddy-ecosystem` referencing `mcp-registry/glama.json`.
- **Smithery**: Register remote Streamable HTTP server using `mcp-registry/smithery.yaml`.
- **`awesome-mcp-servers` PR line**:
  ```markdown
  - [TokenBuddy](https://tokenbuddy.site/docs?article=agent-mcp) - Scoped AI gateway FinOps, live model pricing, balance alerts, CSV cost exports, and white-label reseller operations over OAuth Streamable HTTP MCP (`https://tokenbuddy.site/api/agent/v1/mcp`).
  ```
- **Agent Skill (`skills.sh` / Cursor Directory)**: Point directly to `skills/tokenbuddy-agent/SKILL.md` in `https://github.com/swing99527/tokenbuddy-ecosystem`.
