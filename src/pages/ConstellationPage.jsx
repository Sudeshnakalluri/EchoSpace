import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import ConstellationCanvas from '../components/ConstellationCanvas.jsx';
import ComposeModal from '../components/ComposeModal.jsx';
import PresenceBar from '../components/PresenceBar.jsx';

export default function ConstellationPage() {
  const { id } = useParams();
  const { getConstellation, getUser, addNode, drifting, setActiveConstellation } = useApp();
  const constellation = getConstellation(id);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isComposeOpen, setComposeOpen] = useState(false);

  useEffect(() => {
    const cleanup = setActiveConstellation(id);
    return () => {
      if (typeof cleanup === 'function') cleanup();
      setActiveConstellation(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!constellation) {
    return <Navigate to="/" replace />;
  }

  const selectedNode = constellation.nodes.find((n) => n.id === selectedNodeId) ?? null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link to="/" className="focus-ring inline-flex items-center gap-1 text-sm text-mist hover:text-fog">
        ← Back to Orbit
      </Link>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl text-bright sm:text-3xl">{constellation.title}</h1>
          {constellation.prompt && <p className="mt-1 text-sm text-fog">{constellation.prompt}</p>}
        </div>
        <PresenceBar people={drifting} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setComposeOpen(true)}
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-signal px-4 py-2 text-sm font-semibold text-[#06110e] hover:brightness-110"
        >
          <span aria-hidden="true">+</span> Grow a new thought
        </button>
        {selectedNode && (
          <span className="rounded-full border border-signal-2/40 bg-signal-2/10 px-3 py-1.5 text-xs text-fog">
            Selected: “{selectedNode.text.slice(0, 50)}
            {selectedNode.text.length > 50 ? '…' : ''}” — new thoughts will grow from this.{' '}
            <button type="button" onClick={() => setSelectedNodeId(null)} className="focus-ring underline decoration-dotted">
              clear
            </button>
          </span>
        )}
      </div>

      <div className="mt-5">
        <ConstellationCanvas
          nodes={constellation.nodes}
          getUser={getUser}
          selectedId={selectedNodeId}
          linkTargetId={selectedNodeId}
          onSelectNode={(nodeId) => setSelectedNodeId((cur) => (cur === nodeId ? null : nodeId))}
        />
      </div>

      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setComposeOpen(false)}
        linkedNode={selectedNode}
        onSubmit={(text) => {
          const connections = selectedNode ? [selectedNode.id] : [];
          const result = addNode(constellation.id, text, connections);
          if (result.ok) {
            setComposeOpen(false);
            setSelectedNodeId(null);
          }
          return result;
        }}
      />
    </div>
  );
}
