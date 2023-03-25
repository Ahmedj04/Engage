import React from 'react'
import LineLoader from '../loaders/lineloader'
function DateInput({color,label,req,initialValue,onChangeAction,error,visible,max}) {
  return (
    <div className="w-full lg:w-6/12 px-4">
    <div className="relative w-full mb-3">
      <label
        className={`text-sm font-medium ${color?.text} block mb-2`}
        htmlFor="grid-password"
      >
        {label} 
        {req===true?<span style={{ color: "#ff0000" }}>*</span>:<></>}
      </label>
      <div className={visible === 0 ? "block" : "hidden"}>
        <LineLoader />
      </div>
      <div className={visible === 1 ? "block" : "hidden"}>
        <input
          type="Date"
          className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
          defaultValue={initialValue}
          required
          max={max}
          onChange={(e) =>onChangeAction(e)}
         
        />
        <p className="text-sm text-sm text-red-700 font-light">
          {error}
        </p>
      </div>
    </div>
  </div>
  )
}
export default DateInput
