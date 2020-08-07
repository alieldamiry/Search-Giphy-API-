import { useReducer, useEffect } from 'react';
import axios from 'axios';


const initialState = {
    giphies: [],
    loading: false
}

const API_KEY = 'ODabGMg2gVRrFEwbCYiO81DeFHXqeH8Y';
const BASE_URL = 'https://api.giphy.com/v1/stickers';
const query = 'laugh';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_GIPHY_START': return { ...state, loading: true }
        case 'FETCH_GIPHY_SUCCESS': return { ...state, giphies: action.giphies }
        case 'FETCH_GIPHY_FAILED': return { ...state, error: action.error }
        default: return state
    }
}


const useFetchGiphy = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatch({ type: 'FETCH_GIPHY_START' });
        axios.get(BASE_URL + `/search?api_key=${API_KEY}&q=${query}&limit=25&offset=0&rating=g&lang=en`)
            .then(res => {
                dispatch({ type: 'FETCH_GIPHY_START', giphies: res.data.data });
                console.log(res)
            })
    }, []);
    console.log(state.giphies);
    return state;
};

export default useFetchGiphy;