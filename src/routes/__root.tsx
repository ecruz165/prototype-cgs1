import { createRootRoute, Outlet } from '@tanstack/react-router';
import { useState } from 'react';
import { AppTopBar } from '@/components/organisms/AppTopBar';
import { NavDrawer } from '@/components/organisms/NavDrawer';

const NAV_STORAGE_KEY = 'nav-open';

export const Route = createRootRoute({ component: RootLayout });

function RootLayout() {
  const [navOpen, setNavOpen] = useState(
    () => localStorage.getItem(NAV_STORAGE_KEY) !== 'closed',
  );
  const toggleNav = () =>
    setNavOpen((open) => {
      localStorage.setItem(NAV_STORAGE_KEY, open ? 'closed' : 'open');
      return !open;
    });

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <AppTopBar navOpen={navOpen} onToggleNav={toggleNav} />
      <div className="flex min-h-0 flex-1">
        {navOpen && <NavDrawer />}
        <div className="min-w-0 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
