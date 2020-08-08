import React, { useReducer, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Container, Spinner } from 'react-bootstrap';
import SearchForm from './SearchForm';

const initialState = {
  giphies: [],
  loading: false
}



const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_GIPHY_START': return { ...state, loading: true, giphies: [] }
    case 'FETCH_GIPHY_SUCCESS': return { ...state, giphies: action.giphies, loading: false }
    case 'FETCH_GIPHY_FAILED': return { ...state, error: action.error, loading: false }
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
    dispatch({ type: 'FETCH_GIPHY_START', });
    axios.get(BASE_URL + `/search?api_key=${API_KEY}&q=${query}&limit=25&offset=0&rating=g&lang=es`)
      .then(res => {
        dispatch({ type: 'FETCH_GIPHY_SUCCESS', giphies: res.data.data });
        console.log(res)
      }).catch(error => {
        dispatch({ type: 'FETCH_GIPHY_FAILED', error: error });
      })
  }

  let giphies = state.giphies.map(giphy =>
    <img className="img-thumbnail" src={giphy.images.fixed_height.url} alt="this slowpoke moves" />
  )
  if (state.loading) {
    giphies = <Spinner animation="border" />
  } else {
    if (state.error) {
      console.log(state.error);
      giphies = <h1 className="text-danger">Something Went Wrong</h1>
    }
  }

  return (
    <Container className="my-4 text-center" >
      <h1>Giphy App</h1>
      <SearchForm params={params} setParams={setParams} startSearch={startSearch} />
      <Container>
        {giphies}

      </Container>
      {/* <Spinner animation="border" /> */}
    </Container>
  );
}

export default App;
