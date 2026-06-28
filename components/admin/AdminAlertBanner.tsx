import type { ReactNode } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminAlertBannerProps {
  title?: string;
  children: ReactNode;
  tone?: 'info' | 'warning';
  className?: string;
}

const TONE: Record<NonNullable<AdminAlertBannerProps['tone']>, string> = {
  info: 'border-pomegranate/20 bg-gradient-to-r from-pomegranate/8 to-pomegranate/5 text-pomegranate',
  warning: 'border-amber-300/50 bg-gradient-to-r from-amber-50 to-parchment-50 text-amber-900',
};

export function AdminAlertBanner({
  title,
  children,
  tone = 'info',
  className,
}: AdminAlertBannerProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-2xl border p-4 text-sm motion-safe:animate-admin-fade-up',
        TONE[tone],
        className,
      )}
    >
      <Info size={18} className="mt-0.5 shrink-0" aria-hidden />
      <div>
        {title ? <p className="font-medium">{title}</p> : null}
        <div className={cn(title ? 'mt-1 text-xs opacity-90' : 'leading-relaxed')}>{children}</div>
      </div>
    </div>
  );
}
