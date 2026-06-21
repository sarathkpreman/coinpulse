
import { useEffect, useState } from "react";
import { fetchCoin } from "../api/coingecko";
import { CryptoCard } from "../components/crypto/CryptoCard";
import { Spinner } from "../components/ui/Spinner"
import { ErrorCard } from "../components/ui/ErrorCard"

export const Home = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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


  if(isLoading) return <Spinner />

  if(error) return <ErrorCard />

  return (
    <div className="app">
      {cryptoList.map((crypto, key)=> (
        <CryptoCard key={key} data={crypto}/>
      ))}
    </div>
  );
};
