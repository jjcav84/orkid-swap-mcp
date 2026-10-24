---
name: orkid-swap-mcp
description: Route EVM token swaps and cross-chain bridges through the Orkid solver network — MEV-protected quotes, gasless Permit2 execution, best price across Tycho + RFQ liquidity. Use when a user or agent needs a token swap quote, a swap deep link to hand to a human for signing, or a bridge quote across Base, Ethereum, Arbitrum, Unichain, BSC, Polygon, or Robinhood Chain (incl. tokenized equities).
license: MIT
metadata:
  author: orkid-labs
  version: "1.0"
  mcp-endpoint: https://orkidlabs.xyz/api/mcp
  npm: orkid-swap-mcp
  registry: xyz.orkidlabs/orkid-swap
---

# Orkid Swap Routing

Orkid exposes swap and bridge tooling as an MCP server. Agents call tools;
humans sign — the agent never touches private keys.

## Endpoint

- **Streamable HTTP:** `https://orkidlabs.xyz/api/mcp`
- **stdio bridge (Claude Desktop, etc.):** `npx -y orkid-swap-mcp`

Discovery methods (`initialize`, `tools/list`, `ping`) are unauthenticated.
`tools/call` requires either:

1. **`X-ORKID-API-Key` header** — free tier key from `https://orkidlabs.xyz/partner`, or
2. **x402 payment** — the call returns a PaymentRequired envelope
   (`$0.002` USDC on Base, `scheme: "exact"`, EIP-3009). Sign the payment
   authorization and retry the same call with
   `_meta["x402/payment"]` set to the signed payload.

## Tools

### `orkid_quote`

Live, non-executing swap quote. Best route across Tycho + RFQ liquidity,
gasless via Permit2, MEV-protected.

Args: `from`, `to` (token symbols or contract addresses), `amount`
(human-readable string, e.g. `"25"`), `chain` (`base | ethereum | arbitrum |
unichain | bsc | robinhood`; polygon is bridge-only).

Returns the quote plus a `swapUrl` — send that URL to the user; they review
and sign in their own wallet.

### `orkid_swap_link`

Builds a hydrated swap URL (prefilled pair, amount, chain, partner
attribution) without fetching a route — use it when the user only needs a
link.

### `orkid_bridge_quote`

Cross-chain bridge quote (Across under the hood) for moves like
Base → Arbitrum or any supported pair including Polygon.

## Usage pattern

1. User states intent ("swap 25 USDC to WETH on base").
2. Call `orkid_quote` with the pair, amount, chain.
3. Read the response's `swapUrl`; give it to the user. Do NOT attempt to
   execute on their behalf — the URL is the hand-off.
4. If the call returns PaymentRequired and no API key is available, complete
   the x402 flow once per call; the retry returns the same-shape result plus
   `_meta["x402/payment-response"]` with the settlement tx.

## Edge cases

- **Same symbol both sides** → tell the user to pick a real pair.
- **Unsupported chain** → use `orkid_bridge_quote` to route via a supported
  chain instead of failing.
- **Polygon** → no same-chain swaps; bridge in/out only.
- **Tokenized equities** (Robinhood Chain) → treated as normal ERC-20
  outputs; liquidity is thin, so small `amount` values quote more reliably.

## Links

- Docs: `https://docs.orkidlabs.xyz/docs/x402`
- Site: `https://orkidlabs.xyz`
- Official MCP Registry: `xyz.orkidlabs/orkid-swap`
