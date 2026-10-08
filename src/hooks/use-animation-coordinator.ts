"use client";
import { useEffect } from "react";
import { useUno } from "@/lib/store";

/** One owner for timed teaching progression. Static scene renderers never run idle loops. */
export function useAnimationCoordinator() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => useUno.getState().setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    let visible = true;
    const sync = () => {
      if (timer) {
        clearInterval(timer);
        timer = undefined;
      }
      const s = useUno.getState();
      if (
        s.mode === "signal" &&
        s.playing &&
        !s.motionPaused &&
        !s.reducedMotion &&
        !document.hidden &&
        visible
      )
        timer = setInterval(() => useUno.getState().stepSignal(1), 3500);
    };
    const unsubscribe = useUno.subscribe(sync);
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      sync();
    });
    const viewer = document.getElementById("workspace");
    if (viewer) observer.observe(viewer);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      unsubscribe();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (timer) clearInterval(timer);
    };
  }, []);
}
