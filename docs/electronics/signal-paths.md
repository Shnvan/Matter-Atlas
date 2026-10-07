# Causal signal paths

Baseline: UNO-TH_Rev3e. Circuit connectivity from [SRC-001 / SRC-002](../../SOURCES.md); MCU/software concepts from SRC-006 / SRC-007 / SRC-027; photons from SRC-019 / SRC-023. These are simplified educational causal chains, not circuit simulation or measured timing. Power paths include a return conductor; decoupling is a parallel branch; control edges do not imply supply energy passes through the control signal.

## USB power

USB connected -> X2 VBUS -> F1 low-resistance path -> USBVCC -> T1 channel when source-selection permits -> +5V -> MCU supply pins and U2 -> +3V3 loads. Return: loads -> GND/UGND -> USB return. Parallel: capacitors across rails/return. Separate branch: U3 UVCC on USBVCC. Protection: Z1/Z2 shunt data-line transients to USHIELD; L1 couples shield/UGND, not VBUS filtering.

## External power

Barrel input -> X1 PWRIN -> D1 -> VIN -> U1 regulation -> +5V -> loads; ground returns to source. Control: VIN -> RN1A/B midpoint -> U5A comparison to +3V3 -> T1 gate command -> USB path selected/isolated. The regulator path does not run in series through U5A. VIN-header input enters after D1.

## Upload

Sketch -> preprocessing -> compilation -> linking -> program image -> host USB transfer -> U3 firmware bridge -> UART through RN4A/B -> main bootloader -> flash programming -> execution after reset/start. Reset control branch: U3 DTR -> C5 transient -> RESET. This is information transfer; individual electrons do not travel from source-code text to flash.

## Built-in LED HIGH

Program instructions -> CPU changes GPIO state -> PB5/D13/SCK voltage -> U5B input -> buffer output -> RN2A -> L junction -> carrier recombination -> photons. LED branch power comes from +5V through U5B; return through L to GND. D13 supplies the control voltage. The prompt's direct GPIO-to-resistor-to-LED sequence must include this buffer for the built-in L LED.

## Analog measurement

Sensor voltage referenced to GND -> A0-A5 header -> PCB conductor -> ATmega input/multiplexer -> ADC compares/converts -> binary result -> CPU/program. Analog supply branch: +5V -> L2 -> AVCC, with C10 parallel bypass. No capacitor in series with sensor DC signal. Input limits/reference conditions require package-specific review before quantitative examples.

## Clock and execution

Y2 plus main oscillator circuit -> periodic clock -> sequential CPU/peripheral state changes -> instruction execution. Y1 plus USB MCU oscillator is a separate timing source. A tick is not a universal software-statement duration.

## Reset

Button press -> RESET tied toward GND -> main MCU reset logic -> configured restart behavior. Release -> pull-up restores net. DTR coupling supplies an alternate transient trigger; D2 bounds positive reset excursion. USB MCU RESET2 is separate. Do not promise identical boot sequence for arbitrary rewritten firmware/fuses.

## Animation data

Each journey has start/result, ordered event steps, affected component IDs, physical effects, sources and typed edges: control/power/data/return/parallel. Use step/pause/restart, text equivalent and a direction legend. Dots/arrow timing is illustrative. See [schema](../../DATA_MODEL.md) and [interactions](../engineering/interactions.md).
