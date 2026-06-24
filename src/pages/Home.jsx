
import { useEffect, useMemo, useState, useRef } from "react";
import { fetchCoin } from "../api/coingecko";
import { CryptoCard } from "../components/crypto/CryptoCard";
import { Spinner } from "../components/ui/Spinner"
import { ErrorCard } from "../components/ui/ErrorCard"
import { Logo } from "../components/ui/Logo";

export const Home = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("market_cap_rank")
  const [query, setQuery] = useState("")
  const inputRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchCoinData = async () => {
      try {
        const data = await fetchCoin(controller.signal);
        setCryptoList(data);
      } catch (err) {
        if(err.name === "AbortError") return; 
        console.error("Error while fetching coin data:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoinData();
    return () => controller.abort();
  }, []);

  const filteredList = useMemo(() => {
    const list = [...cryptoList];
    list.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "change":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        case "market_cap":
          return a.market_cap - b.market_cap;
        case "market_cap_rank":
          return a.market_cap_rank - b.market_cap_rank;
        default:
          return 0;
      }
    });
    if(!query.trim()) return list
    const q = query.trim().toLocaleLowerCase();
    return list.filter((coin)=> 
      coin.name?.toLowerCase().includes(q) || 
      coin.symbol?.toLowerCase().includes(q)
    );
  }, [sortBy, cryptoList, query]);


  if(isLoading) return <div className="page-center"><Spinner /></div>

  if(error) return <div className="page-center"><ErrorCard /></div>

  return (
    <div className="app">
<div className="header">
  <div className="logo-section">
    <Logo />
    <h1 className="logo-text">CoinPulse</h1>
  </div>
  <div className="search-section">
    <input
      ref={inputRef}
      id="search-input"
      type="text"
      className="search-input"
      placeholder="Search Coins..."
      value={query}
      onChange={(e)=> setQuery(e.target.value)}
      aria-label="Search coins"
    />
  </div>
</div>
      <div className="controls">
        <div className="sort-group">
          <label htmlFor="sortBy">Sort By: </label>
          <select id="sortBy" value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
            <option value="market_cap_rank">Rank</option>
            <option value="name">Name</option>
            <option value="price">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
            <option value="change">24h Change</option>
            <option value="market_cap">Market Cap</option>
          </select>
        </div>

          <div className="view-toggle">
            <button className={viewMode === "grid"  ? "active": ""} onClick={()=> setViewMode("grid")}>Grid</button>
            <button className={viewMode === "list"  ? "active": ""} onClick={()=> setViewMode("list")}>List</button>
          </div>
          </div>
      <div className={`crypto-container ${viewMode}`}>
        {filteredList.map((crypto)=> (
        <CryptoCard key={crypto.id} data={crypto}/>
      ))}
      </div>
    </div>
  );
};
