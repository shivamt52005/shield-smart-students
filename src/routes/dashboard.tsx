import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { attackStats, sampleReports, sampleStudents, topics } from "@/lib/content";
import { readProgress, type Progress as P } from "@/lib/progress";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Awareness Dashboard | Cyber Awareness Portal" },
      {
        name: "description",
        content: "Track quiz scores, simulator accuracy, class leaderboard and reported incident statistics.",
      },
      { property: "og:title", content: "Cybersecurity Awareness Dashboard" },
      { property: "og:description", content: "Progress, leaderboard and reported incident statistics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const empty: P = { modulesRead: [], quizScores: [], simCorrect: 0, simTotal: 0, reports: 0 };

function Dashboard() {
  const [p, setP] = useState<P>(empty);
  useEffect(() => setP(readProgress()), []);

  const bestQuiz = p.quizScores.length ? Math.max(...p.quizScores) : 0;
  const simAccuracy = p.simTotal ? Math.round((p.simCorrect / p.simTotal) * 100) : 0;
  const readPercent = Math.round((p.modulesRead.length / topics.length) * 100);
  const maxReports = Math.max(...attackStats.map((a) => a.reports));

  const cards = [
    { label: "Lessons read", value: `${p.modulesRead.length} / ${topics.length}`, pct: readPercent },
    { label: "Best quiz score", value: `${bestQuiz}%`, pct: bestQuiz },
    { label: "Simulator accuracy", value: `${simAccuracy}%`, pct: simAccuracy },
    { label: "Reports submitted", value: `${p.reports}`, pct: Math.min(p.reports * 20, 100) },
  ];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold">Awareness dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Your own progress is stored on this device. Leaderboard and incident figures are sample data for this
          college project.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              <CardTitle>Reported attacks this semester</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {attackStats.map((a) => (
                <div key={a.type}>
                  <div className="flex justify-between text-sm">
                    <span>{a.type}</span>
                    <span className="text-muted-foreground">{a.reports}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${(a.reports / maxReports) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent reports</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {sampleReports.map((r) => (
                  <li key={r.summary} className="flex items-start justify-between gap-3 py-3 text-sm">
                    <div>
                      <p className="font-medium">{r.type}</p>
                      <p className="text-muted-foreground">{r.summary}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <Badge variant="outline">{r.status}</Badge>
                      <p className="mt-1 text-xs text-muted-foreground">{r.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Class leaderboard (sample)</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="py-2 pr-4">#</th>
                  <th className="py-2 pr-4">Student</th>
                  <th className="py-2 pr-4">Department</th>
                  <th className="py-2 pr-4">Quiz</th>
                  <th className="py-2 pr-4">Simulator</th>
                  <th className="py-2">Points</th>
                </tr>
              </thead>
              <tbody>
                {sampleStudents.map((s, i) => (
                  <tr key={s.name} className="border-b last:border-0">
                    <td className="py-2 pr-4">{i + 1}</td>
                    <td className="py-2 pr-4 font-medium">{s.name}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{s.dept}</td>
                    <td className="py-2 pr-4">{s.quiz}%</td>
                    <td className="py-2 pr-4">{s.sims}%</td>
                    <td className="py-2">{s.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </SiteLayout>
  );
}
