"""Reviewed projection of canonical inventory, sources and terminology. No network access."""
from pathlib import Path
import json,re,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'src/content'
def save(name,data):
 (OUT/(name+'.json')).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
def claim(text,sources,scope='General educational model',evidence='verified'):
 return dict(text=text,evidence=evidence,sourceRefs=sources,applicability=scope,notes='Conceptual representation; no exact manufacturing geometry is asserted.')
sources=[]
for block in re.split(r'\n## ',(ROOT/'SOURCES.md').read_text(encoding='utf8'))[1:]:
 head=block.splitlines()[0]; m=re.match(r'(SRC-\d+) — (.*)',head)
 if not m: continue
 fields={k:v.strip() for k,v in re.findall(r'^- ([^:\n]+): (.+)$',block,re.M)}
 url=re.search(r'\]\((https?://[^)]+)\)',fields.get('URL',''))
 if not url:continue
 location=fields.get('Evidence location/document identity','Document overview.')
 supported=fields.get('Claims supported and limits','')
 checksum=re.search(r'SHA-256: ([0-9a-f]{64})',supported)
 sources.append(dict(id=m[1],title=m[2],organization=fields.get('Organization/author',''),type=fields.get('Type',''),url=url[1],documentIdentity=location,evidenceLocation=location,accessed='2026-10-08',claimsSupported=[supported],authorityNotes=supported,checksum=checksum[1] if checksum else None))
