import React, { useEffect, useState } from 'react';
import genre from '../utility/genre';

function Watchlist({ watchlist, handleRemoveFromWatchList, setWatchlist }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedWatchlist, setSortedWatchlist] = useState(watchlist);
  const [genreList, setGenreList] = useState(['All Genres']);
  const [curGenre, setCurGenre] = useState('All Genres');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setSortedWatchlist(watchlist);
  }, [watchlist]);

  useEffect(() => {
    const temp = watchlist.map((movieObj) => genre[movieObj.genre_ids[0]]);
    setGenreList(['All Genres', ...new Set(temp)]);
  }, [watchlist]);

  const handleFilter = (genre) => {
    setCurGenre(genre);
  };

  const filteredWatchlist = sortedWatchlist.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = curGenre === 'All Genres' || genre[movie.genre_ids[0]] === curGenre;
    return matchesTitle && matchesGenre;
  });

  const sortIncreasingByRating = () => {
    const sortedIncreasing = [...sortedWatchlist].sort(
      (movieA, movieB) => movieA.vote_average - movieB.vote_average
    );
    setSortedWatchlist(sortedIncreasing);
  };

  const sortDecreasingByRating = () => {
    const sortedDecreasing = [...sortedWatchlist].sort(
      (movieA, movieB) => movieB.vote_average - movieA.vote_average
    );
    setSortedWatchlist(sortedDecreasing);
  };

  const sortIncreasingByPopularity = () => {
    const sortedIncreasing = [...sortedWatchlist].sort(
      (movieA, movieB) => movieA.popularity - movieB.popularity
    );
    setSortedWatchlist(sortedIncreasing);
  };

  const sortDecreasingByPopularity = () => {
    const sortedDecreasing = [...sortedWatchlist].sort(
      (movieA, movieB) => movieB.popularity - movieA.popularity
    );
    setSortedWatchlist(sortedDecreasing);
  };

  const handleRemoveAndNotify = (movie) => {
    const deletedHistory = JSON.parse(localStorage.getItem('deletedHistory')) || [];
    const updatedHistory = [...deletedHistory, { ...movie, image: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` }];
    localStorage.setItem('deletedHistory', JSON.stringify(updatedHistory));

    handleRemoveFromWatchList(movie);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
  };

  return (
    <>
      <div className='flex justify-center flex-wrap m-4'>
        {genreList.map((genre) => (
          <div
            key={genre}
            onClick={() => handleFilter(genre)}
            className={`flex justify-center items-center h-[2rem] w-[6rem] rounded-xl text-white font-bold mx-4 ${
              curGenre === genre ? 'bg-blue-500' : 'bg-gray-300'
            } cursor-pointer`}
          >
            {genre}
          </div>
        ))}
        <div className='flex justify-center items-center h-[2rem] w-[6rem] rounded-xl text-white bg-gray-300 font-bold'>
          Actions
        </div>
      </div>

      <div className='flex justify-center'>
        <input
          type='text'
          placeholder='Search Movies'
          className='h-[2rem] w-[10rem] bg-gray-200 px-4'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='overflow-hidden rounded-lg border border-gray-200 m-8'>
        <table className='w-full text-center text-gray-290'>
          <thead className='border-b-2'>
            <tr>
              <th>Name</th>
              <th>
                <div className='flex items-center justify-center'>
                  <div onClick={sortIncreasingByRating} className='p-2 cursor-pointer'>
                    <i className='fa-solid fa-arrow-up'></i>
                  </div>
                  <div className='p-2'>Ratings</div>
                  <div onClick={sortDecreasingByRating} className='p-2 cursor-pointer'>
                    <i className='fa-solid fa-arrow-down'></i>
                  </div>
                </div>
              </th>
              <th>
                <div className='flex items-center justify-center'>
                  <div onClick={sortIncreasingByPopularity} className='p-2 cursor-pointer'>
                    <i className='fa-solid fa-arrow-up'></i>
                  </div>
                  <div className='p-2'>Popularity</div>
                  <div onClick={sortDecreasingByPopularity} className='p-2 cursor-pointer'>
                    <i className='fa-solid fa-arrow-down'></i>
                  </div>
                </div>
              </th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredWatchlist.map((movieObj) => (
              <tr className='border-b-2' key={movieObj.id}>
                <td className='px-4 py-4 flex items-center'>
                  <img
                    className='h-[6rem] w-[10rem]'
                    src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                    alt={movieObj.title}
                  />
                  <div className='mx-10'>{movieObj.title}</div>
                </td>
                <td>{movieObj.vote_average}</td>
                <td>{movieObj.popularity}</td>
                <td>{genre[movieObj.genre_ids[0]]}</td>
                <td
                  className='text-red-800 cursor-pointer'
                  onClick={() => handleRemoveAndNotify(movieObj)}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNotification && (
  <div className='fixed top-0 left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-in-out bg-green-500 text-white p-4 rounded shadow-lg'>
    <span className="font-bold">Deleted Successfully</span>
  </div>
)}

    </>
  );
}

export default Watchlist;
