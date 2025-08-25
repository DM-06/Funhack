// Deterministic Paw-Kundli Generator for Pawfect Match
// This is the exact implementation as specified in the requirements

// Deterministic helper (simple xorshift32 PRNG)
function xorshift32(seed: number) {
  let x = seed >>> 0;
  return function() {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967295;
  };
}

function hashStringToInt(s: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

function mapToPawSign(n: number) {
  const signs = ["Golden Retriever", "Alley-Cat", "Regal Parrot", "Silent Snoozer", "Zoomie Comet", "Majestic Mutt", "Purring Oracle", "Sock Thief", "Couch Potato", "Tiny Terror", "Nap King/Queen", "Royal Tail"];
  return signs[n % signs.length];
}

export interface Pet {
  name: string;
  species: string;
  birthday: string; // YYYY-MM-DD format
  photoId?: string;
  photo?: string; // Actual image URL
  favorite_snack_score?: number;
  fluff_level?: number;
  snooze_level?: number;
  bio?: string;
  owner_name?: string;
  funnyQuirks?: string[]; // Array of funny characteristics
}

export interface PawKundliResult {
  compatibilityScore: number;
  pawSignA: string;
  pawSignB: string;
  bestWeddingDate: string;
  shortHoroscope: string;
}

export function generatePawKundli(petA: Pet, petB: Pet): PawKundliResult {
  // inputs: pet object {name, species, birthday (YYYY-MM-DD), photoId (string), favorite_snack_score}
  const seedStr = (petA.photoId || petA.name) + petA.birthday + (petB.photoId || petB.name) + petB.birthday;
  const seed = hashStringToInt(seedStr);
  const rnd = xorshift32(seed);

  // base compatibility
  let score = 50;
  if (petA.species === petB.species) score += 10;
  const snackDiff = Math.abs((petA.favorite_snack_score||5) - (petB.favorite_snack_score||5));
  score -= snackDiff * 3;
  // personality quirk adjustment (simulate)
  const quirks = (petA.fluff_level||5) - (petB.fluff_level||5);
  score += Math.max(-10, Math.min(10, -quirks)); // small effect

  // add pseudo-randomness
  score += Math.floor(rnd() * 41); // 0..40
  score = Math.max(0, Math.min(100, Math.round(score)));

  // paw signs
  const pawSignA = mapToPawSign(hashStringToInt(petA.name + petA.birthday));
  const pawSignB = mapToPawSign(hashStringToInt(petB.name + petB.birthday));

  // bestWeddingDate: today + (score % 30) days at hour (score * 3) % 24
  const today = new Date();
  const daysToAdd = score % 30;
  const hour = (score * 3) % 24;
  const bestDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysToAdd, hour, 0, 0);

  // short horoscope (funny)
  const horoscopes = [
    "Bring snacks. Very important.",
    "Avoid the vacuum between 3-4 PM.",
    "Full moon: zoomies likely; plan accordingly.",
    "Belly rubs increase long-term compatibility.",
    "Hide socks before the ceremony for safety."
  ];
  const shortHoroscope = [
    `Compatibility: ${score}/100 — ${score > 75 ? "Highly Pawfect" : score > 45 ? "Promising" : "Proceed with treats"}.`,
    `Auspicious signs: ${pawSignA} & ${pawSignB}.`,
    `${horoscopes[hashStringToInt(seedStr) % horoscopes.length]}`
  ].join(" ");

  return {
    compatibilityScore: score,
    pawSignA,
    pawSignB,
    bestWeddingDate: bestDate.toISOString(),
    shortHoroscope
  };
}