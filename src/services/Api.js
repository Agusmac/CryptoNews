import axios from "axios";

export default async function getData(length) {
    const url = 'https://coinranking1.p.rapidapi.com/coins'

    const params = {
        params:{
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '24h',
            tiers: '1',
            orderBy: 'marketCap',
            orderDirection: 'desc',
            limit: length,
            offset: '0'
        },
        headers: {
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
        }
    }

    try {
        const { data } = await axios.get(url, params);
        return data
    } catch (error) {

    }

}