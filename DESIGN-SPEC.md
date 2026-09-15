# Handoff: Rock Paper Scissor Coke

Project name: **Design: Rock Paper Scissor Coke**

## Overview

A mobile-first web microsite people land on after scanning a QR code on a Coca-Cola can. Two players pair by scanning each other, play rock/paper/scissor physically with the cans in hand, then photograph both can lids to log the result. Wins feed a personal record and a global live leaderboard.

Eight screens: Landing, Register, Home, Pair (2 tabs), Paired, Upload the cheers, Result, Leaderboard. Plus a Profile view in the interactive prototype. Navigation is a fixed three-item bottom bar: Play, Leaderboard, Profile.

Design constraint that drove everything: **every screen is usable one-handed** — the other hand is holding a can. Primary actions are full-width, bottom-anchored, and at least 60px tall.

## About the Design Files

The files in `design/` are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly. The task is to **recreate these designs in the target codebase's existing environment** (React, Vue, SwiftUI, native, etc.) using its established patterns, component library, and styling approach. If no environment exists yet, choose the most appropriate framework for a mobile web microsite and implement the designs there.

The HTML uses a proprietary design-component runtime (`support.js`, `doc-page.js`) — do not port that runtime. Read the markup and inline styles for layout and values only.

## Fidelity

**High-fidelity.** Colors, typography, spacing, copy, and interaction states are final. Recreate the UI pixel-perfectly at 390px logical width, then let it scale fluidly to real device widths (320–430px). The design is intentionally flat: no gradients, no drop shadows, no rounded corners except the circular hand icons and profile avatars.

## Screens / Views

All screens are 390 × 844 logical px, `overflow: hidden`, flex column. Horizontal padding is 20px unless stated. The bottom nav (below) occupies the last ~72px on Home, Result, Leaderboard, and Profile; Landing, Register, Pair, Paired, and Upload have no nav.

### 1. Landing (red)

Purpose: the first thing seen after the can scan; route to signup or login.

Layout: flex column, `justify-content: space-between`, padding `56px 20px 28px`.

- **Logotype block** (top, flush left)
  - Three lines "ROCK." / "PAPER." / "SCISSOR." — Cheltenham Extra Condensed Bold, 62px, line-height 0.84, letter-spacing 0.005em, uppercase, `#FFFFFF`.
  - "Coke" wordmark image directly beneath, flush to the same left edge, width 152px, `margin-top: 10px`. Asset: `assets/coke-tight.png` (white, transparent background, alpha-cropped to its ink bounds so it aligns flush left).
- **Icon triangle** (middle, horizontally centered)
  - Rock on top; Paper and Scissor below it in a row, `gap: 14px`, column `gap: 14px`.
  - Each icon 104 × 104px, `border-radius: 50%`, `box-shadow: inset 0 0 0 2px #FFFFFF` (white ring), `object-fit: cover`. Assets: `assets/rock.png`, `paper.png`, `scissor.png` — red discs with white hand glyphs, so the disc reads as part of the red ground and only the ring and hand show.
- **Bottom block**
  - Line: "Scan your opponent. Play. Log the win." — Poppins 700, 15px, line-height 1.4, white, `margin-bottom: 12px`.
  - Primary button: "CREATE PROFILE" + right-arrow icon (20px, stroke 2.5) — white fill, `#1E1E1E` text.
  - Secondary button: "I ALREADY HAVE ONE" — transparent fill, `inset 0 0 0 2px #FFFFFF` border, white text.
  - Buttons stack with `gap: 12px`.

### 2. Register (white)

Purpose: authenticate and claim a public handle.

Layout: flex column, padding `56px 20px 28px`, `gap: 26px`.

