import Avatar from './Avatar.jsx';

/**
 * Ambient co-presence indicator: shows who is currently drifting through
 * this constellation. Deliberately not a "viewer count" — no number is
 * emphasized, just quiet faces, and it's announced politely to assistive
 * tech via aria-live so it never interrupts.
 */
export default function PresenceBar({ people }) {
  if (!people || people.length === 0) return null;
  const names = people.map((p) => p.name).join(', ');
  return (
    <div
      className="flex items-center gap-2 rounded-full border border-line/60 bg-surface/60 px-3 py-1.5 text-xs text-mist"
      aria-live="polite"
    >
      <span className="flex -space-x-2" aria-hidden="true">
        {people.map((p) => (
          <Avatar key={p.id} user={p} size={22} />
        ))}
      </span>
      <span>
        {people.length === 1 ? `${names} is drifting through this constellation` : `${names} are drifting through this constellation`}
      </span>
    </div>
  );
}
