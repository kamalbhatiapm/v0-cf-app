import { Card, CardContent } from "@/components/ui/card";
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  BarChart3,
  AlertTriangle 
} from "lucide-react";

interface PipelineRun {
  total_signals_processed?: number;
  total_themes?: number;
  avg_confidence?: number;
  emerging_count?: number;
  rising_count?: number;
  stable_count?: number;
  declining_count?: number;
  breaking_count?: number;
}

interface SignalStatsProps {
  pipelineRun?: PipelineRun | null;
}

export function SignalStats({ pipelineRun }: SignalStatsProps) {
  const stats = [
    {
      label: "Signals Processed",
      value: pipelineRun?.total_signals_processed ?? 0,
      icon: Activity,
      color: "text-accent",
    },
    {
      label: "Active Themes",
      value: pipelineRun?.total_themes ?? 0,
      icon: BarChart3,
      color: "text-accent",
    },
    {
      label: "Avg Confidence",
      value: `${pipelineRun?.avg_confidence ?? 0}%`,
      icon: Zap,
      color: "text-accent",
    },
    {
      label: "Emerging",
      value: pipelineRun?.emerging_count ?? 0,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      label: "Rising",
      value: pipelineRun?.rising_count ?? 0,
      icon: TrendingUp,
      color: "text-blue-400",
    },
    {
      label: "Breaking",
      value: pipelineRun?.breaking_count ?? 0,
      icon: AlertTriangle,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg bg-secondary p-2 ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
