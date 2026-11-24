import type { SVGProps } from 'react';

export type EcosystemAppId = 'numera' | 'monno' | 'cronos' | 'nyot' | 'custom';

export interface EcosystemAppMeta {
  id: Exclude<EcosystemAppId, 'custom'>;
  name: string;
  tagline: string;
  domain: string;
  url: string;
}

export const ECOSYSTEM_APPS: readonly EcosystemAppMeta[] = [
  {
    id: 'monno',
    name: 'Monno',
    tagline: 'Finanças e projeção',
    domain: 'monno.gruponumera.com',
    url: 'https://monno.gruponumera.com',
  },
  {
    id: 'cronos',
    name: 'Cronos',
    tagline: 'Ponto CLT e ciclos',
    domain: 'cronos.gruponumera.com',
    url: 'https://cronos.gruponumera.com',
  },
  {
    id: 'nyot',
    name: 'NYOT',
    tagline: 'Hábitos e peso',
    domain: 'nyot.gruponumera.com',
    url: 'https://nyot.gruponumera.com',
  },
] as const;

export function NumeraMark({ size = 20, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path
        d="M 24.4 47.8 L 21.9 50.3 A 5.8 5.8 0 0 1 12 46.2 V 17.8 A 5.8 5.8 0 0 1 21.9 13.7 L 40.2 32"
        stroke="currentColor"
        strokeWidth="7.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 39.6 16.2 L 42.1 13.7 A 5.8 5.8 0 0 1 52 17.8 V 46.2 A 5.8 5.8 0 0 1 42.1 50.3 L 23.8 32"
        stroke="currentColor"
        strokeWidth="7.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MonnoMark({ size = 20, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <rect x="11" y="20" width="10" height="32" rx="5" fill="currentColor" opacity="0.36" />
      <rect x="27" y="12" width="10" height="32" rx="5" fill="currentColor" />
      <rect x="43" y="20" width="10" height="32" rx="5" fill="currentColor" opacity="0.36" />
    </svg>
  );
}

export function CronosMark({ size = 20, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path
        d="M 18.5 13.5 H 45.5 A 13.5 13.5 0 0 1 18.5 13.5 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <g opacity="0.36">
        <path
          d="M 45.5 50.5 H 18.5 A 13.5 13.5 0 0 1 45.5 50.5 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function NyotMark({ size = 20, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <g opacity="0.36">
        <path
          d="M 39.68 43.99 A 15.5 15.5 0 1 1 20.01 24.32 A 19 19 0 0 0 39.68 43.99 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </g>
      <circle cx="39" cy="25" r="15.5" fill="currentColor" />
    </svg>
  );
}

export function EcosystemGlyph({ id, size = 15 }: { id: EcosystemAppMeta['id']; size?: number }) {
  switch (id) {
    case 'monno':
      return <MonnoMark size={size} />;
    case 'cronos':
      return <CronosMark size={size} />;
    case 'nyot':
      return <NyotMark size={size} />;
    default:
      return <NumeraMark size={size} />;
  }
}
