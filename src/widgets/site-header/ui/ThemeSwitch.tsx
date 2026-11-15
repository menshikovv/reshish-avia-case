import { useLayoutEffect, useState } from 'react';
import { Icon } from '@/shared/ui';

const themeOptions = [
  { id: 'light', icon: 'sun', label: 'Светлая тема' },
  { id: 'dark', icon: 'moon', label: 'Тёмная тема' },
] as const;

export function ThemeSwitch() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('reshish-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function chooseTheme(next: 'light' | 'dark') {
    setTheme(next);
    try {
      localStorage.setItem('reshish-theme', next);
    } catch {}
  }

  return (
    <div className="theme-switch" role="group" aria-label="Цветовая тема">
      {themeOptions.map(({ id, icon, label }) => (
        <button key={id} type="button" aria-pressed={theme === id} aria-label={label} onClick={() => chooseTheme(id)}>
          <Icon name={icon} />
        </button>
      ))}
    </div>
  );
}
