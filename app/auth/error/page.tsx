import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>

        <h1 className="text-3xl font-bold text-foreground">
          Authentication Error
        </h1>
        <p className="mt-3 text-muted-foreground">
          Something went wrong during authentication. This could be due to an
          expired or invalid link.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/auth/login"
            className="rounded-lg bg-[rgb(127,200,255)] px-4 py-2.5 text-sm font-medium text-background hover:bg-[rgb(100,180,240)] transition-colors"
          >
            Try signing in again
          </Link>
          <Link
            href="/auth/sign-up"
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-card transition-colors"
          >
            Create a new account
          </Link>
        </div>
      </div>
    </div>
  );
}
