import { useEffect, useState } from "react";
import baseUrl from "./api/api"
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    searchMovies("Batman");
  },[] );

  const searchMovies = async (title) => {
    const response = await fetch(`${baseUrl}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);

  };

  return (
    <div className="app">
      <h1>Fikiri MovieLand</h1>

      <div className="search">
        <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="search for movies"
        />
          <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        /> 
        </div>

        {movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies</h2>
            </div>
          )
        }


    </div>
  );
};

export default App;