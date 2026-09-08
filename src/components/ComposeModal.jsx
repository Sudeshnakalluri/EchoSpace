import { useId, useRef, useState } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap.js';

const MAX_LEN = 280;

/**
 * Accessible modal for adding a new thought to a constellation, optionally
 * grown from a selected node. Traps focus, closes on Escape or backdrop
 * click, and returns focus to the triggering control on close.
 */
export default function ComposeModal({ isOpen, onClose, onSubmit, linkedNode }) {
  const containerRef = useRef(null);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const titleId = useId();
  const textareaId = useId();

  useFocusTrap(containerRef, isOpen, onClose);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setError('Say something first — even a fragment counts.');
      return;
    }
    const result = onSubmit(trimmed);
    if (result?.ok === false) {
      setError(result.error ?? 'Something went wrong.');
      return;
    }
    setText('');
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
        aria-labelledby={titleId}
        tabIndex={-1}
        className="w-full max-w-lg rounded-t-3xl border border-line/70 bg-surface p-5 shadow-2xl sm:rounded-3xl sm:p-6"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 id={titleId} className="font-display text-lg text-bright">
            Grow a thought
          </h2>
          <button type="button" onClick={onClose} className="focus-ring rounded-full p-1 text-mist hover:text-fog" aria-label="Close dialog">
            ✕
          </button>
        </div>

        {linkedNode && (
          <p className="mb-3 rounded-xl border border-signal/30 bg-signal/5 px-3 py-2 text-xs text-fog">
            Growing from: <span className="italic">“{linkedNode.text.slice(0, 90)}{linkedNode.text.length > 90 ? '…' : ''}”</span>
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor={textareaId} className="mb-1.5 block text-sm text-fog">
            Your thought
          </label>
          <textarea
            id={textareaId}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError('');
            }}
            maxLength={MAX_LEN}
            rows={4}
            placeholder="What's true right now, even if it's small?"
            className="focus-ring w-full resize-none rounded-2xl border border-line/70 bg-void-2 p-3 text-sm text-bright placeholder:text-mist"
            aria-describedby={error ? `${textareaId}-error` : `${textareaId}-count`}
            aria-invalid={Boolean(error)}
          />
          <div className="mt-1.5 flex items-center justify-between text-xs">
            {error ? (
              <p id={`${textareaId}-error`} role="alert" className="text-signal-3">
                {error}
              </p>
            ) : (
              <span id={`${textareaId}-count`} className="text-mist">
                {text.length}/{MAX_LEN}
              </span>
            )}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="focus-ring rounded-full border border-line/70 px-4 py-2 text-sm text-fog hover:border-mist"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="focus-ring rounded-full bg-signal px-4 py-2 text-sm font-semibold text-[#06110e] hover:brightness-110"
            >
              Add to constellation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
