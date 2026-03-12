import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Geometric Falcon with Double Chevron - v2-b Style */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Lower chevron arrow shape - wider spacing */}
        <polygon
          points="4,20 14,12 24,12 14,20 24,28 14,28"
          fill="currentColor"
          className="text-accent"
        />
        {/* Upper chevron arrow shape - offset and larger */}
        <polygon
          points="12,6 22,0 32,0 22,10 32,20 22,20"
          fill="currentColor"
          className="text-accent"
        />
        {/* Falcon head - geometric trapezoid/pentagon shape */}
        <polygon
          points="30,4 33,7 31,12 28,9"
          fill="currentColor"
          className="text-accent"
        />
        {/* Falcon eye dot */}
        <circle cx="31.5" cy="7" r="1.5" fill="currentColor" className="text-accent" />
      </svg>

      {!iconOnly && (
        <span className="text-lg font-semibold tracking-tight text-foreground font-sans">
          CalmFalcon<span className="text-accent">.ai</span>
        </span>
      )}
    </div>
  );
}
