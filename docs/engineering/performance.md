# Performance contract

One animation coordinator owns the frame handle; scenes expose update/draw and cleanup. Active mode, IntersectionObserver visibility, document.visibilityState, reduced motion and user pause all gate execution. Stop/cancel rather than repeatedly scheduling idle frames. Static illustration and text still represent the selected state.

Read viewport/transforms at interaction/layout boundaries; batch writes; never measure layout per particle/frame. Cap particles and Canvas device-pixel resolution based on visual need, resize only on actual size changes. SVG uses grouped passives and delegated events. Avoid re-rendering the whole page on hover. Release pointer capture/listeners/observers on scene destruction.

## Acceptance scenarios

Instrument frame scheduling: no increasing scene updates when offscreen, hidden, inactive, paused, or reduced-motion. Cycle all modes repeatedly and verify listener/loop count stays bounded. Inspect narrow-device dragging and quiz changes for jank without losing state. DevTools performance traces supplement behavior; do not claim measured budgets without recording hardware/browser.

The initial guide has no JavaScript/Canvas/animation loops or external resources. Performance of the future teaching application is untested. [TASKS](../../TASKS.md) tracks that work.
