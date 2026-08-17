import React from 'react';

/** papel / tinta / terra switch. Writes data-theme on <html> and remembers the choice. */
export function ThemeSwitcher({ themes = ['papel', 'tinta', 'terra'], storageKey = 'pc-theme', style, ...rest }) {
  const [theme, setTheme] = React.useState(() =>
    (typeof document !== 'undefined' && document.documentElement.dataset.theme) || themes[0]);
  React.useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem(storageKey); } catch (e) {}
    if (saved && themes.includes(saved)) setTheme(saved);
  }, []);
  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(storageKey, theme); } catch (e) {}
  }, [theme]);
  return (
    <div role="group" aria-label="Tema visual" style={{ display: 'flex', gap: 4, alignItems: 'center', ...style }} {...rest}>
      {themes.map(t => (
        <button key={t} type="button" aria-pressed={t === theme} onClick={() => setTheme(t)}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.06em', border: 'none',
            cursor: 'pointer', padding: '5px 8px', borderRadius: 'var(--radius-sm)',
            background: t === theme ? 'var(--bg-alt)' : 'transparent',
            color: t === theme ? 'var(--ink)' : 'var(--faint)', transition: 'all var(--dur-fast) var(--ease)',
          }}>{t}</button>
      ))}
    </div>
  );
}
