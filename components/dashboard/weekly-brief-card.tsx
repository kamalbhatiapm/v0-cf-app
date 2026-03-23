import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Layers } from "lucide-react";

interface WeeklyBrief {
  id: string;
  brief_id: string;
  title: string;
  content: string;
  week_number: number;
  year: number;
  total_themes: number;
  total_signals_processed: number;
  pdf_url: string | null;
  created_at: string;
}

export function WeeklyBriefCard({ brief }: { brief: WeeklyBrief }) {
  const formattedDate = new Date(brief.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <FileText className="h-5 w-5 text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg">Weekly Executive Brief</CardTitle>
              <p className="text-sm text-muted-foreground">
                Week {brief.week_number}, {brief.year}
              </p>
            </div>
          </div>
          {brief.pdf_url && (
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href={brief.pdf_url} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                PDF
              </a>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <h3 className="font-medium text-foreground mb-3">{brief.title}</h3>
        
        <div className="prose prose-sm prose-invert max-w-none">
          <p className="text-sm text-muted-foreground line-clamp-4">
            {brief.content?.slice(0, 400)}
            {brief.content && brief.content.length > 400 ? "..." : ""}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>{brief.total_themes} themes</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
