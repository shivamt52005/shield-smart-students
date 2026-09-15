import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { attackTypeNames, sampleReports } from "@/lib/content";
import { updateProgress } from "@/lib/progress";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report a Suspicious Message | Cyber Awareness Portal" },
      {
        name: "description",
        content: "Practise reporting a suspicious email, text or call. Demonstration form with no data sent anywhere.",
      },
      { property: "og:title", content: "Report a Suspicious Message" },
      { property: "og:description", content: "A practice reporting form for students, with sample past reports." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  const [type, setType] = useState(attackTypeNames[0]);
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    updateProgress((p) => ({ ...p, reports: p.reports + 1 }));
    setSent(true);
  }

  function again() {
    setDetails("");
    setType(attackTypeNames[0]);
    setSent(false);
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold">Report a suspicious message</h1>
        <p className="mt-2 text-muted-foreground">
          This is a practice form for the awareness portal. Nothing is sent anywhere. Never paste a password or OTP
          into any form, including this one.
        </p>

        {sent ? (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" /> Report recorded
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Well done. In a real incident you would also inform your college IT helpdesk, and delete or block the
                sender. Your report count has been added to your dashboard.
              </p>
              <Button className="mt-6" onClick={again}>
                Report another
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Report details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={submit}>
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="type">
                    What kind of attack was it?
                  </label>
                  <select
                    id="type"
                    className="h-10 rounded-md border bg-background px-3 text-sm"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    {attackTypeNames.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="details">
                    What happened?
                  </label>
                  <textarea
                    id="details"
                    required
                    rows={5}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Describe the message or call. Do not include passwords or OTPs."
                    className="rounded-md border bg-background p-3 text-sm"
                  />
                </div>

                <Button type="submit" className="justify-self-start">
                  Submit report
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent reports (sample)</CardTitle>
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
    </SiteLayout>
  );
}
