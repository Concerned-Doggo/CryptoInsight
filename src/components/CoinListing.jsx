import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";

const CoinListing = ({ coin }) => {
  const {
    market_cap_rank: rank,
        id,
    name,
    symbol,
    image,
    current_price: price,
    market_cap: marketCap,
    price_change_percentage_24h: priceChange,
  } = coin;

  const { currency } = useContext(CoinContext);
  return (
    <Link
      to={`/coin/${id}`}
      className="text-[30] md:text-lg grid md:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] grid-cols-[0.3fr_2fr_1fr_1fr] text-start p-4 items-center border-b-2 border-b-gray-700 "
    >
      <p className="text-start text-xs md:text-lg">{rank}</p>
      <p className="flex flex-nowrap gap-2 md:gap-4 items-center text-xs md:text-lg">
        <img src={image} alt="coin logo" className="h-[20px] md:h-[30px] w-[20px] md:w-[30px]" />
        {name} - {symbol}
      </p>
      <p className="text-center text-[10px] md:text-lg">
        {currency.symbol} {price.toLocaleString("en-IN")}
      </p>
      <p className="text-end md:text-center ">
        {priceChange > 0 ? (
          <span className="text-green-700 text-xs md:text-lg">▲ {priceChange.toFixed(2)}%</span>
        ) : (
          <span className="text-red-700 text-xs md:text-lg">▼ {priceChange.toFixed(2)}%</span>
        )}
      </p>
      <p className="text-right hidden md:block">
        {currency.symbol} {marketCap.toLocaleString("en-IN")}
      </p>
    </Link>
  );
};

export default CoinListing;
