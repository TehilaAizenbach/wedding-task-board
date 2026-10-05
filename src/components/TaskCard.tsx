"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Trash2, User, ChevronDown } from "lucide-react";
import { Task, STATUS_LABELS, STATUS_ORDER, STATUS_STYLES } from "@/lib/types";

interface TaskCardProps {
  task: Task;
  index: number;
  onStatusChange: (taskId: string, status: Task["status"]) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskCard({
  task,
  index,
  onStatusChange,
  onDelete,
}: TaskCardProps) {
  const style = STATUS_STYLES[task.status];

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

          {task.description && (
            <p className="mt-1.5 line-clamp-3 whitespace-pre-wrap break-words text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {task.description}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between gap-2">
            {task.assignee_name ? (
              <span className="inline-flex min-w-0 items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-[11px] font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
                <User size={11} className="shrink-0" />
                <span className="truncate">{task.assignee_name}</span>
              </span>
            ) : (
              <span />
            )}

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
