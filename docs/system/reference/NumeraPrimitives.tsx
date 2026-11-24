import { forwardRef, useId, useRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { AlertCircle, Check, CheckCircle2, Info, Minus } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const BTN_VARIANT: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary text-primary-on hover:bg-primary-hover',
  secondary: 'border border-ov/[0.16] text-fg hover:border-ov/[0.32] hover:bg-ov/[0.06]',
  ghost: 'text-fg-2 hover:bg-ov/[0.06] hover:text-fg',
  destructive: 'border border-negative/40 text-negative-fg hover:border-negative/70 hover:bg-negative/[0.10]',
};

const BTN_SIZE: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'min-h-[44px] px-4 text-[13px]',
  md: 'min-h-[44px] px-5 text-sm',
  lg: 'min-h-[48px] px-7 text-sm',
  icon: 'h-11 w-11 min-h-[44px] min-w-[44px] p-0',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={[
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[0.01em] select-none',
        'transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        'disabled:pointer-events-none disabled:border disabled:border-ov/[0.08] disabled:bg-transparent disabled:text-fg-4',
        BTN_VARIANT[variant],
        BTN_SIZE[size],
        className,
      ].join(' ')}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

/** WCAG AA Switch (`44x44` wrapper + `Check`/`Minus` non-color indicator + `bg-accent-on` thumb). */
export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="group inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span
        aria-hidden="true"
        className={[
          'relative inline-flex h-7 w-12 items-center rounded-full border p-0.5 transition-[background-color,border-color] duration-150',
          checked ? 'border-accent bg-accent' : 'border-[color:var(--line-strong)] bg-sunken',
        ].join(' ')}
      >
        <span
          className={[
            'flex h-5 w-5 items-center justify-center rounded-full transition-transform duration-150',
            checked ? 'translate-x-5 bg-accent-on text-accent' : 'translate-x-0 bg-fg-2 text-sunken',
          ].join(' ')}
        >
          {checked ? <Check size={12} strokeWidth={2.5} /> : <Minus size={11} strokeWidth={2.5} />}
        </span>
      </span>
    </button>
  );
}

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  disabled?: boolean;
}

/** Accessible radiogroup with roving tabIndex and keyboard arrow support. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  'aria-label': ariaLabel,
}: {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (next: T) => void;
  'aria-label': string;
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIdx = Math.max(0, options.findIndex((o) => o.value === value && !o.disabled));

  const move = (idx: number, delta: 1 | -1) => {
    for (let step = 1; step <= options.length; step++) {
      const next = (idx + delta * step + options.length) % options.length;
      if (!options[next].disabled) {
        onChange(options[next].value);
        refs.current[next]?.focus();
        return;
      }
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      move(idx, 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      move(idx, -1);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-1 rounded-full border border-ov/[0.10] bg-ov/[0.02] p-1"
    >
      {options.map((opt, idx) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={opt.disabled}
            tabIndex={idx === activeIdx ? 0 : -1}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => onKeyDown(e, idx)}
            className={[
              'inline-flex min-h-[44px] items-center justify-center rounded-full border px-4 text-caption transition-[background-color,border-color,color] duration-150 select-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
              selected
                ? 'border-[color:var(--line-strong)] bg-ov/[0.09] font-medium text-fg'
                : 'border-transparent text-fg-3 hover:text-fg',
            ].join(' ')}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = '', ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="w-full min-w-0">
        {label && (
          <label htmlFor={inputId} className="label-ui mb-1 block text-fg-3">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={[
            'w-full min-h-[44px] border-b bg-transparent py-2 text-base text-fg outline-none transition-[border-color,box-shadow] duration-150',
            'placeholder:text-fg-3 disabled:cursor-not-allowed disabled:text-fg-4',
            error
              ? 'border-negative focus:shadow-[0_1px_0_0_rgb(var(--c-negative))]'
              : 'border-[color:var(--line-strong)] hover:border-ov/60 focus:border-accent focus:shadow-[0_1px_0_0_rgb(var(--c-accent))]',
            className,
          ].join(' ')}
          {...props}
        />
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-caption text-fg-3">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="mt-1.5 flex items-center gap-1.5 text-caption text-negative-fg">
            <AlertCircle size={14} aria-hidden="true" className="shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export function EmptyState({
  label,
  description,
  action,
}: {
  label: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
      <p className="label-ui text-fg-3">{label}</p>
      <p className="max-w-xs text-body text-fg-2">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export function Notice({
  tone,
  children,
}: {
  tone: 'ok' | 'error' | 'info';
  children: ReactNode;
}) {
  const Icon = tone === 'ok' ? CheckCircle2 : tone === 'error' ? AlertCircle : Info;
  const iconTone =
    tone === 'ok' ? 'text-positive-fg' : tone === 'error' ? 'text-negative-fg' : 'text-info-fg';

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className="flex items-start gap-2.5 rounded-field border border-ov/[0.10] px-3.5 py-2.5 text-sm text-fg"
    >
      <Icon size={16} strokeWidth={1.75} aria-hidden="true" className={`mt-0.5 shrink-0 ${iconTone}`} />
      <span className="min-w-0">{children}</span>
    </div>
  );
}
