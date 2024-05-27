import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../actions/FavoriteActions";
import { AiFillHeart } from "react-icons/ai";
import Navbar from "./Navbar";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const handleMovieClick = (imdbUrl) => {
    window.open(imdbUrl, "_blank");
  };

  const handleFavoriteToggle = (movie) => {
    dispatch(removeFromFavorites(movie));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">Favorite Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="p-4 border border-gray-300 rounded-lg shadow-md transition duration-300 hover:shadow-lg cursor-pointer"
              onClick={() => handleMovieClick(movie.imdb_url)}
            >
              <img
                src={`${process.env.REACT_APP_API_URL}/${movie.image}`} // Concatenate base URL with image path
                alt={movie.movie}
                className="mb-2 rounded-lg w-full h-40 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">{movie.movie}</h3>
              <p className="text-gray-700"><strong>Rating:</strong> {movie.rating}</p>
              <p className="text-gray-700"><strong>Description:</strong> {movie.description}</p>
              <button
                className="mt-4 rounded hover:bg-gray-100 text-[3rem]"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavoriteToggle(movie);
                }}
              >
                <AiFillHeart color="red" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
