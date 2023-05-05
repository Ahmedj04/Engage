import React, { useEffect, useState } from 'react'
import InputText from '../utils/InputText';
import DropDown from '../utils/DropDown';
import axios from 'axios';

function DayCard({ day, rooms_price, color, edit, allRooms }) {
const [del,setDel]=useState({ "d":0, "index":""})

  return (
    <div className={`p-0.5 h-full lg:w-auto w-full  ${color?.whitebackground} ${color?.text} border border-grey-200  hover:drop-shadow-2xl`}>
      {/* day label */}
      <span className='font-bold'>{`${day}`}</span><br />
      <table>
        {/* head of table */}
        <thead className='border-grey-200 border-y-2 border-x-0'>
          <tr>
            <th className='font-semibold'>Room</th>
            <th className='font-semibold'>Price</th>
            {edit === 1 ? <th className='font-semibold'>Action</th> : <></>}
          </tr>
        </thead>
        <tbody >
          {/* edit===1 means enlarged body */}
          {edit === 1 ?
            <>{rooms_price.map((room_price, i) =>
              <tr key={i}>

                <td>
                  <DropDown visible={1} defaultValue={room_price?.room_name} color={color} onChangeAction={(e) => alert(e.target.name)}
                    options={allRooms.map(i => {
                      return {
                        "value": i?.room_type_id,
                        "label": i?.room_type_name
                      }
                    })} tableForm={true} />
                </td>
                <td>
                  <InputText visible={1} defaultValue={room_price?.price} onChangeAction={(e) => console.log(e.target.value)} color={color} tableForm={true} />
                </td>
                
                  {del.d === 1 && del.index===i? 
                    <td>
                      <button
                        className=" bg-gradient-to-r my-1 bg-red-600 hover:bg-red-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                        onClick={() => {
                          alert("delete logic to be put here")
                        }}
                      >Yes,Delete</button>
                      <button className={`ml-1 bg-gradient-to-r my-1 bg-gray-400 hover:${color?.greybackground}0 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}
                        onClick={(e) => {
                          setDel({...del,d:0,index:""})
                        }}
                      >

                        Cancel</button>
                    </td>:<td>
                    <button className="bg-gradient-to-r mt-1 mr-2 bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                      onClick={() => {
                        alert('save logic to be placed on this button')
                      }}
                    >Save</button>
                    
                    <button className="bg-gradient-to-r my-1 bg-red-600 hover:bg-red-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                      onClick={(e) => {
                        setDel({...del,d:1,index:i});
                      }}
                    >
                    Delete</button>
                  </td> }
              </tr>)}</> : <>{rooms_price.map((room_price, i) =>
                <tr key={i} >
                  <td className='border-grey-200 border-y-0 border-x-0 border-r-2'>{room_price?.room_name}</td>
                  <td>{room_price?.price}</td>
                </tr>)}</>}
        </tbody>
      </table>
    </div>

  )
}



export default DayCard;