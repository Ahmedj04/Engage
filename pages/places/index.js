import { Router } from 'next/router';
import Button from '../../components/Button';
import axios from 'axios';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import english from "../../components/Languages/en";
import french from "../../components/Languages/fr"
import arabic from "../../components/Languages/ar"
import { useRouter } from "next/router";
import Headloader from "../../components/loaders/headloader";
import LineLoader from '../../components/loaders/lineloader';
import Title from '../../components/title';
import colorFile from '../../components/color';
let colorToggle;
let language;
let currentProperty;
let currentLogged;
function Index() {
  // states to store data 
  const [basicDetails, setBasicDetails] = useState({ "propert_name": "client", "property_id": "t2k0032" });
  const [visible, setVisible] = useState(1)
  const [color, setColor] = useState({})
  const [error, setError] = useState({})
  const [mode, setMode] = useState()
  const router = useRouter();




  // first function to be executed
  const firstfun = () => {
    if (typeof window !== 'undefined') {
      var locale = localStorage.getItem("Language");
      colorToggle = localStorage.getItem("colorToggle");
      if (colorToggle === "" || colorToggle === undefined || colorToggle === null || colorToggle === "system") {
        window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark) : setColor(colorFile?.light)
        setMode(window.matchMedia("(prefers-color-scheme:dark)").matches === true ? true : false);
      }
      else if (colorToggle === "true" || colorToggle === "false") {
        setColor(colorToggle === "true" ? colorFile?.dark : colorFile?.light);
        setMode(colorToggle === "true" ? true : false)
      }
      {
        if (locale === "ar") {
          language = arabic;
        }
        if (locale === "en") {
          language = english;
        }
        if (locale === "fr") {
          language = french;

        }
      }
      /** Current Property Details fetched from the local storage **/
      currentProperty = JSON.parse(localStorage.getItem("property"));
      currentLogged = JSON.parse(localStorage.getItem("Signin Details"));

    }
  }

  //will run as soon as page loads
  useEffect(() => {
    firstfun();
  }, [])
  useEffect(() => {
    if (JSON.stringify(currentLogged) === 'null') {
      router?.push(window.location.origin)
    }
    else {
      //will call fetch data call, when implemented
      //fetchBasicDetails();
    }

  }, []);

  const colorToggler = (newColor) => {
    if (newColor === 'system') {
      window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark)
        : setColor(colorFile?.light)
      localStorage.setItem("colorToggle", newColor)
    }
    else if (newColor === 'light') {
      setColor(colorFile?.light)
      localStorage.setItem("colorToggle", false)
    }
    else if (newColor === 'dark') {
      setColor(colorFile?.dark)
      localStorage.setItem("colorToggle", true)
    }
    firstfun();
    router.push('../places')
  }


  function searchFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
      td = tr[i];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  return (
    <>
      <Title name={`Engage |  ${language?.places}`} />
      <Header color={color} Primary={english.PlaceSide} Type={currentLogged?.user_type} Sec={colorToggler} mode={mode} setMode={setMode} />
      <Sidebar color={color} Primary={english.PlaceSide} Type={currentLogged?.user_type} />

      <div className={`${color?.greybackground} px-4 pt-24 pb-2 h-screen relative overflow-y-auto lg:ml-64`}>

        {/* Navbar */}
        <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                <Link href={currentLogged?.id.match(/admin.[0-9]*/) ? "../admin/AdminLanding" : "../property/landing"}
                  className={`${color?.text} text-base font-medium  inline-flex items-center`}><a>{language?.home}</a>
                </Link></div>
            </li>
            <li>
              <div className="flex items-center">
                <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <div className={visible === 0 ? 'block w-16' : 'hidden'}><Headloader /></div>
                  <div className={visible === 1 ? 'block' : 'hidden'}>
                    {language?.places}

                  </div></div>

              </div>
            </li>

          </ol>
        </nav>
        {/* page heading, search bar,icons and add button*/}
        <div className="mx-4">
          <h1 className={`text-xl sm:text-2xl font-semibold ${color?.text}`}>Places</h1>
          <div className="sm:flex">
            <div className=" sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
              {/* search form */}
              <form className="lg:pr-3" action="#" method="GET">
                <label htmlFor="users-search" className="sr-only">Search</label>
                <div className="mt-1 relative lg:w-64 xl:w-96">
                  <input type="text" name="email" id="myInput" onKeyUp={searchFunction}
                    className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} placeholder="Search">
                  </input>
                </div>
              </form>
              {/* search form end */}
              {/* icons start */}
              <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                </span>

                <button data-tooltip="Delete" aria-label="Delete" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                </button>



                <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                </span>
                <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                </span>
              </div>
              {/* icons end*/}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
              <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex  
                             font-semibold
                                    rounded-lg text-sm px-5 py-2 text-center 
                              items-center ease-linear transition-all duration-150" onClick={() => alert("add clicked")} >
                ADD</button>

            </div>
          </div>
        </div>


        <div className={`${color?.whitebackground} shadow rounded-lg px-12 my-2 sm:p-6 xl:p-8  2xl:col-span-2`}>
          {/* table of activities for day */}
          <div className="flex flex-col mt-8 lg:-mr-20 sm:mr-0 w-full  relative">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden">
                  <table className="table data table-fixed lg:min-w-full divide-y divide-gray-200 min-w-screen" id="myTable"> <thead className={`${color?.tableheader}`}>
                    <tr>
                      <th scope="col" className={`p-4 ${color?.textgray}`}>
                        <div className="flex items-center">
                          <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                          <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.text} uppercase`}>Places Name</th>
                      <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.text} uppercase`}>Actions</th>
                    </tr>
                  </thead>
                    <tbody className={` ${color?.whitebackground} divide-y  divide-gray-200`} id="TableList">


                      <tr >
                        <td className="p-4 w-4">
                          <span className="flex items-center">
                            <input id="checkbox-1" name="r0091" aria-describedby="checkbox-1" type="checkbox"
                              className={`bg-gray-50 ${color?.text} text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded`} />
                            <label htmlFor="checkbox-1" className="sr-only" />
                          </span>
                        </td>
                        <td className={`${color?.text} p-4 whitespace-nowrap capitalize text-base font-normal`}>Srinagar</td>

                        <td className="py-4 whitespace-nowrap capitalize">
                          <div> <Link href="../places/place">
                            <a> <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                            >Edit </button>
                            </a>
                          </Link>

                          </div>
                        </td>
                      </tr>



                    </tbody>
                  </table>

                  <div className='flex items-center justify-end space-x-2  sm:space-x-3 ml-auto'>
                    {/* <Button Primary={} onClick={() => { }} /> */}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer color={color} Primary={english.PlaceSide} />
    </>
  )
}

export default Index