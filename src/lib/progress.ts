const KEY = "cyber-portal-progress";

export type ReportEntry = {
  id: string;
  date: string;
  type: string;
  details: string;
};

export type Progress = {
  modulesRead: string[];
  quizScores: number[];
  simCorrect: number;
  simTotal: number;
  reports: ReportEntry[];
};

export const emptyProgress: Progress = {
  modulesRead: [],
  quizScores: [],
  simCorrect: 0,
  simTotal: 0,
  reports: [],
};

export function readProgress(): Progress {
  if (typeof window === "undefined") return emptyProgress;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyProgress;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      ...emptyProgress,
      ...parsed,
      reports: Array.isArray(parsed.reports) ? parsed.reports : [],
    };
  } catch {
    return emptyProgress;
  }
}

export function updateProgress(fn: (p: Progress) => Progress): Progress {
  if (typeof window === "undefined") return emptyProgress;
  const next = fn(readProgress());
  window.localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
