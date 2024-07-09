import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import { LineChart, Loader } from "../components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Coin = () => {
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);
  const [data, setData] = useState("");
  const [historicalData, setHistoricalData] = useState([]);
  const [chartData, setChartData] = useState([]);
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
        `https://api.coingecko.com/api/v3/coins/${coinId.toLowerCase()}/market_chart?vs_currency=${currency.name}&days=90&interval=daily`,
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
      setChartData(fetchedHistoricalData.prices);

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
    fetchData();
    fetchHistoricalData();
  }, [coinId]);

  const handleDaysChange = (e) => {
    setDays(e.target.value);
    const dataCopy = historicalData.prices.slice(0, e.target.value);
    setChartData(dataCopy);
  };

  return (
    <div className="my-10">
      {loading && <Loader />}
      {error && <div className="text-red-700 text-center">{error}</div>}

      {/* coin info */}
      {!loading && !error && (
        <div>
          <div className="flex mx-5 flex-col gap-4">
            <div className="flex flex-col gap-4 items-center justify-center">
              <img src={data.image.small} className="md:hidden" />
              <img src={data.image.large} className="hidden md:block" />
              <h1 className="text-3xl font-bold">
                {data.name} - ({data.symbol})
              </h1>
            </div>

            {/* chart */}
            {chartError && (
              <p className="text-red-700 tex-center">{chartError}</p>
            )}
            {chartLoading && (
            <Loader />
            )}
            {!chartLoading && !chartError && chartData && (
              <div className="flex flex-col gap-4 my-10">
                <div>
                  <LineChart chartData={chartData} days={days} />
                </div>
                <div className="flex flex-row gap-4 flex-noWrap justify-center items-center">
                  <button
                    className="bg-gray-600 px-4 py-2 rounded-xl disabled:cursor-not-allowed"
                    disabled={loading || chartLoading}
                    onClick={handleDaysChange}
                    value={7}
                  >
                    7 Days
                  </button>
                  <button
                    disabled={loading || chartLoading}
                    className="bg-gray-700 px-4 py-2 rounded-xl disabled:cursor-not-allowed"
                    onClick={handleDaysChange}
                    value={30}
                  >
                    30 Days
                  </button>
                  <button
                    disabled={loading || chartLoading}
                    className="bg-gray-800 px-4 py-2 rounded-xl disabled:cursor-not-allowed"
                    value={90}
                    onClick={handleDaysChange}
                  >
                    90 Days
                  </button>
                </div>
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-4 justify-center my-8">
              <div className="flex flex-col flex-nowrap gap-4 items-center justify-center text-center">
                <ul className="border-b-2 border-gray-200 w-full p-2">
                  <li>Crypto Market Rank</li>
                  <li className="font-bold"># {data.market_cap_rank}</li>
                </ul>
                <ul className="border-b-2 border-gray-300 w-full p-2">
                  <li>Current Price</li>
                  <li>
                    {currency.symbol}{" "}
                    {data.market_data.current_price[
                      currency.name.toLowerCase()
                    ].toLocaleString()}{" "}
                    /-
                  </li>
                </ul>
                <ul className="border-b-2 border-gray-400  justify-center w-full p-2 text-center">
                  <li>Market Cap</li>
                  <li className="flex gap-2 text-center justify-center">
                    {currency.symbol}{" "}
                    {data.market_data.market_cap[
                      currency.name.toLowerCase()
                    ].toLocaleString()}{" "}
                    /-
                  </li>
                </ul>

                <ul className="text-red-500 border-b-2  justify-center  border-gray-500 w-full p-2">
                  <li>24H Lowest Value</li>
                  <li className="flex gap-2 items-center justify-center">
                    <FaArrowDown />
                    {currency.symbol}{" "}
                    {data.market_data.low_24h[
                      currency.name.toLowerCase()
                    ].toLocaleString()}{" "}
                    /-
                  </li>
                </ul>
                <ul className="text-green-500 border-b-2 border-gray-600 w-full p-2">
                  <li>24H Highest Value</li>
                  <li className="flex gap-2 items-center justify-center">
                    <FaArrowUp />
                    {currency.symbol}{" "}
                    {data.market_data.high_24h[
                      currency.name.toLowerCase()
                    ].toLocaleString()}{" "}
                    /-
                  </li>
                </ul>
              </div>
              <div className=" text-center flex flex-col flex-nowrap gap-4 items-center justify-center md:border-l-2 md:border-gray-300 border-none max-w-4xl p-6">
                <h1 className="text-3xl font-bold">
                  About <span className="text-gray-400">{data.name}</span>
                </h1>
                <p
                  className="max-w-5xl text-center mx-auto text-gray-300"
                  dangerouslySetInnerHTML={{ __html: data.description.en.length > 0 ? data.description.en : 'No description available' }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coin;
