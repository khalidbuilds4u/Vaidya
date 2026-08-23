"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DynamicListInputProps {
  name: string;
  label: string;
  initialItems?: string[];
  placeholder?: string;
}

export function DynamicListInput({ name, label, initialItems = [], placeholder = "Enter an item..." }: DynamicListInputProps) {
  const [items, setItems] = useState<string[]>(initialItems);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !items.includes(trimmed)) {
      setItems([...items, trimmed]);
      setInputValue("");
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleAddItem();
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-slate-900 block">
        {label}
      </label>
      
      {/* Hidden input for formData */}
      <input type="hidden" name={name} value={JSON.stringify(items)} />

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
        />
        <Button 
          type="button" 
          onClick={handleAddItem}
          disabled={!inputValue.trim()}
          className="rounded-xl px-4 bg-slate-900 hover:bg-slate-800 text-white"
        >
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>

      {items.length > 0 && (
        <ul className="space-y-2 mt-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded-lg text-sm text-slate-700">
              <span className="flex-1 leading-tight mt-0.5">{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="text-slate-400 hover:text-red-500 transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
