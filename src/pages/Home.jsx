
import { useEffect, useState } from "react";
import { fetchCoin } from "../api/coingecko";

export const Home = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const data = await fetchCoin();
        setCryptoList(data);
      } catch (error) {
        console.error("Error while fetching coin data:", error);
        setError(error.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoinData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app">
      {cryptoList.length > 0 ? (
        <ul>
          {cryptoList.map((coin) => (
            <li key={coin.id}>
              {coin.name} - ${coin.current_price}
            </li>
          ))}
        </ul>
      ) : (
        <div>No data available.</div>
      )}
    </div>
  );
};
