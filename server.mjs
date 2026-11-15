#!/usr/bin/env node
// Orkid Swap MCP client — stdio bridge delegating to @orkid-labs/mcp-server,
// which proxies the remote Streamable HTTP endpoint at
// https://orkidlabs.xyz/api/mcp via the official MCP SDK.
// Paid tools settle via x402 on Base USDC; API-key holders set
// ORKID_API_KEY (sent upstream as X-ORKID-API-Key) for free keyed access.

import { createRequire } from 'node:module'
import { spawnSync } from 'node:child_process'

const require = createRequire(import.meta.url)
const entry = require.resolve('@orkid-labs/mcp-server/dist/index.js')

const res = spawnSync(process.execPath, [entry, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: process.env,
})
process.exit(res.status ?? 0)
