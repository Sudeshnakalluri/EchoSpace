import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Avatar from './Avatar.jsx';

const links = [
  { to: '/', label: 'Orbit', end: true },
  { to: '/resonance', label: 'Resonance' },
  { to: '/trail', label: 'Your Trail' },
];

export default function NavBar() {
  const { currentUser } = useApp();
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 focus-ring rounded-md" aria-label="EchoSpace home">
          <span className="h-2.5 w-2.5 rounded-full bg-signal animate-pulse-soft" aria-hidden="true" />
          <span className="font-display text-lg tracking-tight text-bright">EchoSpace</span>
        </NavLink>

        <nav aria-label="Primary" className="flex items-center gap-1 rounded-full border border-line/70 bg-surface/60 p-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `focus-ring rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-signal/15 text-signal' : 'text-mist hover:text-fog'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2" aria-label={`Signed in as ${currentUser.name}`}>
          <Avatar user={currentUser} size={32} />
          <span className="hidden text-sm text-fog sm:inline">{currentUser.name}</span>
        </div>
      </div>
    </header>
  );
}
