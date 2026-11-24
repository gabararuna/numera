import { motion } from 'framer-motion'
import { NUMERA_EASE } from '../constants/motion'

export function NumeraMark({ size = 24, className = '', animated = false }) {
  if (animated) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        <motion.path
          d="M 24.4 47.8 L 21.9 50.3 A 5.8 5.8 0 0 1 12 46.2 V 17.8 A 5.8 5.8 0 0 1 21.9 13.7 L 40.2 32"
          stroke="currentColor"
          strokeWidth="7.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0.15, opacity: 0.25 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.72, ease: NUMERA_EASE }}
        />
        <motion.path
          d="M 39.6 16.2 L 42.1 13.7 A 5.8 5.8 0 0 1 52 17.8 V 46.2 A 5.8 5.8 0 0 1 42.1 50.3 L 23.8 32"
          stroke="currentColor"
          strokeWidth="7.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0.15, opacity: 0.25 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.72, delay: 0.08, ease: NUMERA_EASE }}
        />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
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
  )
}

export function MonnoMark({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="11" y="20" width="10" height="32" rx="5" fill="currentColor" opacity="0.36" />
      <rect x="27" y="12" width="10" height="32" rx="5" fill="currentColor" />
      <rect x="43" y="20" width="10" height="32" rx="5" fill="currentColor" opacity="0.36" />
    </svg>
  )
}

export function CronosMark({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
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
  )
}

export function NyotMark({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
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
  )
}

export function EcosystemMark({ id, size = 28, className = '' }) {
  if (id === 'monno') return <MonnoMark size={size} className={className} />
  if (id === 'cronos') return <CronosMark size={size} className={className} />
  if (id === 'nyot') return <NyotMark size={size} className={className} />
  return <NumeraMark size={size} className={className} />
}

export function NumeraLogo({ markSize = 24, textSize = 'text-[17px]', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-fg ${className}`}>
      <NumeraMark size={markSize} />
      <span className={`wordmark ${textSize}`}>Numera</span>
    </span>
  )
}

const TONES = {
  positive: { dot: 'bg-positive', text: 'text-positive-fg' },
  warning: { dot: 'bg-warning', text: 'text-warning-fg' },
  negative: { dot: 'bg-negative', text: 'text-negative-fg' },
  info: { dot: 'bg-info', text: 'text-info-fg' },
  neutral: { dot: 'bg-fg-3', text: 'text-fg-2' },
}

export function StatusDot({ tone = 'positive', label, className = '' }) {
  const colors = TONES[tone] || TONES.neutral
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${colors.dot}`} aria-hidden="true" />
      <span className={colors.text}>{label}</span>
    </span>
  )
}
