import { memo } from 'react';
import Avatar from './Avatar.jsx';

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'moments ago';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function NodeCard({ node, author, position, isSelected, isLinkTarget, onSelect, style }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 animate-fade-in"
      style={{ left: `${position.x}%`, top: `${position.y}%`, ...style }}
    >
      <button
        type="button"
        onClick={() => onSelect(node.id)}
        className={`focus-ring group flex w-40 flex-col gap-1.5 rounded-2xl border bg-surface/90 p-3 text-left shadow-lg shadow-black/40 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 sm:w-48 ${
          isSelected
            ? 'border-signal-2 ring-2 ring-signal-2/50'
            : isLinkTarget
              ? 'border-signal/70'
              : 'border-line/70 hover:border-signal-2/50'
        }`}
        aria-pressed={isSelected}
        aria-label={`Thought by ${author?.name ?? 'someone'}: ${node.text}`}
      >
        <div className="flex items-center gap-1.5">
          <Avatar user={author} size={20} />
          <span className="truncate text-[11px] font-medium text-fog">{author?.name ?? 'Unknown'}</span>
        </div>
        <p className="line-clamp-4 text-[13px] leading-snug text-bright">{node.text}</p>
        <span className="text-[10px] text-mist">{timeAgo(node.createdAt)}</span>
      </button>
    </div>
  );
}

export default memo(NodeCard);
