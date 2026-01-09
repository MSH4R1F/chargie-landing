import { motion } from 'framer-motion';

type ChargieState = 'idle' | 'countdown' | 'success' | 'forfeit';

interface ChargieProps {
  size?: number;
  state?: ChargieState;
  className?: string;
}

const stateColors = {
  idle: '#9B8FE8',
  countdown: '#FFA94D',
  success: '#3FD98F',
  forfeit: '#F24F5A',
};

export function Chargie({ size = 120, state = 'idle', className = '' }: ChargieProps) {
  const ringColor = stateColors[state];
  const scale = size / 120;

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size * 1.15 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 120 138"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`glow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`textGlow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer ring with glow */}
        <motion.circle
          cx="60"
          cy="55"
          r="48"
          fill="none"
          stroke={ringColor}
          strokeWidth="8"
          filter={`url(#glow-${size})`}
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Black face interior */}
        <circle cx="60" cy="55" r="42" fill="#0A0B0F" />

        {/* Eyes - simple white dots */}
        <circle cx="45" cy="42" r="5" fill="white" />
        <circle cx="75" cy="42" r="5" fill="white" />

        {/* Time display */}
        <text
          x="60"
          y="72"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="16"
          fontWeight="500"
          fill={ringColor}
          filter={`url(#textGlow-${size})`}
          opacity="0.95"
        >
          00:00
        </text>

        {/* Legs */}
        <ellipse cx="42" cy="118" rx="10" ry="7" fill={ringColor} />
        <ellipse cx="78" cy="118" rx="10" ry="7" fill={ringColor} />
        
        {/* Leg connectors */}
        <rect x="36" y="103" width="12" height="16" rx="6" fill={ringColor} />
        <rect x="72" y="103" width="12" height="16" rx="6" fill={ringColor} />
      </svg>

      {/* Glow effect behind */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-25 -z-10"
        style={{
          background: `radial-gradient(circle, ${ringColor} 0%, transparent 60%)`,
          top: '-10%',
          left: '-10%',
          right: '-10%',
          height: '100%',
        }}
      />
    </motion.div>
  );
}
