import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { quiz } from "@/lib/content";
import { updateProgress } from "@/lib/progress";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Awareness Quiz | Cyber Awareness Portal" },
      {
        name: "description",
        content: "Answer 15 questions on phishing, smishing, vishing and other social engineering attacks.",
      },
      { property: "og:title", content: "Cybersecurity Awareness Quiz" },
      { property: "og:description", content: "A 15-question quiz on social engineering defence for students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quiz[index];

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= quiz.length) {
      const final = Math.round((score / quiz.length) * 100);
      updateProgress((p) => ({ ...p, quizScores: [...p.quizScores, final] }));
      setFinished(true);
      return;
    }
    setIndex(index + 1);
    setPicked(null);
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  }

  const percent = Math.round((score / quiz.length) * 100);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold">Awareness quiz</h1>
        <p className="mt-2 text-muted-foreground">
          Fifteen questions with an explanation after every answer. Your score is saved to your dashboard.
        </p>

        {finished ? (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quiz complete</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                {score} / {quiz.length}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {percent}% —{" "}
                {percent >= 80
                  ? "Excellent awareness. Keep it up."
                  : percent >= 50
                    ? "A good start. Revisit the learning pages for the topics you missed."
                    : "Work through the learning section and try again."}
              </p>
              <Button className="mt-6" onClick={restart}>
                Take it again
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                <span>
                  Question {index + 1} of {quiz.length}
                </span>
                <span>Score: {score}</span>
              </div>
              <Progress value={((index + (picked !== null ? 1 : 0)) / quiz.length) * 100} />
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">{q.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {q.options.map((opt, i) => {
                    const isAnswer = i === q.answer;
                    const isPicked = i === picked;
                    const state =
                      picked === null
                        ? ""
                        : isAnswer
                          ? "border-primary bg-secondary"
                          : isPicked
                            ? "border-destructive"
                            : "opacity-60";
                    return (
                      <button
                        key={opt}
                        onClick={() => choose(i)}
                        disabled={picked !== null}
                        className={`rounded-md border p-3 text-left text-sm transition-colors hover:bg-secondary ${state}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {picked !== null && (
                  <div className="mt-6 rounded-md border p-4">
                    <p className="flex items-center gap-2 font-medium">
                      {picked === q.answer ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-primary" /> Correct
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-destructive" /> Not quite
                        </>
                      )}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{q.explain}</p>
                    <Button className="mt-4" onClick={next}>
                      {index + 1 >= quiz.length ? "See result" : "Next question"}
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
