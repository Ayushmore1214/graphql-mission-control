# GraphQL Mission Control

**Point the telescope at exactly what you want.** The live demo for
*"GraphQL End to End: Your First Query in 20 minutes"* at GraphQL Virtual.

The idea in one line: a REST API hands you the whole sky. GraphQL is a
telescope. You point it at what you want and you get that. The screen is
space. You write a query on the left, and the universe on the right draws
only what you asked for.

## Run it

```bash
npm install
npm start          # http://localhost:4000
```

| URL | What |
|---|---|
| `http://localhost:4000` | The demo. Use this on stage. |
| `http://localhost:4000/graphql` | Real GraphiQL, in case someone asks what tool they would actually use. |
| `http://localhost:4000/api/planets` | The chatty REST API used in the finale. |

No CDN, no build step, no frameworks. One HTML file and a small Node server.
Subscriptions run over server-sent events, which GraphQL Yoga does out of the box.
Works with the Wi-Fi off. Every request gets 200 ms of simulated latency, REST
and GraphQL alike, so the finale is fair. `LATENCY_MS=0 npm start` turns it off.

Colours match the GraphQL Virtual page on guild.host: near-black background,
light text, purple accent. GraphQL pink is used only for the `!` in the schema.

## Controls

| Key | Does |
|---|---|
| Click a step | Types the query in. Click or type in the editor to skip the animation. Step 2 stays empty so you type it live; click it again to have it typed. |
| `Cmd Enter` / `Ctrl Enter` | Run |
| `Alt Right` / `Alt Left` | Next / previous step |
| `Esc` | Close the schema drawer or the finale |
| **Stop** (in the listening strip) | Closes an open subscription |
| **Schema** (top right) | The whole API on one screen |
| **One request vs. many** (bottom right) | The finale |

Before you go on: fullscreen the browser and run step 1 once so everything is warm.

## Run of show, about 5 minutes

Rule: click the step, say one sentence, press Run, point at the universe. Do
not read the JSON out loud. Step 2 is the one you type yourself.

**0:00 Frame it (15 s).** "A REST API is like getting a photo of the whole sky
when you wanted one star. GraphQL is a telescope. You point it at what you
want. Let me show you."

**0:15 Step 1, first query (20 s).** Run. The rocket goes up. "That is a
GraphQL query. Curly braces and the name of the thing you want. Look at the
response: same shape as the question."

**0:35 Step 2, write it together (40 s).** The editor is empty with the answer
faintly behind the cursor. Type it out loud, slowly: "Open a brace, that
starts a query. `planets`, the thing I want. Open a brace, now I pick fields.
`name`. Close, close." Run. The solar system appears. "You just wrote your
first GraphQL query." If you would rather not type, click the step again and
it types itself.

**1:15 Step 3, go deeper (30 s).** Run. Moons start orbiting. "Planets have
moons. I asked for them inside the planet, so they came back inside the
planet. Still one request. In REST that is one call for the list and then one
call per planet."

**1:45 Step 4, one planet (30 s).** Run. Camera zooms to Mars. "Arguments.
One planet by name, and I pick the details. Same syntax, with a filter.
Remember that `missions: 0`, we will come back to it."

**2:15 Step 5, variables (30 s).** Run. Jupiter. "Same query, but the name
comes from outside, in that variables box. This is how a real app sends a
query: the text never changes, only the variables do." Change Jupiter to
Saturn in the box, run again. Rings.

**2:45 Step 6, Pluto and null (30 s).** Run. "Pluto is not a planet, so I get
null. Not a crash, not an error. Look at the schema on screen: `planet` has no
exclamation mark, so it is allowed to be null. `planets` has one, so it is
never null. That mark is how the API tells you what you can trust."

**3:15 Step 7, mutation (40 s).** Run. The rocket flies to Mars and plants a
flag. "Queries read. Mutations write. Same shape, one different word at the
top." Click step 4, run it again: `missions: 1`. "The data changed. That is
the difference."

**3:55 Step 8, subscription (40 s).** Run. A radar sweep, and the response
says "listening". Nothing happens, and that is the point. "Queries ask once.
Mutations change something. Subscriptions keep the line open and the server
talks to you." Click step 7, run the launch again. Three updates land in the
strip on their own: LAUNCHED, IN_FLIGHT, LANDED, while the rocket flies.
"I did not ask three times. It told me three times." Press Stop.

**4:35 Finale (30 s).** Open One request vs. many, read the question, press
Start. "REST gives me Mars and links to the moons. So I fetch Phobos, then
Deimos. Three trips. GraphQL: I described the shape, I got the shape. One
trip, 4% of the bytes."

**5:05 Land it (10 s).** "That is your first query. Braces, name the fields,
nest when you need to, add an argument, use a variable, read the exclamation
marks, swap `query` for `mutation` to change something, and `subscription`
to be told when something changes. Everything else in GraphQL builds on that."

## If things go sideways

- Wi-Fi dies: nothing here uses the network. Keep going.
- Typewriter feels slow: click in the editor and it finishes instantly.
- "Is that a real GraphQL server?": open `/graphql`. It is
  [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) with real GraphiQL.
- Short on time: skip the finale first, then step 5 (variables), then step 8 (subscription). Steps 1 to 4 and 7 are the core.
- Server dies: `npm start` and refresh. There is no state to lose.

## Layout

```
server.js          HTTP server: /graphql (Yoga), /api/* (chatty REST), static UI
schema.graphql     The SDL, also shown in the Schema drawer
resolvers.js       Query, the launch mutation, and the missionUpdates subscription. That is the whole backend.
data.js            Eight planets, their moons, and the bloated REST shapes
public/index.html  The demo UI. Canvas universe plus two panels, no dependencies.
```
