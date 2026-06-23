export const Spinner = ({size = 72, label = "loading..."}) => {
  return (
    <div className="sp-wrap">
      <div className="spinner" style={{width: size, height: size}}>
        <div className="sp-glow" />
        <div className="sp-ring" />
        <div className="sp-ring-2" />
        <div className="sp-pulse-wrap">
          <svg className="sp-pulse-svg" viewBox="0 0 44 28" fill="none">
            <path
              className="sp-pulse-path"
              d="M0 14 H8 L13 6 L19 22 L25 2 L31 14 H44"
              stroke="#FF79B4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle className="sp-dots" cx="1" cy="14" r="1.5" fill="#FF79B4" />
            <circle className="sp-dots" cx="43" cy="14" r="1.5" fill="#FF79B4" />
          </svg>
        </div>
      </div>
      {label && <span className="sp-label">{label}</span>}
    </div>
  )
}