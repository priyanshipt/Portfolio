// Tiny in-memory cache. Good enough for a single Railway instance.
const store = new Map();

export function getFresh(key) {
  const hit = store.get(key);
  return hit && hit.expiresAt > Date.now() ? hit.value : null;
}

// Returns the last value even if it has expired (used when GitHub is down).
export function getStale(key) {
  const hit = store.get(key);
  return hit ? hit.value : null;
}

export function set(key, value, ttlMs) {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
}
