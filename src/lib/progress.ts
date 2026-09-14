const KEY = "cyber-portal-progress";

export type Progress = {
  modulesRead: string[];
  quizScores: number[];
  simCorrect: number;
  simTotal: number;
  reports: number;
};

const empty: Progress = { modulesRead: [], quizScores: [], simCorrect: 0, simTotal: 0, reports: 0 };

export function readProgress(): Progress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...empty, ...(JSON.parse(raw) as Partial<Progress>) } : empty;
  } catch {
    return empty;
  }
}

export function updateProgress(fn: (p: Progress) => Progress) {
  if (typeof window === "undefined") return;
  const next = fn(readProgress());
  window.localStorage.setItem(KEY, JSON.stringify(next));
}
