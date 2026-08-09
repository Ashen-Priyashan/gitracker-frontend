import { CircleAlert } from "lucide-react";

type ProfileErrorProps = {
  message: string;
};

function ProfileError({ message }: ProfileErrorProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md rounded-3xl border border-red-300 bg-surface p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-500">
          <CircleAlert size={28} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-heading">
          Unable to analyze profile
        </h1>

        <p className="mt-3 text-body">
          {message}
        </p>
      </div>
    </div>
  );
}

export default ProfileError;