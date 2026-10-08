# Performance contract

One animation coordinator owns the 3.5-second teaching-step interval; discrete SVG scenes expose native input-driven state and run no continuous particle loop. Short interface transitions terminate after 240ms. Active mode, IntersectionObserver visibility, document.visibilityState, reduced motion and user pause all gate execution. Stop/cancel rather than repeatedly scheduling idle frames. Static illustration and text still represent the selected state.

Read viewport/transforms at interaction/layout boundaries; batch writes; never measure layout per particle/frame. Cap particles and Canvas device-pixel resolution based on visual need, resize only on actual size changes. SVG shares package renderers and preserves individual physical references. Avoid re-rendering the whole page on hover. Release pointer capture/listeners/observers on scene destruction.

## Acceptance scenarios

Instrument timer scheduling: no increasing scene updates when offscreen, hidden, inactive, paused, or reduced-motion. Cycle all modes repeatedly and verify listener/loop count stays bounded. Inspect narrow-device dragging and quiz changes for jank without losing state. DevTools performance traces supplement behavior; do not claim measured budgets without recording hardware/browser.

The preserved guide has no JavaScript/Canvas/animation loops or external resources. Application lifecycle, no-idle-timer and responsive evidence is recorded in TESTING; no measured frame-rate or hardware performance budget is claimed. Lazy-load genuinely heavy scenes; do not initialize every scene at startup. WebGL remains deferred. Keep camera pointer updates outside global React renders. [TASKS](../../TASKS.md) tracks that work.
