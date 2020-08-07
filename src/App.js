import React, { useReducer, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Container } from 'react-bootstrap';
import SearchForm from './SearchForm';

const initialState = {
  giphies: [],
  loading: false
}



const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_GIPHY_START': return { ...state, loading: true }
    case 'FETCH_GIPHY_SUCCESS': return { ...state, giphies: action.giphies }
    case 'FETCH_GIPHY_FAILED': return { ...state, error: action.error }
    default: return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [params, setParams] = useState("");
  const API_KEY = 'ODabGMg2gVRrFEwbCYiO81DeFHXqeH8Y';
  const BASE_URL = 'https://api.giphy.com/v1/gifs';
  const query = params;

  const startSearch = event => {
    // event.preventDefault();
    axios.get(BASE_URL + `/search?api_key=${API_KEY}&q=${query}&limit=25&offset=0&rating=g&lang=es`)
      .then(res => {
        dispatch({ type: 'FETCH_GIPHY_SUCCESS', giphies: res.data.data });
        console.log(res)
      })
  }
  // const giphies = state.giphies.map(giphy => <h1>{giphy.id}</h1>);
  console.log(state);
  return (
    <Container className="my-4">
      <h1>Giphy App</h1>
      <SearchForm params={params} setParams={setParams} startSearch={startSearch} />
      {state.giphies.map(giphy =>
        <img className="img-thumbnail" src={giphy.images.fixed_height.url} alt="this slowpoke moves" />
      )}
    </Container>
  );
}

export default App;
