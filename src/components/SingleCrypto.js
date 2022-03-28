import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { Typography, Divider, Select, Row } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, DollarCircleOutlined, ThunderboltOutlined, NumberOutlined, TrophyOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import getCrypto from "../services/CryptoApi.js"
import Stats from './Stats.js';
import Chart from './Chart.js';

const { Text } = Typography;
const { Title } = Typography;
const { Option } = Select;


const SingleCrypto = () => {

  const { id } = useParams();
  const [data, setData] = useState([])
  const [history, setHistory] = useState([])
  const [time, setTime] = useState("3m")
  const [loading, setLoading] = useState(false)

  const timelapses = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"]

  let test = "24hVolume"

  const stats = [
    { title: 'Price to USD', value: data?.price && millify(data?.price), icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: data?.rank, icon: <NumberOutlined /> },
    { title: '24hs Volume', value: data[test] && millify(data[test]), icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: data?.marketCap && millify(data?.marketCap), icon: <DollarCircleOutlined /> },
    { title: 'Total Supply', value: data?.supply?.total && millify(data?.supply?.total), icon: <ExclamationCircleOutlined /> },
    { title: 'All-time-high', value: data?.allTimeHigh?.price && millify(data?.allTimeHigh?.price), icon: <TrophyOutlined /> },
  ]

  // necessary comment:this array was a nightmare to make

  useEffect(() => {
    setLoading(true)
    getCrypto(id, time)
      .then((data) => {
        setData(data.data.data.coin)
        setHistory(data.history.data)
        setLoading(false)
      })
  }, [id, time])




  if (loading) return (<div className='Cryptogrid'><div className='loader'></div></div>)

  return (
    <div className='Cryptogrid'>
      <div className="textcenter spacerTop">
        <Title level={1} >{data.name}</Title>
        <Text >{data.name} live price in US Dollar (USD). View value statistics, market cap and supply.</Text>
      </div>
      <Divider />
      <Select className="spacerBot" value={time} style={{ width: 120 }} onChange={(e) => setTime(e)}>
        {timelapses?.map((item, i) => <Option value={item} key={i}>{item}</Option>)}
      </Select>
      
      <div className='flex apart spacerBot'>
        <Title level={2} style={{ color: "#1890ff", margin: 0 }}>{data.name} Price Chart</Title>
        <Text strong>Change: {data.change > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />} {data.change}% - {data.name} Price: {data?.price ? millify(data?.price) : ""}$</Text>
      </div>
      <Chart history={history} />

      <Row gutter={[32, 32]} className="spacerBot spacerTop" >
        <Stats
          title={`${data.name} Value Statistics`}
          paragraph="An overview showing the statistics of Bitcoin, such as the base and quote currency, the rank,and trading volume."
          stats={stats}
        />
        <Stats title="Relevant Links"
          paragraph="Explore the environment and what the community has to say"
          links={data.links}
          />
      </Row>

      <Title level={2} style={{ color: "#1890ff", margin: "10px" }}>What is {data.name}?</Title>
      <div className='weirdString'>
        <p dangerouslySetInnerHTML={{ __html: data.description }} />
      </div>

    </div>
  )
}

export default SingleCrypto