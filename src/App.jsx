import React from "react";
import {Navbar, Footer} from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home, Coin, Features, Search} from "./pages";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/features" element={<Features />} />
        <Route path="/search" element={<Search />} />
      </Routes>
            <Footer />
    </div>
  );
};

export default App;
