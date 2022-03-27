import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';


import Navbar from './components/Navbar';
import Home from "./components/Home"
import News from "./components/News"
import Cryptos from "./components/Cryptos"
import Error from "./components/Error"
import SingleCrypto from "./components/SingleCrypto"

import 'antd/dist/antd.css';
import "./App.css"



const { Footer } = Layout;


export default function App() {
    return (
        <Router>
            <Layout >
                <Navbar />
                <Layout style={{ padding: 24, minHeight: 360 }} >
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/cryptos">
                            <Cryptos />
                        </Route>
                        <Route path="/singlecrypto/:id">
                            <SingleCrypto />
                        </Route>
                        <Route path="/news">
                            <News />
                        </Route>
                        <Route path="*">
                            <Error />
                        </Route>
                    </Switch>
                    <Footer style={{ textAlign: 'center' }}>Ant Design 2022 Created by Agustin Mac Rae</Footer>
                </Layout>
            </Layout>

        </Router>

    )

}
