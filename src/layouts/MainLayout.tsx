import { useState } from "react";
import { Outlet } from "react-router-dom";

import MobileDrawer from "../components/layout/MobileDrawer";
import MobileHeader from "../components/layout/MobileHeader";
import Sidebar from "../components/layout/Sidebar";

function MainLayout() {
  const [drawerOpen, setDrawerOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-background text-heading lg:flex">
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="flex min-h-screen flex-1 flex-col min-w-0">
        <MobileHeader
          onMenuClick={() => setDrawerOpen(true)}
        />

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;