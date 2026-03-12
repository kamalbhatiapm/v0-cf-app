import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Falcon icon mark */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Falcon silhouette — geometric, angular, wing swept back */}
        {/* Body */}
        <path
          d="M16 4 L20 13 L28 10 L22 17 L26 28 L16 22 L6 28 L10 17 L4 10 L12 13 Z"
          fill="currentColor"
          className="text-accent"
          opacity="0.15"
        />
        {/* Left wing sweep */}
        <path
          d="M16 7 L4 11 L10 16.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        />
        {/* Right wing sweep */}
        <path
          d="M16 7 L28 11 L22 16.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        />
        {/* Body — head to tail */}
        <path
          d="M16 4 L18.5 12 L16 27 L13.5 12 Z"
          fill="currentColor"
          className="text-accent"
        />
        {/* Wing detail left */}
        <path
          d="M13.5 12 L4 11 L10 16.5 L13.5 18"
          fill="currentColor"
          className="text-accent"
          opacity="0.6"
        />
        {/* Wing detail right */}
        <path
          d="M18.5 12 L28 11 L22 16.5 L18.5 18"
          fill="currentColor"
          className="text-accent"
          opacity="0.6"
        />
        {/* Head dot */}
        <circle cx="16" cy="4.5" r="1.5" fill="currentColor" className="text-accent" />
      </svg>

      {!iconOnly && (
        <span className="text-lg font-semibold tracking-tight text-foreground font-sans">
          CalmFalcon<span className="text-accent">.ai</span>
        </span>
      )}
    </div>
  );
}
