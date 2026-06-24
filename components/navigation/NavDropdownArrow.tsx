import { cn } from '@/lib/utils';

interface NavDropdownArrowProps {
  open?: boolean;
  className?: string;
}

export function NavDropdownArrow({ open = false, className }: NavDropdownArrowProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 10 6"
      className={cn(
        'ml-0.5 h-[4px] w-1.5 shrink-0 opacity-70 transition-transform duration-200 ease-out motion-reduce:transition-none',
        open && 'rotate-180',
        className,
      )}
    >
      <path d="M1 1 L5 5 L9 1" fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
