import React, { useContext, useEffect, useState } from "react";
import { FaSearch, FaHome, FaInfo, FaGithub } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";

const Navbar = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
  const { setCurrency, setSearchTerm, searchTerm } = useContext(CoinContext);
  const [input, setInput] = useState(searchTerm);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
        setSearchTerm(input);
        const query = input.length > 0 ? input.toLowerCase() : "";
        navigate(`/search?searchTerm=${query}`);
  };
    useEffect(()=>{
        setInput(searchTerm);
    }, [searchTerm])


  return (
    <div className="flex flex-wrap gap-4 justify-center md:justify-between items-center p-4 md:pl-16">
      <Link to="/" className="text-3xl font-bold italic">
        Crypto<span className="text-gray-400">Insight</span>
      </Link>
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white rounded-lg flex items-center"
      >
        <FaSearch className="text-gray-700 ml-3" />
        <input
          type="text"
          className="p-2 rounded-lg text-slate-700 font-semibold focus:outline-none"
          placeholder="Search"
                    value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <div className="flex gap-4 items-center">
        <select
          onChange={(e) =>
            setCurrency({
              name: e.target.value.split("_")[0],
              symbol: e.target.value.split("_")[1],
            })
          }
          className="bg-inherit p-2 border border-white rounded-lg"
        >
          <option value="inr_₹">INR</option>
          <option value="usd_$">USD</option>
          <option value="eur_€">EUR</option>
        </select>
        <ul className="flex gap-4">
          <Link
            to="/"
            className="cursor-pointer flex gap-2 items-center hover:underline"
          >
            <FaHome /> Home
          </Link>
          <Link
            to="/features"
            className="cursor-pointer flex gap-2 items-center hover:underline"
          >
            <FaInfo /> Features
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
