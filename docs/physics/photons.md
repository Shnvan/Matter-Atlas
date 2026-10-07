# Photons and the LED branch

LEDs connect electrical and optical learning. In a suitable semiconductor junction, carrier injection and electron-hole recombination can release photons. Photon energy relates to frequency through E = hf; emitted spectrum/material system influences perceived color. Changing current mainly changes intensity and operating conditions, not a universal “more electricity means a new color” rule. [SRC-019, SRC-023](../../SOURCES.md)

## Branch and circuit link

Board -> L LED package -> general semiconductor junction -> carriers/recombination -> photon -> observed light. L is supplied by U5B buffer through RN2A and returns to GND. D13 changes buffer input, not direct LED supply. TX/RX and ON use different resistor/driver paths. See [signal paths](../electronics/signal-paths.md) and [inventory](../../COMPONENT_INVENTORY.md).

## Illustration limits

Use a conceptual junction and an emitted-light pulse with an explicit model label. Electron/hole markers are explanatory; a photon is not a little colored bead with a verified visual size. Exact compounds/wavelengths and efficiencies for Uno LEDs are unknown. Do not imply every recombination event produces a visible photon or that electrical energy disappears.

## Acceptance

Reader can state why the LED emits light, distinguish photon energy from brightness, trace control and power/return paths, and explain the unknown material boundary. Text and static state must convey the same cause/effect as the animation.
