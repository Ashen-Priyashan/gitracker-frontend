import { Code2 } from "lucide-react";

type LanguageCardProps = {
  language: string | null;
};

function LanguageCard({
  language,
}: LanguageCardProps) {
  return (
    <section className="rounded-2xl border border-border/80 bg-surface p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-hover text-heading border border-border/60">
            <Code2 size={18} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-xs font-medium text-muted uppercase tracking-wider">
              Primary Language
            </p>

            <div className="flex items-center gap-2 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <p className="text-lg font-bold text-heading">
                {language ?? "Not available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LanguageCard;