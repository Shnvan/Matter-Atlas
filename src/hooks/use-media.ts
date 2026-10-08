"use client";
import { useSyncExternalStore } from "react";
export function useCompactLayout() {
  return useSyncExternalStore(
    (callback) => {
      const query = window.matchMedia("(max-width: 1199px)");
      query.addEventListener("change", callback);
      return () => query.removeEventListener("change", callback);
    },
    () => window.matchMedia("(max-width: 1199px)").matches,
    () => false,
  );
}
