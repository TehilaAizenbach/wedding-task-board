"use client";

import { Droppable } from "@hello-pangea/dnd";
import { FamilyMember, Task, TaskStatus, STATUS_LABELS, STATUS_STYLES } from "@/lib/types";
import TaskCard from "./TaskCard";

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
  familyMembers: FamilyMember[];
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onApprove: (taskId: string, person: string) => void;
  onRemoveWaiting: (taskId: string, person: string) => void;
  onAddWaiting: (taskId: string, person: string) => void;
}

export default function Column({
  status,
  tasks,
  familyMembers,
  onStatusChange,
  onDelete,
  onApprove,
  onRemoveWaiting,
  onAddWaiting,
}: ColumnProps) {
  const style = STATUS_STYLES[status];

  return (
    <div className="flex h-full w-72 shrink-0 flex-col rounded-2xl bg-zinc-100/70 dark:bg-zinc-900/60 sm:w-80 lg:w-auto lg:min-w-60 lg:flex-1">
      <div className="flex items-center justify-between gap-2 px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${style.dot}`} />
          <h2 className={`text-sm font-bold ${style.header}`}>
            {STATUS_LABELS[status]}
          </h2>
        </div>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-zinc-500 shadow-sm dark:bg-zinc-800 dark:text-zinc-400">
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 space-y-2.5 overflow-y-auto px-3 pb-3 transition-colors ${
              snapshot.isDraggingOver ? "bg-zinc-200/60 dark:bg-zinc-800/60" : ""
            }`}
            style={{ minHeight: 120 }}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                familyMembers={familyMembers}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
                onApprove={onApprove}
                onRemoveWaiting={onRemoveWaiting}
                onAddWaiting={onAddWaiting}
              />
            ))}
            {provided.placeholder}
            {tasks.length === 0 && (
              <div className="flex h-20 items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 text-xs text-zinc-400 dark:border-zinc-700 dark:text-zinc-500">
                אין משימות
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
