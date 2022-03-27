import React, { useEffect, useState } from 'react'
import { Row, Col, Statistic, Typography } from 'antd'
import { Link } from "react-router-dom"
import millify from 'millify';
import Cryptos from './Cryptos';
import News from './News';
import getData from '../services/Api';

const { Title } = Typography;


const Home = () => {

  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getData()
    .then(({ data }) => {
      setData(data.stats)
      setLoading(false)
    })
  }, [])

  return (
    <>

      <Title level={1} className="title spacerTop">Global Stats</Title>
      {loading?<div className='loader'></div>:<Row gutter={16}>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={data?.totalCoins} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={data?.totalExchanges} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={data?.totalMarketCap&&millify(data?.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24hs Volume" value={data?.totalMarketCap&&millify(data?.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={data?.totalMarkets} /></Col>
      </Row>}

      <div className=''>
        <div className='flex apart forever'>
          <Title level={2}  style={{color:"black"}} className="title spacerTop">Top 10 Cryptos</Title>
          <Link to="/cryptos">
            <Title level={2} style={{color:"#1890ff"}} className="title spacerTop">Show More</Title>
          </Link>
        </div>
        <Cryptos basic/>
        <div className='flex apart forever'>
          <Title level={2}  style={{color:"black"}} className="title spacerTop">Crypto News </Title>
          <Link to="/news">
            <Title level={2} style={{color:"#1890ff"}} className="title spacerTop">Show More</Title>
          </Link>
        </div>
        <News basic/>
      </div>
    </>
  )
}

export default Home