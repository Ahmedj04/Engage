import { Router } from 'next/router';
import Button from '../../components/Button';
import axios from 'axios';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import language from "../../components/Languages/en";
import { useRouter } from "next/router";
import Headloader from "../../components/loaders/headloader";
import LineLoader from '../../components/loaders/lineloader';

function Index() {
     // states to store data 
     const [basicDetails, setBasicDetails] = useState({ "propert_name": "client", "property_id": "t2k0032" });
     const [visible, setVisible] = useState(1)
     const [color, setColor] = useState({ "text": "black" })
     const currentLogged = { "id": "user001" }
  return (
    <>
     <Header />
      <Sidebar />
      <div className='px-4 pt-24 pb-2 relative overflow-y-auto lg:ml-64'>
     
                {/* Navbar */}
                <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                            <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                <Link href={currentLogged?.id.match(/admin.[0-9]*/) ? "../admin/AdminLanding" : "./landing"}
                                    className={`${color?.text} text-base font-medium  inline-flex items-center`}><a>{language?.home}</a>
                                </Link></div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <div className={visible === 0 ? 'block w-16' : 'hidden'}><Headloader /></div>
                                    <div className={visible === 1 ? 'block' : 'hidden'}>   <Link href="./propertysummary" className="text-gray-700 text-sm   font-medium hover:{`${color?.text} ml-1 md:ml-2">
                                        <a>Places</a>
                                    </Link>
                                    </div></div>

                            </div>
                        </li>
                       
                    </ol>
                </nav>
                <h6 className={`${color?.text} capitalize text-xl flex leading-none pl-6 lg:pt-2 pt-6  font-bold`}>
                    Places
                </h6>
     {/* table of activities for day */}
     <div className="flex flex-col mt-8 lg:mr-0 sm:mr-0 ">
      
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden">
                  <table className="table data table-fixed min-w-full divide-y divide-gray-200" id="myTable">
                    <thead className=" bg-gray-100">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                          </div>
                        </th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Places Name</th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className=" bg-white divide-y  divide-gray-200" id="TableList">
                      
                      
                          <tr>
                            <td className="p-4 w-4">
                              <span className="flex items-center">
                                <input id="checkbox-1" name="r0091" aria-describedby="checkbox-1" type="checkbox"
                                  className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                <label htmlFor="checkbox-1" className="sr-only" />
                              </span>
                            </td>
                            <td className="p-4 whitespace-nowrap capitalize text-base font-normal text-gray-700">Srinagar</td>

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
    </>
  )
}

export default Index