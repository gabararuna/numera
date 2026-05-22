import { useRef, useId, useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

/**
 * ShadowOverlay — animated SVG turbulence displacement blob effect.
 * No external assets. Self-contained SVG filter + mask.
 *
 * Props:
 *   color    — CSS color string   (default teal brand)
 *   scale    — displacement scale  1-100 (default 35)
 *   speed    — animation speed     1-100 (default 18, lower = slower)
 */
export default function ShadowOverlay({
  color = 'rgba(0, 191, 165, 0.85)',
  scale = 35,
  speed = 18,
}) {
  const rawId = useId()
  const uid = rawId.replace(/:/g, '')
  const filterId = `sf-${uid}`
  const maskId  = `sm-${uid}`

  const hue = useMotionValue(0)
  const feHueRef  = useRef(null)
  const animRef   = useRef(null)

  // Derived constants (stable across renders since props don't change)
  const padding = Math.round(10 + (scale / 100) * 60)   // 10–70 px
  const freqX   = (0.001 - (scale / 100) * 0.0005).toFixed(6)
  const freqY   = (0.004 - (scale / 100) * 0.002).toFixed(6)
  const dispScale = Math.round(20 + (scale / 100) * 80)
  const duration  = Math.round(800 - (speed / 100) * 750) / 1000 // 0.05–0.8 s per deg → ≈full cycle

  useEffect(() => {
    let frame
    let deg = 0

    // Use a rAF loop — most compatible, no framer-motion animate() version concerns
    const tick = () => {
      deg = (deg + (speed * 0.015)) % 360
      if (feHueRef.current) {
        feHueRef.current.setAttribute('values', String(Math.round(deg)))
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [speed])

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
    >
      {/* Hidden SVG definitions */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          {/* Blob mask — soft ellipse */}
          <radialGradient id={maskId} cx="50%" cy="55%" r="48%">
            <stop offset="30%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          {/* Turbulence displacement filter */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%"
                  colorInterpolationFilters="sRGB">
            <feTurbulence
              type="turbulence"
              baseFrequency={`${freqX} ${freqY}`}
              numOctaves="2"
              seed="5"
              result="noise"
            />
            <feColorMatrix
              ref={feHueRef}
              in="noise"
              type="hueRotate"
              values="0"
              result="rotatedNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="rotatedNoise"
              scale={dispScale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="6" />
          </filter>
        </defs>
      </svg>

      {/* The blob shape */}
      <div
        style={{
          position: 'absolute',
          top: `-${padding}px`,
          right: `-${padding}px`,
          bottom: `-${padding}px`,
          left: `-${padding}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '75%',
            height: '75%',
            backgroundColor: color,
            borderRadius: '50%',
            filter: `url(#${filterId})`,
            WebkitFilter: `url(#${filterId})`,
            maskImage: `radial-gradient(ellipse 80% 70% at 50% 55%, black 25%, transparent 75%)`,
            WebkitMaskImage: `radial-gradient(ellipse 80% 70% at 50% 55%, black 25%, transparent 75%)`,
          }}
        />
      </div>
    </div>
  )
}
