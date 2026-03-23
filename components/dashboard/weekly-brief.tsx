import { FileText, Download, Calendar } from "lucide-react";

interface WeeklyBriefData {
  id: string;
  brief_id: string;
  title: string;
  content: string;
  week_number: number;
  year: number;
  total_themes: number;
  total_signals_processed: number;
  pdf_url?: string;
  generated_at: string;
}

interface WeeklyBriefProps {
  brief?: WeeklyBriefData | null;
}

export function WeeklyBrief({ brief }: WeeklyBriefProps) {
  if (!brief) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-[rgb(127,200,255)]" />
          <h2 className="text-xl font-semibold text-foreground">Weekly Brief</h2>
        </div>
        <p className="text-sm text-muted-foreground">No brief available yet.</p>
      </div>
    );
  }

  const generatedDate = brief.generated_at
    ? new Date(brief.generated_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  // Split content into paragraphs for better readability
  const contentParagraphs = brief.content
    ?.split("\n\n")
    .filter((p) => p.trim())
    .slice(0, 4) || [];

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-5 w-5 text-[rgb(127,200,255)]" />
          <h2 className="text-xl font-semibold text-foreground">{brief.title}</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>
            Week {brief.week_number}, {brief.year}
            {generatedDate && ` — ${generatedDate}`}
          </span>
        </div>
      </div>

      {/* Stats pills */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
          {brief.total_themes} themes
        </span>
        <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
          {brief.total_signals_processed} signals
        </span>
      </div>

      {/* Brief content with better spacing */}
      <div className="space-y-3">
        {contentParagraphs.length > 0 ? (
          contentParagraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {paragraph}
            </p>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            {brief.content?.slice(0, 400)}
            {brief.content && brief.content.length > 400 && "..."}
          </p>
        )}
      </div>

      {/* Download button */}
      {brief.pdf_url && (
        <a
          href={brief.pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground hover:bg-secondary/80 transition-colors"
        >
          <Download className="h-4 w-4" />
          Download Full Brief (PDF)
        </a>
      )}
    </div>
  );
}

