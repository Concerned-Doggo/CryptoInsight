import { useState, createContext, useEffect } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "INR",
    symbol: "₹",
  });
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllCoin = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-cg-demo-api-key": import.meta.env.VITE_COIN_GECKO_API_KEY,
          },
        },
      );
      const data = await res.json();
      setAllCoins(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/categories/list",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-cg-demo-api-key": import.meta.env.VITE_COIN_GECKO_API_KEY,
          },
        },
      );
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoins,
    currency,
    setCurrency,
    fetchCategories,
    categories,
    setSearchTerm,
    searchTerm,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
