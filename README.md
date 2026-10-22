# orkid-swap-mcp

Stdio bridge to the **Orkid Swap** remote MCP server — MEV-protected multichain swap routing across Tycho + RFQ liquidity with gasless (Permit2) execution on Base, Ethereum, Arbitrum, Unichain, BSC, and Robinhood Chain.

## Usage

```bash
npx -y orkid-swap-mcp
```

### Claude Desktop / stdio clients

```json
{
  "mcpServers": {
    "orkid-swap": {
      "command": "npx",
      "args": ["-y", "orkid-swap-mcp"]
    }
  }
}
```

### With an Orkid API key (free keyed access)

```json
{
  "mcpServers": {
    "orkid-swap": {
      "command": "npx",
      "args": ["-y", "orkid-swap-mcp", "--header", "X-ORKID-API-Key:${ORKID_API_KEY}"],
      "env": { "ORKID_API_KEY": "<your-key>" }
    }
  }
}
```

### Remote-only clients

Clients that speak Streamable HTTP can connect directly — no package needed:

```
https://orkidlabs.xyz/api/mcp
```

## Tools

| Tool | Price | What it does |
| --- | --- | --- |
| `orkid_quote` | $0.002 via x402 (free w/ API key) | Best-route swap quote across Tycho + RFQ liquidity, gasless via Permit2 |
| `orkid_bridge_quote` | $0.002 via x402 (free w/ API key) | Cross-chain bridge quote via Across — unsigned tx data |
| `orkid_chains` | free | Supported chains, live/paused status, gasless capability |
| `orkid_swap_link` | free | Prefilled orkidlabs.xyz swap URL for human review |

## Payments (x402)

Keyless paid calls use [x402](https://www.x402.org/) on Base mainnet USDC (`eip155:8453`, `exact` scheme, EIP-3009 gasless payer transfer). Paid tools answer `PaymentRequired` with full requirements; retry with `_meta["x402/payment"]` — any x402-aware MCP client handles this automatically.

Docs: https://docs.orkidlabs.xyz/docs/x402

## Links

- Site: https://orkidlabs.xyz
- Swap UI: https://orkidlabs.xyz/swap
- Docs: https://docs.orkidlabs.xyz
- MCP Registry: `xyz.orkidlabs/orkid-swap`
