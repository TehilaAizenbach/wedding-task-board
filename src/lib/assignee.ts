interface AssigneeStyle {
  bg: string;
  text: string;
  ring: string;
}

const NAMED_STYLES: Record<string, AssigneeStyle> = {
  "כלה": {
    bg: "bg-rose-100 dark:bg-rose-950/50",
    text: "text-rose-700 dark:text-rose-300",
    ring: "ring-rose-200 dark:ring-rose-800",
  },
  "חתן": {
    bg: "bg-blue-100 dark:bg-blue-950/50",
    text: "text-blue-700 dark:text-blue-300",
    ring: "ring-blue-200 dark:ring-blue-800",
  },
  "אמא": {
    bg: "bg-fuchsia-100 dark:bg-fuchsia-950/50",
    text: "text-fuchsia-700 dark:text-fuchsia-300",
    ring: "ring-fuchsia-200 dark:ring-fuchsia-800",
  },
  "אבא": {
    bg: "bg-indigo-100 dark:bg-indigo-950/50",
    text: "text-indigo-700 dark:text-indigo-300",
    ring: "ring-indigo-200 dark:ring-indigo-800",
  },
};

const PALETTE: AssigneeStyle[] = [
  {
    bg: "bg-amber-100 dark:bg-amber-950/50",
    text: "text-amber-700 dark:text-amber-300",
    ring: "ring-amber-200 dark:ring-amber-800",
  },
  {
    bg: "bg-emerald-100 dark:bg-emerald-950/50",
    text: "text-emerald-700 dark:text-emerald-300",
    ring: "ring-emerald-200 dark:ring-emerald-800",
  },
  {
    bg: "bg-teal-100 dark:bg-teal-950/50",
    text: "text-teal-700 dark:text-teal-300",
    ring: "ring-teal-200 dark:ring-teal-800",
  },
  {
    bg: "bg-violet-100 dark:bg-violet-950/50",
    text: "text-violet-700 dark:text-violet-300",
    ring: "ring-violet-200 dark:ring-violet-800",
  },
  {
    bg: "bg-orange-100 dark:bg-orange-950/50",
    text: "text-orange-700 dark:text-orange-300",
    ring: "ring-orange-200 dark:ring-orange-800",
  },
  {
    bg: "bg-cyan-100 dark:bg-cyan-950/50",
    text: "text-cyan-700 dark:text-cyan-300",
    ring: "ring-cyan-200 dark:ring-cyan-800",
  },
  {
    bg: "bg-pink-100 dark:bg-pink-950/50",
    text: "text-pink-700 dark:text-pink-300",
    ring: "ring-pink-200 dark:ring-pink-800",
  },
  {
    bg: "bg-lime-100 dark:bg-lime-950/50",
    text: "text-lime-700 dark:text-lime-300",
    ring: "ring-lime-200 dark:ring-lime-800",
  },
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getAssigneeStyle(name: string): AssigneeStyle {
  const trimmed = name.trim();
  if (!trimmed) return PALETTE[0];
  if (NAMED_STYLES[trimmed]) return NAMED_STYLES[trimmed];
  return PALETTE[hashString(trimmed) % PALETTE.length];
}

export const WAITING_FOR_BADGE_CLASS =
  "border border-dashed border-amber-400 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300";

export const APPROVED_BADGE_CLASS =
  "bg-emerald-500 text-white dark:bg-emerald-600";
