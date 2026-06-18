const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCoin = async () => {
    const response = await fetch (
        `${BASE_URL}/coins/markets?vs_currency=usd`
    );

    if(!response.ok) {
        throw new Error('Error fetching data')
    }

    return response.json()
}