import React from 'react'

function InputTextBox({label,visible,defaultValue,onChangeAction,error,color,req}) 

{
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
                    <div className={visible === 0 ? "block w-auto" : "hidden"}>
                      
                    </div>
                    <div className={visible === 1 ? "block" : "hidden"}>
                      <textarea
                        rows="5"
                        columns="50"
                        data-testid="test_description_body"
                        className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        onChange={
                            (e) => (
                              onChangeAction(e)
                            )
                          } 
                       
                        defaultValue={defaultValue}
                        required
                      />
                        <p  title={error} className="text-sm text-sm text-red-700 font-light">
                        {error}</p>
                    </div>
                  </div>
                </div>
    
  )
}

export default InputTextBox
