import  { useState, useEffect } from 'react'
const API_KEY = process.env.REACT_APP_MEDIA_API_KEY
const API_ENDPOINT = `https://tastedive.com/api/similar?k=${API_KEY}&`;
export const useFetch = (searchQuery) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ show: false, msg: ""});
    const [matching, setMatching] = useState([]);
    const [similar, setSimilar] = useState([]);

    const fetchMovie = async (url) => {
        setLoading(true);
        try{
            const response = await fetch(url);
            const data = await response.json();

            setMatching(data.Similar.Info)
            setSimilar(data.Similar.Results)
            setLoading(false);
        }catch (error){
            console.error(error);
        }
    }


    useEffect(() => {
        console.log(`${API_ENDPOINT}${searchQuery}`);
        fetchMovie(`${API_ENDPOINT}${searchQuery}`);
    }, [searchQuery])
    return {loading, error, matching, similar}
};