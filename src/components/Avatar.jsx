import { memo } from 'react';

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function Avatar({ user, size = 36, ring = false }) {
  if (!user) return null;
  const style = {
    width: size,
    height: size,
    background: `linear-gradient(135deg, hsl(${user.hue} 70% 45%), hsl(${user.hue + 40} 70% 35%))`,
    fontSize: Math.max(10, size * 0.36),
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white/95 ${
        ring ? 'ring-2 ring-signal ring-offset-2 ring-offset-void' : ''
      }`}
      style={style}
      aria-hidden="true"
    >
      {initials(user.name)}
    </span>
  );
}

export default memo(Avatar);
