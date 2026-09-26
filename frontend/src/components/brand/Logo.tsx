import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'symbol';
  theme?: 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDescriptor?: boolean;
}

export function LogoMark({ className = "w-8 h-8", size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Resyntel Logo Symbol"
    >
      <defs>
        <linearGradient id="resyntelTealGradient" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#087E8B" />
          <stop offset="50%" stopColor="#18A7A8" />
          <stop offset="100%" stopColor="#2E7D5B" />
        </linearGradient>
        <linearGradient id="resyntelNavyPillar" x1="6" y1="4" x2="16" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B1F33" />
          <stop offset="100%" stopColor="#087E8B" />
        </linearGradient>
      </defs>
      
      {/* Background soft geometric container */}
      <rect width="40" height="40" rx="9" fill="#0B1F33" />

      {/* Structural Vertical Stem of "R" */}
      <rect x="8" y="9" width="6" height="22" rx="2" fill="url(#resyntelNavyPillar)" />

      {/* Upper Efficiency Loop of "R" */}
      <path
        d="M14 9H24C27.866 9 31 12.134 31 16C31 19.866 27.866 23 24 23H14V9Z"
        fill="url(#resyntelTealGradient)"
      />
      <rect x="14" y="14" width="7" height="4" rx="1.5" fill="#0B1F33" />

      {/* Dynamic Diagonal Vector / Efficiency Kick */}
      <path
        d="M20 21L29.5 31H23L15 22.5L20 21Z"
        fill="#18A7A8"
      />
      
      {/* Subtle Precision Focal Point */}
      <circle cx="28.5" cy="16" r="1.5" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

export function Logo({
  variant = 'compact',
  theme = 'dark',
  className = '',
  size = 'md',
  showDescriptor = false
}: LogoProps) {
  const isLight = theme === 'light'; // Light background -> dark text
  const sizeMap = {
    sm: { markSize: 26, text: 'text-sm', desc: 'text-[9px]' },
    md: { markSize: 32, text: 'text-base', desc: 'text-[10px]' },
    lg: { markSize: 40, text: 'text-xl', desc: 'text-xs' },
    xl: { markSize: 48, text: 'text-2xl', desc: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  if (variant === 'symbol') {
    return <LogoMark size={currentSize.markSize} className={className} />;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={currentSize.markSize} />
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-wider uppercase font-sans ${currentSize.text} ${
              isLight ? 'text-[#0B1F33]' : 'text-white'
            }`}
          >
            RESYNTEL
          </span>
        </div>
        {showDescriptor && (
          <span
            className={`font-medium tracking-wide uppercase ${currentSize.desc} ${
              isLight ? 'text-[#52606D]' : 'text-slate-400'
            }`}
          >
            Resource Intelligence for Hospitality
          </span>
        )}
      </div>
    </div>
  );
}

export function LogoLight(props: Omit<LogoProps, 'theme'>) {
  return <Logo {...props} theme="light" />;
}

export function LogoDark(props: Omit<LogoProps, 'theme'>) {
  return <Logo {...props} theme="dark" />;
}

export function LogoFull(props: Omit<LogoProps, 'variant'>) {
  return <Logo {...props} variant="full" showDescriptor={true} />;
}

export function LogoCompact(props: Omit<LogoProps, 'variant'>) {
  return <Logo {...props} variant="compact" showDescriptor={false} />;
}
