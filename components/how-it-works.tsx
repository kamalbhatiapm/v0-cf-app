import { ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Signal Ingestion",
    description:
      "We continuously collect data from GitHub repos, arXiv papers, vendor release notes, and pricing changes. All signals are normalized and stored.",
    sources: ["GitHub Trending", "arXiv Abstracts", "Vendor Releases", "Pricing Updates"],
  },
  {
    step: "02",
    title: "Classification & Scoring",
    description:
      "Each signal is classified by domain and type, then scored on velocity, cross-source corroboration, credibility, and platform impact potential.",
    metrics: ["Velocity Score", "Breadth Index", "Confidence Band", "Impact Rating"],
  },
  {
    step: "03",
    title: "Clustering & Synthesis",
    description:
      "Related signals are grouped into 5-7 actionable themes. Each cluster comes with supporting evidence and week-over-week delta analysis.",
    outputs: ["Theme Clusters", "Delta Reports", "Trend Analysis", "Watchlist Items"],
  },
  {
    step: "04",
    title: "Executive Briefs",
    description:
      'Citation-backed summaries explain "Why it matters to AI platform strategy" with confidence indicators and recommended actions.',
    deliverables: ["Weekly Digest", "Shareable Briefs", "Action Items", "Risk Flags"],
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border bg-card/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
            How It Works
          </h2>
          <p className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From noise to decision-grade intelligence
          </p>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Our pipeline transforms fragmented signals into structured insights 
            you can trust and act on.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative rounded-xl border border-border bg-background p-8"
              >
                {/* Step number */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-4xl font-bold text-accent/30">
                    {step.step}
                  </span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden h-5 w-5 text-muted-foreground lg:block" />
                  )}
                </div>

                <h3 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {(step.sources || step.metrics || step.outputs || step.deliverables)?.map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
