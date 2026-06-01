"""Split the technology spritesheet into public/images/technology assets."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSET_NAME = (
    'c__Users_ROG_AppData_Roaming_Cursor_User_workspaceStorage_'
    '2b2eca483bfdb1193077b2f757165ae3_images_ChatGPT_Image_Jun_1__2026__'
    '09_59_10_PM-685b6b61-c083-46cb-a3f1-ba2f1ea7024c.png'
)
SRC_CANDIDATES = [
    ROOT / 'assets' / ASSET_NAME,
    Path(r'C:\Users\ROG\.cursor\projects\d-armenian-treasure\assets') / ASSET_NAME,
]
OUT = ROOT / 'public/images/technology'

# Layout for 1024×576 spritesheet (detected row/column gutters)
W, H = 1024, 576
HEADER = (0, 0, W, 177)
CARDS_Y1, CARDS_Y2 = 177, 455
CARD_X = (0, 341, 680, W)
BOTTOM_Y1 = 456
BOTTOM_X = (0, 267, 485, 738, W)

CROPS: list[tuple[str, tuple[int, int, int, int], str]] = [
    ('section-bg-main.jpg', HEADER, 'JPEG'),
    ('card-matterport.jpg', (CARD_X[0], CARDS_Y1, CARD_X[1], CARDS_Y2), 'JPEG'),
    ('card-drone.jpg', (CARD_X[1], CARDS_Y1, CARD_X[2], CARDS_Y2), 'JPEG'),
    ('card-ai-storytelling.jpg', (CARD_X[2], CARDS_Y1, CARD_X[3], CARDS_Y2), 'JPEG'),
    ('ornament-left.png', (BOTTOM_X[0], BOTTOM_Y1, BOTTOM_X[1], H), 'PNG'),
    ('ornament-right.png', (BOTTOM_X[1], BOTTOM_Y1, BOTTOM_X[2], H), 'PNG'),
    ('divider-decoration.png', (BOTTOM_X[2], BOTTOM_Y1, BOTTOM_X[3], H), 'PNG'),
    ('mountain-silhouette.png', (BOTTOM_X[3], BOTTOM_Y1, BOTTOM_X[4], H), 'PNG'),
]


def save_crop(im: Image.Image, box: tuple[int, int, int, int], path: Path, fmt: str) -> None:
    crop = im.crop(box)
    if fmt == 'JPEG':
        crop = crop.convert('RGB')
        crop.save(path, 'JPEG', quality=92, optimize=True)
    else:
        crop.save(path, 'PNG', optimize=True)


def resolve_source() -> Path:
    for candidate in SRC_CANDIDATES:
        if candidate.is_file():
            return candidate
    raise SystemExit(f'Missing source image. Tried: {SRC_CANDIDATES}')


def main() -> None:
    src = resolve_source()
    OUT.mkdir(parents=True, exist_ok=True)
    im = Image.open(src)
    print(f'Source: {src}')
    for name, box, fmt in CROPS:
        save_crop(im, box, OUT / name, fmt)
        print(f'Wrote {OUT / name} ({box[2] - box[0]}×{box[3] - box[1]})')


if __name__ == '__main__':
    main()
