import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth, signInAnonymously } from 'firebase/auth'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const firebaseEnabled = Boolean(config.apiKey && config.databaseURL)

let db = null
let auth = null

if (firebaseEnabled) {
  const app = initializeApp(config)
  db = getDatabase(app)
  auth = getAuth(app)
}

let authReady = null

export function ensureAuth() {
  if (!firebaseEnabled) return Promise.reject(new Error('Pairing isn’t configured yet.'))
  if (!authReady) {
    authReady = signInAnonymously(auth).then(cred => cred.user)
  }
  return authReady
}

export { db }
