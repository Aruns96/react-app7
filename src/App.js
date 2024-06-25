import React, { useEffect, useState,useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MovieForm from './components/MovieForm';

function App() {
  const [movies,setMovieData]=useState([])
  const [isloading,setIsLoading] = useState(false);
  const[error,setError] = useState(null)
  
   const fetchmovieHandler =useCallback( async ()=>{
      setError(null)
      setIsLoading(true)
      try{
    const response = await fetch("https://react-http-b0681-default-rtdb.firebaseio.com/movies.json")
     if(!response.ok){
      throw new  Error("Something went wrong ....Retrying'")
     }
    const data= await response.json();
    //console.log(data)
    const loadedMovies = [];

    for (let key in data){
      loadedMovies.push({
        id:key,
        title:data[key].title,
        desc:data[key].about,
        date:data[key].date
      })
    }


     
      setMovieData(loadedMovies)
      
  }catch(e){
     setError(e.message)
  }
  setIsLoading(false)
   },[])

   useEffect(()=>{
    fetchmovieHandler()
    console.log("use effect called")
 },[fetchmovieHandler])
  
//  const deleteMovieHandler = async(id)=>{
//   console.log("id",id)
//   const response = await fetch(`https://react-http-b0681-default-rtdb.firebaseio.com/movies.json/${id}`,{
//     method:"DELETE"
//   })
//   const data = await response.json()
//   console.log(response,data)
//  }
const deleteMovieHandler= async(id) =>{
  console.log(id)
  const deleteUrl = `https://react-http-b0681-default-rtdb.firebaseio.com/movies.json/${id}`; // Replace with your actual API endpoint for deletion
  const response = await fetch(deleteUrl, {
    method: 'DELETE',
    headers:{
      "Content-Type":"application/json"
    },
    
  });
  if (!response.ok) {
    console.error(`Error deleting movie with ID ${id}:`, response.statusText);
  } else {
    console.log(`Movie with ID ${id} deleted successfully.`);
  }

}
 

   let content = <p>no movies found</p>;
   if(movies.length > 0){
    content = <MoviesList movies={movies} onDelete={deleteMovieHandler}/>
   }
   if(error){
    content=<p>{error}</p>
    
   }
   
  
   if(isloading){
    content=<p>loading...</p>
   }
   const addMovieHandler = async (movie)=>{
    
    const response = await fetch("https://react-http-b0681-default-rtdb.firebaseio.com/movies.json",{
      method:"POST",
      body:JSON.stringify(movie),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data = await response.json()
    console.log(data)
   }
    
   
   
  return (
    <React.Fragment>
      <section>
        <MovieForm onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchmovieHandler}>Fetch Movies</button>
        
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
