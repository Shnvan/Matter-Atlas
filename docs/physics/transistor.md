# MOSFET and field-control teaching

## General simplified device

A MOSFET has source, drain, gate, body, gate dielectric and a channel region. In a simplified enhancement N-channel example, increasing gate-to-source voltage changes electric field and carrier distribution so a conductive channel can connect source and drain under appropriate bias. The gate controls electrostatically; no contact moves mechanically. A LOW/HIGH or illustrative voltage control changes field/channel/current depiction; no exact ATmega threshold or fabricated geometry is implied. [SRC-031](../../SOURCES.md)

Complementary CMOS pairs pull-up/pull-down networks so input voltage states determine output voltage state. Static and transition behavior are not identical; do not teach literal zero power in all real CMOS conditions. General diagrams connect gates to logic, memory and state without specifying ATmega transistor layouts.

## Real board comparison

T1 is FDN340P, a P-channel power MOSFET, commanded by U5A in the USB power connection. Relevant control is voltage between gate and source, with polarity differing from the beginner N-channel scene. Manufacturer describes trench technology; do not depict its exact cross-section as a planar classroom drawing. Board selection topology is in [power system](../electronics/power-system.md). [SRC-001, SRC-008](../../SOURCES.md)

## Scene acceptance

Label every region; show field/control before carrier response; keep current direction convention explicit; static description must explain both states. Source die dimensions, oxide thickness, threshold, process node and transistor count are unverified and omitted. Link to [semiconductors](semiconductor.md), not a mechanical-switch metaphor without limitations.
