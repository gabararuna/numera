/** Portable Tailwind CSS preset for the Numera Ecosystem (Numera, Monno, Cronos, NYOT). */

const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export const numeraThemePreset = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: token('canvas'),
        raised: token('raised'),
        sunken: token('sunken'),
        fg: {
          DEFAULT: token('fg'),
          2: token('fg-2'),
          3: token('fg-3'),
          4: token('fg-4'),
        },
        line: token('line'),
        ov: token('ov'),
        accent: {
          DEFAULT: token('accent'),
          fg: token('accent-fg'),
          on: token('on-accent'),
          hover: token('accent-hover'),
        },
        primary: {
          DEFAULT: token('primary'),
          on: token('on-primary'),
          hover: token('primary-hover'),
        },
        'chart-hi': token('chart-hi'),
        'chart-plan': token('chart-plan'),
        'chart-real': token('chart-real'),
        positive: { DEFAULT: token('positive'), fg: token('positive-fg') },
        negative: {
          DEFAULT: token('negative'),
          fg: token('negative-fg'),
          on: token('on-negative'),
        },
        warning: { DEFAULT: token('warning'), fg: token('warning-fg') },
        info: { DEFAULT: token('info'), fg: token('info-fg') },
      },

      fontFamily: {
        sans: ['Figtree', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Figtree', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        display: ['56px', { lineHeight: '60px', letterSpacing: '-0.03em', fontWeight: '500' }],
        value: ['48px', { lineHeight: '52px', letterSpacing: '-0.04em', fontWeight: '300' }],
        h1: ['32px', { lineHeight: '40px', letterSpacing: '-0.025em', fontWeight: '300' }],
        h2: ['24px', { lineHeight: '32px', letterSpacing: '-0.015em', fontWeight: '400' }],
        h3: ['24px', { lineHeight: '32px', letterSpacing: '-0.015em', fontWeight: '400' }],
        title: ['17px', { lineHeight: '24px', letterSpacing: '-0.005em', fontWeight: '400' }],
        body: ['15px', { lineHeight: '24px', fontWeight: '300' }],
        caption: ['13px', { lineHeight: '18px', fontWeight: '400' }],
        label: ['11px', { lineHeight: '15px', letterSpacing: '0.12em', fontWeight: '500' }],
      },

      borderRadius: {
        tag: '6px',
        icon: '10px',
        field: '14px',
        card: '18px',
        sheet: '26px',
      },

      boxShadow: {
        glass: 'var(--glass-2-shadow)',
        float: 'var(--glass-3-shadow)',
      },

      transitionTimingFunction: {
        numera: 'cubic-bezier(0.22, 1, 0.36, 1)',
        nyot: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      animation: {
        'fade-in': 'fadeIn 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-out': 'fadeOut 0.15s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        'sheet-up': 'sheetUp 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
        'sheet-down': 'sheetDown 0.2s cubic-bezier(0.4, 0, 1, 1) forwards',
        'pill-pulse': 'pillPulse 1.2s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        sheetUp: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        sheetDown: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(100%)' },
        },
        pillPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
};

export default numeraThemePreset;
