"use client";

import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { FamilyMember } from "@/lib/types";
import { getAssigneeStyle } from "@/lib/assignee";

interface MultiPersonSelectProps {
  label: string;
  selected: string[];
  onChange: (next: string[]) => void;
  people: FamilyMember[];
  onAddPerson: (name: string) => Promise<FamilyMember | null>;
}

export default function MultiPersonSelect({
  label,
  selected,
  onChange,
  people,
  onAddPerson,
}: MultiPersonSelectProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function toggle(name: string) {
    if (selected.includes(name)) {
      onChange(selected.filter((n) => n !== name));
    } else {
      onChange([...selected, name]);
    }
  }

  async function handleConfirmAdd() {
    const trimmed = newName.trim();
    if (!trimmed || isSaving) return;
    setIsSaving(true);
    const created = await onAddPerson(trimmed);
    setIsSaving(false);
    if (created) {
      onChange([...selected, created.name]);
      setIsAdding(false);
      setNewName("");
    }
  }

  function handleCancelAdd() {
    setIsAdding(false);
    setNewName("");
  }

  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </label>

      <div className="flex flex-wrap gap-1.5">
        {people.map((person) => {
          const isSelected = selected.includes(person.name);
          const style = getAssigneeStyle(person.name);
          return (
            <button
              key={person.id}
              type="button"
              onClick={() => toggle(person.name)}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset transition-opacity ${style.bg} ${style.text} ${style.ring} ${
                isSelected ? "" : "opacity-40 hover:opacity-70"
              }`}
            >
              {isSelected && <Check size={12} />}
              {person.name}
            </button>
          );
        })}

        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-1 rounded-full border border-dashed border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-500"
          >
            <Plus size={12} />
            הוסף אדם חדש
          </button>
        )}
      </div>

      {isAdding && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleConfirmAdd();
              } else if (e.key === "Escape") {
                handleCancelAdd();
              }
            }}
            placeholder="שם האדם החדש"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <button
            type="button"
            onClick={handleConfirmAdd}
            disabled={!newName.trim() || isSaving}
            aria-label="שמירת אדם חדש"
            className="shrink-0 rounded-lg bg-zinc-900 p-2 text-white disabled:opacity-40 dark:bg-white dark:text-zinc-900"
          >
            <Check size={16} />
          </button>
          <button
            type="button"
            onClick={handleCancelAdd}
            aria-label="ביטול הוספה"
            className="shrink-0 rounded-lg border border-zinc-200 p-2 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
