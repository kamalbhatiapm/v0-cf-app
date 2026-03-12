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
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Lower chevron arrow shape */}
        <polygon
          points="2,18 10,10 18,10 10,18 18,26 10,26"
          fill="currentColor"
          className="text-accent"
        />
        {/* Upper chevron arrow shape - offset */}
        <polygon
          points="10,6 18,0 26,0 18,8 26,16 18,16"
          fill="currentColor"
          className="text-accent"
        />
        {/* Falcon head - geometric trapezoid/pentagon shape */}
        <polygon
          points="26,4 28,6 27,10 24,8"
          fill="currentColor"
          className="text-accent"
        />
        {/* Falcon eye dot */}
        <circle cx="27" cy="6" r="1.2" fill="currentColor" className="text-accent" />
      </svg>

      {!iconOnly && (
        <span className="text-lg font-semibold tracking-tight text-foreground font-sans">
          CalmFalcon<span className="text-accent">.ai</span>
        </span>
      )}
    </div>
  );
}
