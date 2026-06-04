import { FooterDivider } from '@/components/layout/footer/FooterDivider';
import { cn } from '@/lib/utils';

interface FooterOrnamentProps {
  className?: string;
}

export function FooterOrnament({ className }: FooterOrnamentProps) {
  return <FooterDivider variant="vertical" className={cn(className)} />;
}
