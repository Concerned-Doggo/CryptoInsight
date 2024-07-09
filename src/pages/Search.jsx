import React, { useContext, useState, useEffect } from "react";
import { CoinContext } from "../context/CoinContext";
import { useNavigate } from "react-router-dom";
import { CoinListing } from "../components";

const Search = () => {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const [query, setQuery] = useState({
        searchTerm: urlParams.get("searchTerm") || "",
        order: urlParams.get("order") || "market_cap_desc",
    });

    const [displayCoins, setDisplayCoins] = useState([]);
    const { allCoins, setSearchTerm, searchTerm } = useContext(CoinContext);

    useEffect(() => {
        setDisplayCoins(allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.searchTerm.toLowerCase());
        }));
    }, [allCoins]);

    const handleChange = (e) => {
        
        setQuery({ ...query, [e.target.id]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e?.preventDefault();

        setSearchTerm(query.searchTerm);

        setDisplayCoins(
          await allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.searchTerm.toLowerCase());
          }).sort((a, b) => {
                if(query.order === "market_cap_asc"){
                    return a.market_cap - b.market_cap;
                }else if(query.order === "market_cap_desc"){
                    return b.market_cap - a.market_cap;
                }else if(query.order === "volume_asc"){
                    return a.total_volume - b.total_volume;
                }else if(query.order === "volume_desc"){
                    return b.total_volume - a.total_volume;
                }else if(query.order === "price_asc"){
                    return a.current_price - b.current_price;
                }else if(query.order === "price_desc"){
                    return b.current_price - a.current_price;
                }
          }),
        );
        
    };
    return (
        <div className="flex flex-wrap p-4 gap-4 justify-center ">
            <div className="my-7">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap flex-col md:flex-row xl:flex-col gap-6 ">
                        <div className=" flex flex-nowrap gap-4 items-center">
                            <label>Search</label>
                            <input
                                className="p-2 rounded-lg text-gray-700 focus:outline-none"
                                type="text"
                                onChange={handleChange}
                                id="searchTerm"
                                value={query.searchTerm}
                            />
                        </div>
                        <div className=" flex flex-nowrap gap-4 items-center">
                            <label>Order</label>
                            <select
                                onChange={handleChange}
                                id="order"
                                defaultValue={query.order}
                                className="rounded-lg text-gray-800 focus:outline-none p-2"
                            >
                                <option value="market_cap_asc">Market Cap Ascending</option>
                                <option value="market_cap_desc">Market Cap Descending</option>
                                <option value="volume_asc">Volume Ascending</option>
                                <option value="volume_desc">Volume Descending</option>
                                <option value="price_asc">Price Ascending</option>
                                <option value="price_desc">Price Descending</option>
                            </select>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="w-full max-w-sm mx-auto bg-gray-700 text-white p-2 rounded-lg hover:opacity-80"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className="crypto-table max-w-4xl mx-auto rounded-xl p-4">
                <div className="grid md:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] grid-cols-[0.5fr_2fr_1fr_1fr] text-start p-4 items-center border-b-2 border-b-gray-500 ">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p className="text-center">24H Change</p>
                    <p className="text-right pr-4 hidden md:block">Market Cap</p>
                </div>
                {displayCoins.map((coin, index) => (
                    <CoinListing key={index} coin={coin} />
                ))}
            </div>
        </div>
    );
};

export default Search;
