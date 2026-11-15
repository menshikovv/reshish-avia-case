import { createContext, useContext } from 'react';
import type { ComponentPropsWithRef, MouseEvent } from 'react';

export const Navigation = createContext<((href: string, replace?: boolean) => void) | null>(null);

export function PageLink({ href, children, ...props }: ComponentPropsWithRef<'a'> & { href: string }) {
  const navigate = useContext(Navigation);
  function open(event: MouseEvent<HTMLAnchorElement>) {
    if (!navigate || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(href);
  }
  return <a href={href} onClick={props.target ? undefined : open} {...props}>{children}</a>;
}