save('sources',sources)
families={
 'MCU':('Integrated circuits on silicon, with metal connections inside a protective package. Exact die geometry and bond materials are not established.','A processor follows encoded instructions while memory and peripherals hold state, time events and exchange signals.','Like a small workshop with a coordinator, storage and specialist tools.','It is a collection of physical circuits, not a person making decisions.','ic-package',['SRC-006','SRC-007','SRC-032']),
 'regulator':('A semiconductor regulating circuit in a protective package. Exact internal construction is not depicted.','Feedback adjusts a pass device to maintain the intended output voltage while excess electrical energy becomes heat.','Like a pressure regulator maintaining a downstream level.','Voltage is not fluid pressure; available current and heating impose limits.','regulator',['SRC-010','SRC-011']),
 'dual op-amp':('Two analog amplifier circuits in one silicon package.','An amplifier responds to the difference between its inputs. Feedback or external wiring determines its role.','A sensitive comparison instrument with an amplified output.','The output cannot exceed its supply or drive unlimited current.','analog-circuit',['SRC-009']),
 'P-channel MOSFET':('A semiconductor channel, insulated gate and conductive terminals; cross-section is conceptual.','A sufficiently negative gate-to-source voltage allows the P-channel path to conduct. This board uses it to connect USB power.','An electrically controlled valve.','This is P-channel; a generic N-channel HIGH-means-ON rule does not apply.','p-mosfet',['SRC-008']),
 'LED':('A light-emitting semiconductor junction, contacts and package. The actual compound and encapsulant are unverified.','Forward current supplies carriers that can recombine and emit photons; the external circuit limits current.','An energy converter producing light.','Electrons are not consumed and light is not made from colored balls.','led-junction',['SRC-019','SRC-023']),
 'capacitor':('Separated conductive electrodes with a dielectric between them. This board part’s exact dielectric is unknown.','Opposite electrode charges establish an electric field. Current can briefly redistribute charge as voltage changes.','A flexible buffer for electrical changes.','The dielectric is not a bucket filled with free electrons.','capacitor-field',['SRC-021']),
 'polarized bulk capacitor':('Electrodes, dielectric and a polarized package; the precise supplier materials are not established.','It buffers rail changes by changing separated electrode charge; correct polarity matters.','A local energy buffer beside a supply.','It is not a continuous DC path through the dielectric.','capacitor-field',['SRC-021']),
 'resistor':('A resistive body with conductive terminals; film chemistry and tolerance are unspecified.','Carrier scattering transfers electrical energy to the material, producing heat and a voltage drop under current.','A restriction controlling flow.','Charge is conserved: it does not use up electrons.','resistor-film',['SRC-020']),
 'resistor network':('Four resistive elements and package contacts. Their exact film material is unspecified.','Each element provides resistance; the schematic connects different units for limiting, division or bias.','Four resistors sharing a single physical home.','One package does not imply the four resistors share an electrical node.','resistor-film',['SRC-020']),
 'rectifier diode':('A semiconductor diode and package contacts; exact supplier identity is not established by M7.','Direction-dependent conduction passes intended barrel-input current while resisting reverse polarity under its operating conditions.','A direction-sensitive gate.','It has voltage drop, leakage and limits; it is not an ideal one-way switch.','diode-junction',['SRC-019']),
 'switching diode':('A semiconductor junction and conductive terminals in a protective package.','The reset clamp conducts when the reset node rises sufficiently above the supply, limiting that excursion.','A relief path for an excessive node voltage.','It does not prevent every fault or carry the normal reset signal in series.','diode-junction',['SRC-019','SRC-030']),
 'polymer PTC fuse':('A polymer and conductive network, with proprietary composition unspecified.','Heating expands the polymer network and raises resistance. After the fault and power are removed, cooling allows recovery.','A self-recovering restriction that responds to heating.','Its 0.50 A hold rating is conditional, not an instantaneous trip threshold.','ptc',['SRC-012','SRC-013']),
 'ESD protector':('A thin-film polymer protection structure. This is the manufacturer’s classification, despite the CAD library name.','It shunts an electrostatic transient from a USB data line toward the shield node; it is not a series data stage.','A short-lived pressure relief route.','It does not remove every overvoltage or guarantee survival.','protection',['SRC-014','SRC-015']),
 'ferrite bead':('A conductive path with ferrite magnetic material; exact BLM21 ordering suffix and chemistry remain unknown.','Frequency-dependent magnetic impedance and losses impede high-frequency noise in the shield-to-USB-ground connection.','A selective damper for fast disturbances.','It is not installed in series with USB VBUS in this schematic.','magnetic',['SRC-016']),
 'inductor':('A conductive winding or pattern; the exact core and supplier are unknown.','Changing current establishes a changing magnetic field. This part feeds the analog supply with a shunt bypass capacitor beside it.','A component resisting rapid changes in current.','The AVCC bypass capacitor is a parallel branch, not a series supply stage.','magnetic',['SRC-001']),
 'quartz crystal':('A piezoelectric resonant element and electrodes; exact manufacturer is not identified.','Electrical and mechanical oscillation reinforce at a resonance when driven by the MCU oscillator circuit.','A tuning fork used as a timing reference.','It requires an oscillator circuit and is not a complete clock chip.','resonator',['SRC-001','SRC-017']),
 'ceramic resonator':('A piezoelectric ceramic resonator and electrodes, in the specified CERALOCK family.','Mechanical resonance and electrical feedback sustain the main microcontroller clock.','A tiny electrically driven tuning fork.','A clock tick is not necessarily one completed software statement.','resonator',['SRC-017']),
 'pushbutton':('Conductive contacts and a mechanical actuator in a housing; exact interior materials are not established.','Pressing joins RESET to ground; releasing allows the pull-up network to restore the inactive reset level.','A momentary restart request.','It does not erase the stored sketch.','contacts',['SRC-001']),
 'header':('Conductive contacts held by an insulating support; exact alloys and polymer are unverified.','A mating conductor extends a board net to another circuit. Function comes from the connected net, not the connector shape.','A labeled doorway to a circuit node.','Adjacent contacts need not carry related signals or tolerate the same voltage.','contacts',['SRC-001','SRC-002']),
 'barrel jack':('Metal contacts and an insulating housing; exact materials are unverified.','Its center contact supplies the external input through D1 to VIN, while another contact provides the return.','A keyed entrance for external power.','VIN header power bypasses the barrel diode and is a different protection path.','contacts',['SRC-001']),
 'USB-B':('Four electrical contacts, a metal shield and insulating/mechanical support.','Separate contacts carry supply, return and differential data; the shield has its own grounding network.','One connector carrying several separate services.','Power and data do not travel through one identical serial chain.','contacts',['SRC-001'])
}
rows=[]
for line in (ROOT/'COMPONENT_INVENTORY.md').read_text(encoding='utf8').splitlines():
 if not line.startswith('| '):continue
 cells=[v.strip() for v in line.strip('|').split('|')]
 if len(cells)!=10:continue
 ref,value,category,system,qty,role,citations,status,pos,notes=cells
 m=re.fullmatch(r'(-?[\d.]+), (-?[\d.]+); (M?)R([\d.]+)',pos)
 if not m:continue
 rows.append(dict(referenceDesignator=ref,value=value,category=category,subsystem=system,role=role,sourceRefs=re.findall(r'SRC-\d+',citations),x=float(m[1]),y=float(m[2]),rotation=float(m[4]),mirrored=bool(m[3]),notes=notes))
