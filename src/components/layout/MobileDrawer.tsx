import { X } from "lucide-react";
import Sidebar from "./Sidebar";

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

function MobileDrawer({
  isOpen,
  onClose,
}: MobileDrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
      />

      <div className="fixed left-0 top-0 z-50 h-screen w-72 lg:hidden">
        <div className="relative">
          <Sidebar />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg border border-border bg-surface p-2 transition hover:bg-background"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

export default MobileDrawer;