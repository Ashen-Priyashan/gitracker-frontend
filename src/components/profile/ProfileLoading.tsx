import { LoaderCircle } from "lucide-react";

function ProfileLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <LoaderCircle
          className="mx-auto animate-spin text-primary"
          size={36}
        />

        <p className="mt-4 text-body">
          Analyzing GitHub profile...
        </p>
      </div>
    </div>
  );
}

export default ProfileLoading;