save('physical-inventory',rows)
ids={'ZU4':'mcu-main','U3':'mcu-usb','U1':'regulator-5v','U2':'regulator-3v3','U5':'op-amp','T1':'power-mosfet','L':'led-l','ON':'led-on','RX':'led-rx','TX':'led-tx','X1':'barrel-jack','X2':'usb-port','F1':'usb-fuse','L1':'ferrite-bead','L2':'avcc-inductor','Y1':'usb-crystal','Y2':'main-resonator','RESET':'reset-button'}
components=[]
for r in rows:
 cat=r['category']
 if cat not in families:continue
 made,works,analogy,limit,zoom,extra=families[cat]
 ref=r['referenceDesignator']; ident=ids.get(ref,ref.lower()); refs=list(dict.fromkeys(r['sourceRefs']+extra))
 purpose=r['role']+'.'; name=(r['value']+' · '+ref) if cat!='LED' else ref+' indicator LED'
 short={'ZU4':'ATmega328P','U3':'ATmega16U2','U1':'5 V regulator','U2':'3.3 V regulator','U5':'Dual op-amp','T1':'Power MOSFET','L':'Built-in LED','X2':'USB-B','X1':'Barrel jack','RESET':'Reset button','Y1':'USB crystal','Y2':'Main resonator','F1':'USB polyfuse'}.get(ref,ref+' · '+cat)
 scope='UNO-TH_Rev3e reference design; production assemblies may differ.'
 part={k:r[k] for k in ['referenceDesignator','x','y','rotation','mirrored']}; part.update(boardPosition={k:r[k] for k in ['x','y','rotation','mirrored']},svgId='part-'+ident,slotId='slot-'+ident,slotPosition={'x':r['x']*10,'y':(53.34-r['y'])*10},tooltip=short,assemblyEligible=True)
 missing='Removing this part interrupts or degrades its stated role: '+r['role'].lower()+'. The exact symptom depends on the rest of the circuit and operating conditions.'
 components.append(dict(id=ident,name=name,shortName=short,category=cat,subsystem=r['subsystem'],referenceDesignators=[ref],partNumber=r['value'],purpose=purpose,madeOf=made,howItWorks=works,ifMissing=missing,analogy=analogy,analogyLimit=limit,intermediate=r['notes'],deepDive=r['role']+'. '+r['notes']+' '+limit,sourceRefs=refs,zoomTargets=[zoom],specs=[dict(label='Reference',value=ref),dict(label='Design identity',value=r['value'])],measurements=[],representation='layout-faithful',groupedParts=[part],applicability=scope,evidence='verified',claims={'purpose':claim(purpose,r['sourceRefs'],scope),'madeOf':claim(made,extra),'howItWorks':claim(works,refs),'ifMissing':claim(missing,refs,scope,'inference')}))
pcb=dict(id='pcb',name='Printed circuit board',shortName='PCB & copper',category='PCB',subsystem='PCB features',referenceDesignators=[],partNumber=None,purpose='Supports parts and connects their terminals through patterned conductors.',madeOf='Conductors and insulating support; FR-4 glass/epoxy is a general board model, not a verified procurement recipe for every Uno.',howItWorks='Copper paths form electrical nodes. Insulating regions keep unrelated nodes apart, while vias connect copper layers.',ifMissing='There is no shared mechanical support or routed circuit.',analogy='A map of connected routes.',analogyLimit='Traces carry physical electrical effects and have resistance, capacitance and inductance.',intermediate='The CAD documents two copper layers, vias, pads, test access and a shaped outline.',deepDive='Substrate recipe, finish and solder alloy are unverified. The viewer preserves layout but uses illustrative appearance.',sourceRefs=['SRC-002','SRC-029'],zoomTargets=['pcb-layers','conductor'],specs=[],measurements=[],representation='layout-faithful',groupedParts=[],applicability='UNO-TH_Rev3e geometry; general material model',evidence='verified',claims={})
pcb['claims']={k:claim(pcb[k],pcb['sourceRefs'],pcb['applicability']) for k in ['purpose','madeOf','howItWorks']};components.append(pcb)
save('components',components)
terms=[]
for line in (ROOT/'docs/product/terminology.md').read_text(encoding='utf8').splitlines():
 cells=[x.strip() for x in line.strip('|').split('|')]
 if not line.startswith('| ') or len(cells)!=6 or 'SRC-' not in cells[-1]:continue
 term,beginner,precise,misconception,related,refs=cells
 norm=lambda s:re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')
 terms.append(dict(id=norm(term),term=term,beginner=beginner,precise=precise,misconception=misconception,relatedTermIds=[norm(x.strip()) for x in related.split(',')],sourceRefs=re.findall(r'SRC-\d+',refs)))
