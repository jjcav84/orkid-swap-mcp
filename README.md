# orkid-swap-mcp — Gasless Token Swaps & Bridge Quotes for AI Agents (MCP)

**MCP server for crypto swaps**: MEV-protected DEX aggregation across Tycho +
RFQ liquidity, gasless Permit2 execution, and cross-chain bridge quotes —
on **Base, Ethereum, Arbitrum, Unichain, BSC, Polygon, and Robinhood Chain**
(tokenized stocks & equities, chain ID 4663).

Stdio bridge to the Orkid Swap remote MCP server — gives Claude Desktop,
Cursor, and other stdio-only MCP clients access. Streamable-HTTP clients
connect directly to `https://orkidlabs.xyz/api/mcp` — no package needed.

## Why agents use it

- **Swap tokens without gas** — gasless swaps via Permit2: the solver pays
  gas, the user only signs a message. No ETH/BNB needed in the wallet.
- **MEV protection** — routed through a solver network, not the public
  mempool. Ethereum mainnet routes via Flashbots Protect.
- **Best price** — DEX aggregation across Tycho pool liquidity + RFQ market
  makers, an alternative to querying Uniswap/1inch/CoW Swap directly.
- **Agent never touches keys** — tools return a `swapUrl` for the human to
  review and sign, or unsigned tx data for the depositor wallet.
- **x402 pay-per-call** — $0.002 USDC per quote on Base, no API key or
  account required. Free keyed tier also available.
- **Tokenized equities** — swap into stock tokens on Robinhood Chain; the
  only MCP swap server covering chain 4663.

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

Clients that speak Streamable HTTP connect directly — no package needed:

```
https://orkidlabs.xyz/api/mcp
```

## Tools

| Tool | Price | What it does |
| --- | --- | --- |
| `orkid_quote` | $0.002 via x402 (free w/ API key) | Best-route swap quote across Tycho + RFQ liquidity, gasless via Permit2 |
| `orkid_bridge_quote` | $0.002 via x402 (free w/ API key) | Cross-chain bridge quote via Across — unsigned tx data |
| `orkid_chains` | free | Supported chains, live/paused status, gasless minimums |
| `orkid_swap_link` | free | Prefilled orkidlabs.xyz swap URL for human review |

## Supported chains

| Chain | Same-chain swaps | Gasless min | Notes |
| --- | --- | --- | --- |
| Base (8453) | ✅ | $20 | Primary chain |
| Ethereum (1) | ✅ | $200 | Flashbots Protect |
| Arbitrum (42161) | ✅ | $20 | |
| Unichain (130) | ✅ | $20 | |
| BSC (56) | ✅ | $20 | |
| Robinhood (4663) | ✅ | $20 | Tokenized stocks/equities |
| Polygon (137) | bridge only | — | Same-chain paused |

Bridge routes include verified Arbitrum → Robinhood and Base → Robinhood
paths for ETH, WETH, and USDC → USDG — the on-ramp for tokenized equities.

## Example queries agents handle

- "swap 25 USDC to WETH on Base" → `orkid_quote` → returns `swapUrl`
- "bridge 100 USDC from Base to Arbitrum" → `orkid_bridge_quote`
- "buy a tokenized stock on Robinhood Chain" → bridge in, then swap
- "swap tokens but I have no ETH for gas" → gasless Permit2 flow

## Payments (x402)

Keyless paid calls use [x402](https://www.x402.org/) on Base mainnet USDC
(`eip155:8453`, `exact` scheme, EIP-3009 gasless payer transfer). Paid
tools answer `PaymentRequired` with full requirements; retry with
`_meta["x402/payment"]` — any x402-aware MCP client handles this
automatically.

Docs: https://docs.orkidlabs.xyz/docs/x402

## Links

- Site: https://orkidlabs.xyz
- Swap UI: https://orkidlabs.xyz/swap
- Docs: https://docs.orkidlabs.xyz
- MCP Registry: `xyz.orkidlabs/orkid-swap`
- Smithery skill: `jjcav84/orkid-swap-mcp`

License: MIT
