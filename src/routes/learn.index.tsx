import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { topics } from "@/lib/content";
import { readProgress } from "@/lib/progress";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "Learn Social Engineering Attacks | Awareness Portal" },
      {
        name: "description",
        content: "Eight short lessons on phishing, smishing, vishing, pretexting, baiting, impersonation and more.",
      },
      { property: "og:title", content: "Learn Social Engineering Attacks" },
      { property: "og:description", content: "Short lessons on the eight most common social engineering attacks." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearnIndex,
});

function LearnIndex() {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => setDone(readProgress().modulesRead), []);
  const pct = Math.round((done.length / topics.length) * 100);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold">Learning modules</h1>
        <p className="mt-2 text-muted-foreground">
          Open each module to see how the attack works, what to watch for and how to stay safe.
        </p>

        <div className="mt-6 max-w-md">
          <div className="mb-2 flex justify-between text-sm">
            <span>Your progress</span>
            <span>
              {done.length} of {topics.length}
            </span>
          </div>
          <Progress value={pct} />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <Link key={t.slug} to="/learn/$topic" params={{ topic: t.slug }}>
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader className="flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg">{t.name}</CardTitle>
                  {done.includes(t.slug) && <Check className="h-5 w-5 text-primary" />}
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{t.summary}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
