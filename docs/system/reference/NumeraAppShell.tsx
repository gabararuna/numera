import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type ShellWidthTier = 'focused' | 'operational' | 'analytical';

const CONTAINER_CLASSES: Record<ShellWidthTier, string> = {
  focused: 'max-w-5xl',
  operational: 'max-w-[1440px]',
  analytical: 'max-w-[1600px]',
};

export interface NavDestination {
  id: string;
  label: string;
  icon: ReactNode;
  active: boolean;
  onSelect: () => void;
}

export interface NumeraAppShellProps {
  /** Wordmark + SVG mark (`variant="full"`), rendered in the left zone of the Top Bar. */
  logo: ReactNode;
  onLogoClick: () => void;
  logoAriaLabel: string;
  /** Primary destinations (2–5 items). Hidden cleanly when <= 1 item or `minimal` is true. */
  navItems: NavDestination[];
  /** Optional contextual actions (max 2) placed right before the AccountMenu. */
  contextualActions?: ReactNode;
  /** Unified Account Trigger + Dropdown (`NumeraAccountMenu`). */
  accountMenu: ReactNode;
  /** Content width tier (`focused: 1024px`, `operational: 1440px`, `analytical: 1600px`). */
  widthTier?: ShellWidthTier;
  /** Focused onboarding shell: hides center nav & mobile dock cleanly. */
  minimal?: boolean;
  children: ReactNode;
}

/**
 * Canonical Numera Application Shell:
 * - Sticky 3-zone Top Bar (`grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr]`)
 * - Centered Desktop Pill Nav with `--ease-numera` sliding capsule
 * - Mobile-only Floating Dock (`md:hidden`)
 * - Keyboard Skip Link + Safe Area Insets
 */
export function NumeraAppShell({
  logo,
  onLogoClick,
  logoAriaLabel,
  navItems,
  contextualActions,
  accountMenu,
  widthTier = 'operational',
  minimal = false,
  children,
}: NumeraAppShellProps) {
  const reduceMotion = useReducedMotion();
  const maxWidth = CONTAINER_CLASSES[widthTier];
  const showNav = !minimal && navItems.length > 1;

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-canvas text-fg">
      <a href="#main-content" className="numera-skip-link">
        Ir para o conteúdo
      </a>

      <header role="banner" className="glass-bar sticky top-0 z-40 shrink-0 pt-[env(safe-area-inset-top)]">
        <div
          className={[
            'mx-auto grid h-[var(--header-h)] w-full grid-cols-[1fr_auto] items-center gap-3 px-4 md:grid-cols-[1fr_auto_1fr] md:px-6',
            minimal ? 'max-w-xl' : maxWidth,
          ].join(' ')}
        >
          <div className="justify-self-start">
            <button
              type="button"
              onClick={onLogoClick}
              aria-label={logoAriaLabel}
              className="inline-flex min-h-[44px] items-center rounded-field px-1 transition-[opacity] duration-150 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              {logo}
            </button>
          </div>

          {showNav ? (
            <nav
              aria-label="Navegação principal"
              className="hidden items-center gap-0.5 justify-self-center rounded-full border border-ov/[0.08] bg-ov/[0.02] p-1 md:flex"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onSelect}
                  aria-current={item.active ? 'page' : undefined}
                  className={[
                    'relative inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full px-3.5 text-[13px] font-medium select-none transition-[color] duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
                    item.active ? 'text-fg' : 'text-fg-2 hover:text-fg',
                  ].join(' ')}
                >
                  {item.active && (
                    <motion.span
                      layoutId="numera-top-nav-active"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-[color:var(--line-strong)] bg-ov/[0.08]"
                      transition={
                        reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                      }
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              ))}
            </nav>
          ) : (
            <div className="hidden md:block" aria-hidden="true" />
          )}

          <div className="flex items-center gap-1 justify-self-end">
            {!minimal && contextualActions}
            {accountMenu}
          </div>
        </div>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 px-4 pb-[var(--dock-space)] pt-6 outline-none md:px-6 md:pb-12 md:pt-8"
      >
        <div className={['mx-auto w-full', maxWidth].join(' ')}>{children}</div>
      </main>

      {showNav && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[var(--dock-gap)] md:hidden">
          <nav
            aria-label="Navegação principal"
            className="glass-3 pointer-events-auto flex h-[var(--dock-h)] max-w-full items-center gap-1 overflow-x-auto rounded-full px-1.5"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.onSelect}
                aria-label={item.label}
                aria-current={item.active ? 'page' : undefined}
                className={[
                  'relative flex h-11 min-w-[48px] shrink-0 items-center justify-center rounded-full px-3 select-none transition-[color] duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
                  item.active ? 'text-fg' : 'text-fg-3 hover:text-fg',
                ].join(' ')}
              >
                {item.active && (
                  <motion.span
                    layoutId="numera-dock-active"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-[color:var(--line-strong)] bg-ov/[0.08]"
                    transition={
                      reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                    }
                  />
                )}
                <span className="relative flex items-center justify-center">{item.icon}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

export interface SecondaryTwoPaneProps {
  /** Left category navigation (`w-[272px]`) shown on `lg:` (`>= 1024px`) or full-screen list below `lg:` when `activeSection === null`. */
  sidebar: ReactNode;
  /** Detail screen shown on the right on `lg:`, or full-screen below `lg:` when a section is selected. */
  detail: ReactNode;
  hasActiveSelection: boolean;
}

/**
 * Secondary navigation pattern reserved for complex screens (e.g., Settings or B2B master-detail).
 * Never used at the global top-level shell.
 */
export function SecondaryTwoPane({
  sidebar,
  detail,
  hasActiveSelection,
}: SecondaryTwoPaneProps) {
  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <div className={[hasActiveSelection ? 'hidden lg:block' : 'block', 'lg:w-[var(--sidebar-secondary-w)] lg:shrink-0'].join(' ')}>
        {sidebar}
      </div>
      <div className={[hasActiveSelection ? 'flex' : 'hidden lg:flex', 'min-w-0 flex-1 flex-col overflow-hidden'].join(' ')}>
        {detail}
      </div>
    </div>
  );
}

