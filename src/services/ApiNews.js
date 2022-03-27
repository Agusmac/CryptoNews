import axios from "axios";

export default async function getNews(searchTerm, count) {

   
    const url = `https://bing-news-search1.p.rapidapi.com/news/search`

    const params = {
        params: { q: `${searchTerm}`, safeSearch: 'off', textFormat: 'Raw', freshness: 'Week', count: count },
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
        }
    }
    try {
        const { data } = await axios.get(url, params);
        return data
    } catch (error) {

    }

}