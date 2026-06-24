
export const Logo = () => {
  return (
    <svg
      className="logo-icon"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="coinpulseGradient"
          x1="128"
          y1="128"
          x2="384"
          y2="384"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FF79B4" />
          <stop offset="100%" stopColor="#E05593" />
        </linearGradient>

        <filter id="coinpulseGlow">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect
        x="32"
        y="32"
        width="448"
        height="448"
        rx="120"
        fill="#0F0E15"
      />

      {/* Inner Border */}
      <rect
        x="33"
        y="33"
        width="446"
        height="446"
        rx="119"
        stroke="rgba(255,255,255,0.05)"
      />

      {/* Coin Ring */}
      <circle
        cx="256"
        cy="256"
        r="120"
        stroke="url(#coinpulseGradient)"
        strokeWidth="14"
        opacity="0.9"
      />

      {/* Pulse Line */}
      <path
        d="
          M150 270
          H205
          L235 215
          L270 315
          L315 180
          L350 270
          H362
        "
        stroke="url(#coinpulseGradient)"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#coinpulseGlow)"
      />

      {/* Pulse Dots */}
      <circle
        cx="150"
        cy="270"
        r="8"
        fill="#FF79B4"
      />

      <circle
        cx="362"
        cy="270"
        r="8"
        fill="#FF79B4"
      />
    </svg>
  );
}

