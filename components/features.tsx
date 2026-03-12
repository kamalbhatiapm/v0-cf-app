import {
  Database,
  Tags,
  BarChart3,
  Layers,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    name: "Ingestion Agent",
    description:
      "Automatically collects signals from GitHub, arXiv, vendor releases, and top newsletters. Normalizes data into structured objects for processing.",
    icon: Database,
    tag: "Data Collection",
  },
  {
    name: "Classification Agent",
    description:
      "Uses LLM + taxonomy prompts to categorize signals by domain (Inference, Agents, Governance), detect signal types, and estimate infrastructure relevance.",
    icon: Tags,
    tag: "Intelligence",
  },
  {
    name: "Scoring Agent",
    description:
      "Computes velocity, breadth, persistence, and confidence scores. Labels signals as Breakout, Accelerating, Rising, Stable, or Cooling.",
    icon: BarChart3,
    tag: "Core Intelligence",
  },
  {
    name: "Clustering Agent",
    description:
      "Groups related signals into themes using embeddings and similarity search. Executives see 5 themes, not 50 raw signals.",
    icon: Layers,
    tag: "Synthesis",
  },
  {
    name: "Insight Generation Agent",
    description:
      "Generates citation-backed summaries with 'Why it matters' explanations, platform implications, and watchlist recommendations.",
    icon: Sparkles,
    tag: "Narrative",
  },
  {
    name: "Verification Agent",
    description:
      "Protects credibility by checking citation backing, confidence justification, and signal sufficiency. Prevents hallucination and hype amplification.",
    icon: ShieldCheck,
    tag: "Trust Layer",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
            Agentic Intelligence
          </h2>
          <p className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Six agents working in concert
          </p>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Our multi-agent architecture transforms raw ecosystem noise into 
            structured, verifiable intelligence you can act on.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:bg-card/80"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <feature.icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {feature.tag}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {feature.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
