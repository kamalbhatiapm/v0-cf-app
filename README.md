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

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Data Sources                             │
│   GitHub · arXiv · Vendor Releases · Newsletters · RSS Feeds    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Analysis Agent                             │
│   Classification · Scoring · Clustering · Theme Generation      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Insight Generation Agent                       │
│   Summaries · Why It Matters · What You Can Do · Citations      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Verification Agent                           │
│   Citation Check · Confidence Validation · Hallucination Guard  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Weekly Brief                               │
│   Key Takeaway · Themed Clusters · Confidence Scores · Sources  │
└─────────────────────────────────────────────────────────────────┘
```

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
