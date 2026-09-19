// GraphQL Mission Control. Point the telescope at exactly what you want.
//
//   npm install && npm start   →   http://localhost:4000
//
// Serves three things:
//   /            the live demo UI (public/index.html)
//   /graphql     the GraphQL API (+ GraphiQL when opened in a browser)
//   /api/*       a deliberately chatty REST API, for the race at the end

import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createSchema, createYoga } from 'graphql-yoga';
import { resolvers } from './resolvers.js';
import { planets, moons, restPlanet, restMoon } from './data.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 4000;
// Simulated network latency (ms), applied equally to every REST *and* GraphQL
// request so the race at the end is fair. Set LATENCY_MS=0 to disable.
const LATENCY_MS = process.env.LATENCY_MS === undefined ? 200 : Number(process.env.LATENCY_MS);

const typeDefs = readFileSync(join(__dirname, 'schema.graphql'), 'utf8');

const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: '/graphql',
  landingPage: false,
  graphiql: {
    title: '🔭 GraphQL Mission Control',
    defaultQuery: `# 🔭 Welcome to Mission Control.\n# Press ▶ (or Cmd/Ctrl+Enter) to run.\n\n{\n  hello\n}\n`,
  },
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function json(res, status, body) {
  const text = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(text),
    'access-control-allow-origin': '*',
  });
  res.end(text);
}

// --- The chatty REST API ---------------------------------------------------
async function rest(req, res, path) {
  await sleep(LATENCY_MS);
  if (path === '/api/planets') return json(res, 200, planets.map(restPlanet));

  let m = path.match(/^\/api\/planets\/([^/]+)$/);
  if (m) {
    const p = planets.find((x) => x.name.toLowerCase() === m[1].toLowerCase());
    return p ? json(res, 200, restPlanet(p)) : json(res, 404, { error: 'Not a planet.' });
  }

  m = path.match(/^\/api\/moons\/([^/]+)$/);
  if (m) {
    const mo = moons[m[1].toLowerCase()];
    return mo ? json(res, 200, restMoon(mo)) : json(res, 404, { error: 'No such moon' });
  }

  return json(res, 404, { error: 'Not found', hint: 'Try /api/planets, /api/planets/:name, /api/moons/:name' });
}

// --- Static files ------------------------------------------------------------
const STATIC = {
  '/': ['public/index.html', 'text/html; charset=utf-8'],
  '/index.html': ['public/index.html', 'text/html; charset=utf-8'],
  '/schema.graphql': ['schema.graphql', 'text/plain; charset=utf-8'],
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  if (path.startsWith('/graphql')) {
    await sleep(LATENCY_MS);
    return yoga(req, res);
  }
  if (path.startsWith('/api/')) return rest(req, res, path);

  const file = STATIC[path];
  if (file) {
    res.writeHead(200, { 'content-type': file[1], 'cache-control': 'no-store' });
    return res.end(readFileSync(join(__dirname, file[0])));
  }
  res.writeHead(404, { 'content-type': 'text/plain' });
  res.end('404, lost in space.');
});

server.listen(PORT, () => {
  console.log(`
  🔭  GraphQL Mission Control is go for launch
  ─────────────────────────────────────────────
  Demo UI   →  http://localhost:${PORT}
  GraphiQL  →  http://localhost:${PORT}/graphql
  REST API  →  http://localhost:${PORT}/api/planets
  Latency   →  ${LATENCY_MS} ms simulated per request (LATENCY_MS env to change)
  `);
});
