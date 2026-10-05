export type TaskStatus =
  | "todo"
  | "in_progress"
  | "ready_for_print"
  | "in_print"
  | "done";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  assignee_name: string | null;
  created_at: string;
}

export const STATUS_ORDER: TaskStatus[] = [
  "todo",
  "in_progress",
  "ready_for_print",
  "in_print",
  "done",
];

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "לביצוע",
  in_progress: "בתהליך",
  ready_for_print: "להדפסה",
  in_print: "בהדפסה",
  done: "הושלם",
};

export const STATUS_STYLES: Record<
  TaskStatus,
  { accent: string; dot: string; header: string; chip: string }
> = {
  todo: {
    accent: "border-t-slate-400",
    dot: "bg-slate-400",
    header: "text-slate-600 dark:text-slate-300",
    chip: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  in_progress: {
    accent: "border-t-blue-500",
    dot: "bg-blue-500",
    header: "text-blue-700 dark:text-blue-300",
    chip: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  },
  ready_for_print: {
    accent: "border-t-amber-500",
    dot: "bg-amber-500",
    header: "text-amber-700 dark:text-amber-300",
    chip: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
  },
  in_print: {
    accent: "border-t-purple-500",
    dot: "bg-purple-500",
    header: "text-purple-700 dark:text-purple-300",
    chip: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  },
  done: {
    accent: "border-t-emerald-500",
    dot: "bg-emerald-500",
    header: "text-emerald-700 dark:text-emerald-300",
    chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  },
};
