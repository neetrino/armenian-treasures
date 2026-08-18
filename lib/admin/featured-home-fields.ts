export function parseFeaturedHomeFields(formData: FormData): {
  featuredOnHome: boolean;
  featuredOrder: number | null;
} {
  const featuredOnHome = formData.get('featuredOnHome') === 'on';
  if (!featuredOnHome) {
    return { featuredOnHome: false, featuredOrder: null };
  }

  const raw = formData.get('featuredOrder')?.toString().trim() ?? '';
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    return { featuredOnHome: true, featuredOrder: 5 };
  }

  const featuredOrder = Math.min(5, Math.max(1, Math.trunc(parsed)));
  return { featuredOnHome: true, featuredOrder };
}
