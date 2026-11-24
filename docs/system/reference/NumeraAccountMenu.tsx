import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, ChevronDown, LogOut, Moon, Settings, ShieldCheck, Sun } from 'lucide-react';
import {
  ECOSYSTEM_APPS,
  EcosystemGlyph,
  NumeraMark,
  type EcosystemAppId,
} from './NumeraEcosystemMarks';

export interface AccountExtraLink {
  label: string;
  icon: ReactNode;
  onSelect: () => void;
}

export interface NumeraAccountMenuProps {
  currentApp: EcosystemAppId;
  displayName: string;
  email: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
  extraLinks?: AccountExtraLink[];
  onSignOut: () => void;
}

function getInitials(displayName: string, email: string): string {
  const source = (displayName || email || 'N').trim();
  return (source[0] ?? 'N').toUpperCase();
}

function getFirstName(displayName: string, email: string): string {
  const raw = (displayName || email.split('@')[0] || 'Conta').trim();
  return raw.split(/\s+/)[0] || raw;
}

/**
 * Unified Account Trigger + Glass-3 Dropdown shared across all Numera products.
 * Order of blocks: Identity -> Optional extra links -> Ajustes / Tema / Administração -> Ecossistema Numera -> Sair.
 */
export function NumeraAccountMenu({
  currentApp,
  displayName,
  email,
  theme,
  onToggleTheme,
  onOpenSettings,
  isAdmin = false,
  onOpenAdmin,
  extraLinks = [],
  onSignOut,
}: NumeraAccountMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setOpen(false);
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const firstName = getFirstName(displayName, email);
  const initial = getInitials(displayName, email);

  return (
    <div className="relative flex items-center">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Menu da conta"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={[
          'inline-flex h-11 min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full transition-[background-color] duration-150 md:pl-1.5 md:pr-3',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          open ? 'bg-ov/[0.08]' : 'hover:bg-ov/[0.06]',
        ].join(' ')}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ov/[0.14] bg-ov/[0.06] text-xs font-medium text-fg">
          {initial}
        </span>
        <span className="hidden max-w-[120px] truncate text-[13px] font-medium text-fg md:inline">
          {firstName}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={1.75}
          aria-hidden="true"
          className={[
            'hidden text-fg-3 transition-transform duration-150 md:inline',
            open ? 'rotate-180' : '',
          ].join(' ')}
        />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          className="glass-3 fixed right-3 top-[calc(var(--header-h)+env(safe-area-inset-top)+8px)] z-[60] w-[272px] overflow-hidden rounded-card md:right-6"
        >
          <div className="border-b border-ov/[0.08] px-4 pb-3 pt-3.5">
            <p className="truncate text-[14px] font-medium text-fg">{displayName || firstName}</p>
            {email && <p className="mt-0.5 truncate text-caption text-fg-3">{email}</p>}
          </div>

          <div className="flex flex-col gap-0.5 p-1.5">
            {extraLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  item.onSelect();
                }}
                className="flex min-h-[44px] w-full items-center gap-3 rounded-field px-3 text-left text-[14px] text-fg transition-[background-color] duration-150 hover:bg-ov/[0.06]"
              >
                <span className="shrink-0 text-fg-2" aria-hidden="true">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onOpenSettings();
              }}
              className="flex min-h-[44px] w-full items-center gap-3 rounded-field px-3 text-left text-[14px] text-fg transition-[background-color] duration-150 hover:bg-ov/[0.06]"
            >
              <Settings size={18} strokeWidth={1.6} aria-hidden="true" className="shrink-0 text-fg-2" />
              <span>Ajustes</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onToggleTheme();
                setOpen(false);
              }}
              className="flex min-h-[44px] w-full items-center gap-3 rounded-field px-3 text-left text-[14px] text-fg transition-[background-color] duration-150 hover:bg-ov/[0.06]"
            >
              {theme === 'dark' ? (
                <Sun size={18} strokeWidth={1.6} aria-hidden="true" className="shrink-0 text-fg-2" />
              ) : (
                <Moon size={18} strokeWidth={1.6} aria-hidden="true" className="shrink-0 text-fg-2" />
              )}
              <span>{theme === 'dark' ? 'Tema claro' : 'Tema escuro'}</span>
            </button>

            {isAdmin && onOpenAdmin && (
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  onOpenAdmin();
                }}
                className="flex min-h-[44px] w-full items-center gap-3 rounded-field px-3 text-left text-[14px] text-fg transition-[background-color] duration-150 hover:bg-ov/[0.06]"
              >
                <ShieldCheck size={18} strokeWidth={1.6} aria-hidden="true" className="shrink-0 text-fg-2" />
                <span>Administração</span>
              </button>
            )}
          </div>

          <div className="border-t border-ov/[0.08] px-3 py-2.5">
            <p className="px-1.5 pb-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-fg-3">
              Ecossistema Numera
            </p>
            <div className="flex flex-col gap-0.5">
              {ECOSYSTEM_APPS.map((app) => {
                const isCurrent = app.id === currentApp;
                if (isCurrent) {
                  return (
                    <div
                      key={app.id}
                      className="flex items-center justify-between rounded-icon bg-ov/[0.06] px-2 py-1.5 text-caption text-fg"
                    >
                      <span className="inline-flex items-center gap-2 font-medium">
                        <EcosystemGlyph id={app.id} size={14} />
                        {app.name}
                      </span>
                      <span className="text-[11px] text-fg-3">atual</span>
                    </div>
                  );
                }

                return (
                  <a
                    key={app.id}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-icon px-2 py-1.5 text-caption text-fg-2 transition-[background-color,color] duration-150 hover:bg-ov/[0.05] hover:text-fg"
                  >
                    <span className="inline-flex items-center gap-2">
                      <EcosystemGlyph id={app.id} size={14} />
                      {app.name}
                    </span>
                    <ArrowUpRight size={13} aria-hidden="true" className="text-fg-3" />
                  </a>
                );
              })}

              <a
                href="https://gruponumera.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center justify-between rounded-icon px-2 py-1 text-[11px] text-fg-3 transition-[color] duration-150 hover:text-fg-2"
              >
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <NumeraMark size={12} />
                  gruponumera.com
                </span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="border-t border-ov/[0.08] p-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onSignOut();
              }}
              className="flex min-h-[44px] w-full items-center gap-3 rounded-field px-3 text-left text-[14px] text-negative-fg transition-[background-color] duration-150 hover:bg-ov/[0.06]"
            >
              <LogOut size={18} strokeWidth={1.6} aria-hidden="true" className="shrink-0" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
