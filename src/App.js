import React from "react";

import "./App.css";

import { Route, Routes, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import Navbar  from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage/HomePage";
import Exchanges from "./components/Exchanges/Exchanges";
import CryptoCurrencies from "./components/CryptoCurrencies/CryptoCurrencies";
import CryptoDetails from "./components/CryptoDetails/CryptoDetails";
import News from "./components/News/News";

const App = props => {
    return (
        <div className="app">
            <div className="navbar" >
                <Navbar />
            </div>
            <div className="main" >
                <Layout>
                    <div className="routes" >
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/exchanges" element={<Exchanges />} />
                            <Route path="/cryptocurrencies" element={<CryptoCurrencies />} />
                            <Route path="/crypto/:cryptoId" element={<CryptoDetails />} />
                            <Route path="/news" element={<News />} />
                        </Routes>
                    </div>
                </Layout>
                <div className="footer" >
                    <Typography.Title level={5} style={{ color: "white", textAlign: "center" }} >
                        CryptoVerse<br/>
                        All rights Reserved
                    </Typography.Title>
                    <Space>
                        <Link to="/" >Home</Link>
                        <Link to="/exchanges" >Exchanges</Link>
                        <Link to="/cryptocurrencies" >Crypto Currencies</Link>
                        <Link to="/news" >News</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default App; 