import { ref, set, get, onValue, update, query, orderByChild, equalTo } from 'firebase/database'
import { db, ensureAuth } from '../firebase'

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function randomCode(len = 6) {
  let out = ''
  for (let i = 0; i < len; i++) out += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
  return out
}

export async function createPairing(handle) {
  await ensureAuth()
  const code = randomCode()
  await set(ref(db, `pairings/${code}`), {
    hostHandle: handle,
    status: 'waiting',
    createdAt: Date.now(),
  })
  return code
}

export function subscribeToPairing(code, cb) {
  const r = ref(db, `pairings/${code}`)
  return onValue(r, snap => cb(snap.val()))
}

export async function joinPairing(code, myHandle) {
  await ensureAuth()
  const r = ref(db, `pairings/${(code || '').toUpperCase()}`)
  const snap = await get(r)
  const data = snap.val()
  if (!data) throw new Error('That code isn’t live. Ask them to reopen their code.')
  if (data.hostHandle === myHandle) throw new Error('That’s your own code.')
  if (data.status === 'paired' && data.guestHandle && data.guestHandle !== myHandle) {
    throw new Error('That match already paired with someone else.')
  }
  await update(r, { guestHandle: myHandle, status: 'paired' })
  return data.hostHandle
}

export async function joinByHandle(hostHandle, myHandle) {
  await ensureAuth()
  const normalized = hostHandle.charAt(0) === '@' ? hostHandle : '@' + hostHandle
  const q = query(ref(db, 'pairings'), orderByChild('hostHandle'), equalTo(normalized))
  const snap = await get(q)
  if (!snap.exists()) throw new Error('No live code for that handle right now.')
  let foundCode = null
  snap.forEach(child => {
    const v = child.val()
    if (v.status === 'waiting') foundCode = child.key
  })
  if (!foundCode) throw new Error('No live code for that handle right now.')
  await update(ref(db, `pairings/${foundCode}`), { guestHandle: myHandle, status: 'paired' })
  return normalized
}

export function parsePairingCode(text) {
  const match = text.match(/\/join\/([A-Za-z0-9]{4,12})/)
  if (match) return match[1].toUpperCase()
  if (/^[A-Za-z0-9]{4,12}$/.test(text.trim())) return text.trim().toUpperCase()
  return null
}
