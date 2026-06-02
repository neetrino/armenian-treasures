"""Split the technology reference mockup into public/images/technology assets."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSET_NAMES = [
    (
        'c__Users_ROG_AppData_Roaming_Cursor_User_workspaceStorage_'
        '2b2eca483bfdb1193077b2f757165ae3_images_ChatGPT_Image_Jun_2__2026__'
        '02_39_00_PM-8aa4279e-fea6-4526-aa2e-8192bdbeea97.png'
    ),
    (
        'c__Users_ROG_AppData_Roaming_Cursor_User_workspaceStorage_'
        '2b2eca483bfdb1193077b2f757165ae3_images_ChatGPT_Image_Jun_1__2026__'
        '09_59_10_PM-685b6b61-c083-46cb-a3f1-ba2f1ea7024c.png'
    ),
]
SRC_CANDIDATES = [
    *(ROOT / 'assets' / name for name in ASSET_NAMES),
    *(
        Path(r'C:\Users\ROG\.cursor\projects\d-armenian-treasure\assets') / name
        for name in ASSET_NAMES
    ),
]
OUT = ROOT / 'public/images/technology'

# 1024×438 reference layout (Jun 2 mockup)
REF_W, REF_H = 1024, 438
REF_HEADER = (0, 0, REF_W, 178)
REF_CARD_PHOTOS_Y = (184, 276)
REF_CARD_X = [(58, 322), (358, 650), (688, 992)]

# 1024×576 legacy spritesheet layout
LEG_W, LEG_H = 1024, 576
LEG_HEADER = (0, 0, LEG_W, 177)
LEG_CARDS_Y1, LEG_CARDS_Y2 = 177, 455
LEG_CARD_X = (0, 341, 680, LEG_W)
LEG_BOTTOM_Y1 = 456
LEG_BOTTOM_X = (0, 267, 485, 738, LEG_W)


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


def export_reference(im: Image.Image) -> None:
    save_crop(im, REF_HEADER, OUT / 'section-bg-main.jpg', 'JPEG')
    y1, y2 = REF_CARD_PHOTOS_Y
    names = ['card-matterport.jpg', 'card-drone.jpg', 'card-ai-storytelling.jpg']
    for name, (x1, x2) in zip(names, REF_CARD_X, strict=True):
        save_crop(im, (x1, y1, x2, y2), OUT / name, 'JPEG')


def export_legacy(im: Image.Image) -> None:
    save_crop(im, LEG_HEADER, OUT / 'section-bg-main.jpg', 'JPEG')
    card_boxes = [
        (LEG_CARD_X[0], LEG_CARDS_Y1, LEG_CARD_X[1], LEG_CARDS_Y2),
        (LEG_CARD_X[1], LEG_CARDS_Y1, LEG_CARD_X[2], LEG_CARDS_Y2),
        (LEG_CARD_X[2], LEG_CARDS_Y1, LEG_CARD_X[3], LEG_CARDS_Y2),
    ]
    names = ['card-matterport.jpg', 'card-drone.jpg', 'card-ai-storytelling.jpg']
    for name, box in zip(names, card_boxes, strict=True):
        save_crop(im, box, OUT / name, 'JPEG')

    extras: list[tuple[str, tuple[int, int, int, int], str]] = [
        ('ornament-left.png', (LEG_BOTTOM_X[0], LEG_BOTTOM_Y1, LEG_BOTTOM_X[1], LEG_H), 'PNG'),
        ('ornament-right.png', (LEG_BOTTOM_X[1], LEG_BOTTOM_Y1, LEG_BOTTOM_X[2], LEG_H), 'PNG'),
        ('divider-decoration.png', (LEG_BOTTOM_X[2], LEG_BOTTOM_Y1, LEG_BOTTOM_X[3], LEG_H), 'PNG'),
        ('mountain-silhouette.png', (LEG_BOTTOM_X[3], LEG_BOTTOM_Y1, LEG_BOTTOM_X[4], LEG_H), 'PNG'),
    ]
    for name, box, fmt in extras:
        save_crop(im, box, OUT / name, fmt)


def main() -> None:
    src = resolve_source()
    OUT.mkdir(parents=True, exist_ok=True)
    im = Image.open(src)
    print(f'Source: {src} ({im.size[0]}×{im.size[1]})')

    if im.size == (REF_W, REF_H):
        export_reference(im)
        print('Exported Jun 2 reference crops (header + card photos).')
    else:
        export_legacy(im)
        print('Exported legacy spritesheet crops.')

    for path in sorted(OUT.glob('*')):
        if path.is_file():
            print(f'  {path.name}')


if __name__ == '__main__':
    main()
