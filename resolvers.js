import { GraphQLError } from 'graphql';
import { createPubSub } from 'graphql-yoga';
import { planets, missions } from './data.js';

const pubsub = createPubSub();
const findPlanet = (name) => planets.find((p) => p.name.toLowerCase() === name.trim().toLowerCase()) ?? null;

export const resolvers = {
  Query: {
    hello: () => 'Houston, we have a query. 🚀 Welcome to GraphQL Mission Control.',
    planets: () => planets,
    planet: (_, { name }) => findPlanet(name),
  },

  Mutation: {
    launch: (_, { to }) => {
      const planet = findPlanet(to);
      if (!planet) throw new GraphQLError(`Cannot launch to "${to}". It is not a planet.`);
      missions.count += 1;
      missions.byPlanet[planet.name] = (missions.byPlanet[planet.name] || 0) + 1;
      const mission = { id: String(missions.count), destination: planet, status: 'LAUNCHED' };
      // Anyone subscribed to missionUpdates hears about it, in three steps, as the rocket flies.
      pubsub.publish('mission', mission);
      setTimeout(() => pubsub.publish('mission', { ...mission, status: 'IN_FLIGHT' }), 1000);
      setTimeout(() => pubsub.publish('mission', { ...mission, status: 'LANDED' }), 2200);
      return mission;
    },
  },

  Subscription: {
    missionUpdates: {
      subscribe: () => pubsub.subscribe('mission'),
      resolve: (payload) => payload,
    },
  },

  Planet: {
    missions: (planet) => missions.byPlanet[planet.name] || 0,
  },
};
