import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
  children: ReactNode
}

/**
 * Figma "Primary Button": 14px radius, 17px padding, 14/20 SemiBold.
 * The disabled fill is Blue/Blue 100 (#D1E6FF) — it stays white-on-blue rather
 * than greying out, so the disabled state is styled, not just dimmed.
 */
export const Button = ({ variant = 'primary', className, children, disabled, ...props }: ButtonProps) => (
  <button
    type="button"
    disabled={disabled}
    className={cn(
      'flex w-full items-center justify-center gap-1.5 rounded-card p-[17px] text-center text-sm font-semibold leading-5 transition-colors duration-200',
      variant === 'primary' && [
        'text-white',
        disabled ? 'cursor-not-allowed bg-brand-100' : 'bg-brand-500 hover:bg-[#1878db] active:bg-[#166ec4]',
      ],
      variant === 'ghost' && 'text-grey-600 hover:text-grey-800',
      className,
    )}
    {...props}
  >
    {children}
  </button>
)
