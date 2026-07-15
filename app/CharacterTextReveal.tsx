"use client";

import { useEffect } from "react";

const TEXT_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "p",
  "a",
  "button",
  "b",
  "strong",
  "small",
  "label",
  "li",
  "span",
].join(",");

const EXCLUDED_SELECTOR = [
  "script",
  "style",
  "input",
  "textarea",
  "select",
  "option",
  ".sign",
  ".iconButton",
  ".heart",
  "[data-no-text-reveal]",
].join(",");

function hasDirectText(element: HTMLElement) {
  return Array.from(element.childNodes).some(
    (node) => node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim()),
  );
}

export default function CharacterTextReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observed = new WeakSet<Element>();
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("fancyRevealVisible");
          intersectionObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    const register = (root: ParentNode) => {
      const candidates: HTMLElement[] = [];
      if (root instanceof HTMLElement && root.matches(TEXT_SELECTOR)) candidates.push(root);
      root.querySelectorAll<HTMLElement>(TEXT_SELECTOR).forEach((element) => candidates.push(element));

      let sequence = 0;
      candidates.forEach((element) => {
        if (observed.has(element) || element.matches(EXCLUDED_SELECTOR) || element.closest(EXCLUDED_SELECTOR)) return;
        if (!hasDirectText(element)) return;

        observed.add(element);
        element.style.setProperty("--text-reveal-delay", `${Math.min(sequence, 5) * 55}ms`);
        element.classList.add("fancyRevealReady");
        intersectionObserver.observe(element);
        sequence += 1;
      });
    };

    register(document.body);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) register(node);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
