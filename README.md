# CalmFalcon

AI-powered signal intelligence platform that monitors, scores, and synthesizes the most important AI infrastructure signals into a weekly executive brief.

> Built with Next.js 16, Supabase, and Tailwind CSS. Deployed on Vercel.

---

## Overview

CalmFalcon runs a multi-agent pipeline that continuously processes signals from across the AI ecosystem — GitHub releases, arXiv papers, vendor announcements, and newsletters — and surfaces the themes that matter most to AI platform teams. Each week, it produces a structured digest with confidence scores, "why it matters" analysis, and actionable platform implications.

---

## Features

- **Analysis Agent** — Classifies, scores, and clusters incoming signals by domain, velocity, and confidence
- **Insight Generation Agent** — Produces citation-backed summaries with platform implications and watchlist recommendations
- **Verification Agent** — Validates citation coverage and prevents hallucination before publishing
- **Weekly Brief** — Key takeaway, top themes, and supporting signals in one structured view
- **Historical Week Picker** — Browse and compare themes across previous weeks
- **Auth** — Signup with email confirmation, protected dashboard, and user profiles

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth with email confirmation |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

---

## Database Schema

| Table | Description |
|---|---|
| `themes` | All themes across all weeks with scores, summaries, and citations |
| `current_week_themes` | View of the latest week's themes |
| `weekly_briefs` | Generated weekly briefs including key takeaway and content |
| `pipeline_runs` | Pipeline execution metadata and signal counts per run |
| `profiles` | User profiles (full name, company) linked to Supabase Auth |
| `eval_reports` | Quality evaluation reports for pipeline runs |
| `prompt_versions` | Versioned prompts for each agent |
| `feedback` | User feedback submissions |

---

## Project Structure

```
app/
  page.tsx                    # Landing page
  dashboard/page.tsx          # Protected dashboard
  auth/
    sign-up/page.tsx          # Signup form (name, company, email, password)
    login/page.tsx            # Login form
    sign-up-success/page.tsx  # Post-signup email confirmation screen
    error/page.tsx            # Auth error fallback
  api/
    themes/route.ts           # API route for fetching themes by week/year

components/
  dashboard/
    dashboard-tabs.tsx        # Tabs + week picker dropdown
    dashboard-header.tsx      # Dashboard title and pipeline run info
    signal-stats.tsx          # Stats cards (signals, themes, confidence)
    themes-list.tsx           # Expandable theme cards with glow interactions
    weekly-brief.tsx          # Weekly brief with key takeaway section
  header.tsx                  # Site header with auth-aware nav
  features.tsx                # Three-agent feature section
  hero.tsx                    # Landing hero
  how-it-works.tsx            # Process explanation section
  use-cases.tsx               # Target audience use cases
  pricing.tsx                 # Pricing tiers
  cta.tsx                     # Call to action
  footer.tsx                  # Site footer

lib/
  supabase/
    client.ts                 # Browser Supabase client
    server.ts                 # Server Supabase client
    middleware.ts             # Session refresh helper

middleware.ts                 # Protects /dashboard, refreshes auth tokens

scripts/
  001_create_profiles.sql     # Creates profiles table with RLS policies
  002_profile_trigger.sql     # Auto-populates profiles on new user signup
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Vercel](https://vercel.com) account (for deployment)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kamalbhatiapm/v0-cf-app.git
   cd v0-cf-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/dashboard
   ```

4. **Run database migrations** in your Supabase SQL Editor, in order:
   - `scripts/001_create_profiles.sql`
   - `scripts/002_profile_trigger.sql`

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

---

## Deploying to Vercel

1. Push to GitHub and import the repository at [vercel.com/new](https://vercel.com/new)
2. Add the following environment variables in Vercel project settings:

   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
   | `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` | `https://yourdomain.com/dashboard` |

3. Deploy and connect your custom domain under **Settings → Domains**

---

## Authentication Flow

1. User signs up at `/auth/sign-up` with full name, company, email, and password
2. Supabase sends a confirmation email with a link back to `/dashboard`
3. User confirms their email and is redirected to the protected dashboard
4. The `profiles` table is auto-populated via a database trigger on signup
5. Unauthenticated users visiting `/dashboard` are redirected to `/auth/login`

---

## Email Confirmation Template

To enhance the Supabase confirmation email, go to **Supabase Dashboard → Authentication → Email Templates → Confirm signup** and replace the default HTML with a custom branded template. Use `{{ .ConfirmationURL }}` as the confirmation link placeholder.

---

## Continue Developing

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below — start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0](https://v0.app/chat/projects/prj_IF70HHieXVKYFxfnxCWuqVOr7lzW)

---

## License

Private — all rights reserved.

