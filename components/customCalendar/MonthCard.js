import React from 'react'

function MonthCard() {
  return (
    <div className='bg-gray-100 h-auto grid grid-cols-7 gap-2 m-2 p-2'>

    {items.map((i) => <DayCard day={i} rooms_price={rooms_price} />)}
</div>
  )
}

export default MonthCard