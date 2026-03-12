import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Geometric Falcon Diving - Simplified v2-b Style */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        {/* Left wing - upper parallelogram */}
        <path
          d="M 4 8 L 12 4 L 14 10 L 6 14 Z"
          fill="currentColor"
          className="text-accent"
        />
        {/* Right wing - upper parallelogram */}
        <path
          d="M 18 10 L 20 4 L 28 8 L 26 14 Z"
          fill="currentColor"
          className="text-accent"
        />
        {/* Center body - narrow pointing down */}
        <path
          d="M 14 12 L 18 12 L 16 26 L 14 26 Z"
          fill="currentColor"
          className="text-accent"
        />
        {/* Falcon head - small pentagon at top right */}
        <path
          d="M 22 10 L 26 12 L 25 16 L 21 15 Z"
          fill="currentColor"
          className="text-accent"
        />
        {/* Eye dot */}
        <circle cx="23.5" cy="12.5" r="1" fill="currentColor" className="text-accent" />
      </svg>

      {!iconOnly && (
        <span className="text-lg font-semibold tracking-tight text-foreground font-sans">
          CalmFalcon<span className="text-accent">.ai</span>
        </span>
      )}
    </div>
  );
}
