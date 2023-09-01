import './App.css';
import SearchSvg from './search.svg'
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import React from 'react';



const API_URL = 'http://www.omdbapi.com?apiKey=fd92f3b4';




const App = () => {

  const  [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // @ts-check SEARCH MOVIES
  const searchMovies = async(title) => {
  
    try{

        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        console.log(data);
        setMovies(data.Search);
    } 
    catch(error){
         console.error('Error fetching data:', error);
    } 

}

// @ts-check USE EFFECT
  useEffect(() => {
    searchMovies('avengers');
  }, []);


  const handleSearch = ()=> {

   setSearchTerm(`${searchTerm}`);
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
 

// @ts-check RETURN
  return(
    <div className='app'> 
        <h1>UHD Movies</h1>
      
    <div className='search'>

      <input
        placeholder='Search for movies'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    
      <img 
        src={SearchSvg}
        alt='search'
        onClick={() => searchMovies(searchTerm)}
      />
    </div>

    {
        movies?.length > 0? (
          <div className='container'>
           {
            movies.map((movie) => (
              <MovieCard movie={movie} />
            ))
           }
          </div>
        ):(
          <div className='empty'>
            <h1>No movies found</h1>  
          </div>
           )
    }

    

    </div>
  );
}

export default App;
