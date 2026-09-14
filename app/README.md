# Rock. Paper. Scissor. Coke.

React + Vite implementation of the mobile microsite mockup in `../project/RPSC Mockup.dc.html`. Nine screens: Landing, Register, Home, Pair, Paired, Upload, Result, Leaderboard, Profile.

## Run it

```
npm install
npm run dev
```

Open on a phone (or a browser with device emulation) — layout is mobile-first, capped at 480px wide.

## What's real vs. simulated

- **QR pairing is real.** The Pair screen generates a real, scannable QR code (via the `qrcode` package) encoding a link like `https://your-app/join/ABCDEF`. Point an actual camera at it — including another phone's own camera app — and it opens the app straight into the pairing flow. The in-app "Scan" tab decodes QR codes live from the camera using `jsqr`. Two real devices sync through Firebase Realtime Database (see setup below).
- **Match results are simulated**, same as the original prototype: the "Upload" screen shows a live camera preview with lid-position guides, but there's no real can-lid image recognition — the winning move is picked randomly when you tap Upload, same odds as rock-paper-scissors.
- **The leaderboard is a dummy.** The three global counters tick up client-side with randomized increments, and the city list is static seed data — there's no real global tally.
- **Instagram / phone auth are cosmetic.** Tapping them just highlights your choice, since there's no OAuth wired up. "Follow on Instagram" is real though — it opens `instagram.com/<handle>` in a new tab, since we do have the opponent's real handle from the paired match.
- **Your profile persists in `localStorage`** (handle, record, match history) so it survives a refresh. There's no server-side account.

## Setting up real QR pairing (Firebase)

Two devices need somewhere to rendezvous when one scans the other's code. This app uses Firebase Realtime Database for that.

1. Create a free project at https://console.firebase.google.com.
2. In the project, enable **Realtime Database** (Build → Realtime Database → Create Database). Start in locked mode; we'll set rules below.
3. Enable **Anonymous** sign-in (Build → Authentication → Sign-in method → Anonymous). The app signs in anonymously just so database rules can require `auth != null`.
4. Add a **Web app** to the project (gear icon → Project settings → Your apps → Add app → Web), and copy the config values shown.
5. Copy `.env.example` to `.env.local` in this folder and fill in the values:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_DATABASE_URL=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
6. Set the Realtime Database rules (Realtime Database → Rules) to:
   ```json
   {
     "rules": {
       "pairings": {
         ".indexOn": ["hostHandle"],
         "$code": {
           ".read": "auth != null",
           ".write": "auth != null"
         }
       }
     }
   }
   ```
7. Restart `npm run dev`. The Pair screen will now generate live, joinable codes. Without this setup, the Pair screen still renders but shows "Live pairing needs Firebase set up" instead of a working code.

Pairing records aren't cleaned up automatically — fine for a demo/prototype, but worth adding a TTL (e.g. a scheduled Cloud Function) before any real production use.

## Deploying

`npm run build` produces a static `dist/` bundle — deploy it anywhere that serves static files (Vercel, Netlify, Firebase Hosting, etc). Because `/join/:code` needs to work as a direct deep link (someone's camera app opening that URL fresh), make sure your host rewrites unknown paths to `index.html` (SPA fallback).

If your host can't do SPA fallback rewrites (e.g. a plain static file bucket, or an embedded preview), set `VITE_USE_HASH_ROUTER=true` when building. Routes become `#/join/ABC123` instead of `/join/ABC123`, which never hits the server as a new path, so no rewrite rule is needed.
