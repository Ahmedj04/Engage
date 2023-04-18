import React from 'react'
import InputText from '../utils/InputText';
import DropDown from '../utils/DropDown';

function DayCard({day,rooms_price,color,edit}) {
  return (
    <div className={`p-0.5 h-full lg:w-auto w-full  ${color?.whitebackground} ${color?.text} border border-grey-200  hover:drop-shadow-2xl`}>
    {/* day label */}
    <span className='font-bold'>{`${day}`}</span><br/>
    <table>
      {/* head of table */}
        <thead className='border-grey-200 border-y-2 border-x-0'>
            <tr>
                <th className='font-semibold'>Room</th>
                <th className='font-semibold'>Price</th>
              {edit===1?<th className='font-semibold'>Action</th>:<></>}  
            </tr>
        </thead>
        <tbody >
          {/* edit===1 means enlarged body */}
         {edit===1?
         <>{rooms_price.map((room_price,i)=>
          <tr  key={i}>
          <td>
            <DropDown visible={1} defaultValue={room_price?.room_name} color={color} onChangeAction={(e)=>alert(e.target.name)} options={[]} tableForm={true}/>
          </td>
          <td>
          <InputText visible={1} defaultValue={room_price?.price} onChangeAction={(e)=>console.log(e.target.value)} color={color} tableForm={true}/>  
          </td>
          <td><button
          className='mx-2 mt-2 bg-cyan-600 hover:bg-cyan-800 h-8 w-16 text-white border border-none rounded-md '>Save</button>
          <button
          className='mx-2 mt-2 bg-red-600 hover:bg-red-800 h-8 w-16 text-white border border-none rounded-md '>Delete</button>
          </td>
      </tr>)}</>:<>{rooms_price.map((room_price,i)=>
        <tr key={i} >
        <td  className='border-grey-200 border-y-0 border-x-0 border-r-2'>{room_price?.room_name}</td>
        <td>{room_price?.price}</td>
    </tr>)}</>}   
        </tbody>
    </table>
    </div>
    
  )
}



export default DayCard;