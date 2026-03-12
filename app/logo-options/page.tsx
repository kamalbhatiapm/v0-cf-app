import Image from "next/image";

export default function LogoOptionsPage() {
  const options = [
    {
      id: 1,
      src: "/logo.jpg",
      title: "Option 1: Geometric Falcon",
      description: "Sharp angular falcon silhouette in flight, formed from clean geometric lines suggesting speed and precision.",
    },
    {
      id: 2,
      src: "/logo-option-2.jpg",
      title: "Option 2: Single Line Falcon",
      description: "Elegant continuous line forming a stylized falcon head in profile, flowing and calm.",
    },
    {
      id: 3,
      src: "/logo-option-3.jpg",
      title: "Option 3: Hexagonal Facets",
      description: "Abstract hexagonal shape with triangular facets forming a falcon, suggesting data and signals.",
    },
    {
      id: 4,
      src: "/logo-option-4.jpg",
      title: "Option 4: Falcon Eye",
      description: "Minimalist falcon eye representing observation and signal intelligence, ultra-iconic.",
    },
    {
      id: 5,
      src: "/logo-option-5.jpg",
      title: "Option 5: Chevron Wings",
      description: "Three stacked chevrons forming an abstract F shape, suggesting falcon wings and signal waves.",
    },
  ];

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
          CalmFalcon Logo Options
        </h1>
        <p className="mt-4 text-muted-foreground">
          Select your preferred logo design. Let me know which one you like best.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => (
            <div
              key={option.id}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent"
            >
              <div className="relative aspect-square bg-black p-8">
                <Image
                  src={option.src}
                  alt={option.title}
                  fill
                  className="object-contain p-8"
                />
              </div>
              <div className="p-6">
                <h2 className="font-semibold text-foreground">{option.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold text-foreground">Current SVG Logo</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This is the vector logo currently used in the header and footer.
          </p>
          <div className="mt-6 flex items-center gap-8">
            <div className="rounded-lg bg-background p-4">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
              >
                <path
                  d="M8 28L20 8L32 28"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                />
                <path
                  d="M12 24L20 12L28 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                />
                <path
                  d="M20 28V20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-accent"
                />
                <circle
                  cx="20"
                  cy="14"
                  r="2"
                  fill="currentColor"
                  className="text-accent"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Geometric falcon with layered wing shapes and a centered body.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
