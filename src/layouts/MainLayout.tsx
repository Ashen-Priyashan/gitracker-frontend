import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4">
        <h1 className="text-2xl font-bold">GitTracker</h1>
      </header>

      <main className="flex-1 p-6">
        <Outlet />
      </main>

      <footer className="border-t p-4 text-center text-sm text-gray-500">
        © 2026 GitTracker
      </footer>
    </div>
  );
}

export default MainLayout;