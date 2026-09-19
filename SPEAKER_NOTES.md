# Speaker script

About 4 and a half minutes. Click the step, say the lines, press Run, point at
the right side. Full version with formatting is in the Google Doc
"GraphQL Mission Control: Speaker Script (simple)".

**Before you start:** `npm start`, open localhost:4000, fullscreen, click step 1.

## Explain the demo (20 s)
"On the left is where I type a query. On the right is a small solar system.
The rule is simple: the right side only draws what I ask for. Nothing shows up
unless I ask for it. That is really all GraphQL is. Let's start small."

## 1. hello (20 s)
Click 1, Run. Rocket.
"Curly braces, one word. That is a complete GraphQL query. I asked for hello,
I got hello. The answer always has the same shape as the question."

## 2. Write it together (40 s)
Click 2. Type it yourself: "Open a brace, that starts a query. Planets, the
thing I want. Open a brace, now I pick the fields. Name. Close, close." Run.
"Eight planets, each with just a name. That was your first GraphQL query."
(Click step 2 again if you want it typed for you.)

## 3. Go deeper (30 s)
Click 3, Run. Moons orbit.
"I put moons inside planets, so the moons come back inside each planet. Still
one request. In REST this is one call for the list, then one call per planet."

## 4. One planet (30 s)
Click 4, Run. Mars.
"Just one planet now. Same query with a filter in brackets: name, Mars. That is
an argument." Point at missions: 0. "Remember that zero."

## 5. Variables (30 s)
Click 5, Run. Jupiter.
"Same query, but the name comes from the little box at the bottom. The query
stays the same, only the variable changes." Change to Saturn, Run.

## 6. Pluto and null (30 s)
Click 6, Run.
"Pluto is not a planet, so I get null. No crash, just null. The single planet
has no exclamation mark, so it can be null. The list has one, so it never is."

## 7. Mutation (40 s)
Click 7. "So far we only read. Now let's change something. One different word
at the top: mutation." Run. Flag lands. Point at missions: 1.
"There is our zero. It is a one now. Queries read, mutations write."

## 8. Subscription (40 s)
Click 8, Run. Radar. "I run it and nothing happens. The line is open."
Click 7, Run. Three updates arrive. "I did not ask three times. The server told
me. Queries ask, mutations change, subscriptions listen." Press Stop.

## Finale (30 s, optional)
Click One request vs. many, Start. "REST: Mars, then each moon, three trips.
GraphQL: one trip. That is why people use it." Close.

## Wrap up (10 s)
"That is your first GraphQL query. Braces, pick your fields, nest, add an
argument, and swap query for mutation or subscription. Everything else builds
on that."

Short on time: skip the finale, then variables, then subscription.
Something breaks: "the API is fine, my laptop is not", refresh, click the step.
