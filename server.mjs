#!/usr/bin/env node
// Orkid Swap MCP client — bridges stdio MCP clients to the remote
// Streamable HTTP endpoint at https://orkidlabs.xyz/api/mcp via mcp-remote.
// Paid tools (orkid_quote, orkid_bridge_quote) settle via x402 on Base USDC;
// API-key holders pass --header "X-ORKID-API-Key: <key>" for free keyed access.

import { createRequire } from 'node:module'
import { spawnSync } from 'node:child_process'

const require = createRequire(import.meta.url)
const proxy = require.resolve('mcp-remote/dist/proxy.js')

const url = process.env.ORKID_MCP_URL || 'https://orkidlabs.xyz/api/mcp'
const args = [proxy, url, ...process.argv.slice(2)]

const res = spawnSync(process.execPath, args, { stdio: 'inherit' })
process.exit(res.status ?? 0)
