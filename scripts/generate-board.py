"""Project the official UNO-TH_Rev3e EAGLE board into educational SVG geometry.
Usage: python scripts/generate-board.py path/to/UNO-TH_Rev3e.brd
No external Python dependencies. Keep the input design's attribution (SRC-002).
"""
from pathlib import Path
import xml.etree.ElementTree as ET
import hashlib, json, math, sys

source = Path(sys.argv[1])
board = ET.parse(source).find('.//board')
H = 53.34

def number(el, key, default=0): return float(el.get(key, default))
def point(x,y): return [round(x,4), round(H-y,4)]
def rot(el): return number_rotation(el.get('rot','R0'))
def number_rotation(value): return float(value.split('R')[-1])
def wire(el, transform=lambda x,y: point(x,y)):
    return dict(a=transform(number(el,'x1'),number(el,'y1')), b=transform(number(el,'x2'),number(el,'y2')), width=number(el,'width'), curve=number(el,'curve'))

parts=[]
for el in board.findall('elements/element'):
    ref=el.get('name')
    if ref=='FRAME1': continue
    pkg=board.find("libraries/library[@name='%s']/packages/package[@name='%s']"%(el.get('library'),el.get('package')))
    angle=math.radians(rot(el)); mirrored='M' in el.get('rot','')
    def transform(x,y):
        if mirrored:x=-x
        return point(number(el,'x')+x*math.cos(angle)-y*math.sin(angle),number(el,'y')+x*math.sin(angle)+y*math.cos(angle))
    pads=[]
    for pad in list(pkg.findall('pad'))+list(pkg.findall('smd')):
        p=transform(number(pad,'x'),number(pad,'y'))
        w=number(pad,'dx',number(pad,'diameter',number(pad,'drill')+0.6))
        h=number(pad,'dy',w)
        pr=rot(el)+rot(pad)
        if int(pr)%180==90:w,h=h,w
        pads.append(dict(x=p[0],y=p[1],w=round(w,4),h=round(h,4),drill=number(pad,'drill'),name=pad.get('name'),shape=pad.get('shape','square' if pad.tag=='smd' else 'round')))
    silk=[wire(w,transform) for w in pkg.findall('wire') if w.get('layer') in ['21','51']]
    boundsPoints=[p for w in silk for p in [w['a'],w['b']]]
    if not boundsPoints:boundsPoints=[[p['x']-p['w']/2,p['y']-p['h']/2] for p in pads]+[[p['x']+p['w']/2,p['y']+p['h']/2] for p in pads]
    if not boundsPoints:boundsPoints=[transform(-.5,-.5),transform(.5,.5)]
    bounds=[min(p[0] for p in boundsPoints),min(p[1] for p in boundsPoints),max(p[0] for p in boundsPoints),max(p[1] for p in boundsPoints)]
    parts.append(dict(ref=ref,value=el.get('value',''),package=el.get('package'),origin=transform(0,0),rotation=rot(el),mirrored=mirrored,bounds=[round(v,4) for v in bounds],pads=pads,silk=silk,feature=el.get('package') in ['TP-SP','FIDUCIA-MOUNT','SJ'],populated=ref!='JP2'))

outline=[wire(w) for w in board.findall('plain/wire') if w.get('layer')=='20']
# Reorder perimeter edges into one closed contour, preserving their authored curves.
ordered=[outline.pop(0)]
while outline:
    end=ordered[-1]['b']
    match=next((w for w in outline if w['a']==end),None)
    if match is None: raise ValueError('Board outline must be contiguous')
    ordered.append(match);outline.remove(match)
traces=[dict(**wire(w),net=s.get('name')) for s in board.findall('signals/signal') for w in s.findall('wire') if w.get('layer')=='1']
holes=[dict(x=number(h,'x'),y=round(H-number(h,'y'),4),r=number(h,'drill')/2) for h in board.findall('plain/hole')]
vias=[dict(x=number(v,'x'),y=round(H-number(v,'y'),4),r=number(v,'drill')/2) for s in board.findall('signals/signal') for v in s.findall('via')]
texts=[dict(text=t.text,x=number(t,'x'),y=round(H-number(t,'y'),4),size=number(t,'size'),rotation=-rot(t)) for t in board.findall('plain/text') if t.get('layer')=='21' and 0<=number(t,'y')<=H]
result=dict(source='SRC-002',identity='Arduino UNO-TH_Rev3e',inputSha256=hashlib.sha256(source.read_bytes()).hexdigest(),units='mm',representation='layout-faithful',note='Footprint origins, pads, traces, holes and board outline are derived from CAD. Package appearances are simplified educational illustrations, not procurement or material specifications.',width=68.58,height=H,outline=ordered,holes=holes,vias=vias,traces=traces,texts=texts,parts=parts)
out=Path(__file__).resolve().parent.parent/'src/content/board-geometry.json'
out.write_text(json.dumps(result,separators=(',',':')),encoding='utf-8')
print(f'Wrote {len(parts)} physical/feature records, {len(traces)} top-layer traces, {len(holes)} mounting holes; {out.stat().st_size} bytes.')
