"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { FamilyMember } from "@/lib/types";

const ADD_NEW_VALUE = "__add_new_person__";

interface PersonSelectProps {
  label: string;
  value: string;
  onChange: (name: string) => void;
  people: FamilyMember[];
  onAddPerson: (name: string) => Promise<FamilyMember | null>;
  placeholder?: string;
  required?: boolean;
}

export default function PersonSelect({
  label,
  value,
  onChange,
  people,
  onAddPerson,
  placeholder = "ללא",
  required = false,
}: PersonSelectProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    if (next === ADD_NEW_VALUE) {
      setNewName("");
      setIsAdding(true);
      return;
    }
    onChange(next);
  }

  async function handleConfirmAdd() {
    const trimmed = newName.trim();
    if (!trimmed || isSaving) return;
    setIsSaving(true);
    const created = await onAddPerson(trimmed);
    setIsSaving(false);
    if (created) {
      onChange(created.name);
      setIsAdding(false);
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

      {isAdding ? (
        <div className="flex items-center gap-1.5">
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
      ) : (
        <select
          value={value}
          onChange={handleSelectChange}
          required={required}
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="" disabled={required} hidden={required}>
            {required ? "בחרו אדם" : placeholder}
          </option>
          {people.map((person) => (
            <option key={person.id} value={person.name}>
              {person.name}
            </option>
          ))}
          <option value={ADD_NEW_VALUE}>+ הוסף אדם חדש</option>
        </select>
      )}
    </div>
  );
}
