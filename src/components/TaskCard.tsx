"use client";

import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  Trash2,
  User,
  Clock,
  CheckCircle2,
  Check,
  X,
  Plus,
  ChevronDown,
} from "lucide-react";
import { FamilyMember, Task, STATUS_LABELS, STATUS_ORDER, STATUS_STYLES } from "@/lib/types";
import {
  getAssigneeStyle,
  WAITING_FOR_BADGE_CLASS,
  APPROVED_BADGE_CLASS,
} from "@/lib/assignee";

interface TaskCardProps {
  task: Task;
  index: number;
  familyMembers: FamilyMember[];
  onStatusChange: (taskId: string, status: Task["status"]) => void;
  onDelete: (taskId: string) => void;
  onUpdateApprovals: (
    taskId: string,
    next: { waiting_for: string[]; approved_by: string[] }
  ) => void;
}

export default function TaskCard({
  task,
  index,
  familyMembers,
  onStatusChange,
  onDelete,
  onUpdateApprovals,
}: TaskCardProps) {
  const [isAddingWaiting, setIsAddingWaiting] = useState(false);
  const style = STATUS_STYLES[task.status];
  const assigneeStyle = task.assignee_name
    ? getAssigneeStyle(task.assignee_name)
    : null;

  const availablePeople = familyMembers.filter(
    (p) => !task.waiting_for.includes(p.name) && !task.approved_by.includes(p.name)
  );

  function handleApprove(name: string) {
    onUpdateApprovals(task.id, {
      waiting_for: task.waiting_for.filter((n) => n !== name),
      approved_by: [...task.approved_by, name],
    });
  }

  function handleRemoveWaiting(name: string) {
    onUpdateApprovals(task.id, {
      waiting_for: task.waiting_for.filter((n) => n !== name),
      approved_by: task.approved_by,
    });
  }

  function handleUnapprove(name: string) {
    onUpdateApprovals(task.id, {
      waiting_for: [...task.waiting_for, name],
      approved_by: task.approved_by.filter((n) => n !== name),
    });
  }

  function handleAddWaiting(name: string) {
    setIsAddingWaiting(false);
    if (!name || task.waiting_for.includes(name) || task.approved_by.includes(name)) {
      return;
    }
    onUpdateApprovals(task.id, {
      waiting_for: [...task.waiting_for, name],
      approved_by: task.approved_by,
    });
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group rounded-xl border border-t-4 border-zinc-200 bg-white p-3.5 shadow-sm transition-all dark:border-zinc-700 dark:bg-zinc-800 ${style.accent} ${
            snapshot.isDragging
              ? "rotate-1 scale-[1.03] shadow-xl ring-2 ring-zinc-300 dark:ring-zinc-600"
              : "hover:shadow-md"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="min-w-0 flex-1 break-words text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {task.title}
            </h3>
            <button
              onClick={() => onDelete(task.id)}
              aria-label="מחיקת משימה"
              className="shrink-0 rounded-md p-1 text-zinc-400 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 focus:opacity-100 dark:hover:bg-red-950/40 dark:hover:text-red-400"
            >
              <Trash2 size={15} />
            </button>
          </div>

          {task.assignee_name && assigneeStyle && (
            <span
              className={`mt-2 inline-flex max-w-full items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${assigneeStyle.bg} ${assigneeStyle.text} ${assigneeStyle.ring}`}
            >
              <User size={12} className="shrink-0" />
              <span className="truncate">אחראי/ת: {task.assignee_name}</span>
            </span>
          )}

          {task.description && (
            <p className="mt-1.5 line-clamp-3 whitespace-pre-wrap break-words text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {task.description}
            </p>
          )}

          {task.approved_by.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {task.approved_by.map((name) => (
                <span
                  key={name}
                  className={`inline-flex max-w-full items-center gap-1 rounded-full py-1 ps-2.5 pe-1 text-xs font-semibold ${APPROVED_BADGE_CLASS}`}
                >
                  <CheckCircle2 size={12} className="shrink-0" />
                  <span className="truncate">אושר על ידי: {name}</span>
                  <button
                    onClick={() => handleUnapprove(name)}
                    aria-label={`ביטול אישור של ${name}`}
                    className="shrink-0 rounded-full p-0.5 hover:bg-emerald-200/70 dark:hover:bg-emerald-800/60"
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {task.waiting_for.map((name) => (
              <span
                key={name}
                className={`inline-flex max-w-full items-center gap-1 rounded-full py-1 ps-2.5 pe-1 text-xs font-semibold ${WAITING_FOR_BADGE_CLASS}`}
              >
                <Clock size={12} className="shrink-0" />
                <span className="truncate">{name}</span>
                <button
                  onClick={() => handleApprove(name)}
                  aria-label={`אישור עבור ${name}`}
                  title="אישור"
                  className="shrink-0 rounded-full p-0.5 hover:bg-amber-200/70 dark:hover:bg-amber-800/60"
                >
                  <Check size={12} />
                </button>
                <button
                  onClick={() => handleRemoveWaiting(name)}
                  aria-label={`הסרת ${name} מרשימת הממתינים`}
                  className="shrink-0 rounded-full p-0.5 hover:bg-amber-200/70 dark:hover:bg-amber-800/60"
                >
                  <X size={11} />
                </button>
              </span>
            ))}

            {isAddingWaiting ? (
              <select
                autoFocus
                defaultValue=""
                onChange={(e) => handleAddWaiting(e.target.value)}
                onBlur={() => setIsAddingWaiting(false)}
                onClick={(e) => e.stopPropagation()}
                className="rounded-full border border-zinc-300 bg-white px-2 py-1 text-xs outline-none dark:border-zinc-600 dark:bg-zinc-800"
              >
                <option value="">בחרו אדם...</option>
                {availablePeople.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            ) : (
              <button
                onClick={() => setIsAddingWaiting(true)}
                className="inline-flex items-center gap-1 rounded-full border border-dashed border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-500"
              >
                <Plus size={12} />
                ממתין לאישור
              </button>
            )}
          </div>

          <div className="mt-3 flex items-center justify-end gap-2">
            <div className="relative shrink-0">
              <select
                value={task.status}
                onChange={(e) =>
                  onStatusChange(task.id, e.target.value as Task["status"])
                }
                onClick={(e) => e.stopPropagation()}
                className={`appearance-none rounded-full py-1 ps-2 pe-6 text-[11px] font-medium outline-none ${style.chip}`}
                aria-label="שינוי סטטוס"
              >
                {STATUS_ORDER.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={12}
                className="pointer-events-none absolute end-1.5 top-1/2 -translate-y-1/2 opacity-60"
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
