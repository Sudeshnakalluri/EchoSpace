import { useApp } from '../context/AppContext.jsx';
import ResonanceMeter from '../components/ResonanceMeter.jsx';

export default function ResonancePage() {
  const { resonance } = useApp();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-widest text-signal">Resonance</p>
      <h1 className="mt-2 font-display text-3xl text-bright">Who you've actually built with</h1>
      <p className="mt-3 text-sm leading-relaxed text-fog">
        No followers, no follower counts to chase. This is a private view of shared creative history —
        constellations you've both grown, and thoughts that connected directly to yours.
      </p>

      <ul className="mt-6 flex flex-col gap-3">
        {resonance.map((entry) => (
          <ResonanceMeter key={entry.user.id} entry={entry} />
        ))}
      </ul>
    </div>
  );
}
