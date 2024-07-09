import {useState} from "react";
import LineChart from "./LineChart";

const ChartComponent = ({ historicalData, loading, chartLoading }) => {

  const [historicalDataCopy, setHistoricalDataCopy] = useState([]);

  const onDaysChange = (e) => {
    console.log(e.target.value);

        let newHistoricalData = [['Date', 'Prices']];
    newHistoricalData = historicalData.slice(0, e.target.value);
        console.log(newHistoricalData);
    setHistoricalDataCopy(newHistoricalData);
  };

  return (
    <>
      <div>
        <LineChart historicalData={historicalDataCopy} />
      </div>
      <div className="flex flex-row gap-4 flex-noWrap">
        <button
          className="bg-gray-400 px-4 py-2 rounded-xl disabled:cursor-not-allowed"
          disabled={loading || chartLoading}
          onClick={onDaysChange}
          value={Number(1)}
        >
          1 Day
        </button>
        <button
          disabled={loading || chartLoading}
          className="bg-gray-400 px-4 py-2 rounded-xl disabled:cursor-not-allowed"
          onClick={onDaysChange}
          value={Number(7)}
        >
          7 Days
        </button>
        <button
          disabled={loading || chartLoading}
          onClick={onDaysChange}
          className="bg-gray-400 px-4 py-2 rounded-xl disabled:cursor-not-allowed"
          value={Number(30)}
        >
          30 Days
        </button>
      </div>
    </>
  );
};

export default ChartComponent;
