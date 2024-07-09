import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import { LineChart } from "../components";

const Coin = () => {
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);
  const [data, setData] = useState("");
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState("10");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId.toLowerCase()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-cg-demo-api-key": import.meta.env.VITE_COIN_GECKO_API_KEY,
          },
        },
      );
      const fetchedData = await res.json();
      if (fetchedData.success === false) {
        setError(fetchedData.message);
        return;
      }
      setData(fetchedData);
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      setChartLoading(true);
      setChartError(false);
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId.toLowerCase()}/market_chart?vs_currency=${currency.name}&days=${days}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-cg-demo-api-key": import.meta.env.VITE_COIN_GECKO_API_KEY,
          },
        },
      );
      const fetchedHistoricalData = await res.json();
      setHistoricalData(fetchedHistoricalData);
      console.log(fetchedHistoricalData);
      if (fetchedHistoricalData.success === false) {
        setChartError(fetchedHistoricalData.message);
        return;
      }
      setChartLoading(false);
      setChartError(false);
    } catch (error) {
      setChartError(error);
      setChartLoading(false);
    }
  };

  useEffect(() => {
    if (data === "") {
      fetchData();
      console.log("called");
    }
    fetchHistoricalData();
  }, [coinId, days]);
  return (
    <div className="my-10">
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-700 text-center">{error}</div>}

      {/* coin info */}
      {!loading && !error && (
        <div>
          <div className="flex mx-10 flex-col gap-4">
            <div className="flex flex-col gap-4 items-center justify-center">
              <img src={data.image.large} />
              <h1 className="text-3xl font-bold">
                {data.name} - ({data.symbol})
              </h1>
            </div>
            <p
              className="max-w-5xl text-center mx-auto text-gray-300"
              dangerouslySetInnerHTML={{ __html: data.description.en }}
            ></p>
          </div>

          {/* chart */}
          {chartError && (
            <p className="text-red-700 tex-center">{chartError}</p>
          )}
          {chartLoading && (
            <div className="text-center text-green-300">Loading...</div>
          )}


          {!chartLoading && !chartError && (
            <div>
              <div>
                <LineChart historicalData={historicalData} />
              </div>
              <div className="flex flex-row gap-4 flex-noWrap">
                <button
                  className="bg-gray-400 px-4 py-2 rounded-xl disabled:cursor-not-allowed"
                  disabled={loading || chartLoading}
                  onClick={() => setDays(1)}
                >
                  1 Day
                </button>
                <button
                  disabled={loading || chartLoading}
                  className="bg-gray-400 px-4 py-2 rounded-xl disabled:cursor-not-allowed"
                  onClick={() => setDays(7)}
                >
                  7 Days
                </button>
                <button
                  disabled={loading || chartLoading}
                  className="bg-gray-400 px-4 py-2 rounded-xl disabled:cursor-not-allowed"
                  onClick={() => setDays(30)}
                >
                  30 Days
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Coin;
