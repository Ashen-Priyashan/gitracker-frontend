import { MapPin, Users } from "lucide-react";
import type { GitHubUser } from "../../types/profile";

type ProfileHeaderProps = {
  user: GitHubUser;
};

function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-8">
      <div className="flex items-start gap-6">
        <img
          src={user.avatarUrl}
          alt={`${user.username} avatar`}
          className="h-28 w-28 rounded-3xl object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold text-heading">
            {user.name ?? user.username}
          </h1>

          <p className="mt-1 text-body">
            @{user.username}
          </p>

          {user.bio && (
            <p className="mt-4 max-w-2xl text-body">
              {user.bio}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-5 text-sm text-body">
            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin size={17} />
                <span>{user.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Users size={17} />

              <span>
                {user.followers.toLocaleString()} followers
              </span>
            </div>

            <span>
              {user.following.toLocaleString()} following
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;