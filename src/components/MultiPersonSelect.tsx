"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { FamilyMember } from "@/lib/types";
import { getAssigneeStyle } from "@/lib/assignee";

interface MultiPersonSelectProps {
  label: string;
  value: string[];
  onChange: (names: string[]) => void;
  people: FamilyMember[];
  onAddPerson: (name: string) => Promise<FamilyMember | null>;
}

export default function MultiPersonSelect({
  label,
  value,
  onChange,
  people,
  onAddPerson,
}: MultiPersonSelectProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function toggle(name: string) {
    onChange(
      value.includes(name)
        ? value.filter((n) => n !== name)
        : [...value, name]
    );
  }

  async function handleConfirmAdd() {
    const trimmed = newName.trim();
    if (!trimmed || isSaving) return;
    setIsSaving(true);
    const created = await onAddPerson(trimmed);
    setIsSaving(false);
    if (created) {
      onChange([...value, created.name]);
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
      <div className="flex flex-wrap items-center gap-1.5">
        {people.map((person) => {
          const selected = value.includes(person.name);
          const style = getAssigneeStyle(person.name);
          return (
            <button
              key={person.id}
              type="button"
              onClick={() => toggle(person.name)}
              aria-pressed={selected}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset transition-opacity ${style.bg} ${style.text} ${style.ring} ${
                selected ? "" : "opacity-45 hover:opacity-75"
              }`}
            >
              {selected && <Check size={12} />}
              {person.name}
            </button>
          );
        })}

        {isAdding ? (
          <div className="flex items-center gap-1">
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
              placeholder="שם חדש"
              className="w-24 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
            <button
              type="button"
              onClick={handleConfirmAdd}
              disabled={!newName.trim() || isSaving}
              aria-label="שמירת אדם חדש"
              className="shrink-0 rounded-full bg-zinc-900 p-1.5 text-white disabled:opacity-40 dark:bg-white dark:text-zinc-900"
            >
              <Check size={12} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-1 rounded-full border border-dashed border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <Plus size={12} /> הוסף אדם חדש
          </button>
        )}
      </div>
    </div>
  );
}
