import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, GraduationCap, Flag } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { topics } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cybersecurity Awareness Portal for College Students" },
      {
        name: "description",
        content:
          "Learn to spot phishing, smishing, vishing and other social engineering attacks with lessons, safe simulations and a quiz.",
      },
      { property: "og:title", content: "Cybersecurity Awareness Portal for College Students" },
      {
        property: "og:description",
        content: "Lessons, safe attack simulations and a 15-question quiz on social engineering defence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const stats = [
  { label: "Students trained", value: "1,240" },
  { label: "Simulations completed", value: "3,860" },
  { label: "Threats identified", value: "912" },
  { label: "Reports reviewed", value: "152" },
];

const tips = [
  "Type official web addresses yourself instead of clicking links.",
  "Never share a password or OTP, even with someone who sounds official.",
  "Slow down when a message pushes you to act immediately.",
  "Use a different strong password for each account.",
  "Turn on two-step verification wherever it is offered.",
  "Report anything suspicious to your college IT team.",
];

function Home() {
  return (
    <SiteLayout>
      <section className="border-b bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Social Engineering Defence and Cybersecurity Awareness Portal
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Social engineering is when someone tricks a person, not a computer. This portal helps college
            students recognise those tricks and respond safely.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/learn">Start awareness training</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/quiz">Test your knowledge</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-semibold">Why it matters</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: AlertTriangle,
              title: "People are the easiest target",
              text: "Most attacks succeed because someone was rushed, curious or trying to be helpful.",
            },
            {
              icon: GraduationCap,
              title: "Students are targeted often",
              text: "Fee notices, scholarships, results and internships are used as convincing bait.",
            },
            {
              icon: ShieldCheck,
              title: "Awareness works",
              text: "Knowing the warning signs is enough to stop almost every one of these attacks.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <item.icon className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.text}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-semibold">Attack types you will learn</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((t) => (
            <Link key={t.slug} to="/learn/$topic" params={{ topic: t.slug }}>
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <CardTitle className="text-base">{t.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{t.summary}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-semibold">Safety tips</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {tips.map((tip) => (
            <li key={tip} className="flex gap-2 rounded-md border bg-card p-4 text-sm">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
              {tip}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link to="/simulator">Try the simulator</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/report">
              <Flag className="mr-2 h-4 w-4" /> Report something suspicious
            </Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
