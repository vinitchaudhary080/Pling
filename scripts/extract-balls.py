"""Cuts the ball artwork out of the exported sport cards.

Figma flattens PNG exports against their background, so the exported card art
arrives with the decorative rings and the card ground baked in. That is fine for
the resting card but wrong for the selected one, where both the ground and the
ring tints change.

Keeping only the ball gives one transparent asset per sport, so the rings can be
drawn in CSS and re-tinted per state instead of shipping two images per sport.

The mask is the intersection of two things:
  * the ball's fitted circle — its left edge and full height give centre and
    radius, since the card clips it on the right only;
  * everything the background flood-fill could NOT reach from the border, which
    trims the antialiased wedge between the circle and the ball's real edge
    while leaving interior light pixels (the football's white panels) intact.
"""

from collections import deque
from PIL import Image, ImageDraw

SPORTS = ["basketball", "football", "tennis", "volleyball"]
GROUND = (247, 250, 252)   # Grey 100 — what Figma flattened the export against
TOLERANCE = 20


def is_ground(pixel: tuple[int, int, int]) -> bool:
    return max(abs(pixel[i] - GROUND[i]) for i in range(3)) <= TOLERANCE


for sport in SPORTS:
    path = f"src/assets/sports/{sport}.png"
    source = Image.open(path).convert("RGB")
    width, height = source.size
    pixels = source.load()

    # 1. Fit the ball circle from the non-ground bounding box.
    xs, ys = [], []
    for y in range(height):
        for x in range(width):
            if not is_ground(pixels[x, y]):
                xs.append(x)
                ys.append(y)
    radius = (max(ys) - min(ys) + 1) / 2
    centre = (min(xs) + radius, min(ys) + radius)

    circle = Image.new("L", (width, height), 0)
    ImageDraw.Draw(circle).ellipse(
        (centre[0] - radius, centre[1] - radius, centre[0] + radius, centre[1] + radius), fill=255
    )

    # 2. Flood-fill the ground inwards from every border pixel.
    exterior = bytearray(width * height)
    queue = deque()
    for x in range(width):
        for y in (0, height - 1):
            queue.append((x, y))
    for y in range(height):
        for x in (0, width - 1):
            queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        index = y * width + x
        if exterior[index] or not is_ground(pixels[x, y]):
            continue
        exterior[index] = 1
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height and not exterior[ny * width + nx]:
                queue.append((nx, ny))

    mask = circle.load()
    for y in range(height):
        for x in range(width):
            if exterior[y * width + x]:
                mask[x, y] = 0

    out = source.convert("RGBA")
    out.putalpha(circle)
    out.save(path, optimize=True)
    print(f"{sport}: centre=({centre[0]:.0f},{centre[1]:.0f}) d={radius * 2:.0f}px @3x")
