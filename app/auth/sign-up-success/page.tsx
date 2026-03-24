import Link from "next/link";
import { Mail } from "lucide-react";

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(127,200,255)]/10">
          <Mail className="h-8 w-8 text-[rgb(127,200,255)]" />
        </div>

        <h1 className="text-3xl font-bold text-foreground">Check your email</h1>
        <p className="mt-3 text-muted-foreground">
          We've sent you a confirmation link. Click the link in your email to
          activate your account and access the dashboard.
        </p>

        <div className="mt-8 rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or{" "}
            <Link
              href="/auth/sign-up"
              className="text-[rgb(127,200,255)] hover:underline"
            >
              try again
            </Link>
            .
          </p>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          <Link
            href="/auth/login"
            className="text-[rgb(127,200,255)] hover:underline"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
