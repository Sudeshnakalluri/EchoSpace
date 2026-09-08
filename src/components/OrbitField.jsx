import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * The Orbit: a galaxy of active constellations, sized by how much has
 * grown inside them and positioned in concentric rings rather than a
 * ranked, scrollable list. This is the discovery surface — there is no
 * algorithmic ranking by engagement, just spatial proximity.
 */
function OrbitField({ constellations }) {
  const navigate = useNavigate();

  const placed = useMemo(() => {
    const rings = [1, 2, 3];
    return constellations.map((c, i) => {
      const ring = rings[i % rings.length];
      const perRing = Math.ceil(constellations.length / rings.length) || 1;
      const indexInRing = Math.floor(i / rings.length);
      const angle = (indexInRing / perRing) * 360 + ring * 35 + i * 11;
      const radius = 18 + ring * 24;
      const rad = (angle * Math.PI) / 180;
      const x = 50 + radius * Math.cos(rad);
      const y = 50 + radius * Math.sin(rad) * 0.7;
      const size = Math.min(150, 74 + c.nodes.length * 9);
      return { ...c, x, y, size };
    });
  }, [constellations]);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-2xl select-none"
      role="list"
      aria-label="Active constellations, arranged by activity"
    >
      <div
        className="absolute inset-0 animate-orbit rounded-full opacity-40"
        style={{
          background:
            'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 60px, rgba(157,140,255,0.06) 61px, transparent 62px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_30px_8px_rgba(125,216,198,0.35)]"
        aria-hidden="true"
      />
      {placed.map((c) => (
        <button
          key={c.id}
          role="listitem"
          onClick={() => navigate(`/constellation/${c.id}`)}
          className="focus-ring group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border border-line/70 bg-surface/80 text-center shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-110 hover:border-signal-2/60 animate-drift"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.size,
            height: c.size,
            animationDelay: `${(c.id.length * 137) % 3000}ms`,
          }}
          aria-label={`${c.title}, ${c.nodes.length} connected thoughts. Open constellation.`}
        >
          <span className="px-2 font-display text-sm leading-tight text-bright group-hover:text-signal sm:text-base">
            {c.title}
          </span>
          <span className="text-[11px] text-mist">{c.nodes.length} thoughts</span>
        </button>
      ))}
    </div>
  );
}

export default memo(OrbitField);
