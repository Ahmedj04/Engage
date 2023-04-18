import React, { useEffect, useState } from 'react'
import DayCard from '../../components/customCalendar/DayCard'
import getDatesBetween from '../../components/customCalendar/DatesBetweenDays'
import { light } from "../../components/colors/Color";
import { InitialActions, ColorToggler } from '../../components/initalActions';
import Title from '../../components/title';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import { english, french, arabic } from "../../components/Languages/Languages"
import Link from 'next/link';
import Headloader from '../../components/loaders/headloader';
let colorToggle;
var language;
var currentLogged;
var currentProperty;

function Index() {
    const [month, setMonth] = useState([])
    const [initialMonth, setInitialMonth] = useState(1);
    const [initialYear, setInitialYear] = useState(2023);
    const [large, setLarge] = useState({ l: 0, index: 0 });
    const [enlarged, setEnlarged] = useState({});

    const [mode, setMode] = useState()
    const [property_name, setProperty_name] = useState('')
    const [color, setColor] = useState({})
    const [visible, setVisible] = useState(0)

    useEffect(() => {
        console.log(initialMonth);
        findingMonth(initialMonth, initialYear);
    }, [initialMonth])

    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        currentProperty = resp?.currentProperty
        setProperty_name(resp?.currentProperty?.property_name);
        colorToggle = resp?.colorToggle
        setVisible(1);

    }, [])

    let rooms_price = [
        {
            room_name: 'Standard Size',
            price: 1000
        },
        {
            room_name: 'King Size',
            price: 1400
        },
        {
            room_name: 'Queen Size',
            price: 1800
        },
    ]
    let day = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"]
    let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"]
    useEffect(() => {
        findingMonth();
    }, [])
    function findingMonth(mo, ye) {
        let m = mo ? mo : '01';
        let y = ye ? ye : '2023';
        const dates = getDatesBetween(new Date(y, m - 1, 1), new Date(y, m, 0));
        const month = dates.map(date => ({
            "day": day[date.getDay()],
            "date": date.getDate(),
            "month": months[date.getMonth()]
        }));
        setMonth(month);
    }

    return (<>
        <Title name={`Engage | Room Prices`} />
        <Header color={color} setColor={setColor} Primary={english?.Side} Type={currentLogged?.user_type} Sec={ColorToggler} mode={mode} setMode={setMode} />
        <Sidebar color={color} Primary={english?.Side} Type={currentLogged?.user_type} />

        <div id="main-content" className={`${color?.greybackground} px-4 pt-24 relative overflow-y-auto lg:ml-64`}>
            <div className={large.l === 0 ? 'block ' : 'hidden'}>
                <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                            <div
                                className={`${color?.text} text-base font-medium  inline-flex items-center`}
                            >
                                <svg
                                    className="w-5 h-5 mr-2.5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                </svg>
                                <Link
                                    href={
                                        currentLogged?.id.match(/admin.[0-9]*/)
                                            ? "../admin/AdminLanding"
                                            : "./landing"
                                    }
                                    className={`${color?.text} text-base font-medium  inline-flex items-center`}
                                >
                                    <a>{language?.home}</a>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <div
                                    className={`${color?.text} text-base font-medium  inline-flex items-center`}
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <div className={visible === 0 ? "block w-16" : "hidden"}>
                                        <Headloader />
                                    </div>
                                    <div className={visible === 1 ? "block" : "hidden"}>
                                        {" "}
                                        <Link
                                            href="./propertysummary"
                                            className={`text-gray-700 text-sm font-medium  hover:${color?.text} ml-1 md:ml-2`}
                                        >
                                            <a className='capitalize'>{property_name}</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <div
                                    className={`${color?.textgray} text-base font-medium  inline-flex items-center`}
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span
                                        className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  "
                                        aria-current="page"
                                    >
                                        Room Prices
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ol>
                </nav>

                <h3 className={`${color?.text} text-3xl flex justify-center leading-none pl-6 lg:pt-2 pt-6 mb-2 font-bold`}>
                    {months[initialMonth - 1]}-{initialYear}
                </h3>
                <div className={`${color?.whitebackground} shadow rounded-lg p-2 `}>
                    <div className={`h-auto w-full grid grid-cols-2 lg:grid-cols-7 md:grid-cols-4 p-2`}>
                        {month.map((i, index) =>
                            <div key={index} onClick={() => { setLarge({ ...large, index: index, l: 1 }); setEnlarged(i) }}>
                                <DayCard day={`${i?.day?.toUpperCase()},${i?.date} ${i?.month}`} rooms_price={rooms_price} color={color} />
                            </div>
                        )}
                    </div>
                    <div className='flex justify-end gap-2'>
                        <button
                            className='bg-cyan-600 hover:bg-cyan-800 h-8 w-24 text-white border border-none rounded-md'
                            onClick={() => { setInitialYear(initialMonth <= 1?initialYear-1:initialYear);setInitialMonth(initialMonth <= 1 ? 12 : initialMonth - 1); }}>Prev Month</button>
                        <button
                            className='bg-cyan-600 hover:bg-cyan-800 h-8 w-24 text-white border border-none rounded-md'
                            onClick={() => {setInitialYear(initialMonth >= 12?initialYear+1:initialYear); setInitialMonth(initialMonth >= 12 ? 1 : initialMonth + 1); }}>Next Month</button>

                    </div>
                </div>
            </div>
        </div>


        <div className={large.l === 1 ? "block" : "hidden"}>
            <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                    <div className={`${color?.whitebackground} rounded-lg shadow relative`}>
                        <div className="flex items-start justify-between p-5 border-b rounded-t">

                            <div className='flex flex-col flex-wrap h-max w-max p-4 m-2'>
                            <div className='flex'>
                                <h3 className={`${color?.text} text-xl lg:pt-2 pt-6 mb-2 font-bold`}>
                                    Edit Rate
                                </h3>
                               <span className='ml-auto items-center flex justify-end'>
                               <button
                                    type="button"
                                    onClick={() => {
                                        setLarge({ ...large, l: 0 });
                                    }}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5  inline-flex "
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                               </span>
                               </div>
                               <div className='-mx-10 lg:mx-0 md:mx-0'>
                               <DayCard day={`${enlarged?.day?.toUpperCase()},${enlarged?.date} ${enlarged?.month}`} rooms_price={rooms_price} color={color} edit={1}/>
                               </div>
                                
                                {/* <div className='flex justify-end'>
                                <button
                                    className='bg-cyan-600 hover:bg-cyan-800 h-8 w-24 text-white border border-none rounded-md '
                                    onClick={() => { alert("no functionality added") }}>Book Now</button>
                                </div> */}
                                
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