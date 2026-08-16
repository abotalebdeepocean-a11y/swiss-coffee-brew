#!/usr/bin/env python3
"""Build a single self-contained ROVENTO preview HTML.

Reads public/rovento-preview.template.html, compresses the photos in
public/images/ and replaces __IMG_*__ tokens with base64 data URIs,
writing public/rovento-preview.html — a file you can send to anyone
and it opens fully in any browser (no server, no internet needed).

Usage: python3 scripts/build-preview.py
"""
import base64
import io
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TPL = os.path.join(ROOT, "public", "rovento-preview.template.html")
OUT = os.path.join(ROOT, "public", "rovento-preview.html")

# token -> (relative file, max width, jpeg quality)
TOKENS = {
    "__IMG_banner_hero__": ("images/banner-hero.png", 1800, 74),
    "__IMG_banner_workshop__": ("images/banner-workshop.png", 1800, 74),
    "__IMG_banner_signature__": ("images/banner-signature.png", 1800, 74),
    "__IMG_banner_collections__": ("images/banner-collections.png", 1800, 72),
    "__IMG_bag_hero__": ("images/bag-hero.png", 1000, 76),
    "__IMG_bag_premium__": ("images/bag-premium.jpg", 900, 76),
    "__IMG_bag_classic__": ("images/bag-classic.jpg", 900, 76),
    "__IMG_bag_intenso__": ("images/bag-intenso.png", 900, 76),
    "__IMG_banner_brika__": ("images/banner-brika.png", 1400, 74),
}

BLACK = (12, 10, 9)


def data_uri(rel_path, max_w, quality):
    path = os.path.join(ROOT, "public", rel_path)
    if not os.path.exists(path):
        raise SystemExit(f"missing image: {path}")
    from PIL import Image

    im = Image.open(path)
    # Flatten alpha onto the dark brand background so JPEG stays small.
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, BLACK)
        bg.paste(im, mask=im.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")

    w, h = im.size
    if w > max_w:
        im = im.resize((max_w, round(h * max_w / w)), Image.LANCZOS)

    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
    raw = buf.getvalue()
    return "data:image/jpeg;base64," + base64.b64encode(raw).decode("ascii")


def main():
    try:
        from PIL import Image  # noqa: F401
    except ImportError:
        raise SystemExit("Pillow is required: pip install Pillow")

    with open(TPL, "r", encoding="utf-8") as f:
        html = f.read()

    total = 0
    for token, (rel, max_w, q) in TOKENS.items():
        uri = data_uri(rel, max_w, q)
        count = html.count(token)
        if count == 0:
            raise SystemExit(f"token {token} not found in template")
        html = html.replace(token, uri)
        total += len(uri)
        print(f"  embedded {rel}  ({len(uri) // 1024} KB base64, {count} use(s))")

    # Safety: make sure no token was left behind.
    leftover = [t for t in TOKENS if t in html]
    if leftover:
        raise SystemExit(f"leftover tokens: {leftover}")

    with open(OUT, "w", encoding="utf-8") as f:
        f.write(html)

    size_mb = os.path.getsize(OUT) / (1024 * 1024)
    print(f"\nOK -> {OUT}  ({size_mb:.2f} MB, images {total // 1024} KB)")


if __name__ == "__main__":
    sys.exit(main())
