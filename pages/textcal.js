import React from 'react';
import RoomPriceCalendar from './text';

const RoomPricePage = () => {
  return (
    <div className='flex justify-center items-center flex-col gap-4'>
      <h1>Room Prices</h1>
      <div className='w-1/2 h-1/2'>
        <RoomPriceCalendar />
      </div>
    </div>
  );
};

export default RoomPricePage;