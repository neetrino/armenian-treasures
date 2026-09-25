'use server';

import { revalidatePath } from 'next/cache';
import type { Prisma } from '@prisma/client';
import { requireAdmin } from '@/lib/auth/require-admin';
import { catalogDocumentFromSection, type CatalogSectionId } from '@/lib/admin/catalog-section-document';
import { revalidateCultureCatalogPathForMenuItem, revalidateCultureMenuCache } from '@/lib/cache/revalidation';
import { prisma } from '@/lib/db';

export interface CultureCatalogSectionFormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
}

export async function saveCultureCatalogSectionAction(
  menuItemId: string,
  menuPath: string,
  section: CatalogSectionId,
  _prev: CultureCatalogSectionFormState,
  formData: FormData,
): Promise<CultureCatalogSectionFormState> {
  await requireAdmin();
  const item = await prisma.cultureMenuItem.findUnique({
    where: { id: menuItemId },
    select: { id: true, routeType: true, catalogContent: true },
  });
  if (!item || (item.routeType !== 'CATEGORY' && item.routeType !== 'SUBCATEGORY')) {
    return { status: 'error', message: 'Culture page not found.' };
  }

  await prisma.cultureMenuItem.update({
    where: { id: menuItemId },
    data: {
      catalogContent: catalogDocumentFromSection(item.catalogContent, section, formData) as Prisma.InputJsonValue,
    },
  });

  await revalidateCultureMenuCache();
  await revalidateCultureCatalogPathForMenuItem(menuItemId);
  revalidatePath(`/admin/culture-pages/${menuPath}`);
  revalidatePath(`/admin/culture-pages/section/${section}/${menuPath}`);

  return { status: 'success', message: 'Section saved for every language.' };
}
