export const ErrorCard = ({
  title = "Failed to fetch prices",
  message = "Couldn't retrieve coin data. Check your connection and try again.",
  errorCode = "ERR_NETWORK",
  onRetry,
  onDismiss,
}) => {
  return (
    <div className="ec-card">
      <div className="ec-icon">
        <svg className="ec-pulse-svg" viewBox="0 0 44 28" fill="none">
          <path
            className="ec-pulse-path"
            d="M0 14 H8 L13 6 L19 22 L25 2 L31 14 H44"
            stroke="#E05593"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle className="ec-dot" cx="1" cy="14" r="1.5" fill="#E05593" />
          <circle className="ec-dot" cx="43" cy="14" r="1.5" fill="#E05593" />
        </svg>
      </div>

      <p className="ec-title">{title}</p>
      <p className="ec-msg">{message}</p>
      <span className="ec-meta">{errorCode} · coinpulse/api</span>

      <div className="ec-actions">
        <button className="ec-btn ec-btn-ghost" onClick={onDismiss}>Dismiss</button>
        <button className="ec-btn ec-btn-primary" onClick={onRetry}>Retry</button>
      </div>
    </div>
  )
}