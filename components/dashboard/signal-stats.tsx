import { Activity, Layers, TrendingUp, Circle } from "lucide-react";

interface PipelineRun {
  total_signals_processed?: number;
  total_themes?: number;
  avg_confidence?: number;
  breaking_count?: number;
  emerging_count?: number;
  rising_count?: number;
}

interface SignalStatsProps {
  pipelineRun?: PipelineRun | null;
}

export function SignalStats({ pipelineRun }: SignalStatsProps) {
  const stats = [
    {
      label: "Signals Processed",
      value: pipelineRun?.total_signals_processed ?? 0,
      delta: "+32 this week",
      icon: Activity,
    },
    {
      label: "Active Clusters",
      value: pipelineRun?.total_themes ?? 0,
      delta: `+${pipelineRun?.emerging_count ?? 0} new`,
      icon: Layers,
    },
    {
      label: "Breakout Signals",
      value: pipelineRun?.breaking_count ?? 0,
      delta: `↑ ${pipelineRun?.rising_count ?? 0}`,
      icon: TrendingUp,
    },
    {
      label: "Confidence Avg",
      value: `${pipelineRun?.avg_confidence ?? 0}%`,
      delta: null,
      icon: Circle,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-card px-6 py-5 flex items-start justify-between"
        >
          <div>
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground tracking-tight">
                {stat.value}
              </span>
              {stat.delta && (
                <span className="text-sm text-[rgb(127,200,255)]">
                  {stat.delta}
                </span>
              )}
            </div>
          </div>
          <stat.icon className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
        </div>
      ))}
    </div>
  );
}
