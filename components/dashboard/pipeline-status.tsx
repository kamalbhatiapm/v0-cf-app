import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckCircle, Clock, XCircle } from "lucide-react";

interface PipelineRun {
  id: string;
  run_id: string;
  status: string;
  week_number: number;
  year: number;
  total_signals_processed: number;
  total_themes: number;
  avg_confidence: number;
  emerging_count: number;
  rising_count: number;
  stable_count: number;
  declining_count: number;
  breaking_count: number;
  created_at: string;
  completed_at: string | null;
}

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  completed: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
  running: { icon: Activity, color: "text-blue-400", bg: "bg-blue-400/10" },
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  failed: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
};

export function PipelineStatus({ pipeline }: { pipeline: PipelineRun }) {
  const config = statusConfig[pipeline.status?.toLowerCase()] || statusConfig.pending;
  const Icon = config.icon;

  const completedAt = pipeline.completed_at
    ? new Date(pipeline.completed_at).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <Card className="border-border bg-card h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Pipeline Status</CardTitle>
          <Badge variant="outline" className={`${config.color} capitalize`}>
            <Icon className="h-3 w-3 mr-1" />
            {pipeline.status || "Unknown"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-xs text-muted-foreground">Signals Processed</p>
            <p className="text-lg font-semibold text-foreground">
              {pipeline.total_signals_processed?.toLocaleString() || 0}
            </p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-xs text-muted-foreground">Themes Generated</p>
            <p className="text-lg font-semibold text-foreground">
              {pipeline.total_themes || 0}
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-secondary/50 p-3">
          <p className="text-xs text-muted-foreground mb-2">Signal Distribution</p>
          <div className="flex flex-wrap gap-2">
            {pipeline.emerging_count > 0 && (
              <Badge variant="outline" className="text-yellow-500 text-xs">
                {pipeline.emerging_count} Emerging
              </Badge>
            )}
            {pipeline.rising_count > 0 && (
              <Badge variant="outline" className="text-green-500 text-xs">
                {pipeline.rising_count} Rising
              </Badge>
            )}
            {pipeline.stable_count > 0 && (
              <Badge variant="outline" className="text-blue-400 text-xs">
                {pipeline.stable_count} Stable
              </Badge>
            )}
            {pipeline.declining_count > 0 && (
              <Badge variant="outline" className="text-orange-500 text-xs">
                {pipeline.declining_count} Declining
              </Badge>
            )}
            {pipeline.breaking_count > 0 && (
              <Badge variant="outline" className="text-red-500 text-xs">
                {pipeline.breaking_count} Breaking
              </Badge>
            )}
          </div>
        </div>

        {completedAt && (
          <p className="text-xs text-muted-foreground">
            Last completed: {completedAt}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
