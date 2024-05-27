import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMovies } from "../actions/MovieAction";
import { addToFavorites, removeFromFavorites } from "../actions/FavoriteActions";
import Navbar from "./Navbar";

const Movies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const favorites = useSelector((state) => state.favorites.favorites);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL);
        dispatch(setMovies(response.data));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [dispatch]);

  const handleFavoriteToggle = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      dispatch(removeFromFavorites(movie));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  const handleMovieClick = (imdbUrl) => {
    window.open(imdbUrl, "_blank");
  };

  return (
    <div >
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-4">Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies
            .sort((a, b) => b.rating - a.rating)
            .map((movie) => (
              <div
                key={movie.id}
                className="p-4 border border-gray-300 rounded-lg shadow-md transition duration-300 hover:shadow-lg cursor-pointer"
                onClick={() => handleMovieClick(movie.imdb_url)}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL}${movie.image}`}
                  alt={movie.movie}
                  className="mb-2 rounded-lg w-full h-40 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{movie.movie}</h3>
                <p className="text-gray-700"><strong>Rating:</strong> {movie.rating}</p>
                <button
                  className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-gray-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteToggle(movie);
                  }}
                >
                  {favorites.some((fav) => fav.id === movie.id) ? "Unfavorite" : "Favorite"}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
