# EchoSpace — Reimagine Social

> **A social network without a feed.** Discover ideas spatially, grow them together, connect thoughts across branches, and build identity from what you contribute.

EchoSpace is a frontend-only prototype for the **REIMAGINE SOCIAL** challenge. It deliberately removes the familiar social primitives of infinite feeds, likes, follower counts and engagement ranking and replaces them with a new primitive: **the living idea-space**.

## Why this is different

Most social products optimize for broadcasting and reaction. EchoSpace optimizes for **co-creation**.

| Familiar social primitive | EchoSpace replacement |
|---|---|
| Infinite feed | **Orbit** — spatial discovery |
| Post | **Thought node** — a contribution inside an idea-space |
| Comment/reply | **Branch** — grow directly from another thought |
| Like/reaction count | **No public popularity metric** |
| Followers | **Resonance** — private shared creative history |
| Profile | **Trail** — the places and ideas you changed |
| Trending | **Growth + spatial proximity**, never a leaderboard |
| DM-first presence | **Drift** — quiet co-presence inside a constellation |

The product thesis is simple: **people can connect by changing an idea together, not only by reacting to a person.**

## Core experience

### 1. Orbit — discover a place, not a post

The home screen is a navigable sky. Each constellation represents a shared topic or invitation. Its visual scale reflects how much the idea has grown, not how popular a person is.

Orbit includes:
- spatial constellation discovery
- search across titles, prompts and thoughts
- reflective / creative / everyday filters
- live idea, thought and voice counts
- featured entry point
- starter prompts for different participation styles
- quiet live-activity stream
- responsive mobile layout

### 2. Constellation — the conversation is the shape

A constellation is a shared idea-space. A person can select a thought and **grow a branch** from it. The map draws ancestry between contributions and the accessible Thread List exposes the same relationships linearly.

The prototype also supports a second interaction: **Connect two thoughts**. Pick two existing nodes and add a contribution that bridges both. This creates a social action that is not a conventional comment, like or repost.

### 3. Drift — presence without pressure

When someone enters a constellation, a quiet presence signal shows other people who are currently drifting through the same space. It is deliberately not a notification count or popularity metric.

### 4. Resonance — connection as history

Resonance is private. It is derived from shared constellations and direct thought connections. It answers: **“Who have I actually built something with?”** rather than “Who has the most followers?”

There is no public leaderboard and no follower graph.

### 5. Trail — identity as contribution

The Trail records the thoughts a person planted, the constellations they changed and the branches they grew. It is a contribution history rather than a vanity-metric profile.

## Primary user flow

```text
Orbit
  ↓
Discover a constellation
  ↓
Select a thought
  ↓
Grow from it OR connect two thoughts
  ↓
Your branch becomes part of the shared map
  ↓
Resonance records the shared creative history
  ↓
Trail records what you changed
```

## Content system

EchoSpace treats content as a graph rather than a timeline.

Each contribution has:
- author
- text
- creation time
- zero or more parent connections
- a constellation context

This creates three useful content states:

1. **Seed** — the first thought that starts a space.
2. **Branch** — a thought grown from one existing idea.
3. **Bridge** — a thought connected to two ideas, creating a new relationship.

This is the core content mechanic behind the interface.

## Visual language

The interface uses a **quiet astronomical / editorial** visual system rather than a generic social-media card grid.

- **Mint** — active participation and live presence
- **Violet** — connection and ancestry
- **Warm white** — authored thought
- **Muted slate** — supporting information
- orbital rings, constellation lines and subtle depth create spatial hierarchy
- motion is restrained and disabled under `prefers-reduced-motion`

The spatial map is always paired with a semantic list alternative so the visual metaphor never becomes the only way to understand content.

## Accessibility

Accessibility is part of the interaction model, not an afterthought.

- semantic `header`, `nav`, `main`, lists and buttons
- skip-to-content link
- visible keyboard focus states
- descriptive ARIA labels
- equivalent Map / Thread List representation
- real labels for all form controls
- `role="alert"` validation errors
- polite live-region presence updates
- focus-trapped modal dialogs
- Escape-to-close dialogs
- restored focus after modal close
- reduced-motion support
- no clickable `div` controls

## Performance and resilience

- React Router routes are lazy-loaded with `React.lazy` / `Suspense`.
- Derived resonance, trail and layout calculations are memoized.
- Constellation positions use a deterministic layout rather than a continuously running physics simulation.
- Visual-heavy sections use containment/content-visibility hints.
- No external API calls are required for the demo.
- LocalStorage persistence keeps the prototype state after refresh.
- User text is sanitized before entering application state.
- Route IDs are validated before lookup.
- An application-level error boundary prevents a blank page after an unexpected render failure.
- Unused starter assets are removed from the production source tree.

## Architecture

```text
src/
├── App.jsx                     # shell, routing, error boundary
├── main.jsx
├── index.css                   # design system + responsive visual language
├── components/
│   ├── Avatar.jsx
│   ├── ComposeModal.jsx
│   ├── ConstellationCanvas.jsx
│   ├── Icon.jsx
│   ├── NavBar.jsx
│   ├── NewConstellationModal.jsx
│   ├── NodeCard.jsx
│   ├── OrbitField.jsx
│   ├── PresenceBar.jsx
│   ├── ResonanceMeter.jsx
│   └── SkipLink.jsx
├── context/
│   └── AppContext.jsx           # state, persistence and derived social data
├── data/
│   └── mockData.js              # rich demo content
├── hooks/
│   └── useFocusTrap.js
├── pages/
│   ├── OrbitPage.jsx
│   ├── ConstellationPage.jsx
│   ├── ResonancePage.jsx
│   ├── TrailPage.jsx
│   └── NotFoundPage.jsx
├── utils/
│   ├── layout.js
│   ├── resonance.js
│   └── sanitize.js
└── tests/
    ├── App.test.jsx
    ├── ComposeModal.test.jsx
    ├── layout.test.js
    ├── resonance.test.js
    ├── sanitize.test.js
    └── setup.js
```

## Technology

- React 19
- Vite 8
- React Router 7
- Tailwind CSS v4
- Vitest + Testing Library
- LocalStorage for persistence
- No backend required
- No external network calls

## Validation and testing

```bash
npm install
npm run dev
npm run build
npm test
npm run lint
```

The repository includes component and utility tests covering routing, modal behavior, input sanitization, deterministic layout and Resonance calculations.

## Deployment

The project is a Vite SPA and includes `vercel.json` so direct navigation to routes such as `/constellation/c_unsent`, `/resonance` and `/trail` is handled correctly by the deployment platform.

## Challenge alignment checklist

- [x] Original social interaction concept
- [x] No conventional infinite feed
- [x] No likes / follower graph / popularity ranking
- [x] Unique spatial discovery model
- [x] Unique branch and two-thought bridge interactions
- [x] Distinctive visual language
- [x] Thoughtful graph-based content system
- [x] New connection model through Resonance
- [x] Personal identity through Trail
- [x] Live co-presence through Drift
- [x] Responsive desktop / tablet / mobile experience
- [x] Accessible semantic alternative to the visual map
- [x] Persistent interactive prototype
- [x] Tested utilities and core interactions

## Product statement

> **EchoSpace turns social interaction from “watch and react” into “enter and change.”**

The goal is not to make another feed. It is to make a social space where an idea can outgrow the person who started it.
