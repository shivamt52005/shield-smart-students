import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { topics } from "@/lib/content";
import { readProgress, updateProgress } from "@/lib/progress";

export const Route = createFileRoute("/learn/$topic")({
  loader: ({ params }) => {
    const topic = topics.find((t) => t.slug === params.topic);
    if (!topic) throw notFound();
    return topic;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Attack"} explained | Awareness Portal` },
      { name: "description", content: loaderData?.summary ?? "Social engineering attack explained." },
      { property: "og:title", content: `${loaderData?.name ?? "Attack"} explained` },
      { property: "og:description", content: loaderData?.summary ?? "Social engineering attack explained." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TopicPage,
});

function TopicPage() {
  const topic = Route.useLoaderData();
  const [done, setDone] = useState(false);

  useEffect(() => setDone(readProgress().modulesRead.includes(topic.slug)), [topic.slug]);

  function markDone() {
    updateProgress((p) => ({
      ...p,
      modulesRead: p.modulesRead.includes(topic.slug) ? p.modulesRead : [...p.modulesRead, topic.slug],
    }));
    setDone(true);
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link to="/learn">
            <ArrowLeft className="mr-2 h-4 w-4" /> All modules
          </Link>
        </Button>

        <h1 className="text-3xl font-bold">{topic.name}</h1>
        <p className="mt-3 text-muted-foreground">{topic.definition}</p>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">How the attack works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              {topic.how.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Warning signs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {topic.signs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Example</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">{topic.example}</CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">How to stay safe</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {topic.defence.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={markDone} disabled={done}>
            {done ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Completed
              </>
            ) : (
              "Mark as completed"
            )}
          </Button>
          <Button asChild variant="outline">
            <Link to="/simulator">Practise in the simulator</Link>
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
}
