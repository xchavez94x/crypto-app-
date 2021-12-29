import React, { useEffect, useState } from "react";
import { useGetCryptoNewsQuery, useGetCryptosQuery } from "../../services/";
import moment from "moment";

import {Select, Typography, Row, Col, Avatar, Card} from "antd";


const { Text, Title } = Typography;
const { Option } = Select;

const News = props => {
    let newsCount = props.simplified ? 6 : 18;
    const [cryptoNews, setCryptoNews] = useState('');
    const [ category, setCategory ] = useState('CryptoCurrency') 
    const dummyImage = "https://cuprumcoin.com/assets/images/img16.png";
    let { data: cryptoNewsList } = useGetCryptoNewsQuery({ newsCategory: category, count: newsCount});
    const { data } = useGetCryptosQuery();



    useEffect(() => {
        setCryptoNews(cryptoNewsList?.value);
        console.log(data)
    }, [cryptoNews])

    let newsComp ;
    let selectCategory;

    if(!cryptoNewsList?.value) {
        newsComp = (
            <h1>
                loading...
            </h1>
        )
    }

    if(!props.simplified) {
        selectCategory = (
            <Col span={24} >
                <Select
                    showSearch
                    className="select-news"
                    placeholder="Select a news category"
                    optionFilterProp="children"
                    name="categories"
                    onChange = {(value) => setCategory(value)}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {data?.data?.coins.map(coin => (
                        <Option key={coin.id} value={coin.name} >
                            {coin.name}
                        </Option>
                    ))}
                </Select>
            </Col>
        )
    }

        newsComp = (
            cryptoNewsList?.value.map((news, index) => (
                <Col xs={24} sm={12} lg={8} key={index} >
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="referrer" >
                            <div className="news-image-container" >
                                <Title className="news-title" level={4} > {news.name} </Title>
                                <img 
                                    src={news?.image?.thumbnail?.contentUrl || dummyImage} 
                                    style={{width: "30%"}} 
                                    alt="news" />
                            </div>
                            <p>
                                { news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description }
                            </p>
                            <div className="provider-container" >
                                <div>
                                    <Avatar src={ news.provider[0]?.image?.thumbnail?.contentUrl || dummyImage} />
                                    <Text className="provider-name" > {news.provider[0]?.name} </Text>
                                </div>
                                <Text> {moment(news.datePublished).startOf('ss').fromNow()} </Text>

                            </div>
                        </a>
                    </Card>
                </Col>
            )) 
    )
    if(cryptoNewsList) {
        newsComp = (
            <Row gutter={[ 24, 24 ]} >
                { selectCategory }
                { newsComp }
            </Row>
        )
    }
    return (
        <div>
            {newsComp}
        </div>
    )
}

export default News