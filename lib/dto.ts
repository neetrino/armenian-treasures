/**
 * Public-facing DTO mappers.
 *
 * Strip every admin-only field (`adminNote`, `passwordHash`, internal counts) from
 * Prisma rows before serializing them to anything reachable by an unauthenticated
 * client. Every public route handler must use these mappers.
 */
import { normalizeAboutPillars, type AboutPillar } from '@/lib/types/about-content';
import type {
  Career,
  ContactMessage,
  CultureItem,
  CultureMenuItem,
  Donator,
  AboutContent,
  HomeContent,
  Project,
  SiteSettings,
  Submission,
  TeamMember,
} from '@prisma/client';

export interface PublicCultureMenuItemDTO {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  routeType: CultureMenuItem['routeType'];
  customUrl: string | null;
  order: number;
  parentId: string | null;
  isActive: boolean;
}

export interface PublicCultureItemDTO {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  menuItemId: string;
  region: string | null;
  locationName: string | null;
  periodLabel: string | null;
  yearLabel: string | null;
  century: number | null;
  image: string | null;
  galleryImages: string[];
  tourUrl: string | null;
  videoUrl: string | null;
  latitude: number | null;
  longitude: number | null;
  mapType: CultureItem['mapType'];
  showOnMap: boolean;
  itemType: CultureItem['itemType'];
  order: number;
}

export interface CultureItemMenuBreadcrumb {
  id: string;
  title: string;
  slug: string;
}

export interface PublicCultureItemDetailDTO extends PublicCultureItemDTO {
  menuItem: (CultureItemMenuBreadcrumb & { parent: CultureItemMenuBreadcrumb | null }) | null;
}

export interface PublicProjectDTO {
  id: string;
  title: string;
  slug: string;
  category: string;
  region: string | null;
  description: string | null;
  image: string | null;
  goalAmount: number;
  raisedAmount: number;
  status: Project['status'];
  order: number;
}

export interface PublicTeamMemberDTO {
  id: string;
  name: string;
  initials: string;
  position: string;
  bio: string | null;
  image: string | null;
  order: number;
}

export interface PublicCareerDTO {
  id: string;
  title: string;
  location: string;
  employmentType: string;
  description: string | null;
  applyUrl: string | null;
  applyEmail: string | null;
  order: number;
}

export interface PublicDonatorDTO {
  id: string;
  name: string;
  type: string;
  year: number | null;
  description: string | null;
  order: number;
}

export type PublicSiteSettingsDTO = Omit<SiteSettings, 'id' | 'updatedAt'>;
export type PublicHomeContentDTO = Omit<HomeContent, 'id' | 'updatedAt'>;
export type PublicAboutContentDTO = Omit<AboutContent, 'id' | 'createdAt' | 'updatedAt' | 'pillars'> & {
  pillars: AboutPillar[];
};

export function toPublicMenuItem(row: CultureMenuItem): PublicCultureMenuItemDTO {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    image: row.image,
    routeType: row.routeType,
    customUrl: row.customUrl,
    order: row.order,
    parentId: row.parentId,
    isActive: row.isActive,
  };
}

export function toPublicCultureItem(row: CultureItem): PublicCultureItemDTO {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    shortDescription: row.shortDescription,
    menuItemId: row.menuItemId,
    region: row.region,
    locationName: row.locationName,
    periodLabel: row.periodLabel,
    yearLabel: row.yearLabel,
    century: row.century,
    image: row.image,
    galleryImages: row.galleryImages ?? [],
    tourUrl: row.tourUrl,
    videoUrl: row.videoUrl,
    latitude: row.latitude,
    longitude: row.longitude,
    mapType: row.mapType,
    showOnMap: row.showOnMap,
    itemType: row.itemType,
    order: row.order,
  };
}

type CultureItemWithMenu = CultureItem & {
  menuItem: CultureMenuItem & { parent: CultureMenuItem | null };
};

export function toPublicCultureItemDetail(row: CultureItemWithMenu): PublicCultureItemDetailDTO {
  return {
    ...toPublicCultureItem(row),
    menuItem: {
      id: row.menuItem.id,
      title: row.menuItem.title,
      slug: row.menuItem.slug,
      parent: row.menuItem.parent
        ? {
            id: row.menuItem.parent.id,
            title: row.menuItem.parent.title,
            slug: row.menuItem.parent.slug,
          }
        : null,
    },
  };
}

export function toPublicProject(row: Project): PublicProjectDTO {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    region: row.region,
    description: row.description,
    image: row.image,
    goalAmount: row.goalAmount,
    raisedAmount: row.raisedAmount,
    status: row.status,
    order: row.order,
  };
}

export function toPublicTeamMember(row: TeamMember): PublicTeamMemberDTO {
  return {
    id: row.id,
    name: row.name,
    initials: row.initials,
    position: row.position,
    bio: row.bio,
    image: row.image,
    order: row.order,
  };
}

export function toPublicCareer(row: Career): PublicCareerDTO {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    employmentType: row.employmentType,
    description: row.description,
    applyUrl: row.applyUrl,
    applyEmail: row.applyEmail,
    order: row.order,
  };
}

export function toPublicDonator(row: Donator): PublicDonatorDTO {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    year: row.year,
    description: row.description,
    order: row.order,
  };
}

export function toPublicSiteSettings(row: SiteSettings): PublicSiteSettingsDTO {
  const { id: _id, updatedAt: _u, ...rest } = row;
  return rest;
}

export function toPublicHomeContent(row: HomeContent): PublicHomeContentDTO {
  const { id: _id, updatedAt: _u, ...rest } = row;
  return rest;
}

export function toPublicAboutContent(row: AboutContent): PublicAboutContentDTO {
  const { id: _id, createdAt: _c, updatedAt: _u, pillars, ...rest } = row;
  return {
    ...rest,
    pillars: normalizeAboutPillars(pillars),
  };
}

export function toAdminSubmissionView(row: Submission): Submission {
  return row;
}

export function toAdminContactView(row: ContactMessage): ContactMessage {
  return row;
}
