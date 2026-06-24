import { cn } from '@/lib/utils';

interface HeritageCrossOrnamentProps {
  className?: string;
}

export function HeritageCrossOrnament({ className }: HeritageCrossOrnamentProps) {
  return (
    <div className={cn('flex justify-center', className)} aria-hidden>
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 text-[rgba(214,184,90,0.35)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M16 4v24M4 16h24" />
        <path d="M16 8l-2 4h4l-2-4ZM16 24l-2-4h4l-2 4ZM8 16l4-2v4l-4-2ZM24 16l-4-2v4l4-2Z" />
      </svg>
    </div>
  );
}
