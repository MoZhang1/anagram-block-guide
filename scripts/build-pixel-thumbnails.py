"""User-approved deterministic pixel miniatures; original panel files stay untouched.

Requires Pillow. Each sprite uses a 40px logical canvas / 24-color palette.
"""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageEnhance, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'images' / 'pixel'
OUT.mkdir(parents=True, exist_ok=True)
blocks = json.loads((ROOT / 'src/data/catalog.json').read_text())['blocks']
manifest = {}
for block in blocks:
    source = ROOT / 'public' / block['images'][0]['src']
    image = Image.open(source).convert('RGBA')
    alpha = image.getchannel('A')
    # Transparent outer padding is omitted; no silhouette or controls are invented.
    bounds = alpha.getbbox()
    if bounds:
        image = image.crop(bounds)
    image.thumbnail((36, 36), Image.Resampling.LANCZOS)
    image = ImageEnhance.Contrast(image).enhance(1.10)
    image = image.quantize(colors=24, method=Image.Quantize.FASTOCTREE,
                           dither=Image.Dither.NONE).convert('RGBA')
    canvas = Image.new('RGBA', (40, 40))
    canvas.alpha_composite(image, ((40-image.width)//2, (40-image.height)//2))
    output = OUT / f"{block['id']}.png"
    canvas.save(output, optimize=True)
    manifest[block['id']] = {
        'src': f"images/pixel/{block['id']}.png",
        'source': block['images'][0]['src'],
        'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
        'method': 'source-derived-40px-24color',
    }
(ROOT / 'src/data/pixel-manifest.json').write_text(
    json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print(f'Generated {len(manifest)} pixel thumbnails; original images unchanged.')
