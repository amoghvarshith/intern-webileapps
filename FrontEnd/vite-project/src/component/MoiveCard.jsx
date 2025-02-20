// MovieCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movieObj, poster_path, name, handleAddWatchlist, handleRemoveFromWatchList, watchlist }) {
  const navigate = useNavigate();

  function doesContain(movieObj) {
    return watchlist.some(watchlistMovie => watchlistMovie.id === movieObj.id);
  }

  return (
    <div
      onClick={() => navigate(`/movie/${movieObj.id}`)}
      className='relative h-[55vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 cursor-pointer'
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})` }}
    >
      {doesContain(movieObj) ? (
        <div 
          onClick={(e) => { 
            e.stopPropagation();
            handleRemoveFromWatchList(movieObj);
          }} 
          className='absolute top-2 right-2 flex justify-center h-8 w-8 items-center rounded-lg' 
          style={{ border: "1px solid black" }}
        >
          &#10060;
        </div>
      ) : (
        <div 
          onClick={(e) => { 
            e.stopPropagation();
            handleAddWatchlist(movieObj);
          }} 
          className='absolute top-2 right-2 flex justify-center h-8 w-8 items-center rounded-lg' 
          style={{ border: "1px solid black" }}
        >
          &#128525;
        </div>
      )}

      <div className='absolute bottom-0 text-white text-xl w-full p-1 text-center bg-gray-900/60'>
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
