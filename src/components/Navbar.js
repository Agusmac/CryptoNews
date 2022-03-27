import React from 'react'
import { Layout, Menu,Typography } from 'antd';
import {HomeOutlined,BarChartOutlined,BulbOutlined  } from '@ant-design/icons';
import { Link } from "react-router-dom"

const { Title } = Typography;
const { Sider } = Layout;

export default function Navbar() {
  return (
    <Sider style={{width: "400px"}}
      breakpoint="md"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo">
      <Title level={2} className="title"> <Link to="/">CryptoNews</Link></Title>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1" icon={<HomeOutlined /> }>
        <Link to="/">Home</Link>
          
        </Menu.Item>
        <Menu.Item key="2" icon={<BarChartOutlined />}>
        <Link to="/cryptos">Cryptocurrencies</Link>
        
        </Menu.Item>
        <Menu.Item key="3" icon={<BulbOutlined />}>
        <Link to="/news">News</Link>
        
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

