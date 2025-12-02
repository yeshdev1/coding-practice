import { backendChallenges } from './data'
import { createSlug } from '../../utils/slug'

// Pre-compute slugs and create index maps for O(1) lookups
let challengesWithSlugs = null
let slugIndex = null
let idIndex = null

function buildIndexes() {
  if (challengesWithSlugs) return // Already built
  
  challengesWithSlugs = backendChallenges.map(challenge => ({
    ...challenge,
    slug: createSlug(challenge.title)
  }))
  
  // Create O(1) lookup maps
  slugIndex = new Map()
  idIndex = new Map()
  
  challengesWithSlugs.forEach(challenge => {
    slugIndex.set(challenge.slug, challenge)
    idIndex.set(challenge.id, challenge)
  })
}

// Initialize indexes on first import
buildIndexes()

// Export optimized accessors
export const getAllChallenges = () => challengesWithSlugs

export const getChallengeBySlug = (slug) => {
  return slugIndex.get(slug) || null
}

export const getChallengeById = (id) => {
  return idIndex.get(id) || null
}

// Export for backward compatibility
export { backendChallenges }

