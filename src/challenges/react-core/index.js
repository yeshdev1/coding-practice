import reactCoreChallenges from './data';

let built = false;
let slugIndex;
let idIndex;

function buildIndexes() {
  if (built) return;
  slugIndex = new Map();
  idIndex = new Map();
  reactCoreChallenges.forEach((challenge) => {
    slugIndex.set(challenge.slug, challenge);
    idIndex.set(challenge.id, challenge);
  });
  built = true;
}

export function getAllReactCoreChallenges() {
  buildIndexes();
  return reactCoreChallenges;
}

export function getReactCoreChallengeBySlug(slug) {
  buildIndexes();
  return slugIndex.get(slug);
}

export function getReactCoreChallengeById(id) {
  buildIndexes();
  return idIndex.get(id);
}

export { reactCoreChallenges };

