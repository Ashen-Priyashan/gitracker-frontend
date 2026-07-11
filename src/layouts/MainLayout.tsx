import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className="flex-1 p-4 sm:p-6 lg:overflow-y-auto lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;