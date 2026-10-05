"use client";

import Modal from "./Modal";

interface ConfirmDeleteModalProps {
  open: boolean;
  taskTitle: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  open,
  taskTitle,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <Modal open={open} onClose={onCancel}>
      <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
        מחיקת משימה
      </h2>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        האם למחוק את המשימה
        {taskTitle ? <> &quot;{taskTitle}&quot;</> : ""}? לא ניתן לשחזר פעולה
        זו.
      </p>
      <div className="mt-5 flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 rounded-lg border border-zinc-200 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          ביטול
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          מחיקה
        </button>
      </div>
    </Modal>
  );
}
