import {
  Search,
  Lightbulb,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

const features = [
  {
    name: "Theme Selector",
    description:
      "Scans and categorizes incoming signals by domain and relevance. Identifies which signals deserve attention and groups related signals together for deeper analysis.",
    icon: Search,
    tag: "Discovery",
  },
  {
    name: "Theme Writer",
    description:
      "Crafts compelling narratives from selected themes. Generates citation-backed summaries with 'Why it matters' and platform implications that turn data into actionable insights.",
    icon: Lightbulb,
    tag: "Narrative",
  },
  {
    name: "Theme Verifier",
    description:
      "Protects credibility by validating citations, confidence justification, and signal sufficiency. Prevents hallucination and ensures only verified intelligence makes it through.",
    icon: ShieldCheck,
    tag: "Trust Layer",
  },
  {
    name: "Weekly Brief Writer",
    description:
      "Synthesizes the week's verified themes into executive-ready briefs. Highlights key trends, emerging risks, and strategic opportunities for leadership decision-making.",
    icon: BookOpen,
    tag: "Executive Summary",
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
            Four agents working in concert
          </p>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Our multi-agent architecture transforms raw ecosystem noise into 
            structured, verifiable intelligence you can act on.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
