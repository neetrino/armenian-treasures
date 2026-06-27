import type { MenuRouteType } from '@prisma/client';

export interface MenuRouteInput {
  routeType: MenuRouteType;
  parentId: string | null;
  customUrl: string | null;
}

export interface MenuParentRow {
  id: string;
  parentId: string | null;
  routeType: MenuRouteType;
}

function isUsableCustomUrl(value: string | null | undefined): boolean {
  if (!value?.trim()) return false;
  const url = value.trim();
  return url.startsWith('/') || /^https?:\/\//i.test(url);
}

export function validateMenuRouteRules(input: MenuRouteInput): Record<string, string> {
  const errors: Record<string, string> = {};
  const hasParent = Boolean(input.parentId);

  switch (input.routeType) {
    case 'CATEGORY':
      if (hasParent) {
        errors.parentId = 'Top-level categories cannot have a parent.';
      }
      break;
    case 'SUBCATEGORY':
      if (!hasParent) {
        errors.parentId = 'Sub-catalogs must belong to a parent category.';
      }
      break;
    case 'SUBCATEGORY_FORM':
      if (!hasParent) {
        errors.parentId = 'Sub-catalog proposal forms must be nested under a category.';
      }
      break;
    case 'PROJECT_SUBMIT_FORM':
      if (hasParent) {
        errors.parentId = 'Project submit links must be top-level menu items.';
      }
      break;
    case 'CUSTOM_URL':
      if (!isUsableCustomUrl(input.customUrl)) {
        errors.customUrl = 'Enter a full URL (https://…) or an internal path starting with /.';
      }
      break;
  }

  return errors;
}

export function validateMenuParentRules(
  routeType: MenuRouteType,
  parent: MenuParentRow | null,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (routeType !== 'SUBCATEGORY' && routeType !== 'SUBCATEGORY_FORM') {
    return errors;
  }
  if (!parent) {
    return errors;
  }
  if (parent.parentId !== null) {
    errors.parentId = 'Attach sub-catalogs and forms to a top-level category only.';
  }
  if (parent.routeType !== 'CATEGORY') {
    errors.parentId = 'Parent must be a top-level category route.';
  }
  return errors;
}
