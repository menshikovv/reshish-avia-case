import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@/shared/ui/card.scss';
import './styles/base.scss';
import { App } from './App';

const root = document.getElementById('root');
if (!root) throw new Error('App root is missing.');

const { pathname, protocol } = window.location;
const notFound = root.dataset.page === 'not-found'
  || (protocol !== 'file:' && pathname !== '/' && pathname !== '/index.html');

if (notFound) document.title = '404 - Страница не найдена | Решись Авиа';
createRoot(root).render(<App notFound={notFound} />);

