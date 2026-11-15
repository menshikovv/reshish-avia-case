import { PageLink } from '@/shared/routing';
import './not-found.scss';

export function NotFoundPage() {
  return (
    <main id="main" className="not-found">
      <div className="not-found__content">
        <h1 tabIndex={-1}>404</h1>
        <PageLink className="primary-button not-found__home" href="/">Вернуться на главную</PageLink>
      </div>
    </main>
  );
}
