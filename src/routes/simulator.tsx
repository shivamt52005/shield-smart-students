import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { scenarios } from "@/lib/content";
import { updateProgress } from "@/lib/progress";

export const Route = createFileRoute("/simulator")({
  head: () => ({
    meta: [
      { title: "Safe Attack Simulator | Cyber Awareness Portal" },
      {
        name: "description",
        content: "Practise spotting suspicious emails, texts, calls and posters with twelve safe fictional scenarios.",
      },
      { property: "og:title", content: "Safe Attack Simulator" },
      { property: "og:description", content: "Twelve fictional scenarios to practise spotting social engineering." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Simulator,
});

function Simulator() {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<boolean | null>(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const s = scenarios[index];

  function answer(value: boolean) {
    if (choice !== null) return;
    setChoice(value);
    const isRight = value === s.suspicious;
    if (isRight) setCorrect((c) => c + 1);
    updateProgress((p) => ({
      ...p,
      simCorrect: p.simCorrect + (isRight ? 1 : 0),
      simTotal: p.simTotal + 1,
    }));
  }

  function next() {
    if (index + 1 >= scenarios.length) {
      setFinished(true);
      return;
    }
    setIndex(index + 1);
    setChoice(null);
  }

  function restart() {
    setIndex(0);
    setChoice(null);
    setCorrect(0);
    setFinished(false);
  }

  const isRight = choice !== null && choice === s.suspicious;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold">Attack simulator</h1>
        <p className="mt-2 text-muted-foreground">
          Every message below is fictional and harmless. Decide whether it is legitimate or suspicious.
        </p>

        {finished ? (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Simulation complete</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                {correct} / {scenarios.length}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {Math.round((correct / scenarios.length) * 100)}% accuracy. Your result is saved to your dashboard.
              </p>
              <Button className="mt-6" onClick={restart}>
                Try again
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                <span>
                  Scenario {index + 1} of {scenarios.length}
                </span>
                <span>Correct so far: {correct}</span>
              </div>
              <Progress value={((index + (choice !== null ? 1 : 0)) / scenarios.length) * 100} />
            </div>

            <Card className="mt-6">
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg">{s.title}</CardTitle>
                <Badge variant="secondary">{s.channel}</Badge>
              </CardHeader>
              <CardContent>
                <p className="rounded-md border bg-secondary p-4 text-sm">{s.body}</p>

                {choice === null ? (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button onClick={() => answer(false)} variant="outline">
                      Legitimate
                    </Button>
                    <Button onClick={() => answer(true)}>Suspicious</Button>
                  </div>
                ) : (
                  <div className="mt-6 rounded-md border p-4">
                    <p className="flex items-center gap-2 font-medium">
                      {isRight ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-primary" /> Correct
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-destructive" /> Not quite
                        </>
                      )}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{s.explanation}</p>
                    {s.flags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {s.flags.map((f) => (
                          <Badge key={f} variant="outline">
                            {f}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Button className="mt-4" onClick={next}>
                      {index + 1 >= scenarios.length ? "See result" : "Next scenario"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </SiteLayout>
  );
}
