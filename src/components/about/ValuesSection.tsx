"use client";

import { useTranslations } from "next-intl";

const values = [
  { id: "innovation", num: "01 / 04" },
  { id: "collaboration", num: "02 / 04" },
  { id: "excellence", num: "03 / 04" },
  { id: "integrity", num: "04 / 04" },
];

export default function ValuesSection() {
  const tValues = useTranslations("values_data");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-md:[&>div]:border-b max-md:[&>div]:border-border max-md:[&>div]:py-8 max-md:[&>div]:px-0 lg:[&>div]:border-r lg:[&>div]:border-border lg:[&>div:last-child]:border-r-0">
      {values.map((value, i) => (
        <div
          key={value.id}
          className={`reveal relative py-12 ${i === 0 ? "pr-8 lg:pr-8" : "px-8"} ${i === values.length - 1 ? "lg:pr-0" : ""}`}
        >
          <div className={`absolute top-0 ${i === 0 ? "left-0" : "left-8"} w-10 h-[3px] bg-gradient-to-r from-primary via-secondary to-accent rounded-b-sm`} />
          <div className="font-mono text-xs text-ink-dim tracking-widest my-6">{value.num}</div>
          <h3 className="text-[30px] font-semibold tracking-tight mb-4 leading-none text-primary">
            {tValues.rich(`${value.id}.title_rich`, {
              em: (chunks) => <em className="font-serif italic text-secondary font-normal">{chunks}</em>,
            })}
          </h3>
          <p className="text-sm leading-relaxed text-ink-dim">{tValues(`${value.id}.description`)}</p>
        </div>
      ))}
    </div>
  );
}
