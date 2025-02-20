import React, { useState, useEffect } from 'react';
import genre from '../utility/genre';
import confetti from 'canvas-confetti';

const History = () => {
  const [deletedHistory, setDeletedHistory] = useState([]);

  const [confettiTriggered, setConfettiTriggered] = useState(false);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('deletedHistory')) || [];
    setDeletedHistory(history);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('deletedHistory');
    setDeletedHistory([]);

    if (!confettiTriggered) {
      setConfettiTriggered(true); // Prevent multiple triggers
      confetti({
        particleCount: 1000,
        spread: 100,
        origin: { y: 0.6 },
        disableForReducedMotion: true, // Optional: for accessibility
      });

      // Reset confettiTriggered after the animation duration (e.g., 3 seconds)
      setTimeout(() => setConfettiTriggered(false), 3000);
    }
  };

  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 m-8'>
      <h2 className='text-lg font-bold py-2'>Deleted History</h2>
      <div className='flex justify-center mb-4'>
        <button
          onClick={clearHistory}
          className='px-5 py-3 bg-blue-500 text-white rounded-lg'
        >
          Clear History
        </button>
      </div>
      <table className='w-full text-center text-gray-290'>
        <thead className='border-b-2'>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {deletedHistory.length > 0 ? (
            deletedHistory.map((movie) => (
              <tr className='border-b-2' key={movie.id}>
                <td className='px-4 py-4'>
                  <img src={movie.image} alt={movie.title} className='w-100 h-16 object-cover' />
                </td>
                <td className='px-4 py-4'>{movie.title}</td>
                <td>{genre[movie.genre_ids[0]]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='3' className='py-4'>No history available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
