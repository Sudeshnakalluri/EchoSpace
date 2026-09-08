import { useMemo, useRef, useState } from 'react';
import { positionsFor } from '../utils/layout.js';
import NodeCard from './NodeCard.jsx';

/**
 * Renders a constellation's nodes either as a spatial map (default, visual)
 * or as a linear accessible list (same data, ordered, with explicit
 * "grown from" references). Screen reader and keyboard users get a fully
 * equivalent experience via the list view rather than trying to navigate
 * a free-floating 2D canvas.
 */
export default function ConstellationCanvas({ nodes, getUser, selectedId, onSelectNode, linkTargetId }) {
  const [view, setView] = useState('map');
  const containerRef = useRef(null);
  const positions = useMemo(() => positionsFor(nodes), [nodes]);
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const lines = useMemo(() => {
    const out = [];
    for (const node of nodes) {
      for (const parentId of node.connections) {
        const from = positions.get(parentId);
        const to = positions.get(node.id);
        if (from && to) out.push({ key: `${parentId}->${node.id}`, from, to });
      }
    }
    return out;
  }, [nodes, positions]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs text-mist">
          {nodes.length} thought{nodes.length === 1 ? '' : 's'}, grown from one another.
        </p>
        <div role="group" aria-label="Constellation view mode" className="flex rounded-full border border-line/70 bg-surface/60 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setView('map')}
            aria-pressed={view === 'map'}
            className={`focus-ring rounded-full px-3 py-1 ${view === 'map' ? 'bg-signal/15 text-signal' : 'text-mist hover:text-fog'}`}
          >
            Map
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            aria-pressed={view === 'list'}
            className={`focus-ring rounded-full px-3 py-1 ${view === 'list' ? 'bg-signal/15 text-signal' : 'text-mist hover:text-fog'}`}
          >
            List
          </button>
        </div>
      </div>

      {view === 'map' ? (
        <div
          ref={containerRef}
          className="relative h-[520px] w-full overflow-hidden rounded-3xl border border-line/60 bg-void-2/60 sm:h-[600px]"
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {lines.map((l) => (
              <line
                key={l.key}
                x1={l.from.x}
                y1={l.from.y}
                x2={l.to.x}
                y2={l.to.y}
                stroke="rgba(155,140,255,0.35)"
                strokeWidth="0.35"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          {nodes.map((node) => (
            <NodeCard
              key={node.id}
              node={node}
              author={getUser(node.authorId)}
              position={positions.get(node.id)}
              isSelected={selectedId === node.id}
              isLinkTarget={linkTargetId === node.id}
              onSelect={onSelectNode}
            />
          ))}
        </div>
      ) : (
        <ol className="flex flex-col gap-3 rounded-3xl border border-line/60 bg-void-2/60 p-4">
          {nodes.map((node) => {
            const author = getUser(node.authorId);
            const parents = node.connections.map((id) => byId.get(id)).filter(Boolean);
            return (
              <li key={node.id}>
                <button
                  type="button"
                  onClick={() => onSelectNode(node.id)}
                  aria-pressed={selectedId === node.id}
                  className={`focus-ring w-full rounded-2xl border p-3 text-left transition-colors ${
                    selectedId === node.id ? 'border-signal-2 bg-surface' : 'border-line/70 bg-surface/60 hover:border-signal-2/50'
                  }`}
                >
                  <p className="text-sm font-medium text-fog">{author?.name ?? 'Unknown'}</p>
                  <p className="mt-1 text-sm text-bright">{node.text}</p>
                  {parents.length > 0 && (
                    <p className="mt-2 text-xs text-mist">
                      Grown from: {parents.map((p) => `“${p.text.slice(0, 40)}${p.text.length > 40 ? '…' : ''}”`).join('; ')}
                    </p>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
