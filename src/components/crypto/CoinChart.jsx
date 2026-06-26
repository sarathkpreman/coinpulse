import { useEffect, useState } from "react"
import { fetchCoinChartData } from "../../api/coingecko"
import { ChartSkelton } from "../ui/ChartSkelton"
import { ErrorCard } from "../ui/ErrorCard"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatPrice } from "../../utils/formatter";


export const CoinChart = ({id}) => {

    const [chart, setChart] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

   useEffect(() => {
    if (!id) return;  

    const controller = new AbortController();
    let cancelled = false;

    (async () => {
        try {
            const rawChart = await fetchCoinChartData(id, 7, controller.signal);
            if (cancelled) return;
            const formattedChart = rawChart.prices.map(([timestamp, price]) => ({
                date: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                price: parseFloat(price.toFixed(2))
            }));
            setChart(formattedChart);
        } catch (err) {
            if (err.name === "AbortError") return;
            console.error("Error while fetching coin chart", err);
            if (!cancelled) setError(err.message || "Failed to fetch chart");
        } finally {
            if (!cancelled) setIsLoading(false);
        }
    })();

    return () => {
        cancelled = true;
        controller.abort();
    };
}, [id]);

   if(isLoading) return <ChartSkelton />
   if(error) return <div className="page-center"><ErrorCard message="Chart is not available" /></div>

    return (
    <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chart}>
            <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
            <YAxis
                domain={['auto', 'auto']}
                tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                tickFormatter={v => `${formatPrice(v)}`}
                width={80}
            />
            <Tooltip
                formatter={(v) => [`${formatPrice(v)}`, 'Price']}
                contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '8px' }}
                labelStyle={{ color: 'var(--text-muted)' }}
            />
            <Line type="monotone" dataKey="price" stroke="var(--primary)" strokeWidth={2} dot={false} />
        </LineChart>
    </ResponsiveContainer>
)
}