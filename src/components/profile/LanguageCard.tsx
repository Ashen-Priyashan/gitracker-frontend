import { Code2 } from "lucide-react";

type LanguageCardProps = {
  language: string | null;
};

function LanguageCard({
  language,
}: LanguageCardProps) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Code2 size={23} />
        </div>

        <div>
          <p className="text-sm font-medium text-body">
            Most Used Language
          </p>

          <p className="mt-1 text-2xl font-bold text-heading">
            {language ?? "Not available"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default LanguageCard;