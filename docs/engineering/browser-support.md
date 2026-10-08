# Browser support and offline behavior

## Target

Current evergreen Chromium (Chrome/Edge), Firefox, and Safari, including their current mobile implementations. Required standards: inline SVG, ES6+, Pointer Events, IntersectionObserver, matchMedia prefers-reduced-motion and standard dialog/focus behavior. Target list is intent, not evidence of cross-browser conformance.

## Local delivery contract

The new Next.js static export is served over local HTTP with all content, fonts, icons and diagrams bundled. Source links may open internet documents when deliberately followed; learning interactions require no external requests or persistent storage. Root index.html remains the original file-URL documentation guide. Do not conflate its tests with application tests. No service worker or hosting service is required.

## Capability recovery

If IntersectionObserver is unavailable, use static scenes rather than continuously animating all scenes. If dialog behavior is unavailable, render accessible inline details with close/back focus restoration. No optional GSAP dependency is planned. Feature fallbacks must remain usable and be tested before publication.

## Test reporting

Record browser/version, file URL versus HTTP, viewport and input path. Chromium automated keyboard/viewport checks do not verify Firefox/Safari, real-device touch, or a screen reader. Record those as untested until actual checks occur. See [TESTING](../../TESTING.md).
