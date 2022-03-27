import React from 'react'
import {  Col,  Typography } from 'antd';

const { Title, Text } = Typography

const Stats = ({ title, paragraph, stats, links }) => {

    
    return (
        <Col xs={24} sm={24} md={24} xl={12} xxl={12}>
            <Title level={2} style={{ color: "#1890ff", textAlign: "left" }}>{title}</Title>
            {paragraph&&<Text>{paragraph}</Text>}

            {links?.map((item,i) => <div className='flex apart forever' style={{ padding: "20px 10px", borderBottom: "1px solid #d9d9d9" }} key={i}>
                <Title level={5} strong style={{ fontSize: "16px" }}> {item.type}</Title>
                <a href={item.url} rel="noreferrer" target="_blank">{item.name}</a>
            </div>
            )}

            {stats?.map((item, i) => <div className='flex apart forever' style={{ padding: "20px 10px", borderBottom: "1px solid #d9d9d9" }} key={i}>
                <Text type="secondary" style={{ fontSize: "16px" }}>{item.icon} {item.title}</Text>
                <Text style={{ fontSize: "16px" }}>{item.value}</Text>
            </div>)}
        </Col>
    )
}

export default Stats