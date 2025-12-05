import cssChallenges from './data';

let built = false;
let slugIndex;
let idIndex;

function buildIndexes() {
  if (built) return;
  slugIndex = new Map();
  idIndex = new Map();
  cssChallenges.forEach((c) => {
    slugIndex.set(c.slug, c);
    idIndex.set(c.id, c);
  });
  built = true;
}

export function getAllCssChallenges() {
  buildIndexes();
  return cssChallenges;
}

export function getCssChallengeBySlug(slug) {
  buildIndexes();
  return slugIndex.get(slug);
}

export function getCssChallengeById(id) {
  buildIndexes();
  return idIndex.get(id);
}

export { cssChallenges };

