import Avatar from './Avatar.jsx';

/**
 * Replaces "follower count" with a qualitative measure of shared creative
 * history: how many constellations you've both grown, and how many times
 * your thoughts were directly connected. No public ranking, no vanity
 * number — just a private sense of who you've actually built things with.
 */
export default function ResonanceMeter({ entry }) {
  const { user, sharedConstellations, sharedThreads, score } = entry;
  const label =
    score === 0
      ? 'Not yet crossed paths'
      : score < 30
        ? 'A few overlapping thoughts'
        : score < 65
          ? 'Building something together'
          : 'Deeply intertwined';

  return (
    <li className="flex items-center gap-3 rounded-2xl border border-line/60 bg-surface/70 p-3">
      <Avatar user={user} size={40} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate font-medium text-bright">{user.name}</p>
          <span className="shrink-0 text-xs text-mist">{label}</span>
        </div>
        <p className="mt-0.5 truncate text-xs text-mist">{user.bio}</p>
        <div
          className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-void-2"
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Resonance with ${user.name}: ${label}`}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-signal to-signal-2 transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="mt-1 text-[11px] text-mist">
          {sharedConstellations} shared constellation{sharedConstellations === 1 ? '' : 's'} · {sharedThreads} connected thread
          {sharedThreads === 1 ? '' : 's'}
        </p>
      </div>
    </li>
  );
}
