import React from 'react'
import LineLoader from '../loaders/lineloader';

function InputText({label,visible,defaultValue,onChangeAction,error,color,req,toolTip,tableForm}) {
  return (
    
      <div data-testid ="main" title={toolTip} className={`w-full ${tableForm===true?``:`lg:w-6/12`}  px-4`}>
                  <div data-testid ="child0"  className="relative w-full mb-3">
                    <label data-testid ="checkingcolor"
                      className={`text-sm font-medium ${color?.text} block mb-2`}
                      htmlFor="grid-password">
                      {label}
                      {req===true?<span style={{ color: "#ff0000" }}>*</span>:<></>}
                    </label>
                    <div data-testid="vis0" className={visible === 0 ? 'block' : 'hidden'}><LineLoader/></div>
                    <div data-testid="vis1" className={visible === 1 ? 'block' : 'hidden'}>
                      <input 
                        type="text" data-testid="input"
                        className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        defaultValue={defaultValue} required
                        onChange={
                          (e) => (
                            onChangeAction(e)
                          )
                        } />
                      <p data-testid='Error' title={error} className="text-sm text-sm text-red-700 font-light">
                        {error}</p>
                    </div>
                  </div>
                </div>
    
  )
}

export default InputText
