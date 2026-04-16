"use client";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
  allLabel: string;
}

export default function CategoryFilter({ categories, active, onSelect, allLabel }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <button onClick={() => onSelect("all")} className={`px-4 py-2 rounded-full text-sm transition-colors ${active === "all" ? "bg-secondary text-white" : "bg-white/10 text-white/60 hover:bg-white/20"}`}>{allLabel}</button>
      {categories.map((cat) => (
        <button key={cat} onClick={() => onSelect(cat)} className={`px-4 py-2 rounded-full text-sm transition-colors ${active === cat ? "bg-secondary text-white" : "bg-white/10 text-white/60 hover:bg-white/20"}`}>{cat}</button>
      ))}
    </div>
  );
}
