import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-accent" />
            Weekly Brief
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No brief available yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  const generatedDate = brief.generated_at
    ? new Date(brief.generated_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-accent" />
          Weekly Brief
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-foreground">{brief.title}</h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            Week {brief.week_number}, {brief.year}
            {generatedDate && ` — ${generatedDate}`}
          </div>
        </div>

        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-secondary px-2 py-1 text-muted-foreground">
            {brief.total_themes} themes
          </span>
          <span className="rounded-full bg-secondary px-2 py-1 text-muted-foreground">
            {brief.total_signals_processed} signals
          </span>
        </div>

        <div className="max-h-64 overflow-y-auto rounded-lg bg-secondary/50 p-3">
          <p className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">
            {brief.content?.slice(0, 500)}
            {brief.content && brief.content.length > 500 && "..."}
          </p>
        </div>

        {brief.pdf_url && (
          <Button variant="outline" size="sm" className="w-full gap-2" asChild>
            <a href={brief.pdf_url} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" />
              Download Full Brief (PDF)
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
