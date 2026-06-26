import { useNavigate } from "react-router-dom"
import { formatPrice, formatMarketCap } from "../../utils/formatter"


export const CryptoCard = ({data}) =>{
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/coin/markets/${data.id}`, { state: { coin: data } })
    }

    return (
    <div className="crypto-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="crypto-header">
        <div className="crypto-info">
          <img src={data.image} alt={`${data.name} logo`} />
          <div>
            <h3 className="crypto-name">{data.name}</h3>
            <p className="symbol">{data.symbol.toUpperCase()}</p>
            <span className="rank">#{data.market_cap_rank}</span>
          </div>
        </div>
      </div>
      <div className="crypto-price">
        <p className="price">{formatPrice(data.current_price)}</p>
        <p className={`change ${data.price_change_percentage_24h >= 0 ? "positive" : "negative"}`}>
          {data.price_change_percentage_24h >= 0 ? "↑ " : "↓ "}
          {Math.abs(data.price_change_percentage_24h).toFixed(2)}
        </p>
      </div>
      <div className="crypto-stats">
        <div className="stat">
          <span className="stat-label">Market Cap</span>
          <span className="stat-value">${formatMarketCap(data.market_cap)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Volume</span>
          <span className="stat-value">${formatMarketCap(data.total_volume)}</span>
        </div>
      </div>
    </div>
  )
}