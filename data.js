// The solar system, in memory. Numbers are real (rounded); the jokes are not.

const moon = (name, diameterKm) => ({ name, diameterKm });

export const planets = [
  {
    name: 'Mercury', nickname: 'The Swift One', color: '#b8b2a7',
    diameterKm: 4879, distanceFromSunAU: 0.39, temperatureC: 167, dayLengthHours: 1408,
    moons: [],
    funFact: 'A year on Mercury is 88 days, but a day is 59 days. Birthdays get confusing.',
  },
  {
    name: 'Venus', nickname: "Earth's Evil Twin", color: '#e8c98c',
    diameterKm: 12104, distanceFromSunAU: 0.72, temperatureC: 464, dayLengthHours: 5832,
    moons: [],
    funFact: 'Spins backwards, rains sulphuric acid, hot enough to melt lead. Lovely place.',
  },
  {
    name: 'Earth', nickname: 'The Pale Blue Dot', color: '#4f8fd8',
    diameterKm: 12742, distanceFromSunAU: 1.0, temperatureC: 15, dayLengthHours: 24,
    moons: [moon('Moon', 3474)],
    funFact: 'The only planet not named after a god. Also the only one with Wi-Fi.',
  },
  {
    name: 'Mars', nickname: 'The Red Planet', color: '#d1613f',
    diameterKm: 6779, distanceFromSunAU: 1.52, temperatureC: -65, dayLengthHours: 25,
    moons: [moon('Phobos', 22), moon('Deimos', 12)],
    funFact: 'Has a volcano 2.5× taller than Everest, and several very confused rovers.',
  },
  {
    name: 'Jupiter', nickname: 'King of the Planets', color: '#d9a56e',
    diameterKm: 139820, distanceFromSunAU: 5.2, temperatureC: -110, dayLengthHours: 10,
    moons: [moon('Io', 3643), moon('Europa', 3122), moon('Ganymede', 5268), moon('Callisto', 4821)],
    funFact: 'Has 95 moons. We listed four. You are welcome.',
  },
  {
    name: 'Saturn', nickname: 'The Ringed One', color: '#e6d197',
    diameterKm: 116460, distanceFromSunAU: 9.5, temperatureC: -140, dayLengthHours: 11,
    moons: [moon('Titan', 5150), moon('Enceladus', 504), moon('Rhea', 1527), moon('Mimas', 396)],
    funFact: 'Less dense than water. It would float in a bathtub, given a very large bathtub.',
  },
  {
    name: 'Uranus', nickname: 'The Sideways Planet', color: '#93d6e3',
    diameterKm: 50724, distanceFromSunAU: 19.2, temperatureC: -195, dayLengthHours: 17,
    moons: [moon('Titania', 1578), moon('Oberon', 1523), moon('Miranda', 472)],
    funFact: 'Rotates on its side. Nobody knows why. It refuses to comment.',
  },
  {
    name: 'Neptune', nickname: 'The Windy One', color: '#4a6fe0',
    diameterKm: 49244, distanceFromSunAU: 30.1, temperatureC: -200, dayLengthHours: 16,
    moons: [moon('Triton', 2707)],
    funFact: 'Winds reach 2,100 km/h. Found by maths before anyone actually saw it.',
  },
];

// Missions launched from Mission Control today, per planet. Restart the server to reset.
export const missions = { count: 0, byPlanet: {} };

export const moons = Object.fromEntries(
  planets.flatMap((p) => p.moons.map((m) => [m.name.toLowerCase(), { ...m, planet: p.name }])),
);

// ---------------------------------------------------------------------------
// The REST side. A classic REST endpoint returns *everything it knows* about a
// planet, and links you to the moons so you can go fetch those yourself.
// ---------------------------------------------------------------------------

export function restPlanet(p) {
  const slug = p.name.toLowerCase();
  return {
    id: slug,
    name: p.name,
    nickname: p.nickname,
    description: `${p.name}, ${p.nickname.toLowerCase()}, is a planet in the Solar System orbiting at ${p.distanceFromSunAU} AU. ${p.funFact}`,
    color: p.color,
    type: p.diameterKm > 20000 ? 'gas_giant' : 'terrestrial',
    physical: {
      diameterKm: p.diameterKm,
      radiusKm: Math.round(p.diameterKm / 2),
      massKg: '5.97e24',
      gravityMs2: 9.81,
      escapeVelocityKms: 11.2,
      density: 5.51,
      albedo: 0.3,
    },
    orbit: {
      distanceFromSunAU: p.distanceFromSunAU,
      distanceFromSunKm: Math.round(p.distanceFromSunAU * 149597870),
      periodDays: Math.round(365.25 * Math.pow(p.distanceFromSunAU, 1.5)),
      eccentricity: 0.0167,
      inclinationDeg: 0.0,
      dayLengthHours: p.dayLengthHours,
    },
    atmosphere: {
      surfacePressureBar: 1.0,
      composition: ['N2', 'O2', 'Ar', 'CO2'],
      averageTemperatureC: p.temperatureC,
      minTemperatureC: p.temperatureC - 40,
      maxTemperatureC: p.temperatureC + 40,
    },
    discovery: { discoveredBy: 'Ancient astronomers', year: null, method: 'naked eye' },
    missions: ['Mariner', 'Voyager 1', 'Voyager 2', 'New Horizons', 'James Webb'],
    images: {
      thumbnail: `https://cdn.missioncontrol.space/${slug}/thumb.jpg`,
      medium: `https://cdn.missioncontrol.space/${slug}/medium.jpg`,
      large: `https://cdn.missioncontrol.space/${slug}/large.jpg`,
      hero: `https://cdn.missioncontrol.space/${slug}/hero.jpg`,
    },
    tags: ['planet', 'solar-system', p.diameterKm > 20000 ? 'giant' : 'rocky', 'nasa-approved'],
    funFact: p.funFact,
    moonCount: p.moons.length,
    // REST doesn't embed the moons. It gives you links, so you go fetch them yourself.
    moons: p.moons.map((m) => `/api/moons/${m.name.toLowerCase()}`),
    createdAt: '-4.5e9',
    updatedAt: '2026-09-01T09:41:00Z',
    _links: { self: `/api/planets/${slug}`, all: '/api/planets' },
  };
}

export function restMoon(m) {
  const slug = m.name.toLowerCase();
  return {
    id: slug,
    name: m.name,
    planet: m.planet,
    physical: { diameterKm: m.diameterKm, radiusKm: Math.round(m.diameterKm / 2), massKg: '7.3e22' },
    orbit: { periodDays: 27.3, distanceKm: 384400 },
    discovery: { discoveredBy: 'Someone with a telescope', year: 1877 },
    images: { thumbnail: `https://cdn.missioncontrol.space/moons/${slug}/thumb.jpg` },
    _links: { self: `/api/moons/${slug}`, planet: `/api/planets/${m.planet.toLowerCase()}` },
  };
}
