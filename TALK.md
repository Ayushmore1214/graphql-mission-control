# GraphQL Virtual Talk: script and demo facts

Talk: "GraphQL End to End: Your First Query in 20 Minutes", GraphQL Virtual Meetup.
Speaker for minutes 1 to 14: Ayush More. Co-speaker Eeshaan Sawant covers the advanced parts after.

Rules for editing this script:
- Part 3 (the demo) is verified correct against the real demo. Do not change queries, numbers, step order, screen cues in [brackets], or technical claims. Only the "Demo facts" section at the end is true about the demo. Do not invent anything else.
- Improve wording, flow and delivery only. Simple, human, short sentences. No em dashes.
- My part must fit 14 minutes 30 seconds.

---

## PART 1 — INTRODUCTION (Minutes 1 to 3)

Hey everyone! I am Ayush, 17, based out of Mumbai. I do DevRel at Sherlocks.ai, I am a GraphQL Foundation Ambassador, and I contribute to open source projects in the CNCF ecosystem. I am the person taking you through the demo today and I promise by the end of this you are going to understand GraphQL in a way that actually sticks.

Here is the plan. I am going to spend a few minutes explaining what GraphQL actually is and how it thinks. Then we are going straight into a live demo on a solar system API I built. Every concept I explain, you are going to see it working on screen in real time. No slides, no theory without proof.

If you have never touched GraphQL before, perfect. That is exactly who this is for.

## PART 2 — WHAT IS GRAPHQL (Minutes 3 to 6)

So what is GraphQL.

GraphQL is a query language for your API. That means it is a way of asking for data from a server where you describe exactly what you want and you get back exactly that. The shape of what you asked for is the shape of what comes back. That is the whole mental model and honestly once it clicks everything else makes sense.

Here is the thing that makes GraphQL different. With most APIs, the server decides what you get. You make a request, the server sends back whatever it has, and you work with that. GraphQL flips that around. You are the one in control. You write a query that says exactly which fields you need, and the server returns only those. Nothing extra. Nothing missing.

Key features of GraphQL:

Schema. The complete description of everything your API can do. Every type, every field, every operation. It is the contract between you and the server and it is always typed.

Query. How you read data. You ask for exactly the fields you need and you get back exactly those. Nothing more, nothing less.

Mutation. How you change data. Create, update, delete. Same structure as a query but a different keyword so it is always clear what modifies things.

Subscription. How you listen for live data. You open a connection once and the server pushes updates to you as they happen.

That is GraphQL. Let me show you what all of this actually looks like.

## PART 3 — THE DEMO (Minutes 6 to 14)

Before you start: restart the server (npm start) so missions is 0. Open http://localhost:4000, fullscreen. Step 1 is loaded by default.

### THE SCHEMA — Before We Start (30 seconds)

[Click Schema, top right. A panel slides in from the right. Scroll slowly.]

"Before I write anything, let me show you the schema. This is the menu. Here is the Planet type. It has a name, a temperature, a list of moons, a missions count. These are the fields I can ask for. Below it, Query, Mutation and Subscription list the operations I can run. If I ask for something that is not in here, the server refuses before it fetches anything. The schema is the source of truth.

Now let's use it."

[Click Close.]

### STEP 1 — Your First Query (1 minute)

[Step 1 is already loaded. Press Run. A rocket flies across the screen.]

"The smallest query that exists. Open curly brace. hello. Close curly brace.

That word hello is called a field. It is one piece of data the server can give you. I run it and look at what comes back. Data, and inside it, hello, with a value. I wrote hello inside braces. I got hello inside data. Same shape. That is the rule and it holds no matter how deep or complex your query gets."

### STEP 2 — Writing a Query Together (1 minute 30 seconds)

[Click step 2. The editor is empty on purpose, with the answer faintly behind the cursor. Type it yourself as you talk. If you would rather not, click step 2 again and it types itself.]

"Let me ask for something more interesting. Curly brace, planets, another curly brace, name, close both braces."

[Press Run. The sun and eight planets appear.]

"Eight planets come back, each with just a name. The server knows a lot more about each planet but I only asked for the name so that is all I got. Look under the response: the REST version of this call is 11 kilobytes. This response is 165 bytes. I got exactly what I needed and nothing else."

[Click into the editor. Add temperatureC on the line under name. Press Run. Temperatures appear under every planet.]

"Now I add temperatureC on the next line and run again. Temperatures appear on all eight planets. I add one field, I get one more piece of data per item."

[Delete the temperatureC line. Press Run. Temperatures vanish.]

"I remove it and run, they are gone. That is the level of control you have."

### STEP 3 — Nesting (1 minute)

[Click step 3. Press Run. Moons start orbiting the planets.]

"This is where GraphQL starts to feel really different. I want planets and the moons around each one. In one query.

