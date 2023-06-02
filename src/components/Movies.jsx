import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Movies.css";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  async function getAllMovies() {
    setLoading(true);
    const getMoviesData = await fetch("https://api.jikan.moe/v4/anime");
    const getMovies = await getMoviesData.json();
    const movies = getMovies.data;
    setMovies(movies);
    setLoading(false);
  }

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div className="movies__container">
      <input
        type="text"
        placeholder="Search movie or series"
        id="movie__input"
        onKeyUp={(e) => setQuery(e.currentTarget.value)}
      />
      <h1 className="movies__resultTitle">Results: </h1>
      <div className="movies__wrapper">
        <>
          {loading ? (
            <div className="loading__wrapper">
              <div className="loading__spinner"></div>
            </div>
          ) : (
            movies
              .filter((movie) => movie.title.toLowerCase().includes(query))
              .map((movie, index) => (
                <figure
                  className="movies__imgWrapper"
                  key={index}
                  onClick={() => navigate(`/movie/${movie.mal_id}`)}
                >
                  <img
                    src={`${movie.images.jpg.image_url}`}
                    alt=""
                    className="movies__img"
                  />
                </figure>
              ))
          )}
        </>
      </div>
    </div>
  );
}

export default Movies;
