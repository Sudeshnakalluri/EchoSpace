import { useId, useRef, useState } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap.js';

const TITLE_MAX = 60;
const PROMPT_MAX = 140;
const SEED_MAX = 280;

/**
 * Accessible modal for starting a brand-new constellation: a name, an
 * optional prompt/invitation, and a first seed thought. Mirrors the same
 * focus-trap and validation pattern as ComposeModal for consistency.
 */
export default function NewConstellationModal({ isOpen, onClose, onSubmit }) {
  const containerRef = useRef(null);
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [seed, setSeed] = useState('');
  const [error, setError] = useState('');
  const titleHeadingId = useId();
  const titleFieldId = useId();
  const promptFieldId = useId();
  const seedFieldId = useId();

  useFocusTrap(containerRef, isOpen, onClose);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !seed.trim()) {
      setError('A name and a first thought are both needed to start a constellation.');
      return;
    }
    const result = onSubmit(title.trim(), prompt.trim(), seed.trim());
    if (result?.ok === false) {
      setError(result.error ?? 'Something went wrong.');
      return;
    }
    setTitle('');
    setPrompt('');
    setSeed('');
    setError('');
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleHeadingId}
        tabIndex={-1}
        className="w-full max-w-lg rounded-t-3xl border border-line/70 bg-surface p-5 shadow-2xl sm:rounded-3xl sm:p-6"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 id={titleHeadingId} className="font-display text-lg text-bright">
            Start a new constellation
          </h2>
          <button type="button" onClick={onClose} className="focus-ring rounded-full p-1 text-mist hover:text-fog" aria-label="Close dialog">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
          <div>
            <label htmlFor={titleFieldId} className="mb-1.5 block text-sm text-fog">
              Name
            </label>
            <input
              id={titleFieldId}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={TITLE_MAX}
              placeholder="e.g. Things I Learned Too Late"
              className="focus-ring w-full rounded-2xl border border-line/70 bg-void-2 p-3 text-sm text-bright placeholder:text-mist"
            />
          </div>

          <div>
            <label htmlFor={promptFieldId} className="mb-1.5 block text-sm text-fog">
              Invitation <span className="text-mist">(optional)</span>
            </label>
            <input
              id={promptFieldId}
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              maxLength={PROMPT_MAX}
              placeholder="What kind of thought are you hoping to gather?"
              className="focus-ring w-full rounded-2xl border border-line/70 bg-void-2 p-3 text-sm text-bright placeholder:text-mist"
            />
          </div>

          <div>
            <label htmlFor={seedFieldId} className="mb-1.5 block text-sm text-fog">
              First thought
            </label>
            <textarea
              id={seedFieldId}
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              maxLength={SEED_MAX}
              rows={3}
              placeholder="Plant the first node — everything else grows from this."
              className="focus-ring w-full resize-none rounded-2xl border border-line/70 bg-void-2 p-3 text-sm text-bright placeholder:text-mist"
            />
            <span className="mt-1 block text-right text-xs text-mist">{seed.length}/{SEED_MAX}</span>
          </div>

          {error && (
            <p role="alert" className="text-xs text-signal-3">
              {error}
            </p>
          )}

          <div className="mt-1 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="focus-ring rounded-full border border-line/70 px-4 py-2 text-sm text-fog hover:border-mist"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="focus-ring rounded-full bg-signal-2 px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              Set it drifting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
