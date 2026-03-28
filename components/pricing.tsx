import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Individual",
    price: "$250",
    period: "/month",
    description: "For platform teams making critical decisions.",
    features: [
      "Daily signal updates",
      "Unlimited theme clusters",
      "Advanced scoring & deltas",
      "Executive-ready briefs",
      "Custom watchlists",
      "Priority support",
    ],
    cta: "Subscribe Now",
    highlighted: false,
  },
  {
    name: "Team",
    price: "$199",
    period: "/seat/month",
    description: "For growing teams (3+ users).",
    features: [
      "Everything in Individual",
      "Multi-user collaboration",
      "Team watchlists & alerts",
      "Advanced permissions",
      "Shared dashboards",
      "Team analytics",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced needs.",
    features: [
      "Everything in Team",
      "Custom source integration",
      "Private taxonomy tuning",
      "SSO & advanced security",
      "Dedicated success manager",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border bg-card/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
            Pricing
          </h2>
          <p className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Choose your signal intelligence plan
          </p>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Start free, scale as you grow. All plans include our core 
            multi-agent intelligence pipeline.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-xl border p-8 ${
                tier.highlighted
                  ? "border-accent bg-background shadow-lg shadow-accent/10"
                  : "border-border bg-background"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  {tier.period && (
                    <span className="ml-1 text-muted-foreground">{tier.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 shrink-0 text-accent" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.highlighted ? "default" : "outline"}
                className="w-full"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
