import React, { Fragment, useEffect } from "react";
import millify from "millify";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { Link } from "react-router-dom";

import { Typography, Row, Col, Statistic } from "antd";
import CryptoCurrencies from "../CryptoCurrencies/CryptoCurrencies";
import News from "../News/News";

const { Title } = Typography;

const HomePage = () => {
    const { data, isFetching } = useGetCryptosQuery();
    if ( isFetching ) return "loading...";
    const globalStats = data?.data?.stats;
    return (
        <Fragment>
            <Title level={2} className="heading" > Global Crypto Stats </Title>
            <Row>
                <Col span={12} >
                    <Statistic title="Total Crypto Currencies" value={ globalStats.total } />
                </Col>
                <Col span={12} >
                    <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} />
                </Col>
                <Col span={12} >
                    <Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} />
                </Col>
                <Col span={12} >
                    <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} />
                </Col>
                <Col span={12} >
                    <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
                </Col>
            </Row>
            <div className="home-heading-container" >
                <Title level={2} className="home-title" > Top 10 Crypto currencies in the world </Title>
                <Title level={3} className="show-more" > <Link to = "/cryptocurrencies">Show more</Link> </Title>
            </div>
            <CryptoCurrencies simplified />
            <div className="home-heading-container" >
                <Title level={2} className="home-title" > Latest Crypto currencies </Title>
                <Title level={3} className="show-more" > <Link to = "/cryptocurrencies">Show more</Link> </Title>
            </div>
            <News simplified />
        </Fragment>
        
    )
}

export default HomePage