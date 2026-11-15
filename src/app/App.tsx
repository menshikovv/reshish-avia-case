import { CasePage } from '@/pages/business-case';
import { NotFoundPage } from '@/pages/not-found';
import { SiteHeader } from '@/widgets/site-header';

export function App({ notFound }: { notFound: boolean }) {
  return (
    <div className={notFound ? 'app-screen not-found-screen' : 'app-screen'}>
      <a className="skip-link" href="#main">К содержанию</a>
      <SiteHeader homeHref={notFound ? '/' : '#main'} />
      {notFound ? <NotFoundPage /> : <CasePage />}
    </div>
  );
}