- Heading "GET / IN." — Poppins 900, 38px, line-height 0.9, letter-spacing −0.035em, uppercase, `#1E1E1E`.
- Two full-width buttons, `gap: 12px`, fill `#1E1E1E`, white text, trailing 22px icon: "CONTINUE WITH INSTAGRAM" (Instagram glyph), "CONTINUE WITH MOBILE NUMBER" (phone glyph). Selected/active state fills `#F40009`.
- 2px `#1E1E1E` divider.
- Handle field: label "CHOOSE A HANDLE" (11px, 800, letter-spacing 0.16em, uppercase, `#F40009`); input with `inset 0 0 0 2px #1E1E1E`, 20px padding, 22px/800 text, placeholder "@". Typed value is normalized to always start with `@`.
- Helper line: "Handles are public on the leaderboard." — 12px, 600, `#6B6664`.
- Bottom primary: "LOCK IT IN" — `#F40009` fill, white text, 20px label, `padding: 28px 20px`.

### 3. Home (red)

Purpose: see your record and start a match.

Layout: flex column, padding `44px 20px 24px`, `gap: 30px`, nav pinned bottom.

- **Identity row**: 56 × 56px square avatar, `#1E1E1E` fill, white initial (22px/900), 14px gap; handle (22px/900, letter-spacing −0.02em) over meta line "LAGOS · SINCE MAR 26" (11px, 800, 0.14em, uppercase, 85% opacity).
- **Record**: 3-column grid, 2px white rules top and bottom, 2px white inset rule between cells (`inset 2px 0 0 #FFFFFF`), cell padding `18px 0 20px` (left cells add 16px left padding). Each cell: number 54px/800, line-height 0.85, tabular numerals, letter-spacing −0.04em; label 10px, 800, 0.16em, uppercase. Values: Wins `14`, Losses `09`, Streak `3` (wins/losses zero-padded to 2 digits).
- **Primary**: "START A MATCH" + 28px arrow — white fill, `#F40009` text, 27px label, `padding: 34px 20px`, letter-spacing −0.02em. This is the single dominant target on the screen.
- **Last three opponents**: label "LAST THREE OPPONENTS" (10px, 800, 0.16em) over a row of three 44 × 44px `#1E1E1E` squares with white initials (15px/900), `gap: 8px`.

### 4. Pair (white, two tabs)

Purpose: pair with the opponent standing in front of you.

Layout: padding `44px 0 28px`; tab bar full-bleed, content padded 20px.

