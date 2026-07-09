const WEBP_QUALITY = 0.82;

export async function convertImageFileToWebp(file: File): Promise<Blob> {
  const mimeType = file.type.toLowerCase();
  if (mimeType === 'image/webp') {
    return file;
  }
  if (mimeType !== 'image/jpeg' && mimeType !== 'image/png') {
    throw new Error('Only JPG, PNG, or WebP images can be uploaded.');
  }

  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not prepare image conversion.');
    }
    context.drawImage(bitmap, 0, 0);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (result) {
            resolve(result);
            return;
          }
          reject(new Error('Failed to convert image to WebP.'));
        },
        'image/webp',
        WEBP_QUALITY,
      );
    });

    return blob;
  } finally {
    bitmap.close();
  }
}
