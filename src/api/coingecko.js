const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCoin = async (signal) => {
    const response = await fetch (
        `${BASE_URL}/coins/markets?vs_currency=usd`,
        {signal}
    );

    if(!response.ok) {
        const body = await response.text().catch(()=> "")
        throw new Error (
            `CoinGecko request failed (${response.status} ${response.statusText})${body ? `: ${body}` : ""}`
        )
    }
    return response.json()
};


export const fetchCoinData = async (id, signal) => {
    const response = await fetch (
        `${BASE_URL}/coins/${id}`,
        {signal}
    );

    if(!response.ok) {
        const body = await response.text().catch(()=> "")
        throw new Error (
            `CoinGecko request failed (${response.status} ${response.statusText})${body ? `: ${body}` : ""}`
        )
    }
    return response.json()
};


export const fetchCoinChartData = async (id, days, signal) => {
    const response = await fetch (
        `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
        {signal}
    );

    if(!response.ok) {
        const body = await response.text().catch(()=> "")
        throw new Error (
            `CoinGecko request failed (${response.status} ${response.statusText})${body ? `: ${body}` : ""}`
        )
    }
    return response.json()
};