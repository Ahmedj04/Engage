import React from 'react'
import InputText from '../utils/InputText';
import DropDown from '../utils/DropDown';

function DayCard({day,rooms_price,color,edit}) {
  return (
    <div className={`p-0.5 h-full w-auto  ${color?.greybackground} ${color?.text} border border-grey-300 rounded-sm`}>
    <span className='font-bold'>{`${day}`}</span><br/>
    <table className='w-11/12'>
        <thead className='w-11/12'>
            <tr>
                <th className='font-medium'>Room</th>
                <th className='font-medium'>Price</th>
                <th className='font-medium'>Action</th>
            </tr>
        </thead>
        <tbody className='w-11/12'>
         {edit===1?
         <>{rooms_price.map((room_price,i)=>
          <tr className='border border-black' key={i}>
          <td className='w-1/2'>
            <DropDown visible={1} defaultValue={room_price?.room_name} color={color} onChangeAction={(e)=>alert(e.target.name)} options={[]}/>
          </td>
          <td className='w-1/2'>
            <InputText visible={1} defaultValue={room_price?.price} onChangeAction={(e)=>console.log(e.target.value)} color={color} />
          </td>
          <td><button
          className='bg-cyan-600 hover:bg-cyan-800 h-8 w-16 text-white border border-none rounded-md '>Save</button></td>
      </tr>)}</>:<>{rooms_price.map((room_price,i)=>
        <tr key={i}>
        <td>{room_price?.room_name}</td>
        <td>{room_price?.price}</td>
    </tr>)}</>}   
        </tbody>
    </table>
    </div>
    
  )
}



export default DayCard;