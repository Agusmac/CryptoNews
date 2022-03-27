import axios from "axios";

export default async function getCrypto(id, timelapse) {
    const url = `https://coinranking1.p.rapidapi.com/coin/${id}`
    const url2= `https://coinranking1.p.rapidapi.com/coin/${id}/history`
    const params = {
        params: {
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: timelapse
        },
        headers: {
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
        }
    }


    try {
        const { data } = await axios.get(url, params);
        const { data:history } = await axios.get(url2, params);
        return {data,history}
    } catch (error) {

    }

}