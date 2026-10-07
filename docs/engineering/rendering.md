# Rendering contract

## Board geometry

Reference positions/rotations come from [inventory](../../COMPONENT_INVENTORY.md) and SRC-002. Board coordinates are mm, y upward. Convert to SVG with x = CADx * 10 and y = (53.34 - CADy) * 10 before margins. This flips coordinate direction; convert rotation consistently rather than copying EAGLE angles blindly. Package origins need not be visual centers. Preserve mirrored footprints and connector overhangs.

Use inline SVG with labeled component groups, stable unique IDs, category metadata, selectable hit regions and semantic slot targets. Draw educational shapes from footprint extents; no pixel-perfect claim. Label “Layout-faithful educational illustration.” Keep repetitive passive shapes manageable; group information while retaining each physical reference. Test pads/fiducials/DNP/frame are not assembly parts.

## Microscopic scenes

Prefer SVG for labeled structure and controls; Canvas only for particle/cloud effects benefiting from it. Every Canvas scene has adjacent state text. Functional die layout is conceptual; package interiors are general; simple MOSFET is not exact trench structure. Unsupported scales are omitted. Device/electron markers and transition speed are not physical measurements.

## Composition and updates

Data drives cards/panels/citations. Scene registry maps known visualType to renderer/update/destroy functions; invalid types produce readable recovery during development. Re-render changed regions, preserve focus, and dispose listeners/frames on replacement. Text is inserted as text, not arbitrary HTML. No external required asset/font/script.
