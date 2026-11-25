# TokenBuddy + LiteLLM Integration

Use **TokenBuddy** as a zero-surcharge, hard-capped upstream gateway behind LiteLLM SDK or LiteLLM Proxy.

## Environment Variables

```bash
export TOKENBUDDY_API_KEY="sk-your-tokenbuddy-key"
export TOKENBUDDY_BASE_URL="https://tokenbuddy.site/v1"
```

## LiteLLM Python SDK

```python
import os
from litellm import completion

resp = completion(
    model="openai/claude-sonnet-5-5",
    api_base=os.environ.get("TOKENBUDDY_BASE_URL", "https://tokenbuddy.site/v1"),
    api_key=os.environ["TOKENBUDDY_API_KEY"],
    messages=[{"role": "user", "content": "Summarize our gateway reliability."}],
)
print(resp.choices[0].message.content)
```

## LiteLLM Proxy

```bash
litellm --config ecosystem/litellm/config.yaml --port 4000
```
