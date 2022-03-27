import React, { useEffect, useState } from 'react'
import { Row, Select, Col, Image, Typography, Avatar } from 'antd';
import moment from 'moment';
import getNews from "../services/ApiNews"
import getData from '../services/Api';


const { Title, Text } = Typography
const { Option } = Select;

const News = ({basic}) => {
  const length=basic?6:50
  const [newsData, setNewsData] = useState([])
  const [category, setCategory] = useState("Cryptocurrency")
  const [cateArray, setCateArray] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getData()
      .then(({ data }) => {
        let temp = []
        data?.coins?.map((item) => temp.push(item.name))
        setCateArray(temp)
      })
     
    getNews(category, length)
      .then((data) => {
        setNewsData(data.value)
        setLoading(false)
      })
     
  }, [category,length])

  return (
    <>
    {!basic &&
      <Select value={category} style={{ width: 200, margin: "50px auto" }} onChange={(e) => setCategory(e)}>
        <Option value="Cryptocurrency">Cryptocurrency</Option>
        {cateArray?.map((item, i) => <Option value={item} key={i}>{item}</Option>)}
      </Select>}

      <Row gutter={[32, 32]} className={basic?"":"Cryptogrid"}>

        {loading ? <div className='loader'></div> : newsData?.map((item, i) =>
          <Col xs={24} sm={24} md={24} lg={12} xxl={8} className="crypto-card" key={i}>
            <a href={item.url} target="_blank" rel="noreferrer">
              <div className='newsCard'>
                <div className='flex apart forever'>
                  <Title level={4} style={{ margin: "0 10px 0 0", maxWidth: "80%", textAlign: "left" }}>{item.name}</Title>
                  <Image width={90} height="auto" src={item?.image?.thumbnail?.contentUrl} />
                </div>
                <br />
                <Text style={{ fontSize: "16px" }}  >{item.description.length > 150 ? item.description.substring(0, 150) + "..." : item.description}</Text>
                <br />
                <div className='flex apart forever spacerBoth'>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={item.provider[0]?.image?.thumbnail?.contentUrl} alt="news" />
                    <Text style={{ fontSize: "16px", marginLeft: "10px" }} className='provider-name'>{item.provider[0]?.name}</Text>
                  </div>
                  <Text style={{ fontSize: "16px" }} className='provider-name'>{moment(item.datePublished).fromNow()}</Text>
                </div>
              </div>
            </a>
          </Col>
        )}
      </Row>
    </>
  )}

export default News