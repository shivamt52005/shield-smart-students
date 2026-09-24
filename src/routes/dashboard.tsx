import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { topics } from "@/lib/content";
import { emptyProgress, readProgress, type Progress as P } from "@/lib/progress";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Awareness Dashboard | Cyber Awareness Portal" },
      {
        name: "description",
        content: "Track your lessons read, quiz scores, simulator accuracy and the reports you have submitted.",
      },
      { property: "og:title", content: "Cybersecurity Awareness Dashboard" },
      { property: "og:description", content: "Your own progress, quiz history and reported incidents." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [p, setP] = useState<P>(emptyProgress);
  useEffect(() => setP(readProgress()), []);

  const bestQuiz = p.quizScores.length ? Math.max(...p.quizScores) : 0;
  const simAccuracy = p.simTotal ? Math.round((p.simCorrect / p.simTotal) * 100) : 0;
  const readPercent = Math.round((p.modulesRead.length / topics.length) * 100);

  const cards = [
    { label: "Lessons read", value: `${p.modulesRead.length} / ${topics.length}`, pct: readPercent },
    { label: "Best quiz score", value: `${bestQuiz}%`, pct: bestQuiz },
    { label: "Simulator accuracy", value: `${simAccuracy}%`, pct: simAccuracy },
    { label: "Reports submitted", value: `${p.reports.length}`, pct: Math.min(p.reports.length * 20, 100) },
  ];

  const counts = new Map<string, number>();
  for (const r of p.reports) counts.set(r.type, (counts.get(r.type) ?? 0) + 1);
  const byType = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const maxCount = byType.length ? byType[0]![1] : 1;

  const awareness = Math.round((readPercent + bestQuiz + simAccuracy) / 3);
  const level =
    awareness >= 90
      ? "Cyber safety expert"
      : awareness >= 70
        ? "Security aware"
        : awareness >= 50
          ? "Needs improvement"
          : "Getting started";

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold">Awareness dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Everything here comes from your own activity and is stored on this device.
        </p>

        <Card className="mt-8">
          <CardContent className="flex flex-wrap items-center justify-between gap-4 pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Overall awareness score</p>
              <p className="text-3xl font-bold text-primary">{awareness}%</p>
            </div>
            <Badge variant="outline" className="text-sm">
              {level}
            </Badge>
          </CardContent>
        </Card>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Card key={c.label}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{c.label}</p>
                <p className="mt-1 text-2xl font-bold text-primary">{c.value}</p>
                <Progress className="mt-3" value={c.pct} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Attack types you reported</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {byType.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No reports yet. Once you submit one, the breakdown appears here.
                </p>
              ) : (
                byType.map(([type, count]) => (
                  <div key={type}>
                    <div className="flex justify-between text-sm">
                      <span>{type}</span>
                      <span className="text-muted-foreground">{count}</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-secondary">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${(count / maxCount) * 100}%` }} />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your recent reports</CardTitle>
            </CardHeader>
            <CardContent>
              {p.reports.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  <p>You have not reported anything yet.</p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link to="/report">Report something suspicious</Link>
                  </Button>
                </div>
              ) : (
                <ul className="divide-y">
                  {p.reports.slice(0, 5).map((r) => (
                    <li key={r.id} className="flex items-start justify-between gap-3 py-3 text-sm">
                      <div>
                        <p className="font-medium">{r.type}</p>
                        <p className="whitespace-pre-wrap text-muted-foreground">{r.details}</p>
                      </div>
                      <p className="shrink-0 text-xs text-muted-foreground">{r.date}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your quiz attempts</CardTitle>
          </CardHeader>
          <CardContent>
            {p.quizScores.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                <p>No quiz attempts yet.</p>
                <Button asChild variant="outline" className="mt-4">
                  <Link to="/quiz">Take the quiz</Link>
                </Button>
              </div>
            ) : (
              <ul className="divide-y text-sm">
                {p.quizScores.map((s, i) => (
                  <li key={`${s}-${i}`} className="flex justify-between py-2">
                    <span>Attempt {i + 1}</span>
                    <span className="font-medium">{s}%</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </SiteLayout>
  );
}
