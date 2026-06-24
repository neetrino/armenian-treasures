import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Building2,
  Castle,
  Church,
  Crown,
  Drama,
  FlaskConical,
  Grid3x3,
  Library,
  Music,
  Palette,
  PenLine,
  Scroll,
  Sparkles,
  Swords,
  UtensilsCrossed,
  Users,
  PersonStanding,
  Shirt,
} from 'lucide-react';

export interface MegaMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface MegaMenuColumn {
  heading: string;
  items: MegaMenuItem[];
}

export const CULTURE_MEGA_MENU: MegaMenuColumn[] = [
  {
    heading: 'Architecture',
    items: [
      { label: 'Churches', href: '/culture/architecture/churches', icon: Church },
      { label: 'Castles', href: '/culture/architecture/castles', icon: Castle },
      { label: 'Museums', href: '/culture/museums', icon: Building2 },
      { label: 'History', href: '/culture/history', icon: Scroll },
    ],
  },
  {
    heading: 'Myth & People',
    items: [
      { label: 'Legends', href: '/culture/legends', icon: BookOpen },
      { label: 'Mythology', href: '/culture/legends', icon: Sparkles },
      { label: 'Kings', href: '/culture/people', icon: Crown },
      { label: 'Scientists', href: '/culture/people', icon: FlaskConical },
      { label: 'Famous Armenians', href: '/culture/people', icon: Users },
    ],
  },
  {
    heading: 'Arts & Culture',
    items: [
      { label: 'Paintings', href: '/culture/heritage/paintings', icon: Palette },
      { label: 'Music', href: '/culture/heritage/music', icon: Music },
      { label: 'Writers', href: '/culture/heritage/writers', icon: PenLine },
      { label: 'Taraz', href: '/culture/heritage/taraz', icon: Shirt },
      { label: 'Carpets', href: '/culture/heritage/carpets', icon: Grid3x3 },
    ],
  },
  {
    heading: 'More Culture',
    items: [
      { label: 'Theatre', href: '/culture/heritage/theatre', icon: Drama },
      { label: 'Dance', href: '/culture/heritage/dance', icon: PersonStanding },
      { label: 'Food & Drink', href: '/culture/heritage/food', icon: UtensilsCrossed },
      { label: 'Armaments', href: '/culture/heritage/armaments', icon: Swords },
      { label: 'Publications', href: '/culture/heritage/publications', icon: Library },
    ],
  },
];
