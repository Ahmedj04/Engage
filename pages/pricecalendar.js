import React from 'react';
import RoomPriceCalendar from '../components/CalendarView';

const RoomPricePage = () => {
  return (
    <div className='h-5/6'>
      <h1>Room Prices</h1>
      <div>
        <RoomPriceCalendar />
      </div>
    </div>
  );
};

export default RoomPricePage;