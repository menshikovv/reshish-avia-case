import { IconLibrary } from '@/shared/ui';
import { ThemeSwitch } from './ThemeSwitch';
import './site-header.scss';

export function SiteHeader({ homeHref }: { homeHref: string }) {
  return (
    <header className="site-header">
      <IconLibrary />
      <div className="shell site-header__inner">
        <a className="brand__name" href={homeHref}>Решись Авиа</a>
        <div className="site-header__actions">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