save('terminology',terms)
digital_pins=[2,3,4,5,6,11,12,13,14,15,16,17,18,19,23,24,25,26,27,28]
ports=['PD'+str(i) for i in range(8)]+['PB'+str(i) for i in range(6)]+['PC'+str(i) for i in range(6)]
pin_to_digital={pin:d for d,pin in enumerate(digital_pins)}
def pin_record(header,pos,label,pin):
 d=pin_to_digital.get(pin); port=ports[d] if d is not None else {1:'PC6',9:'PB6',10:'PB7'}.get(pin)
 analog=('A'+str(d-14)) if d is not None and d>=14 else None
 name=label
 interrupts=[]
 if d is not None:
  interrupts=['PCINT'+str(d+16 if d<8 else d-8 if d<14 else d-6)]
  if d in (2,3):interrupts.insert(0,'INT'+str(d-2))
 notes='Physical contact; capabilities may share the same underlying net.'
 if label in ['SDA','SCL']:notes='Duplicate of A4/SDA or A5/SCL; not an additional independent GPIO.'
 if label=='AREF':notes='Analog reference connection, not the 5 V power output.'
 if d==13:notes='PB5/SCK also controls the buffered L LED; it does not directly drive L current.'
 if label=='NC':notes='Reserved, not connected in the baseline.'
 return dict(id=f'pin-{header.lower()}-{pos}',physicalLabel=str(pos),arduinoName=name,header=header,position=pos,mcuPort=port,mcuPackagePin=pin,digital=d is not None,analog=analog,pwm=d in [3,5,6,9,10,11],interrupts=interrupts,uart=[{0:'RX',1:'TX'}[d]] if d in [0,1] else [],spi=[{10:'SS',11:'COPI',12:'CIPO',13:'SCK'}[d]] if d in [10,11,12,13] else [],twi=[{18:'SDA',19:'SCL'}[d]] if d in [18,19] else [],powerFunction=label if label in ['VCC','AVCC','GND','5V','3V3','VIN','IOREF'] else None,notes=notes,sourceRefs=['SRC-001','SRC-002','SRC-005','SRC-033'],applicability='Socketed Uno Rev3, 28-pin ATmega328P; ArduinoCore-avr 1.8.6 standard variant')
pins=[]
for i in range(1,29):
 d=pin_to_digital.get(i)
 label=('A'+str(d-14) if d>=14 else 'D'+str(d)) if d is not None else {1:'RESET',7:'VCC',8:'GND',9:'XTAL1',10:'XTAL2',20:'AVCC',21:'AREF',22:'GND'}[i]
 pins.append(pin_record('DIP',i,label,i))
headers={'IOL':[(f'D{i}',digital_pins[i]) for i in range(8)],'IOH':[(f'D{i}',digital_pins[i]) for i in range(8,14)]+[('GND',8),('AREF',21),('SDA',27),('SCL',28)],'AD':[(f'A{i}',23+i) for i in range(6)],'POWER':[('NC',None),('IOREF',7),('RESET',1),('3V3',None),('5V',7),('GND',8),('GND',8),('VIN',None)],'ICSP':[('CIPO',18),('5V',7),('SCK',19),('COPI',17),('RESET',1),('GND',8)]}
for header,entries in headers.items():
 for pos,(label,pin) in enumerate(entries,1):pins.append(pin_record(header,pos,label,pin))
save('pins',pins)
print(f'Projected {len(components)} teaching entries, {len(rows)} physical entries, {len(sources)} sources, {len(terms)} terms.')
