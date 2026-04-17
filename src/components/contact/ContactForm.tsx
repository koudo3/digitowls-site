"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const t = useTranslations("contact_page");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { setStatus("success"); (e.target as HTMLFormElement).reset(); }
      else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-white/70 mb-2">{t("name")} *</label>
          <input name="name" required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-2">{t("job_title")} *</label>
          <input name="job_title" required className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-white/70 mb-2">{t("email")} *</label>
          <input name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-2">{t("phone")} *</label>
          <input name="phone" type="tel" required className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-white/70 mb-2">{t("company")} *</label>
          <input name="company" required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-2">{t("country")} *</label>
          <input name="country" required className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-sm text-white/70 mb-2">{t("subject")} *</label>
        <input name="subject" required className={inputClass} />
      </div>
      <div>
        <label className="block text-sm text-white/70 mb-2">{t("message")} *</label>
        <textarea name="message" required rows={5} className={`${inputClass} resize-none`} />
      </div>
      <Button type="submit" variant="primary">{status === "loading" ? "..." : t("submit")}</Button>
      {status === "success" && <p className="text-green-400 text-sm">{t("success")}</p>}
      {status === "error" && <p className="text-red-400 text-sm">{t("error")}</p>}
    </form>
  );
}
