"use client";

import { useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import { translateText } from "@/lib/translate";

const textNodeOriginals = new WeakMap<Text, string>();
const attrOriginals = new WeakMap<HTMLElement, Record<string, string>>();

const ATTRS = ["title", "aria-label", "placeholder"] as const;

export function LanguageDomTranslator() {
  const { lang } = useLanguage();

  useEffect(() => {
    let isApplying = false;

    const applyTranslations = () => {
      if (isApplying) return;
      const root = document.body;
      if (!root) return;
      isApplying = true;

      try {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let current = walker.nextNode();

        while (current) {
          const textNode = current as Text;
          const parent = textNode.parentElement;
          if (
            parent &&
            !["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)
          ) {
            const original = textNodeOriginals.get(textNode) ?? textNode.nodeValue ?? "";
            if (!textNodeOriginals.has(textNode)) {
              textNodeOriginals.set(textNode, original);
            }
            const trimmed = original.trim();
            if (trimmed) {
              const translated = translateText(lang, trimmed);
              const nextValue = original.replace(trimmed, translated);
              if (textNode.nodeValue !== nextValue) {
                textNode.nodeValue = nextValue;
              }
            }
          }
          current = walker.nextNode();
        }

        root.querySelectorAll<HTMLElement>("*").forEach((el) => {
          const originalAttrs = attrOriginals.get(el) ?? {};
          ATTRS.forEach((attr) => {
            const value = el.getAttribute(attr);
            if (!value) return;
            if (!(attr in originalAttrs)) {
              originalAttrs[attr] = value;
            }
            const translated = translateText(lang, originalAttrs[attr]);
            if (value !== translated) {
              el.setAttribute(attr, translated);
            }
          });
          if (Object.keys(originalAttrs).length > 0) {
            attrOriginals.set(el, originalAttrs);
          }
        });
      } finally {
        isApplying = false;
      }
    };

    const observer = new MutationObserver(() => {
      if (isApplying) return;
      applyTranslations();
    });

    applyTranslations();
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...ATTRS],
    });

    return () => observer.disconnect();
  }, [lang]);

  return null;
}
