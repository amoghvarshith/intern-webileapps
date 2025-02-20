import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MoiveCard from './MoiveCard';
import axios from 'axios';
import Pagination from './Pagination';

function Movies({ handleAddWatchlist, handleRemoveFromWatchList, watchlist, searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const navigate = useNavigate();

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = '';
        if (searchQuery) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=81f7a245b4af75d9aaad5533ec062952&language=en-US&query=${searchQuery}&page=${pageNo}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/popular?api_key=81f7a245b4af75d9aaad5533ec062952&language=en-US&page=${pageNo}`;
        }
        const res = await axios.get(url);
        setMovies(res.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [pageNo, searchQuery]);

  return (
    <div>
      <div className='text-2xl m-5 font-bold text-center'>
        Trending Movies
      </div>

      <div className='flex flex-row flex-wrap justify-around gap-2'>
        {movies.map((movieObj) => (
          <MoiveCard
            key={movieObj.id}
            movieObj={movieObj}
            poster_path={movieObj.poster_path}
            name={movieObj.original_title}
            onClick={() => navigate(`/movie/${movieObj.id}`)} // Navigate on click
            handleAddWatchlist={handleAddWatchlist}
            handleRemoveFromWatchList={handleRemoveFromWatchList}
            watchlist={watchlist}
          />
        ))}
      </div>
      <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  );
}

export default Movies;
