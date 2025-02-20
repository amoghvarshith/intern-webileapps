import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); // Redirect to the home page after 4 seconds
    }, 4000);

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, [navigate]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo-NM-NAbeZy_lgbrCZvxpm3sC40Y0mnX-0A&s' alt='Loading...' className='w-1/2 h-auto' />
    </div>
  );
};

export default SplashScreen;
