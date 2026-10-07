# Power-system explanation

## Verified topology

External barrel power: X1 PWRIN -> D1 -> VIN -> U1 -> +5V. The POWER VIN header is downstream of D1; it does not gain the barrel-input diode's series protection. USB: X2 VBUS -> F1 -> USBVCC -> T1 -> +5V. U3 UVCC taps USBVCC. U2 receives +5V and creates +3V3. PC1 shunts VIN to GND; PC2 and C2 shunt +5V to GND. They are parallel reservoirs/bypasses, not stages through which DC supply current must flow. [SRC-001, SRC-002](../../SOURCES.md)

## Source selection and L buffer

RN1A/B form an equal-valued divider. U5A compares its midpoint with +3V3 and commands P-channel T1; source selection is a control branch. Explain relative gate-source voltage, not “HIGH always turns a MOSFET on.” U5B is the other amplifier in the same U5 package and follows SCK/D13 for L LED drive. The +5V-powered amplifier output supplies the LED branch via RN2A. [SRC-001, SRC-008, SRC-009](../../SOURCES.md)

## Regulation and limits

U1 is the design's NCP1117 5 V linear regulator; U2 is LP2985-33DBVR. Linear regulation dissipates heat when input exceeds output, so a device's headline current rating is not a guaranteed Uno board current. Keep input conditions, thermal limits and existing loads attached to any quantitative example. Board-specific guidance comes from official pinout/product documentation. [SRC-005, SRC-010, SRC-011](../../SOURCES.md)

L2 and C10 feed/bypass AVCC; L1 is the USB shield/ground ferrite connection, not a VBUS series filter. U3's UCAP capacitor C8 does not generate the board's +3V3 rail. See [signal paths](signal-paths.md) and [inventory](../../COMPONENT_INVENTORY.md).

## Open research

No full L1 ordering suffix, exact switching threshold with tolerance, or physically confirmed production regulator variant is established. Avoid claiming direct +5V injection is automatically protected by the barrel path.
