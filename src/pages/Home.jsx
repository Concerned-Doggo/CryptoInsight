import React, {useState, useEffect, useContext} from "react";
import { CoinContext } from "../context/CoinContext";
import CoinListing from "../components/CoinListing";

const Home = () => {

    const {allCoins, currency} = useContext(CoinContext)
    const [displayCoins, setDisplayCoins] = useState([]);
    const [index, setIndex] = useState(0);
    const limit = allCoins.length;

    useEffect(() => {
        setDisplayCoins(allCoins);
        setIndex(10);
    }, [allCoins]);

    const handleShowMore = () => {
        let newData = [];
        newData = allCoins.slice(0, index + 10);
        setIndex(index + 10);
        setDisplayCoins(newData);
        
    }


  return (
    <div className="p-4 text-xs md:text-lg">
      {/* hero */}
      <div className="text-center  my-20 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">
          Welcome to <span className="text-gray-400">Crypto Tracker</span>
        </h1>
        <p className="text-lg text-slate-500">
          Stay ahead of the curve with real-time updates, in-depth analysis, and
          <br />
          comprehensive tracking of all things crypto at{" "}
          <span className="italic font-semibold">
            Crypto<span className="text-gray-400">Insight</span>.
          </span>
        </p>
      </div>

      {/* coins table */}
      <div className="crypto-table max-w-4xl mx-auto rounded-xl p-4">
        <div className="grid md:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] grid-cols-[0.5fr_2fr_1fr_1fr] text-start p-4 items-center border-b-2 border-b-gray-500 ">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="text-center">24H Change</p>
          <p className="text-right pr-4 hidden md:block ">Market Cap</p>
        </div>
                {
                    displayCoins.slice(0, index).map((coin, index) => (
                        <CoinListing key={index} coin={coin} />
                    ))
                }
      </div>

            {(index < limit) &&<p className="hover:underline text-center mt-10 text-slate-500 cursor-pointer" onClick={handleShowMore}>Show More...</p> }
    </div>
  );
};

export default Home;
