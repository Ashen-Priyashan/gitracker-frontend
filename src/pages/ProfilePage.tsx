import { useParams } from "react-router-dom";

function ProfilePage() {
  const { username } = useParams<{ username: string }>();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">
        Profile
      </h1>

      <p className="mt-2 text-slate-600">
        Analyzing GitHub profile: {username}
      </p>
    </div>
  );
}

export default ProfilePage;