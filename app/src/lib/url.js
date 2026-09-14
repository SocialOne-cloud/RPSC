export const usesHashRouter = import.meta.env.VITE_USE_HASH_ROUTER === 'true'

export function buildJoinUrl(code) {
  const base = window.location.origin + window.location.pathname
  return usesHashRouter ? `${base}#/join/${code}` : `${base.replace(/\/$/, '')}/join/${code}`
}
