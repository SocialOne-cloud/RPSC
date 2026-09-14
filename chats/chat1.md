# Rock Paper Scissor Coke

_Started 2026-09-13 18:41 UTC_

---

## User

Build a mobile-first web app mockup for ROCK. PAPER. SCISSOR. COKE., the microsite people land on after scanning the QR code on a Coca-Cola can. Design it at phone width, roughly 390px, as a single scrollable prototype with multiple screens shown one after another down the page, each labelled so it can be presented as a flow.

Visual direction: Coke Red 
#F40009 as the dominant colour, black 
#1E1E1E, white. Montserrat, heavy weights for numbers and headlines. Full-bleed red screens, big type, flat colour, no gradients or drop shadows. Chunky full-width buttons. It should feel fast and physical, like the can, not like a corporate app.

Screens to build, in order:

1. Landing. Red. The name stacked in four lines. One line beneath: "Scan your opponent. Play. Log the win." Two buttons: Create profile, and I already have one.

2. Register. White. Two large buttons, Continue with Instagram and Continue with mobile number. Below them a single field to choose a handle, with a small line noting handles are public on the leaderboard.

3. Home. Red. The user's handle and profile picture at top. Their record shown as three big numbers: wins, losses, current streak. One dominant full-width button reading START A MATCH. Below it, a small strip showing their last three opponents as profile pictures.

4. Pair. Split into two tabs. Tab one shows the user's own large QR code with the line "Let them scan you." Tab two is a camera view placeholder with the line "Scan your opponent." Beneath, a small text fallback link reading "Enter their handle instead."

5. Paired. Red. Two profile pictures side by side with a VS between them, both handles below. One line: "Now play it on the cans." Button reading We're done, log the result.

6. Upload the cheers. White. A large square camera placeholder with two can lids illustrated as a faint outline guide inside it. Line above: "Both lids in frame." Button: Upload.

7. Result. Red. Big winner handle, the two icons that were thrown shown large side by side, and a line stating what beat what. Two buttons: Rematch, and Follow your opponent on Instagram.

8. Leaderboard. Black. At the top, three enormous live counters stacked or side by side labelled ROCK, PAPER, SCISSOR, each with a large number and a percentage, showing what the world is throwing right now. Below that, a ranked list of cities with match counts. Below that, a compact personal card showing the user's own record and most-thrown move.

Keep navigation to a simple bottom bar with three items: Play, Leaderboard, Profile.

Every screen should be usable one-handed, since the other hand is holding a can.

## Assistant

_[tool: list_files]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

## User

nice make this functional

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

