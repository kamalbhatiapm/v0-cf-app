import Image from "next/image";

export default function LogoOptionsPage() {
  const original = [
    {
      id: 5,
      src: "/logo-option-5.jpg",
      title: "Option 5 (Favorite): Chevron Wings",
      description: "Three stacked chevrons forming an abstract F shape, suggesting falcon wings and signal waves.",
      favorite: true,
    },
  ];

  const newOptions = [
    {
      id: "A",
      src: "/logo-v2-a.jpg",
      title: "Variant A: Double Chevron",
      description: "Two sharp angular chevrons stacked with a gap — bold, minimal, reads as both an F and a falcon diving.",
    },
    {
      id: "B",
      src: "/logo-v2-b.jpg",
      title: "Variant B: Diving Falcon",
      description: "Three overlapping parallelograms forming spread wings and a narrow body in steep dive, conveying speed.",
    },
    {
      id: "C",
      src: "/logo-v2-c.jpg",
      title: "Variant C: Talon Strike",
      description: "A single bold angular mark like a falcon talon — two geometric arms meeting at a sharp point.",
    },
    {
      id: "D",
      src: "/logo-v2-d.jpg",
      title: "Variant D: Symmetrical Wings",
      description: "A symmetrical downward arrow with broad wings spread outward — balanced, confident, and instantly recognizable.",
    },
    {
      id: "E",
      src: "/logo-v2-e.jpg",
      title: "Variant E: Signal Feathers",
      description: "Three horizontal bars with angled cuts, evoking both signal strength bars and layered falcon feathers.",
    },
  ];

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
          CalmFalcon Logo — Chevron Variants
        </h1>
        <p className="mt-4 text-muted-foreground">
          Five new variations inspired by Option 5. Let me know which one to apply to the site.
        </p>

        <div className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-4">
          <p className="text-sm text-accent font-medium">Your favorite — Option 5</p>
        </div>

        <div className="mt-4 grid gap-8 md:grid-cols-1">
          {original.map((option) => (
            <div
              key={option.id}
              className="group overflow-hidden rounded-xl border-2 border-accent bg-card"
            >
              <div className="relative h-64 bg-black">
                <Image
                  src={option.src}
                  alt={option.title}
                  fill
                  className="object-contain p-8"
                />
              </div>
              <div className="p-6">
                <h2 className="font-semibold text-accent">{option.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-semibold text-foreground">New Variations</h2>
        <p className="mt-2 text-sm text-muted-foreground">All inspired by the chevron / geometric wing direction.</p>

        <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newOptions.map((option) => (
            <div
              key={option.id}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent"
            >
              <div className="relative aspect-square bg-black">
                <Image
                  src={option.src}
                  alt={option.title}
                  fill
                  className="object-contain p-8"
                />
              </div>
              <div className="p-6">
                <h2 className="font-semibold text-foreground">{option.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
