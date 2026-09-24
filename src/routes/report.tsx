import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Trash2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { attackTypeNames } from "@/lib/content";
import { readProgress, updateProgress, type ReportEntry } from "@/lib/progress";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report a Suspicious Message | Cyber Awareness Portal" },
      {
        name: "description",
        content: "Record a suspicious email, text or call. Your reports are saved on your own device.",
      },
      { property: "og:title", content: "Report a Suspicious Message" },
      { property: "og:description", content: "Record suspicious messages and review your own report history." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  const [type, setType] = useState(attackTypeNames[0]!);
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);
  const [reports, setReports] = useState<ReportEntry[]>([]);

  useEffect(() => setReports(readProgress().reports), []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const entry: ReportEntry = {
      id: `${Date.now()}`,
      date: new Date().toLocaleDateString(undefined, { day: "2-digit", month: "short" }),
      type,
      details: details.trim(),
    };
    const next = updateProgress((p) => ({ ...p, reports: [entry, ...p.reports] }));
    setReports(next.reports);
    setSent(true);
  }

  function again() {
    setDetails("");
    setType(attackTypeNames[0]!);
    setSent(false);
  }

  function remove(id: string) {
    const next = updateProgress((p) => ({ ...p, reports: p.reports.filter((r) => r.id !== id) }));
    setReports(next.reports);
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold">Report a suspicious message</h1>
        <p className="mt-2 text-muted-foreground">
          Your reports are saved on this device only. Never paste a password or OTP into any form, including this
          one.
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
                sender. Your report is now listed below and on your dashboard.
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
            <CardTitle>Your reports ({reports.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {reports.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                You have not reported anything yet. Submitted reports will appear here.
              </p>
            ) : (
              <ul className="divide-y">
                {reports.map((r) => (
                  <li key={r.id} className="flex items-start justify-between gap-3 py-3 text-sm">
                    <div>
                      <p className="font-medium">{r.type}</p>
                      <p className="whitespace-pre-wrap text-muted-foreground">{r.details}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <Badge variant="outline">{r.date}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(r.id)}
                        aria-label="Delete this report"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
