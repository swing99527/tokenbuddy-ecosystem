# TokenBuddy n8n Workflow Templates

Three ready-to-import n8n workflows using TokenBuddy's unified OpenAI-compatible gateway (`https://tokenbuddy.site/v1`).

## Setup

Set two n8n environment variables:

- `TOKENBUDDY_API_KEY`: Your TokenBuddy API key (create one with a per-key hard spend cap at https://tokenbuddy.site/keys)
- `TOKENBUDDY_BASE_URL` (optional): Defaults to `https://tokenbuddy.site/v1` (resellers can set their white-label domain)

## Included Templates

1. `01-llm-chat-and-fallback.json` — Webhook → Claude / GPT / Gemini / DeepSeek chat completion with structured JSON response and usage telemetry.
2. `02-multimodal-video-generation.json` — Async `/v1/videos` submission + polling loop. Failed upstream video tasks automatically refund pre-consumed quota in TokenBuddy.
3. `03-batch-image-generation.json` — OpenAI-compatible `/v1/images/generations` endpoint for automated creative pipelines.
