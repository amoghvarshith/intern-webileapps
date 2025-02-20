import React from 'react';

function Pagination({handlePrev,handleNext,pageNo}) {
  return (
    <div className='bg-gray-400 text-center p-4 mt-4 flex justify-center items-center space-x-4'>
      <div onClick={handlePrev} className='px-8 cursor-pointer hover:text-blue-500'>
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <div className='font-bold'>{pageNo}</div>
      <div onClick={handleNext} className='px-8 cursor-pointer hover:text-blue-500'>
        <i className="fa-solid fa-arrow-right-long"></i>
      </div>
    </div>
  );
}

export default Pagination;
