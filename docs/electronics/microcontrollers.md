# Microcontrollers, software, clocks and pins

## Main and USB processors

The reference has ZU4 ATMEGA328P-PU in a 28-pin socketed footprint and U3 ATMEGA16U2-MU(R) in MLF32. ATmega328P exposes CPU, flash, SRAM, EEPROM, timers, digital I/O, ADC and serial peripherals at a functional level. Manufacturer overview reports 32 KB flash, 2 KB SRAM and 1 KB EEPROM. The 28-pin part has six ADC inputs; eight-channel descriptions apply to other package variants. ATmega16U2 has USB functionality, 16 KB flash and 512-byte SRAM/EEPROM. These totals are device capacities, not a sketch's available payload after bootloader allocation. [SRC-001, SRC-006, SRC-007](../../SOURCES.md)

## Clock and reset

Both reference clocks are nominally 16 MHz. Y2 is the main MCU ceramic resonator; Y1 is the USB MCU crystal with C9/C11 loading. Clock oscillation provides timing; it does not mean every software statement completes in one tick. Main reset combines button, pull-up, DTR coupling, clamp and RESET-EN feature. USB MCU reset and ICSP1 are separate. [SRC-001, SRC-002](../../SOURCES.md)

## Software-to-hardware model

An Arduino sketch is preprocessed into a C++ compilation input, compiled and linked with required core/library code, then packaged for program memory. Uploaded bytes are information stored in flash. CPU fetch/decode/execution changes internal state, and GPIO registers affect output-driver circuitry. Do not claim a particular high-level statement always compiles to one specific AVR instruction. Upload uses U3 bridge and main MCU bootloader; actual firmware/version determines details. [SRC-027](../../SOURCES.md)

## Digital logic and memory teaching

Use generic complementary CMOS examples: NOT inverts; NAND is low only for two high inputs; AND and OR are functions assembled from logic circuitry. Truth tables are functional models, not authoritative ATmega transistor layouts. Registers/flip-flops retain state; counters and control/arithmetic use gates and state. SRAM requires power; flash and EEPROM retain information without normal supply. Exact ATmega cell internals are not shown. [SRC-006, SRC-031](../../SOURCES.md)

## Initial pin mapping for review

D0/D1 UART; D2/D3 external interrupts; PWM D3, D5, D6, D9, D10, D11; SPI D10 SS, D11 COPI, D12 CIPO, D13 SCK; A4 SDA and A5 SCL also appear on duplicated Rev3 header pins. IOREF ties to +5V; AREF is not the +5V supply pin. [SRC-005, SRC-028](../../SOURCES.md)

The application mapping is pinned to ArduinoCore-avr **1.8.6** standard variant and cross-checked with the baseline EAGLE netlist and official pinout. This is a reviewed teaching version, not a claim about the newest core. D0–D7 map to PD0–PD7 (DIP 2, 3, 4, 5, 6, 11, 12, 13); D8–D13 to PB0–PB5 (14–19); A0–A5 to PC0–PC5 (23–28). RESET is PC6/pin 1. Dedicated oscillator pins PB6/PB7 are 9/10; VCC 7, GND 8/22, AVCC 20, AREF 21. [SRC-001, SRC-002, SRC-005, SRC-033](../../SOURCES.md)

Pin-change interrupts differ from the dedicated INT0/INT1 inputs on D2/D3. A4/A5 and the separate SDA/SCL header positions share the same two MCU pins. A6/A7 constants in a generic core header do not create pins on this socketed board. PWM changes duty cycle of a digital waveform, not a built-in DAC voltage. The application also retains separate records for each physical duplicated header position. See [data model](../../DATA_MODEL.md).
