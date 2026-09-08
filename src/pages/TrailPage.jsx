import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'moments ago';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function TrailPage() {
  const { myTrail, constellations, currentUser } = useApp();
  const touchedConstellations = new Set(myTrail.map((n) => n.constellationId)).size;
  const connectedThreads = myTrail.filter((n) => n.connections.length > 0).length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-widest text-signal">Your Trail</p>
      <h1 className="mt-2 font-display text-3xl text-bright">{currentUser.name}'s trail</h1>
      <p className="mt-3 text-sm leading-relaxed text-fog">
        Your journey isn't a profile with a follower count — it's the trail of thoughts you've planted
        and grown across constellations.
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-line/60 bg-surface/70 p-4">
          <dt className="text-xs text-mist">Thoughts planted</dt>
          <dd className="mt-1 font-display text-2xl text-bright">{myTrail.length}</dd>
        </div>
        <div className="rounded-2xl border border-line/60 bg-surface/70 p-4">
          <dt className="text-xs text-mist">Constellations touched</dt>
          <dd className="mt-1 font-display text-2xl text-bright">{touchedConstellations}</dd>
        </div>
        <div className="col-span-2 rounded-2xl border border-line/60 bg-surface/70 p-4">
          <dt className="text-xs text-mist">Threads you connected to something else</dt>
          <dd className="mt-1 font-display text-2xl text-bright">{connectedThreads}</dd>
        </div>
      </dl>

      <h2 className="mt-8 mb-3 text-sm font-semibold text-fog">Timeline</h2>
      {myTrail.length === 0 ? (
        <p className="text-sm text-mist">
          Nothing planted yet.{' '}
          <Link to="/" className="focus-ring underline decoration-dotted">
            Visit the Orbit
          </Link>{' '}
          to grow your first thought.
        </p>
      ) : (
        <ol className="flex flex-col gap-3">
          {myTrail.map((node) => (
            <li key={node.id}>
              <Link
                to={`/constellation/${node.constellationId}`}
                className="focus-ring block rounded-2xl border border-line/60 bg-surface/60 p-3.5 hover:border-signal-2/50"
              >
                <p className="text-xs text-mist">
                  In <span className="text-fog">{constellations.find((c) => c.id === node.constellationId)?.title ?? node.constellationTitle}</span> · {timeAgo(node.createdAt)}
                </p>
                <p className="mt-1 text-sm text-bright">{node.text}</p>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
