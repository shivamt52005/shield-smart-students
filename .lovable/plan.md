# Social Engineering Defence & Cybersecurity Awareness Portal

A complete, responsive awareness portal for college students: learning modules, safe attack simulations, a 15-question quiz, student and admin dashboards, suspicious-message reporting, and gamification.

Since the questions were skipped, I'll build it in **demo mode**: realistic built-in sample students, quiz results, reports and statistics, with simple simulated login/registration and progress saved in the browser. Nothing resets between visits on the same device, and real accounts can be added later.

## Look and feel

Dark professional cybersecurity theme with blue and purple accents, soft glows, glass-style cards, and smooth hover/entry animations. Clean sans-serif typography, strong contrast, clear top navigation with a mobile menu. Institutional, not hacker/terminal.

## Pages

1. **Home** — hero with title, plain-language explanation of social engineering, "Start Awareness Training" and "Test Your Knowledge" buttons; animated counters for students trained, simulations completed, threats identified; why it's dangerous; the 8 attack types; safety tips; footer.
2. **Learn** — cards for Phishing, Smishing, Vishing, Pretexting, Baiting, Impersonation, Tailgating, Quid Pro Quo. Each opens a detail view with definition, how the attack works, warning signs, a fictional example, and defence steps. Completion tick per module plus an overall progress bar.
3. **Simulator** — 10+ safe fictional scenarios (fake college email, scholarship, internship offer, bank message, OTP request, social-media message, phone call, QR poster). Student picks "Legitimate" or "Suspicious", then gets an explanation with the red flags highlighted. Results feed the dashboard. No real credential, OTP or payment fields anywhere.
4. **Quiz** — 15 multiple-choice questions, one at a time, progress bar, instant correct/incorrect feedback with explanation, final score, percentage and awareness rating (Expert / Security Aware / Needs Improvement / High Risk). Retake supported.
5. **Student Dashboard** — name, awareness score, modules completed, quiz scores over time, simulation accuracy, overall progress, badges earned, recent activity, recommended next training. Charts: progress line, topic-strength bars, completion donut.
6. **Report Suspicious Activity** — form with message text, suspected attack type, why it looks suspicious, optional screenshot attachment, validation, and a confirmation screen with an educational verdict. Warning banner telling students never to share passwords or OTPs.
7. **Admin Dashboard** — totals for registered students, training completions, average quiz score, reports received, most common attack type; performance chart; sortable student table and recent reports table with detail view.
8. **Leaderboard** — ranked students by points, with badges and awareness level.
9. **Login / Register** — student registration, student login, admin login, logout; students land on the student dashboard, admins on the admin dashboard. Demo credentials shown on the page.

## Gamification

Points for completing modules, simulation answers and quiz attempts; awareness levels; progress bars; badges (Security Rookie, Phishing Detective, Cyber Guardian, Social Engineering Expert and more) with earned/locked states and unlock toasts.

## Technical notes

- TanStack Start routes: `/`, `/learn`, `/learn/$topic`, `/simulator`, `/quiz`, `/dashboard`, `/report`, `/admin`, `/leaderboard`, `/login`, `/register`, each with its own page title and description.
- Dark-first design tokens in `src/styles.css` (blue/purple accents, glow and gradient tokens); shadcn components for cards, tabs, tables, forms, dialogs; Recharts for charts; Motion for animations.
- Seed data module with ~25 sample students, quiz history, simulation results and reports so every dashboard looks populated immediately.
- Progress and session stored in browser local storage behind a small context/provider; route guards redirect signed-out visitors to login and non-admins away from `/admin`.
- Screenshot upload is preview-only in demo mode (file stays on the device).
