"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "./Modal";
import PersonSelect from "./PersonSelect";
import MultiPersonSelect from "./MultiPersonSelect";
import { FamilyMember } from "@/lib/types";

interface NewTaskModalProps {
  open: boolean;
  onClose: () => void;
  familyMembers: FamilyMember[];
  onAddFamilyMember: (name: string) => Promise<FamilyMember | null>;
  onCreate: (data: {
    title: string;
    description: string;
    assignee_name: string;
    waiting_for: string[];
  }) => Promise<void>;
}

export default function NewTaskModal({
  open,
  onClose,
  familyMembers,
  onAddFamilyMember,
  onCreate,
}: NewTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const [waitingFor, setWaitingFor] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function reset() {
    setTitle("");
    setDescription("");
    setAssigneeName("");
    setWaitingFor([]);
  }

  function handleClose() {
    if (isSubmitting) return;
    reset();
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !assigneeName || isSubmitting) return;

    setIsSubmitting(true);
    await onCreate({
      title: title.trim(),
      description: description.trim(),
      assignee_name: assigneeName,
      waiting_for: waitingFor,
    });
    setIsSubmitting(false);
    reset();
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          משימה חדשה
        </h2>
        <button
          onClick={handleClose}
          aria-label="סגירה"
          className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
            כותרת המשימה
          </label>
          <input
            autoFocus
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="עיצוב הזמנה"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
            תיאור / פירוט
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="פרטים נוספים על המשימה..."
            rows={3}
            className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>

        <PersonSelect
          label="אחראי/ת"
          value={assigneeName}
          onChange={setAssigneeName}
          people={familyMembers}
          onAddPerson={onAddFamilyMember}
          required
        />

        <MultiPersonSelect
          label="ממתין לאישור של..."
          selected={waitingFor}
          onChange={setWaitingFor}
          people={familyMembers}
          onAddPerson={onAddFamilyMember}
        />

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-lg border border-zinc-200 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            ביטול
          </button>
          <button
            type="submit"
            disabled={!title.trim() || !assigneeName || isSubmitting}
            className="flex-1 rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 dark:bg-white dark:text-zinc-900"
          >
            {isSubmitting ? "יוצר..." : "יצירת משימה"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
