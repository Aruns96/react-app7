import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovieData]=useState([])
  const [isloading,setIsLoading] = useState(false)
   const fetchmovieHandler = async()=>{
    setIsLoading(true)
    const response = await fetch("https://swapi.dev/api/films/")

    const data= await response.json();

      const tansformedData = data.results.map(i=>{
        return {
           id:i.episode_id,
           title:i.title,
           desc:i.opening_crawl,
           date:i.release_date
      }
    })
      setMovieData(tansformedData)
      setIsLoading(false)
   
   }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchmovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && movies.length>0 && <MoviesList movies={movies} />}
        {!isloading && movies.length ===0 && <p>no movies</p>}
        {isloading && <p>loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