- **Tab bar**: 2-column grid, 2px `#1E1E1E` rules above and below, each tab `padding: 16px 0`, 12px label, 0.14em, uppercase, centered. Active tab: `#1E1E1E` fill, white text. Inactive: white fill, `#1E1E1E` text, `inset 2px 0 0 #1E1E1E` separator. Tabs: "MY CODE", "SCAN".
- **Tab 1 — My code**: heading "LET THEM / SCAN YOU." (32px/900, line-height 0.92, letter-spacing −0.035em, uppercase); QR block in a `inset 0 0 0 2px #1E1E1E` box with 18–22px padding, QR rendered as a 21 × 21 grid of `#1E1E1E` cells on transparent ground (replace with a real QR encoder in production — payload is the user's pairing token); footer row with handle (18px/900) left and "CODE LIVE 2:00" (11px, 800, 0.14em, `#F40009`) right, counting down from 120s.
- **Tab 2 — Scan**: heading "SCAN YOUR / OPPONENT."; square (`aspect-ratio: 1`) camera viewport, `#1E1E1E` fill, centered 62% square reticle with `inset 0 0 0 2px rgba(255,255,255,0.35)`, label "CAMERA" bottom-left (10px, 800, 0.16em, `rgba(255,255,255,0.75)`). Production: live rear-camera stream with QR detection.
- **Fallback**: bottom-left text link "Enter their handle instead" — 14px/800, underlined, 4px underline offset.

### 5. Paired (red)

Purpose: confirm the pairing and hand the game back to the physical world.

Layout: flex column, `justify-content: space-between`, padding `64px 20px 28px`.

- Kicker "PAIRED" (11px, 800, 0.16em, uppercase).
- VS row: 3-column grid `1fr auto 1fr`, `gap: 12px`, centered. Each avatar is a square (`aspect-ratio: 1`), `#1E1E1E` fill, white initial at 44px/900. Center "VS" at 34px/800, tabular.
- Handle row: same 3-column grid, 2px white rule above, 12px top padding; own handle left-aligned, opponent right-aligned, both 16px/900.
- Bottom: "NOW PLAY IT / ON THE CANS." — 30px/900, line-height 1, letter-spacing −0.03em, uppercase. Button "WE'RE DONE, LOG THE RESULT" + arrow — white fill, `#F40009` text.

### 6. Upload the cheers (white)

Purpose: photograph both can lids as proof of the match.

Layout: flex column, `justify-content: space-between`, padding `56px 20px 28px`.

- Heading "BOTH LIDS / IN FRAME." — 34px/900, line-height 0.92, letter-spacing −0.035em, uppercase.
- Camera square: `aspect-ratio: 1`, `#1E1E1E` fill, two concentric-circle lid guides side by side (`gap: 10px`), each outer circle 34% of width with `2px solid rgba(255,255,255,0.35)` and an inner circle at 42% of the outer, same border. Label "CAMERA" bottom-left as on Pair.
- Helper: "One photo proves the match. We read the lids, not your faces." — 12px/600, `#6B6664`.
- Primary: "UPLOAD" + 24px upload arrow — `#F40009` fill, white text, 22px label, `padding: 30px 20px`. Pressed state swaps the label to "READING LIDS…" for ~700ms, then routes to Result.

### 7. Result (red)

Purpose: declare the winner and convert the match into a follow.

Layout: flex column, padding `48px 20px 24px`, `gap: 24px`, nav pinned bottom.

- Kicker "WINNER" (11px, 800, 0.16em) over the winning handle at 52px/800, line-height 0.88, letter-spacing −0.04em, tabular.
- Throw comparison: 2-column grid, `gap: 10px`, 2px white rules top and bottom, `padding: 22px 0`. Each column: the 104px circular hand icon (same assets and white ring as Landing), then outcome label "WON"/"LOST" (10px/900, 0.16em, uppercase), then "<MOVE> · <HANDLE>" (13px/900, 0.04em, uppercase). Left column is the user, right column the opponent.
- Verdict line: e.g. "ROCK CRUSHED SCISSOR." — 26px/900, line-height 1.05, letter-spacing −0.025em, uppercase. Copy per pair: rock → "Rock crushed scissor.", paper → "Paper covered rock.", scissor → "Scissor cut paper."
- Buttons: "REMATCH" + refresh icon (white fill, `#F40009` text); "FOLLOW @<HANDLE> ON INSTAGRAM" (transparent, 2px white inset border, white text, 15px label). After tapping follow, label becomes "FOLLOWING @<HANDLE>".

### 8. Leaderboard (black `#1E1E1E`)

Purpose: show what the world is throwing right now, then cities, then you.

Layout: flex column, padding `40px 20px 0`, `gap: 18–20px`, nav pinned bottom (nav fill `#000000` on this screen).

- Header row: "THROWN RIGHT NOW" left, "LIVE" right in `#F40009`, both 11px/800, 0.16em, uppercase.
- **Three live counters**: 2px white rule above the group; each row is a grid `40px 1fr auto`, `align-items: center`, `gap: 10px`, `padding: 12px 0`, `border-bottom: 2px solid rgba(255,255,255,0.22)`. Contents: 40px circular hand icon; move name (10px/800, 0.16em, uppercase, `#F40009`) over count (38px/800, line-height 1, tabular, thousands-separated); percentage right-aligned (26px/800, `#F40009`). Seed values: Rock 41,208,663 / 38%, Paper 39,914,502 / 36%, Scissor 28,441,190 / 26%. In the prototype each count increments every second (rock +400–1300, paper +380–1260, scissor +240–940) and percentages recompute from the live total; production should poll or stream real aggregates.
- **City ranking**: label "CITIES · MATCHES TODAY" (10px/800, 0.16em, 65% white). Rows are a grid `28px 1fr auto`, `padding: 9px 0`, `border-bottom: 2px solid rgba(255,255,255,0.16)`: rank (14px/800, `#F40009`, zero-padded), city (14px/800, uppercase), match count (14px/800, tabular). Seed: 01 Mexico City 2,441,908 · 02 Lagos 1,980,552 · 03 Jakarta 1,744,301 · 04 São Paulo 1,602,117 · 05 Manila 1,488,930 · 06 Atlanta 1,203,466.
- **Personal card**: `#F40009` fill, `padding: 16px 18px`, grid `1fr auto`: left = handle (10px/800, 0.16em, uppercase) over record "14–9" (26px/800, line-height 1); right = "MOST THROWN" over e.g. "Paper 52%" (20px/800), right-aligned. Most-thrown is derived from the user's own match history.

### 9. Profile (white) — prototype only

Identity row (64px `#F40009` avatar, 26px/900 initial; handle 24px/900; meta "RECORD 14–9 · STREAK 3"), 2px divider, then a match log: rows of grid `34px 1fr auto` — 34px `#1E1E1E` avatar with initial, "<HANDLE> · <MOVE>" (13px/800, uppercase), outcome "WON"/"LOST" (11px/900, 0.14em, `#F40009`), `border-bottom: 2px solid #E2DFDE`. Bottom button "RESET PROTOTYPE" (`#1E1E1E`, 14px) — prototype affordance only, drop it in production.

### Bottom navigation

3-column grid, one cell per item, `flex: none`. Each cell: column flex, centered, `gap: 6px`, `padding: 20px 0 26px`, 20px filled icon above an 11px/900 label with 0.14em letter-spacing, uppercase. Active cell: `#F40009` fill, white text, full opacity. Inactive: `#1E1E1E` fill (`#000000` on the Leaderboard screen), white text at `opacity: 0.62`. Items: Play (play triangle), Leaderboard (bar chart), Profile (person). Play stays active across the whole match flow (Home, Pair, Paired, Upload, Result).

## Interactions & Behavior

Routing (single-screen-at-a-time state machine):

- Landing → "Create profile" → Register; "I already have one" → Home.
- Register → "Lock it in" → Home. Auth buttons set an `auth` flag and turn `#F40009`; no real OAuth in the prototype.
- Home → "Start a match" → Pair (tab reset to "My code", countdown reset to 120).
- Pair → "Simulate a scan" or "Enter their handle instead" → Paired (assigns a random opponent handle from a pool).
- Paired → "We're done, log the result" → Upload.
- Upload → "Upload" → 700ms "Reading lids…" delay → resolve match → Result.
- Result → "Rematch" → Pair; "Follow …" → sets a `followed` flag and relabels.
- Bottom nav: Play → Home, Leaderboard → Leaderboard, Profile → Profile.

Match resolution: pick the user's move at random from rock/paper/scissor, pick the opponent's at random, and if they tie, force the opponent to the move the user beats (so there is never a draw — the physical game is replayed until someone wins). Winner by standard rules (rock > scissor, paper > rock, scissor > paper). On resolve: increment wins or losses, increment streak on a win or reset it to 0 on a loss, and prepend a record to the match history.

In production the moves come from the uploaded lid photo, not random — the two lid markings are read and mapped to moves; treat the prototype's randomizer as a stand-in for that service response.

Timers: a 1s interval drives both the leaderboard counter increments and the Pair countdown (120 → 0, then wraps to 120).

Transitions are deliberately absent — screens swap instantly. Keep it that way; the design should feel fast and physical, like the can.

Hover/active states (desktop preview only): buttons invert — white buttons go `#1E1E1E` with white text; `#1E1E1E` buttons go `#F40009`; outlined white buttons fill white with `#F40009` text. Focus: `outline: 2px solid #1E1E1E; outline-offset: 2px`.

Responsive: the design is authored at 390px. Scale type and icon sizes fluidly between 320px and 430px; keep the bottom nav pinned, keep primary buttons full-width, never let a primary action fall below 60px tall or above the vertical midpoint of the screen.

## State Management

- `screen`: `landing | register | home | pair | paired | upload | result | board | profile`
- `tab`: `mine | scan` (Pair)
- `handle`, `opp`: strings, always `@`-prefixed
- `auth`: `null | ig | phone`
- `wins`, `losses`, `streak`: integers (seed 14 / 9 / 3)
- `myMove`, `oppMove`: `rock | paper | scissor`; `iWon`: boolean
- `uploading`, `followed`: booleans
- `clock`: integer seconds, 120 → 0
- `history`: array of `{ handle, move, outcome, initial }`, newest first
- `counts`: `{ rock, paper, scissor }` integers for the live counters

Data the real app needs: auth (Instagram OAuth or SMS OTP), handle availability check, pairing token issue/redeem, lid-photo upload plus move recognition, match write, personal record read, global throw aggregates, city ranking.

## Design Tokens

Colors

- Coke Red `#F40009` — dominant ground and accent
- Ink `#1E1E1E` — black ground, avatars, dark buttons
- True black `#000000` — bottom nav on the Leaderboard screen only
- White `#FFFFFF` — type on red, primary button fills
- Muted grey `#6B6664` — helper text on white
- Hairline grey `#E2DFDE` — row rules on white
- White alpha: `rgba(255,255,255,0.35)` camera guides, `0.22` / `0.16` leaderboard rules, `0.62` inactive nav opacity

Typography

- Display: **Cheltenham Extra Condensed Bold** (`assets/cheltenham.otf`) — the "ROCK. PAPER. SCISSOR." logotype only. License it properly before shipping.
- UI: **Poppins** 400/500/600/700/800/900 — everything else.
- Scale (px): 62 logotype · 54 record numbers · 52 winner handle · 38 counters / Register heading · 34 Upload heading · 32 Pair heading · 30 Paired statement · 27 Start a match · 26 verdict / personal record · 22 handle / Upload label · 20 most-thrown · 17 default button label · 15–16 body and handles · 13–14 list rows · 10–12 labels and helper text.
- Label convention: 10–11px, weight 800–900, letter-spacing 0.14–0.16em, uppercase.
- Numbers: weight 800, letter-spacing −0.04em, `font-variant-numeric: tabular-nums`.
- Headlines: weight 900, line-height 0.84–0.92, letter-spacing −0.02 to −0.045em, uppercase.

Spacing — 4px base. Screen padding 20px horizontal, 40–64px top, 24–28px bottom. Block gaps 10 / 12 / 14 / 18 / 20 / 24 / 26 / 30px. Button padding `22px 20px` default, `28–34px 20px` for dominant actions.

Radius — `0` everywhere except `50%` on the hand icons. Avatars are hard squares.

Borders and rules — 2px is the system weight: `inset 0 0 0 2px` for outlined buttons and boxes, `2px solid` for dividers, `inset 2px 0 0` for grid separators. 3px only on the handoff sheet's section rules.

Shadows — none. No elevation anywhere in the design.

## Assets

In `design/assets/`:

- `rock.png`, `paper.png`, `scissor.png` — red discs with white hand glyphs (fist, open palm, two fingers), supplied by the client. Used at 104px on Landing and Result and 40px on the Leaderboard rows, always circular with a 2px white inner ring. Request vector versions for production.
- `coke-tight.png` — white "Coke" script wordmark, transparent background, alpha-cropped to its ink bounds (aspect ratio ≈ 2.81:1) so it can sit flush left under "SCISSOR.". Replace with the official Coca-Cola brand asset and follow Coca-Cola brand guidelines for clear space and minimum size.
- `cheltenham.otf` — the display face used for the logotype.

The QR code and both camera views are placeholders — no assets needed, they become live functionality.

## Files

In `design/`:

- `RPSC Mockup.dc.html` — the primary reference: all eight screens laid out as a printable flow board (cover page plus four spreads of two screens each), every screen at true 390 × 844.
- `interactive-prototype.dc.html` — the earlier tappable prototype: one phone frame, real routing through all nine screens, working match resolution, live counters, and countdown. Best reference for behavior.
- `support.js`, `doc-page.js` — proprietary runtime for the two files above. Not part of the deliverable; do not port.
- `assets/` — the images and font listed above.

Both HTML files need `support.js` beside them to render. Open `RPSC Mockup.dc.html` in a browser to read the flow; open `interactive-prototype.dc.html` to click through it.
