import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Banner() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: '81f7a245b4af75d9aaad5533ec062952',
            language: 'en-US',
            page: 4
          }
        });
        setImages(response.data.results); // Assuming 'results' contains the array of movies from the response
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change the interval time (in milliseconds) as per your requirement

    return () => clearInterval(interval);
  }, [images]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative">
      {images.length > 0 ? (
        <>
          <div className="h-[20vh] md:h-[85vh] bg-cover bg-center flex justify-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${images[currentIndex].poster_path})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 flex items-end">
              <div className="text-white text-xl text-center w-full bg-blue-900/60 p-2">
                {images[currentIndex].title}
              </div>
            </div>
          </div>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white p-2 rounded-full"
            onClick={handlePrev}
          >
            &lt;
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white p-2 rounded-full"
            onClick={handleNext}
          >
            &gt;
          </button>
        </>
      ) : (
        <div className="h-[20vh] md:h-[85vh] flex items-center justify-center bg-gray-200">
          <div className="text-xl text-gray-700">Loading...</div>
        </div>
      )}
    </div>
  );
}

export default Banner;
