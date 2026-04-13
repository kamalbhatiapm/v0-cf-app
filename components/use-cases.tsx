import { Users, Code2, Building2 } from "lucide-react";

const personas = [
  {
    icon: Users,
    title: "AI Platform PM",
    subtitle: "Primary User",
    description:
      "Own your inference stack, orchestration, and governance decisions with confidence. Make evidence-backed roadmap choices without manually scanning dozens of sources.",
    benefits: [
      "Daily updated signal feed",
      "Roadmap impact analysis",
      "Vendor evaluation support",
      "Cost optimization signals",
    ],
  },
  {
    icon: Code2,
    title: "Platform Engineering Lead",
    subtitle: "Technical User",
    description:
      "Evaluate OSS frameworks and architecture patterns with hard evidence. Avoid adopting hype and make informed technical decisions.",
    benefits: [
      "GitHub trend analysis",
      "Framework comparisons",
      "Architecture pattern signals",
      "Technical risk indicators",
    ],
  },
  {
    icon: Building2,
    title: "Director / VP of AI Platform",
    subtitle: "Executive User",
    description:
      "Get executive-ready briefs that surface strategic risks and opportunities. Focus on risk, compliance, and cost control with minimal time investment.",
    benefits: [
      "Weekly executive digest",
      "Shareable team briefs",
      "Compliance signal tracking",
      "Strategic opportunity flags",
    ],
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
            Built for Platform Leaders
          </h2>
          <p className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Decision intelligence for every role
          </p>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Whether you&apos;re hands-on with architecture or setting strategic direction, 
            CalmFalcon delivers the signals you need.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-3">
          {personas.map((persona) => (
            <div
              key={persona.title}
              className="flex flex-col rounded-xl border border-border bg-card p-8"
            >
              <div className="mb-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <persona.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {persona.title}
                  </h3>
                </div>
                <span className="mt-1 text-sm text-accent">{persona.subtitle}</span>
              </div>

              <p className="flex-1 text-muted-foreground">{persona.description}</p>

              <ul className="mt-6 space-y-3">
                {persona.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
