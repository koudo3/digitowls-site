"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const revs = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("in"), i * 50);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    revs.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
