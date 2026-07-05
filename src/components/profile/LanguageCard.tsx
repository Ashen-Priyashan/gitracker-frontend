import { Code2 } from "lucide-react";

type LanguageCardProps = {
  language: string | null;
};

function LanguageCard({
  language,
}: LanguageCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Code2 size={23} />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">
            Most Used Language
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {language ?? "Not available"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default LanguageCard;