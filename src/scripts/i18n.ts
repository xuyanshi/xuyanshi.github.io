/**
 * Client-side i18n: swaps text content based on data-i18n attributes.
 * Translations are bundled at build time from src/i18n/lang/*.ts.
 */

import type { UIStrings } from "@/i18n/types";

const modules = import.meta.glob<{ default: UIStrings }>("../i18n/lang/*.ts", {
  eager: true,
});

const translations: Record<string, UIStrings> = {};
for (const [path, mod] of Object.entries(modules)) {
  const locale = path.replace("../i18n/lang/", "").replace(".ts", "");
  translations[locale] = mod.default;
}

function getNestedValue(obj: Record<string, any>, path: string): string {
  const result = path
    .split(".")
    .reduce((acc: any, key: string) => acc?.[key], obj);
  return typeof result === "string" ? result : "";
}

export function applyTranslations() {
  const locale = localStorage.getItem("locale") || "en";
  const t = translations[locale] ?? translations["en"];

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (key) {
      const value = getNestedValue(t as Record<string, any>, key);
      if (value) el.textContent = value;
    }
  });

  // Update lang button label
  const langBtn = document.querySelector<HTMLButtonElement>("#lang-btn");
  if (langBtn) {
    const labels: Record<string, string> = { en: "EN", zh: "中", ja: "日" };
    langBtn.dataset.lang = locale;
    const labelEl = langBtn.querySelector("[data-i18n-label]");
    if (labelEl) labelEl.textContent = labels[locale] ?? locale.toUpperCase();
  }
}

// Run on initial load
applyTranslations();

// Run after Astro page transitions
document.addEventListener("astro:after-swap", applyTranslations);
