import React, { Fragment, useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../../services/cryptoApi";

import { Card, Row, Col, Input, Spin} from "antd";

const CryptoCurrencies = props => {
    const { data: cryptosList, isFetching } = useGetCryptosQuery();
    const [ cryptos, setCryptos ] = useState([]);
    let length = props.simplified ? 10 : cryptos.length;
    const [ searchTerm, setSearchTerm ] = useState('');

    useEffect(() => {
        let filteredData = cryptosList.data.coins.filter((crypto) => {
            return crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
        });
        setCryptos(filteredData)
    }, [cryptosList,searchTerm]);

    let cards;
    if(isFetching) {
        cards = <Spin size="large" />
    }
    cards = (
        cryptos.slice(0, length).map( (currency) => (
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id} >
                <Link to={`/crypto/${currency.id}`} >
                    <Card 
                        title={`${currency.rank}. ${currency.name}`} 
                        extra={<img className="crypto-image" src={currency.iconUrl} />}
                        hoverable>
                            <p> Price: {millify(currency.price)} USD </p>
                            <p> Market Cap: {millify(currency.marketCap)} USD </p>
                            <p> Daily Change: {millify(currency.change)} % </p>
                    </Card>
                </Link>
            </Col>
        ))
    );
    let searchHandler = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value)
    }
    let searchComp = !props.simplified? (
            <div className="search-crypto" >
                <Input placeholder="Search crypto currencies" onChange={(e) => searchHandler(e)} value={searchTerm} />
            </div>
    ): null;

    return (
        <Fragment>
            {searchComp}
            <Row gutter={[32, 32]} className="crypto-card-container" >
                { cards }
            </Row>
        </Fragment>
    )
}

export default CryptoCurrencies