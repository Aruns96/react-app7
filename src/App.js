import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovieData]=useState([])
  const [isloading,setIsLoading] = useState(false);
  const[error,setError] = useState(null)
  const[retry,setRetry]=useState(true)
   const fetchmovieHandler = async()=>{
      setError(null)
      setIsLoading(true)
      try{
    const response = await fetch("https://swapi.dev/api/film/")
     if(!response.ok){
      throw new  Error("Something went wrong ....Retrying'")
     }
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
      
  }catch(e){
     setError(e.message)
  }
  setIsLoading(false)
   }
  
   
   let content = <p>no movies found</p>;
   if(movies.length > 0){
    content = <MoviesList movies={movies} />
   }
   if(error){
    content=<p>{error}</p>
    
   }
   
  
   if(isloading){
    content=<p>loading...</p>
   }
   if(retry){
    setInterval(() => {
      fetchmovieHandler()
    }, 5000);
  }
   const cancelRetryHandler = ()=>{
    
    setRetry(false)
   }
   
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchmovieHandler}>Fetch Movies</button>
        <button onClick={cancelRetryHandler}>cancel retry</button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
