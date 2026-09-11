import { useEffect } from "react";
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
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-50 lg:hidden"
    >
      {/* Dimmed backdrop with blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer sheet */}
      <div className="fixed left-0 top-0 z-50 h-screen w-64 shadow-2xl animate-in slide-in-from-left duration-200">
        <div className="relative h-full">
          <Sidebar />

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="absolute right-2.5 top-3 flex h-7 w-7 items-center justify-center rounded-lg border border-border/80 bg-surface text-body hover:text-heading transition"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileDrawer;