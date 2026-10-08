# Current risk register

Statuses: bounded / open / mitigated. Risks are active controls, not proof of failure. [RESEARCH](RESEARCH.md) tracks unanswered factual questions; [TASKS](TASKS.md) owns execution.

| ID | Risk | Likelihood | Impact | Mitigation | Status |
| --- | --- | --- | --- | --- | --- |
| RISK-001 | Official manual identities differ from schematic | High | High educational | Named schematic baseline, separate conflict notes, independent evidence for production variants | Bounded |
| RISK-002 | Chip internals portrayed as exact | High | High educational | Claim-level scope, conceptual die/memory/package labels, no guessed node/count/dimensions | Bounded |
| RISK-003 | Atomic scenes imply planetary orbits | Medium | High educational | Probability-cloud text, historical-model label only for comparison, source limits | Bounded |
| RISK-004 | Power/LED journeys copy incorrect serial chain | Medium | High educational | Netlist + visual audit, buffer/control/parallel/return edge types | Mitigated in foundation; future UI audit required |
| RISK-005 | Single HTML becomes hard to maintain | High | Medium engineering | Logical modules, immutable reviewed data, narrow updates, canonical docs | Bounded |
| RISK-006 | Assembly requires mouse or precise touch | Medium | High access | Select/place parity, screen-distance snapping, pointercancel, real-device checks | Lifecycle tests passed; ongoing regression coverage |
| RISK-007 | Independent agents duplicate/diverge facts | Medium | High project | Canonical owners, stable source/requirement IDs, validator and compact handoff | Mitigated in foundation |
| RISK-008 | Animation wastes CPU or ignores reduced motion | Medium | Medium performance | One coordinator and all lifecycle gates, static equivalent | Lifecycle tests passed; ongoing regression coverage |
| RISK-009 | Material map guesses compositions | High | High educational | General applicability labels, unknown solder/finish/LED compounds omitted | Bounded |
| RISK-010 | Source URLs/content change | Medium | Medium research | Access dates/locations/hashes where available; reverify affected claims | Open ongoing |
| RISK-011 | Scope exceeds one reliable implementation session | High | Medium delivery | Dependency-aware phases, no dead controls, accept complete features individually | Bounded |
| RISK-012 | Automated browser checks mistaken for accessibility conformance | Medium | High access | Explicit test limits; manual screen-reader/mobile/browser matrix | Bounded |
| RISK-013 | Markdown links display raw/downloaded content | High | Low usability | Guide explains local link behavior; editor reading path in README | Bounded |

Reassess when baseline or accepted architecture changes. A bounded uncertainty is not silently resolved by attractive illustration.

## Migration risks

The previous file-URL application constraint is superseded by DEC-009; explain the local HTTP export requirement without presenting the legacy guide as the new app. All six modes are substantial scope: retain task acceptance gates instead of treating compilation as feature completion. Safe build-time documentation allowlisting must prevent arbitrary filesystem exposure. NASA inspiration must not introduce official branding or imply endorsement. Framework versions and library compatibility require actual install/build evidence.

## Dependency audit checkpoint

2026-10-08: production-only npm audit reports zero vulnerabilities. Full audit reports five high-severity development-tool entries along the eslint-config-next → fast-glob → micromatch → braces chain (GHSA-vfj7-8cjw-p6xm). The registry offers no patched braces release at this checkpoint; npm suggests an incompatible Next ESLint downgrade. Keep the approved stack; lint only trusted repository patterns and recheck for a compatible patch. These tools are not shipped in the static export.
