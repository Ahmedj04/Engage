import React from 'react'
export default function Tooltip({ message, children,color }) {
  return (
  <div class="group relative flex">
      {children}
      <span class={`absolute h-8 w-max bottom-2 left-5 scale-0 transition-all rounded ${color?.text} 
      ${color?.greybackground} p-2 text-xs  group-hover:scale-100`}>{message}</span>
  </div>
  )
}