planets, braces, name, then inside that, moons, braces, name. I am just following the shape of the data. The query nests the same way the data nests. Run it and every planet comes back with its moons nested inside it. Look at the counter under the response: one request, all of it. No extra calls."

### STEP 4 — Arguments (1 minute)

[Click step 4. Press Run. The view zooms to Mars with two moons orbiting, and the details on the right.]

"Sometimes you do not want everything, you want one specific thing. For that you use an argument.

planet, round bracket, name colon Mars in quotes, close bracket, then your fields. Here I asked for the name, the nickname, the temperature, the moons, a fun fact, and the missions count. The schema defines what arguments a field accepts. If I pass something the schema does not expect, the server rejects the query before it runs anything.

Notice the field changed from planets plural to planet singular. Two different fields on the schema. One returns a list, one returns a single item."

[Point at missions: 0 in the response.]

"And look at missions: 0. Hold onto that."

### STEP 5 — Variables (1 minute)

[Click step 5. Do not run yet. Point at each part as you say it.]

"In step 4 I typed Mars inside the query. In a real app the user picks the planet, so the value has to come from somewhere else. That is what a variable is.

Look at the top line. query, then in brackets, dollar name, colon, String, equals Jupiter. That declares a variable called name. It is text, and its value is Jupiter. Then inside the field, name colon dollar name. I use the variable instead of typing the planet in."

[Press Run. Jupiter appears with four moons.]

"Jupiter."

[On the first line, change Jupiter to Saturn. Press Run. Saturn appears with rings.]

"Saturn. The query itself did not change. Only the variable did. In a real app that value comes from the user, a dropdown or a search box, and the app sends it along with the query. The query is written once and reused forever."

### STEP 6 — Types, Null, and the Exclamation Mark (1 minute)

[Click step 6. Press Run. A big null appears, with two schema lines under it.]

"Every field in a GraphQL schema has a type. String for text. Int for whole numbers. Float for decimals. Boolean for true or false. ID for unique identifiers. You always know what kind of value is coming back.

Now there is one more thing the schema tells you. Whether a value can be null or not. I ask for Pluto. Pluto is not in our dataset. I get null back. Not a crash, just null. And the schema warned me this could happen.

Look at the two lines on screen. planet, the single one, returns Planet with no exclamation mark, so it can be null. planets, the list, has exclamation marks, so it is never null.

The exclamation mark after a type is a promise. It means this value will always be there. If there is no exclamation mark, the value might be null and you should handle that. Your code knows this before you write a single line of logic because the schema tells you."

### STEP 7 — Mutations (1 minute)

[Click step 7. Press Run. A rocket flies in, lands on Mars, a flag goes up. Wait for the flag.]

"Everything so far has been reading. Now let me change something.

The first word is mutation instead of query. Same structure, different keyword. That one word tells the server this request changes data. I am launching a mission to Mars.

And look at that. missions went from 0 to 1. The server updated the data and gave me the new value in the same response. I did not need a second request to confirm the change happened. Read and confirm in one go.

The reason queries and mutations are separate keywords is so it is always obvious which requests are safe to repeat and which ones actually do something. Queries are always safe to run again. Mutations do things."

### STEP 8 — Subscriptions (1 minute)

[Click step 8. Press Run. A radar sweep appears with the word "listening", and a strip under the response says "Listening to missionUpdates".]

"The third and last operation type. A subscription.

I run it and nothing comes back yet. That is correct. The connection is open and I am waiting. The server will tell me when something happens, I do not need to keep asking.

Now I trigger a mission launch and watch what comes in."

