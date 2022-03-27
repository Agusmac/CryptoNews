import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Card, Image, Input, Typography } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import millify from "millify";
import getData from '../services/Api';


const { Title } = Typography;

const Cryptos = ({basic}) => {

  const length=basic?10:50
  const [cryptosData, setCryptosData] = useState([])
  const [search, setSearch] = useState("")
  const [cryptosInfo, setCryptosInfo] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getData(length)
      .then((data) => {
        setCryptosData(data.data.coins)
        setLoading(false)
      })
  }, [length])


  useEffect(() => {
    setCryptosInfo(cryptosData?.filter((crypto) => crypto.name.toLowerCase().includes(search)))
  }, [cryptosData, search])


  return (
    <>
      {!basic &&
      <div className='flex apart spacerTop spacerBot'>
        <Title level={1} className="title">Cryptos</Title>
        <Input className="inputer" size="small" placeholder="Search..." onChange={((e) => setSearch(e.target.value))} />
      </div>}

      {loading ? <div className='loader'></div> : (<Row gutter={[32, 32]} className={basic?"":"Cryptogrid"}>
        {cryptosInfo?.map((crypto, i) =>
          <Col xs={24} sm={24} md={12} xl={8} xxl={6} className="crypto-card" key={i}>
            <Link to={`/singlecrypto/${crypto.uuid}`}>
              <Card hoverable title={`${crypto.rank} ${crypto.name}`} extra={<Image height={40} src={crypto.iconUrl} />} >
                <p>Price: {millify(crypto.price)} $</p>
                <p>Market Cap: {millify(crypto.marketCap)}</p>
                <p>24hs Change: {crypto.change > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />} {crypto.change}%</p>
              </Card>
            </Link>
          </Col>
        )}
      </Row>)}
    </>
  )}

export default Cryptos