import { useLocation, } from "react-router-dom"
import { ErrorCard } from "../components/ui/ErrorCard"
import { Link } from "react-router-dom"
import { Logo } from "../components/ui/Logo"
import { CoinChart } from "../components/crypto/CoinChart"
import { formatMarketCap, formatPrice } from "../utils/formatter"

export const CoinDetails = () => {
  const location = useLocation()
  const coinData = location.state?.coin

if (!coinData) return (
  <div className="coin-details-state">
    <ErrorCard message="Coin not found" />
  </div>
)

  return (
  <div className="app">
    <div className="header">
       <div className="logo-section">
        <Logo />
        <h1 className="logo-text">CoinPulse</h1>
      </div>
      <Link to="/" className="back-btn">
        ← Back
      </Link>
    </div>

    <div className="coin-details">
      <div className="coin-header">
        <img
          src={coinData.image}
          alt={coinData.name}
          className="coin-logo"
        />

        <div>
          <h1>{coinData.name}</h1>
          <span>{coinData.symbol?.toUpperCase()}</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Price</h3>
          <p>{formatPrice(coinData.current_price)}</p>
        </div>

        <div className="stat-card">
          <h3>Market Cap</h3>
          <p>{formatMarketCap(coinData.market_cap)}</p>
        </div>

        <div className="stat-card">
          <h3>Rank</h3>
          <p>#{coinData.market_cap_rank}</p>
        </div>

        <div className="stat-card">
          <h3>24h Change</h3>
          <p>
            {coinData.price_change_percentage_24h != null
              ? `${coinData.price_change_percentage_24h.toFixed(2)}%`
              : "N/A"}
            %
          </p>
        </div>

        <div className="stat-card">
          <h3>24h High</h3>
          <p>{formatPrice(coinData.high_24h)}</p>
        </div>

        <div className="stat-card">
          <h3>24h Low</h3>
          <p>{formatPrice(coinData.low_24h)}</p>
        </div>
      </div>

      <div className="coin-chart">
        <h3>Last 7 Days status of the coin</h3>
         <CoinChart id={coinData.id} />
       </div>
    </div>
  </div>
);
}