[Click step 7. Press Run. While the rocket flies, three lines appear in the strip: LAUNCHED, IN_FLIGHT, LANDED. This is mission #2.]

"Launched. In flight. Landed. Three updates, one after another, in exactly the shape I asked for. I asked once and the data came to me.

This is the real time layer of GraphQL. Live location updates, new messages, score changes, anything that happens continuously. You open one subscription and the server keeps you informed."

[Press Stop in the strip.]

## PART 4 — WRAP UP (30 seconds)

So that is GraphQL. You write a query describing what you want. The response comes back in exactly that shape. You control the fields. You nest them to get related data. You pass arguments to get specific things. The schema tells you what exists and whether values can be null. And you have three operations: query to read, mutation to write, subscription to listen.

Everything I just showed you covers most of what you will use in real GraphQL work. It really does start this simply.

Eeshaan is going to take it from here into the more advanced parts of the ecosystem. Thank you.

## TIMING GUIDE

Introduction: 0:00 to 3:00
What is GraphQL: 3:00 to 6:00
Schema intro: 6:00 to 6:30
Step 1: 6:30 to 7:30
Step 2: 7:30 to 9:00
Step 3: 9:00 to 10:00
Step 4: 10:00 to 11:00
Step 5: 11:00 to 12:00
Step 6: 12:00 to 13:00
Step 7: 13:00 to 14:00
Step 8: 14:00 to 15:00
Wrap up: 15:00 to 15:30

This is 15:30, one minute over. To land at 14:30: trim Step 2 to 1 minute (skip the temperatureC add and remove) and the intro to 2:30. If still running long, drop Step 8 first, then Step 5. Steps 1, 2, 3, 4, 6 and 7 are the core.

---

## Demo facts (the only source of truth about the demo)

Web page "GraphQL Mission Control" at http://localhost:4000, backed by a real GraphQL server (Node, GraphQL Yoga). Code: https://github.com/Ayushmore1214/graphql-mission-control

Layout: top bar with the title, a Schema button and a GraphiQL link on the right. Left column: Query editor with a Run button, and a Response panel below showing the JSON plus a line like "1 request · 165 B · 205 ms". Right side: a canvas that draws the solar system, only what the query asked for. Bottom bar: eight numbered steps. Clicking a step types its query into the editor, except step 2, which stays empty so the speaker types it live (clicking it again types it). Cmd+Enter or Run runs the query. Escape closes the Schema panel.

Schema:
```graphql
type Planet { name: String!  nickname: String!  color: String!  diameterKm: Int!  distanceFromSunAU: Float!  temperatureC: Int!  dayLengthHours: Int!  moons: [Moon!]!  funFact: String!  missions: Int! }
type Moon { name: String!  diameterKm: Int! }
type Mission { id: ID!  destination: Planet!  status: String! }
type Query { hello: String!  planets: [Planet!]!  planet(name: String!): Planet }
type Mutation { launch(to: String!): Mission! }
type Subscription { missionUpdates: Mission! }
```

Data: the eight real planets with real numbers. Moons: Earth: Moon. Mars: Phobos, Deimos. Jupiter: Io, Europa, Ganymede, Callisto. Saturn: Titan, Enceladus, Rhea, Mimas. Uranus: Titania, Oberon, Miranda. Neptune: Triton. Mercury and Venus: none. missions starts at 0 for every planet and resets when the server restarts.

Steps:
1. First query. `{ hello }` → {"data":{"hello":"Houston, we have a query. 🚀 Welcome to GraphQL Mission Control."}}. A rocket flies across the screen.
2. Write it together. Editor empty; type `{ planets { name } }`. Eight named planets appear. 165 B. Note under the response: the REST version (GET /api/planets) is 11.1 KB, you used 1% of it. Adding temperatureC under name shows a temperature under every planet (320 B). Removing it makes them vanish.
3. Go deeper. `{ planets { name moons { name } } }`. Moons orbit their planets, names listed under each; Mercury and Venus show "no moons". Counter says 1 request.
4. One planet. `{ planet(name: "Mars") { name nickname temperatureC moons { name } funFact missions } }`. Zooms to Mars with Phobos and Deimos orbiting; right side shows "The Red Planet", -65°C, a fun fact, "0 missions launched today". Response shows missions: 0.
5. Variables. `query ($name: String = "Jupiter") { planet(name: $name) { name nickname moons { name } } }`. The variable has a default value written in the query. Run: Jupiter with four moons. Change Jupiter to Saturn on the first line and run: Saturn with rings. An empty Variables box also appears under the editor; typing {"name":"Saturn"} there overrides the default, but the talk does not use it.
6. Pluto and null. `{ planet(name: "Pluto") { name nickname } }` → {"data":{"planet":null}}. Screen: big "null", the line "Pluto is not in this solar system, and that is fine", and two schema lines: `planet(name: String!): Planet` labelled "no ! so it can be null", `planets: [Planet!]!` labelled "has ! so it is never null".
7. Mutation. `mutation { launch(to: "Mars") { id status destination { name missions } } }`. Rocket flies in from bottom left, lands on Mars, flag goes up. Response: {"data":{"launch":{"id":"1","status":"LAUNCHED","destination":{"name":"Mars","missions":1}}}}. Running step 4 again shows missions: 1.
8. Subscription. `subscription { missionUpdates { id status destination { name } } }`. On run: radar sweep with the word "listening"; response panel says "Listening. Nothing has happened yet"; a strip says "Listening to missionUpdates" with a Stop button. Clicking step 7 and running again (mission #2) makes three lines appear about a second apart: LAUNCHED, IN_FLIGHT, LANDED. Press Stop to close.

Also on the page but not used in this talk: a "One request vs. many" button (bottom right) that races REST (3 requests, 2.1 KB) against GraphQL (1 request, 81 B).

Technical facts: query validation against the schema happens on the server before any resolver runs; the query is still sent to the server. Built-in scalar types: String, Int, Float, Boolean, ID. `!` means non-null. `planet` returns a single nullable Planet; `planets` returns a non-null list of non-null Planets. Mutations in one request run in order; query fields can run in parallel. Subscriptions here use server-sent events over a normal HTTP connection.
