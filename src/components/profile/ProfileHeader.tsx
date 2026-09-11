import { ExternalLink, MapPin, Users } from "lucide-react";
import type { GitHubUser } from "../../types/profile";

type ProfileHeaderProps = {
  user: GitHubUser;
};

function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <section className="rounded-2xl border border-border/80 bg-surface p-6 sm:p-8">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={`${user.username} avatar`}
            className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl border border-border/60 object-cover shadow-xs shrink-0"
          />
        ) : (
          <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl bg-heading text-surface text-2xl font-bold shrink-0">
            {(user.name ?? user.username).slice(0, 2).toUpperCase()}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-heading">
                {user.name ?? user.username}
              </h1>

              <p className="mt-0.5 text-sm font-medium text-muted">
                @{user.username}
              </p>
            </div>

            <a
              href={`https://github.com/${encodeURIComponent(user.username)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex self-center sm:self-start items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-heading hover:bg-surface-hover transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink size={13} className="text-muted" />
            </a>
          </div>

          {user.bio && (
            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-body">
              {user.bio}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-medium text-body">
            {user.location && (
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-muted" />
                <span>{user.location}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-muted" />
              <span className="tabular-nums font-semibold text-heading">
                {user.followers.toLocaleString()}
              </span>
              <span>followers</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="tabular-nums font-semibold text-heading">
                {user.following.toLocaleString()}
              </span>
              <span>following</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;