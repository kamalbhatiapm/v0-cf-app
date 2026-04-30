# CalmFalcon

AI-powered signal intelligence platform that monitors, scores, and synthesizes the most important AI infrastructure signals into a weekly executive brief.

---

## What is CalmFalcon?

CalmFalcon continuously processes signals from across the AI ecosystem — GitHub releases, arXiv papers, vendor announcements, and top newsletters — and surfaces the themes that matter most. Each week, it produces a structured digest with confidence scores, "why it matters" analysis, and actionable platform implications.

Instead of tracking 50+ raw signals, you get 5 prioritized themes with context.

---

## Who is it for?

| Persona | Use Case |
|---|---|
| **AI Platform Leaders** | Stay ahead of infrastructure shifts without drowning in noise. Get weekly briefings that highlight what's accelerating, what's cooling, and what needs attention. |
| **Engineering Managers** | Understand which emerging tools and frameworks are gaining traction so you can make informed build-vs-buy decisions. |
| **Technical PMs** | Translate signal intelligence into roadmap priorities with confidence-backed recommendations. |
| **Strategy & Research Teams** | Track competitive landscape shifts and emerging patterns across the AI ecosystem. |

---

## How It Works

CalmFalcon runs a three-agent pipeline:

1. **Analysis Agent** — Ingests signals from multiple sources, classifies them by domain (Inference, Agents, Governance), computes velocity and confidence scores, and clusters related signals into cohesive themes.

2. **Insight Generation Agent** — Produces citation-backed summaries for each theme with "Why It Matters" explanations, platform implications, and watchlist recommendations.

3. **Verification Agent** — Validates citation coverage, checks confidence justification, and prevents hallucination before anything is published.

---

## Key Features

- **Weekly Brief** — Key takeaway, top themes, and supporting signals in one structured view
- **Theme Cards** — Expandable cards with summaries, action items, and source citations
- **Historical Comparison** — Browse and compare themes across previous weeks
- **Signal Scoring** — Each theme is labeled as Breakout, Accelerating, Rising, Stable, or Cooling
- **Citation Transparency** — Every insight links back to its source material

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Deployment | Vercel |

---

## Frontend Architecture

### Project Structure

```
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Landing page (marketing)
│   ├── auth/                     # Authentication pages
│   │   ├── login/page.tsx        # Login form
│   │   ├── sign-up/page.tsx      # Registration form
│   │   ├── sign-up-success/      # Email confirmation page
│   │   ├── callback/route.ts     # OAuth callback handler
│   │   └── error/page.tsx        # Auth error display
│   ├── dashboard/page.tsx        # Main app dashboard
│   └── api/                      # API routes
│       └── themes/route.ts       # Themes data endpoint
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui primitives (40+ components)
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── dashboard-header.tsx
│   │   ├── dashboard-tabs.tsx
│   │   ├── signal-stats.tsx
│   │   ├── themes-list.tsx
│   │   └── weekly-brief.tsx
│   ├── hero.tsx                  # Landing page hero section
│   ├── features.tsx              # Features section
│   ├── pricing.tsx               # Pricing cards
│   ├── cta.tsx                   # Call-to-action section
│   ├── header.tsx                # Global navigation
│   ├── footer.tsx                # Global footer
│   ├── scroll-animate.tsx        # Scroll-triggered animations
│   └── count-up.tsx              # Number animation component
│
├── hooks/                        # Custom React hooks
│   ├── use-auth-state.ts         # Supabase auth state
│   ├── use-mobile.ts             # Responsive breakpoint detection
│   └── use-toast.ts              # Toast notifications
│
├── lib/                          # Utility libraries
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client
│   │   ├── server.ts             # Server Supabase client
│   │   └── middleware.ts         # Auth middleware helpers
│   └── utils.ts                  # Shared utilities (cn, etc.)
│
└── middleware.ts                 # Next.js middleware (auth guards)
```

### Component Architecture

**Composition Pattern**
- Components are split by responsibility: layout, UI primitives, feature-specific
- Landing page sections are self-contained with their own data and styling
- Dashboard components receive data via props from the page level

**Styling Approach**
- Tailwind CSS v4 with CSS variables for theming
- Design tokens defined in `globals.css` for consistent colors, spacing, radii
- Dark mode by default with semantic color tokens (`--foreground`, `--background`, etc.)

**State Management**
- Server Components for static content (landing pages)
- Client Components for interactivity (forms, animations, auth state)
- Supabase client for auth state via `useAuthState` hook
- No global state library — component-local state with React hooks

### Authentication Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Sign Up    │────▶│   Supabase   │────▶│  Dashboard   │
│    Form      │     │     Auth     │     │   Redirect   │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │
       ▼                    ▼
┌──────────────┐     ┌──────────────┐
│  Validation  │     │  Middleware  │
│  (client)    │     │  (server)    │
└──────────────┘     └──────────────┘
```

- **Client-side validation** — Email format, password strength (8+ chars, uppercase, number)
- **Supabase Auth** — Handles user creation, session management, tokens
- **Middleware** — Protects `/dashboard` routes, redirects unauthenticated users

### Animation System

- `ScrollAnimate` component wraps sections for viewport-triggered animations
- `CountUp` component animates numeric values on scroll
- CSS keyframes defined in `globals.css` (`fade-up`, `scale-in`, `slide-left`)
- Respects `prefers-reduced-motion` for accessibility

### UI Component Library

Built on shadcn/ui with 40+ components including:
- Form controls: Button, Input, Select, Checkbox, Radio, Switch
- Layout: Card, Dialog, Sheet, Drawer, Tabs, Accordion
- Feedback: Toast, Alert, Skeleton, Spinner, Progress
- Navigation: Navigation Menu, Dropdown, Command Palette

---

## Signal Types

| Type | Description |
|---|---|
| **Breakout** | New signal with rapid early adoption and high velocity |
| **Accelerating** | Established signal gaining momentum across multiple sources |
| **Rising** | Emerging signal showing consistent upward trend |
| **Stable** | Mature signal with steady, predictable activity |
| **Cooling** | Previously active signal showing declining interest |

---

## License

Private — all rights reserved.
