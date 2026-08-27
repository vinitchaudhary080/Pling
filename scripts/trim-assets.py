"""Trims the transparent bleed Figma adds around exported shape nodes.

The activity map plate exports with ~7px of empty margin on every side, which
would otherwise show up as a pale gutter inside the rounded card. Cropping to
the alpha bounding box lets the plate be sized against the card directly.
"""

from PIL import Image

TARGETS = ["src/assets/illustrations/route-map.png"]

for path in TARGETS:
    image = Image.open(path).convert("RGBA")
    box = image.getchannel("A").getbbox()
    if box is None or box == (0, 0, *image.size):
        print(f"{path}: nothing to trim")
        continue
    image.crop(box).save(path, optimize=True)
    print(f"{path}: {image.size} -> {(box[2] - box[0], box[3] - box[1])}")

# The pin avatar renders at 38px; the Figma export ships a 1624px original.
avatar = Image.open("src/assets/illustrations/pin-photo.jpg").convert("RGB")
if avatar.width > 160:
    avatar.resize((160, 160), Image.LANCZOS).save("src/assets/illustrations/pin-photo.jpg", quality=88, optimize=True)
    print("pin-photo.jpg: resized to 160x160")
