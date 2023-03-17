// ProgressStatus.js is used to show Upload image & image details option depending on the state of the widget.

// In this file we created the function progressStatus which consists the arguments Name,Selected,Color.
//  name : this is an array type , it will hold name of labels to be displayed.
//  selected: this should be of the type integer, which is to be shown as selected
//  color: this will consist of color which is currently active {dark or light}
//  When the length of name will be less than  6 then the width will become 1/12.
//  We make use of map with the arguments items & index  to specify the tailwind for different devices.


import React, { useEffect, useState } from "react";

function ProgressStatus({ name, selected, color }) {
  const [select,setSelect]=useState(selected-1)
  return (
    <div data-testid='main' className="flex justify-center mx-auto max-w-full"> {name?.map((item, index) => { return (
              <div data-testid={`child${index}`} className={`${name.length<6?`w-1/${name.length}`:`w-1/12`}`} key={index}> 
            <div className={`relative before:hidden  befor  e:lg:block before:absolute   
              before:h-[3px] before:top-0 before:bottom-0 before:mt-4 ${index===0 || (name.length)-1===index ?`before:w-[64%] ${index===0?`before:ml-36`:`before:mr-36`}`:`before:w-[200%]`}
              before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center my-10 sm:px-20`}>
               <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                 <button className={`w-10 h-10 rounded-full btn 
                 ${select===index?`text-white bg-cyan-600`:`text-slate-500  bg-slate-100`} btn-primary`}>
                  {index + 1}
                </button>
                <div data-testid={`innerchild1${index}`}
                  className={
                    `${select===index?`${color.crossbg}`:`${color.widget}`} lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto`
                }
                >
                  {item} 
                </div>
                </div>
            </div>
          </div>
        );
      })}
      {name.length===0?<div data-testid='no-name'></div>:<></>}
    </div>
  );
}

export default ProgressStatus;
