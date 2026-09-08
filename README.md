# EchoSpace — Reimagine Social

A social experience with no feed, no likes, and no follower counts.

## The concept

Every mainstream platform is built on the same primitives: an infinite
ranked feed, a like button, a follower count, short-form posts optimized
for a scroll. EchoSpace throws all four out and asks a different question:
**what if social platforms rewarded building something together instead of
broadcasting to an audience?**

- **Constellations**, not posts. A constellation is a living idea-map —
  a shared prompt ("Small Rituals," "Unsent Messages") that anyone can grow
  by adding a *node*: a thought connected to an existing one, or a new
  branch. There is no single author and no chronological order — the shape
  of the constellation *is* the content.
- **Orbit**, not a feed. Discovery is a galaxy view where constellations
  are sized by how much has genuinely grown inside them, not by engagement
  metrics. There is no algorithmic ranking to game.
- **Resonance**, not followers. Instead of a public follower count,
  EchoSpace privately shows *you* how much shared creative history exists
  between you and someone else — constellations you've both grown, threads
  that connect your thoughts to theirs. It's not rankable, not gameable,
  and never shown to anyone but you.
- **Drift**, not DMs-first. Ambient, quiet presence indicators show who
  else is currently exploring a constellation with you — a sense of
  co-presence instead of a notification to respond to.
- **Trail**, not a profile. Your identity is the trail of thoughts you've
  planted, not a bio-plus-metrics page.

Nothing here is a reskin of an existing platform's mechanics — there is no
timeline, no like button, no follower graph, and no short-form video
concept anywhere in the app.

## Tech stack

- **React 19 + Vite 8** — component architecture, fast dev/build.
- **React Router 7** — client-side routing (`/`, `/constellation/:id`,
  `/resonance`, `/trail`).
- **Tailwind CSS v4** — utility-first styling via a custom design-token
  theme (see `src/index.css`), no default-template look.
- **Vitest + Testing Library** — unit and component tests.
- **No backend.** All data is mock/seeded (`src/data/mockData.js`) and
  persisted locally via `localStorage`, per the challenge rules.

## Architecture

\`\`\`
src/
  components/     Presentational + interactive UI (Avatar, NodeCard,
                   ConstellationCanvas, ComposeModal, ResonanceMeter, ...)
  pages/          Route-level screens, lazy-loaded for code-splitting
  context/        AppContext — single source of app state, localStorage
                   persistence, and derived data (resonance, trail)
  utils/          Pure, framework-free functions:
                     - sanitize.js   input sanitization / validation
                     - layout.js     deterministic spiral node layout
                     - resonance.js  resonance scoring algorithm
  hooks/          useFocusTrap — accessible modal focus management
  data/           Seed/mock content
  tests/          Vitest unit + component tests
\`\`\`

## Security & data sanitization

- All user-entered text passes through sanitizers before entering state:
  HTML tags stripped, control/zero-width characters removed, whitespace
  collapsed, length capped per field.
- IDs are validated before being used to look up data (e.g. an unknown
  constellation id in the URL redirects home instead of trusting it).
- No `dangerouslySetInnerHTML` anywhere. No external network calls.

## Accessibility

- Skip link, semantic landmarks, labeled primary navigation.
- Every interactive element is a real `<button>`/`<a>` with descriptive
  `aria-label`s — no clickable `<div>`s.
- The constellation canvas has a **List view** toggle: the same nodes as
  a linear, screen-reader-friendly ordered list with explicit "grown
  from" references, so keyboard/AT users get an equivalent experience.
- Modals use `role="dialog"`, a real focus trap, Escape-to-close, and
  focus restoration.
- Respects `prefers-reduced-motion`.

## Performance

- Routes are code-split with `React.lazy` + `Suspense`.
- Node layout is a pure O(1) function per node (golden-angle spiral)
  instead of a physics simulation.
- Derived data (resonance, trail, layout) is memoized.

## Testing

\`\`\`
npm test
\`\`\`

29 tests across sanitization, layout math, resonance scoring, modal
behavior, and routing.

## Running it

\`\`\`bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
npm test          # run the test suite
npm run lint      # oxlint
\`\`\`

## Live demo

[Add your deployed URL here once you push to Vercel/Netlify]

## Screenshots

[Add 2-3 screenshots here — Orbit view, a Constellation open, Resonance page]
