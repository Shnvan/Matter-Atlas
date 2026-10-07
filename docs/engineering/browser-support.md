# Browser support and offline behavior

## Target

Current evergreen Chromium (Chrome/Edge), Firefox, and Safari, including their current mobile implementations. Required standards: inline SVG, ES6+, Pointer Events, IntersectionObserver, matchMedia prefers-reduced-motion and standard dialog/focus behavior. Target list is intent, not evidence of cross-browser conformance.

## File URL contract

The teaching application embeds data/code/styles/assets and uses a classic inline script. Do not import modules or fetch local JSON. Core does not depend on localStorage, service workers, network APIs or an HTTP server. Source links may require network when followed; core learning remains offline. Initial guide links relative Markdown/TXT files; browsers may display raw text or download Markdown depending on file associations. It does not require a Markdown viewer.

## Capability recovery

If IntersectionObserver is unavailable, use static scenes rather than continuously animating all scenes. If dialog behavior is unavailable, render accessible inline details with close/back focus restoration. No optional GSAP dependency is planned. Feature fallbacks must remain usable and be tested before publication.

## Test reporting

Record browser/version, file URL versus HTTP, viewport and input path. Chromium automated keyboard/viewport checks do not verify Firefox/Safari, real-device touch, or a screen reader. Record those as untested until actual checks occur. See [TESTING](../../TESTING.md).
