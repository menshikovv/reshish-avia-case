
export function IconLibrary() {
  return (
    <svg className="icon-library" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <symbol id="icon-user" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="3.25" /><path d="M5 20v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
      </symbol>
      <symbol id="icon-calendar" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" />
      </symbol>
      <symbol id="icon-arrow" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6" /></symbol>
      <symbol id="icon-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" /></symbol>
      <symbol id="icon-lock" viewBox="0 0 24 24">
        <rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 4.5v2" />
      </symbol>
      <symbol id="icon-chart" viewBox="0 0 24 24"><path d="M4 4v16h16M8 15l4-4 3 2 5-6" /></symbol>
      <symbol id="icon-file" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6" /></symbol>
      <symbol id="icon-sun" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" /><path d="M12 2.5v2m0 15v2m9.5-9.5h-2m-15 0h-2m16.2-6.7-1.4 1.4m-10.6 10.6-1.4 1.4m13.4 0-1.4-1.4M6.7 6.7 5.3 5.3" />
      </symbol>
      <symbol id="icon-moon" viewBox="0 0 24 24">
        <path d="M20.5 15.1A8.7 8.7 0 0 1 8.9 3.5 8.8 8.8 0 1 0 20.5 15.1Z" />
      </symbol>
      <symbol id="icon-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" /><path d="M12 11v5m0-8h.01" /></symbol>
      <symbol id="icon-bars" viewBox="0 0 24 24">
        <path fill="currentColor" stroke="none" d="M4 12h4v9H4zm6-4h4v13h-4zm6-5h4v18h-4z" />
      </symbol>
      <symbol id="icon-layers" viewBox="0 0 24 24">
        <path d="m2.5 8 9.5-5.3L21.5 8 12 13.3 2.5 8Zm0 4.4 9.5 5.3 9.5-5.3m-19 4.4 9.5 5.3 9.5-5.3" />
      </symbol>
      <symbol id="icon-bolt" viewBox="0 0 24 24">
        <path d="M13.8 1.8 4.7 13.3h6.1l-.6 8.9 9.1-11.5h-6.1l.6-8.9Z" />
      </symbol>
    </svg>
  );
}

export function Icon({ name }: { name: string }) {
  return <svg className="icon" aria-hidden="true"><use href={`#icon-${name}`} /></svg>;
}
