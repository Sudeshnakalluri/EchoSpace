import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import OrbitField from '../components/OrbitField.jsx';
import NewConstellationModal from '../components/NewConstellationModal.jsx';

export default function OrbitPage() {
  const { constellations, addConstellation } = useApp();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:items-start lg:gap-10">
      <div className="lg:w-1/3 lg:sticky lg:top-24">
        <p className="text-xs font-medium uppercase tracking-widest text-signal">Orbit</p>
        <h1 className="mt-2 font-display text-3xl leading-tight text-bright sm:text-4xl">
          No feed. Just what's alive right now.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-fog">
          Each point of light is a constellation — a living map of thoughts that people are growing
          together. Nothing here is ranked by engagement. Size reflects how much has grown, not how
          many people liked it.
        </p>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-signal-2 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-signal-2/20 hover:brightness-110"
        >
          <span aria-hidden="true">✦</span> Start a constellation
        </button>
      </div>

      <div className="lg:w-2/3">
        <OrbitField constellations={constellations} />
      </div>

      <NewConstellationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(title, prompt, seed) => {
          const result = addConstellation(title, prompt, seed);
          if (result.ok) setModalOpen(false);
          return result;
        }}
      />
    </div>
  );
}
