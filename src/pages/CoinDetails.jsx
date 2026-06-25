import { useEffect, useState, } from "react"
import { useParams } from "react-router-dom"
import { ErrorCard } from "../components/ui/ErrorCard"
import { Spinner } from "../components/ui/Spinner"
import { fetchCoinData } from "../api/coingecko"
import { Link } from "react-router-dom"
import { Logo } from "../components/ui/Logo"
import { CoinChart } from "../components/crypto/CoinChart"
import { formatMarketCap, formatPrice } from "../utils/formatter"

export const CoinDetails = () => {
  const { id } =  useParams()
  const [coin, setCoin] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=> {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchCoinData(id);
        if (cancelled) return;
        setCoin(data);
      } catch (err) {
        if(err.name === "AbortError") return;
        console.error("Error while fetching coin data:", err);
        if (!cancelled) setError(err.message || "Failed to fetch data");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();


    return () => { cancelled = true; };
  }, [id])

  if (isLoading) return (
  <div className="coin-details-state">
    <Spinner />
  </div>
)

if (error) return (
  <div className="coin-details-state">
    <ErrorCard message={error} />
  </div>
)

if (!coin) return (
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
          src={coin.image?.large}
          alt={coin.name}
          className="coin-logo"
        />

        <div>
          <h1>{coin.name}</h1>
          <span>{coin.symbol?.toUpperCase()}</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Price</h3>
          <p>{formatPrice(coin.market_data?.current_price?.usd)}</p>
        </div>

        <div className="stat-card">
          <h3>Market Cap</h3>
          <p>{formatMarketCap(coin.market_data?.market_cap?.usd)}</p>
        </div>

        <div className="stat-card">
          <h3>Rank</h3>
          <p>#{coin.market_cap_rank}</p>
        </div>

        <div className="stat-card">
          <h3>24h Change</h3>
          <p>
            {coin.market_data?.price_change_percentage_24h?.toFixed(2)}
            %
          </p>
        </div>

        <div className="stat-card">
          <h3>24h High</h3>
          <p>{formatPrice(coin.market_data?.high_24h?.usd)}</p>
        </div>

        <div className="stat-card">
          <h3>24h Low</h3>
          <p>{formatPrice(coin.market_data?.low_24h?.usd)}</p>
        </div>
      </div>

      <div className="coin-chart">
        <h3>Last 7 Days status of the coin</h3>
         <CoinChart id={id} />
       </div>

        <div className="description-card">
        <h2>About</h2>
        <p>
          {coin.description?.en
            ?.replace(/<[^>]*>/g, "")
            ?.slice(0, 600)}
        </p>
      </div> 
    </div>
  </div>
);
}