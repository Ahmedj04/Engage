import axios from 'axios'
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import english from "../../components/Languages/en";
import french from "../../components/Languages/fr"
import arabic from "../../components/Languages/ar"
import { useRouter } from "next/router"
import Headloader from "../../components/loaders/headloader";
import LineLoader from '../../components/loaders/lineloader';
import Button from '../../components/Button';
import Title from '../../components/title';
import colorFile from '../../components/color';
import Multiselect from 'multiselect-react-dropdown';
import GlobalData from '../../components/GlobalData'
let colorToggle;
let language;
let currentProperty;
let currentLogged;
// main function
const Place = () => {
    // states to store data 
    const [visible, setVisible] = useState(0)
    const [attraction, setAttraction] = useState({})
    const [disp, setDisp] = useState(0)
    const [place, setPlace] = useState({})
    const [seasons, setSeasons] = useState([])
    const [languages, setLanguages] = useState([])
    const [categories, setCategories] = useState([])
    const [extraInfo, setExtraInfo] = useState([])
    const [color, setColor] = useState({})
    const [error, setError] = useState({})
    const [mode, setMode] = useState()
    const router = useRouter();
    const [editRow, setEditRow] = useState({
        edit: 0,
        id: undefined
    })
    const [editSeason, setEditSeason] = useState({})


    // to execute as soon as page loads

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
            fetchPlace()
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
        router.push('../places/place')
    }

    //    function to fetch data
    const fetchPlace = async () => {
        axios.get('/api/places/srinagar').then((response) => {
            setPlace(response?.data);
            setExtraInfo(response?.data?.additional_information)
            setCategories(response?.data?.place_category)
            //setLanguages(response?.data?.place_languages)
            setLanguages((response?.data?.place_languages?.map(lang => GlobalData.LanguageData.filter(i => i.language_code === lang.language))).flat())
            setSeasons(response?.data?.place_seasons)

            setVisible(1);
        }).catch((err) => { alert(JSON.stringify(err)) })

        console.log("Place Data fetched");
    }

    //table search function
    function searchFunction() {
        // Declare variables
        let input, filter, table, tr, td, i, txtValue;
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

    //changing multiselected data
    const languageViews = (viewData) => {
        console.log("multiselect data changed")
        // setFinalView([]);
        // var final_view_data = []
        // viewData.map(item => {
        //   var temp = {
        //     view: item?.view
        //   }
        //   final_view_data.push(temp)
        // });
        // setFinalView(final_view_data);
        // setRoomView(1)
    }

    //catgory
    const category = [{ category_name: 'Adventure' },
    { category_name: 'Theatre, Music and Culture' },
    { category_name: 'Lottery Booth' },
    { category_name: 'Mountain or Hill' },
    { category_name: 'biking' },
    { category_name: 'horse ride' },
    { category_name: 'skiing' },
    { category_name: 'camping' },
    { category_name: 'honey-moon' }]
    const selectedCategory = [{ category_name: 'Adventure' }]
    return (
        <div>
            <Title name={`Engage |  ${language?.places}`} />
            <Header color={color} Primary={english.PlaceSide} Type={currentLogged?.user_type} Sec={colorToggler} mode={mode} setMode={setMode} />
            <Sidebar color={color} Primary={english.PlaceSide} Type={currentLogged?.user_type} />

            <div className={`${color?.greybackground} px-4 pt-24 pb-2 h-screen relative overflow-y-auto  lg:ml-64`}>
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
                                    <div className={visible === 1 ? 'block' : 'hidden'}>   <Link href="../places" className="text-gray-700 text-sm   font-medium hover:{`${color?.text} ml-1 md:ml-2">
                                        <a>Places</a>
                                    </Link>
                                    </div></div>

                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <div className={`${color?.textgray} text-base font-medium  inline-flex items-center`}>
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">Place</span>
                                </div>
                            </div>
                        </li>
                    </ol>
                </nav>
                <h6 className={`${color?.text} capitalize text-xl flex leading-none pl-6 lg:pt-2 pt-6 mb-2 font-bold`}>
                    {place?.name}
                </h6>


                {/* place definition */}
                <div id='0' className={disp === 0 ? 'block' : 'hidden'}>
                    {/* main display div */}
                    <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
                        {/* progress bar */}
                        <div className="relative before:hidden  before:lg:block before:absolute before:w-[64%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">
                            <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary">1</button>
                                <div className={`${color.crossbg} lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto`}>Place</div>
                            </div>


                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">2</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Gallery</div>
                            </div>

                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">3</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Attractions</div>
                            </div>


                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">4</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Attraction</div>
                            </div>
                        </div>
                        {/* progress end*/}
                        <div className=" md:px-4 mx-auto w-full">
                            <div className={`flex ${color?.whitebackground} flex-wrap`}>
                                {/* place name */}

                                <div className="w-full lg:w-6/12  px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Place Name
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <input
                                                type="text" data-testid="test_property_name"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={place?.name} required
                                                onChange={
                                                    (e) => (
                                                        {}
                                                    )
                                                } />
                                            {/* <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                                                                 {error?.property_name}
                                                                        </p> */}
                                        </div>
                                    </div>
                                </div>


                                {/* place description*/}

                                <div className="w-full lg:w-6/12  px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Place Description
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <textarea data-testid="test_property_name"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={place?.description} required
                                                onChange={
                                                    (e) => (
                                                        {}
                                                    )
                                                } />
                                            {/* <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                        {error?.property_name}
                        </p> */}
                                        </div>
                                    </div>
                                </div>

                                {/* latitude */}
                                <div className="w-full lg:w-6/12  px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Latitude
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <input
                                                type="text" data-testid="test_property_name"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={place?.latitude} required
                                                onChange={
                                                    (e) => (
                                                        {}
                                                    )
                                                } />
                                            {/* <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                        {error?.property_name}
                        </p> */}
                                        </div>
                                    </div>
                                </div>


                                {/* longitude */}
                                <div className="w-full lg:w-6/12  px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Longitude
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <input
                                                type="text" data-testid="test_property_name"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={place?.longitude} required
                                                onChange={
                                                    (e) => (
                                                        {}
                                                    )
                                                } />
                                            {/* <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                        {error?.property_name}
                        </p> */}
                                        </div>
                                    </div>
                                </div>
                                {/* best time to visit */}
                                <div className="w-full lg:w-6/12  px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Best Time To Visit
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <input
                                                type="text" data-testid="test_property_name"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={place?.best_time_to_visit} required
                                                onChange={
                                                    (e) => (
                                                        {}
                                                    )
                                                } />
                                            {/* <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                        {error?.property_name}
                        </p> */}
                                        </div>
                                    </div>
                                </div>

                                {/* place languages */}
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Languages
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <Multiselect
                                                className={`shadow-sm ${color?.greybackground} ${color?.text} mb-3 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full
                       `}
                                                isObject={true}
                                                options={GlobalData?.LanguageData}
                                                onRemove={(event) => { languageViews(event) }}
                                                onSelect={(event) => { languageViews(event) }}
                                                selectedValues={languages}
                                                displayValue="language_name"

                                            />
                                            <p className="text-sm text-sm text-red-700 font-light">
                                                {error?.view}</p>
                                        </div>
                                    </div>
                                </div>


                                {/* Categories */}
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Categories
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <Multiselect
                                                className={`shadow-sm ${color?.greybackground} ${color?.text} mb-3 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full
                       `}
                                                isObject={true}
                                                options={category}
                                                onRemove={(event) => { languageViews(event) }}
                                                onSelect={(event) => { languageViews(event) }}
                                                selectedValues={selectedCategory}
                                                displayValue="category_name"

                                            />
                                            <p className="text-sm text-sm text-red-700 font-light">
                                                {error?.view}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* button div */}
                        <div className='flex justify-end mt-2 '>
                            <button className="bg-gradient-to-r mb-4 bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                onClick={() => setDisp(5)}>Next </button>
                        </div>

                    </div>
                    {/* main display div ends */}
                </div>

                {/* climate definition */}
                <div id='5' className={disp === 5 ? 'block' : 'hidden'}>
                    {/* progress bar */}

                    <div className={`${color?.whitebackground} shadow rounded-lg px-12 h-auto sm:p-6 xl:p-8  2xl:col-span-2`}>
                        <div className=" relative before:hidden  before:lg:block before:absolute before:w-[64%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">
                            <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary">1</button>
                                <div className={`${color.crossbg} lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto`}>Place</div>
                            </div>


                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">2</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Gallery</div>
                            </div>

                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">3</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Attractions</div>
                            </div>


                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">4</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Attraction</div>
                            </div>
                        </div>

                        <div className="sm:flex">
                            <div className=" sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                                {/* search form */}
                                <form className="lg:pr-3" action="#" method="GET">
                                    <label htmlFor="users-search" className="sr-only">Search</label>
                                    <div className="mt-1 relative lg:w-64 xl:w-96">
                                        <input type="text" name="email" id="myInput" onKeyUp={searchFunction}
                                            className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} placeholder='Search'>
                                        </input>
                                    </div>
                                </form>
                                {/* search form end */}
                                {/* icons start */}
                                <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                                    <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                                    </span>

                                    <button onClick={() => { alert("all deleted") }} data-tooltip="Delete" aria-label="Delete" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
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
                                <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150 lg:ml-72 xl:ml-80 md:ml-64">ADD</button>

                            </div>
                        </div>
                        {/* table */}
                        <div className="flex flex-col mt-8 lg:-mr-20 sm:mr-0 w-full  relative">
                            <div className="overflow-x-auto">
                                <div className="align-middle inline-block min-w-full">
                                    <div className="shadow overflow-hidden">
                                        <table className="table data table-fixed lg:min-w-full divide-y divide-gray-200 min-w-screen" id="myTable">
                                            <thead className={` ${color?.tableheader} `}>
                                                <tr>
                                                    {/* checkbox */}
                                                    <th scope="col" className="p-4">
                                                        <div className="flex items-center">
                                                            <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox"
                                                                name="allSelect"
                                                                className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                        </div>
                                                    </th>

                                                    <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                                        Name</th>
                                                    <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                                        Months</th>
                                                    <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                                        Max</th>
                                                    <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                                        Min</th>
                                                    <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                                        Unit</th>
                                                    <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                                        Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody className={` ${color?.whitebackground} divide-y  divide-gray-200`}>
                                                {seasons.map((season, index) => {
                                                    return (<>
                                                        {(editRow?.edit === 1 && editRow.id === index) ? <tr key={index}>
                                                            <td className="p-4 w-4">
                                                                <span className="flex items-center">
                                                                    <input id="checkbox-1" name={season?.index} aria-describedby="checkbox-1" type="checkbox"
                                                                        className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                                    <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                                                </span>
                                                            </td>

                                                            <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                                                <input type="text"
                                                                    className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                                                    defaultValue={editSeason?.season_name}
                                                                    onChange={(e) => setEditSeason({ ...editSeason, season_name: e.target.value })} />
                                                            </td>

                                                            <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                                                <input type="text" className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                                                    defaultValue={editSeason?.period}
                                                                    onChange={(e) => setEditSeason({ ...editSeason, period: e.target.value })} />

                                                            </td>
                                                            <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                                                <input type="text" className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                                                    defaultValue={editSeason?.max_temp}
                                                                    onChange={(e) => setEditSeason({ ...editSeason, max_temp: e.target.value })} />

                                                            </td>
                                                            <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                                                <input type="text"
                                                                    className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                                                    defaultValue={editSeason?.min_temp}
                                                                    onChange={(e) => setEditSeason({ ...editSeason, min_temp: e.target.value })} />

                                                            </td>
                                                            <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                                                <select onChange={(e) => setEditSeason({ ...editSeason, unit: e.target.value })}
                                                                    className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                                                >
                                                                    <option value={editSeason?.unit}>{editSeason?.unit}</option>
                                                                    <option value={'F'}>F</option>

                                                                </select>
                                                            </td>
                                                            <td>
                                                                <button className={`bg-gradient-to-r mt-1 bg-green-600 hover:bg-green-700 mr-2 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}>

                                                                    Save</button>
                                                                <button className={`bg-gradient-to-r my-1 bg-gray-400 hover:${color?.greybackground}0 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}
                                                                    onClick={() => {
                                                                        setEditSeason({});
                                                                        setEditRow({ edit: 0, id: undefined })
                                                                    }}
                                                                >

                                                                    Cancel</button>
                                                            </td>
                                                        </tr> :
                                                            <tr key={index}>
                                                                <td className="p-4 w-4">
                                                                    <span className="flex items-center">
                                                                        <input id="checkbox-1" name={season?.index} aria-describedby="checkbox-1" type="checkbox"
                                                                            className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                                        <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                                                    </span>
                                                                </td>

                                                                <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>

                                                                    {season?.season_name}
                                                                </td>

                                                                <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>

                                                                    {season?.period}
                                                                </td>
                                                                <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>

                                                                    {season?.max_temp}
                                                                </td>
                                                                <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>

                                                                    {season?.min_temp}
                                                                </td>
                                                                <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>

                                                                    {season?.unit}
                                                                </td>
                                                                <td>
                                                                    <button className="bg-gradient-to-r mt-1 mr-2 bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                        onClick={() => {
                                                                            setEditSeason(season);
                                                                            setEditRow({ edit: 1, id: index })
                                                                        }}
                                                                    >

                                                                        Edit</button>
                                                                    <button className="bg-gradient-to-r my-1 bg-red-600 hover:bg-red-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                    >

                                                                        Delete</button>
                                                                </td>
                                                            </tr>}
                                                    </>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div></div></div></div>
                        {/* button div */}
                        <div className='flex justify-end mt-2 '>
                            <button className="mr-4 bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                onClick={() => setDisp(0)}>Previous </button>
                            <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                onClick={() => setDisp(6)}>Next </button>
                        </div>


                    </div>
                </div>

                {/*Extra Information */}
                <div id='6' className={disp === 6 ? 'block' : 'hidden'}>
                    {/* progress bar */}

                    <div className={`${color?.whitebackground} shadow rounded-lg px-12  sm:p-6 xl:p-8  2xl:col-span-2`}>
                        <div className="relative before:hidden  before:lg:block before:absolute before:w-[64%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">
                            <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary">1</button>
                                <div className={`${color.crossbg} lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto`}>Place</div>
                            </div>


                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">2</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Gallery</div>
                            </div>

                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">3</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Attractions</div>
                            </div>


                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">4</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Attraction</div>
                            </div>
                        </div>

                        <div className="sm:flex">
                            <div className=" sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                                {/* search form */}
                                <form className="lg:pr-3" action="#" method="GET">
                                    <label htmlFor="users-search" className="sr-only">Search</label>
                                    <div className="mt-1 relative lg:w-64 xl:w-96">
                                        <input type="text" name="email" id="myInput" onKeyUp={searchFunction}
                                            className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} placeholder='Search'>
                                        </input>
                                    </div>
                                </form>
                                {/* search form end */}
                                {/* icons start */}
                                <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                                    <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                                    </span>

                                    <button onClick={() => { alert("all deleted") }} data-tooltip="Delete" aria-label="Delete" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
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
                                <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150 lg:ml-72 xl:ml-80 md:ml-64">ADD</button>

                            </div>
                        </div>
                        {/* table */}
                        <div className="flex flex-col mt-8 lg:-mr-20 sm:mr-0 w-full  relative">
                            <div className="overflow-x-auto">
                                <div className="align-middle inline-block min-w-full">
                                    <div className="shadow overflow-hidden">
                                        <table className="table data table-fixed lg:min-w-full divide-y divide-gray-200 min-w-screen" id="myTable">
                                            <thead className={` ${color?.tableheader} `}>
                                                <tr>
                                                    {/* checkbox */}
                                                    <th scope="col" className="p-4">
                                                        <div className="flex items-center">
                                                            <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox"
                                                                name="allSelect"
                                                                className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                        </div>
                                                    </th>

                                                    <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                                        Name</th>
                                                    <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                                        Description</th>
                                                    <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                                        Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody className={` ${color?.whitebackground} divide-y  divide-gray-200`}>
                                                {extraInfo.map((row, index) => {
                                                    return (
                                                        <>
                                                            {(editRow?.edit === 1 && editRow.id === index) ? <tr key={index}>
                                                                <td className="p-4 w-4">
                                                                    <span className="flex items-center">
                                                                        <input id="checkbox-1" name={index} aria-describedby="checkbox-1" type="checkbox"
                                                                            className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-full rounded" />
                                                                        <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                                                    </span>
                                                                </td>

                                                                <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                                                    <input type="text"
                                                                        className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                                        defaultValue={editSeason?.key}
                                                                        onChange={(e) => setEditSeason({ ...editSeason, season_name: e.target.value })} />
                                                                </td>

                                                                <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                                                    <input type="text" className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                                        defaultValue={editSeason?.value}
                                                                        onChange={(e) => setEditSeason({ ...editSeason, period: e.target.value })} />

                                                                </td>
                                                               
                                                                
                                                                <td>
                                                                    <button className={`bg-gradient-to-r mt-1 bg-green-600 hover:bg-green-700 mr-2 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}>

                                                                        Save</button>
                                                                    <button className={`bg-gradient-to-r my-1 bg-gray-400 hover:${color?.greybackground}0 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}
                                                                        onClick={() => {
                                                                            setEditSeason({});
                                                                            setEditRow({ edit: 0, id: undefined })
                                                                        }}
                                                                    >

                                                                        Cancel</button>
                                                                </td>
                                                            </tr> :
                                                                <tr key={index}>
                                                                    <td className="p-4 w-4">
                                                                        <span className="flex items-center">
                                                                            <input id="checkbox-1" name={index} aria-describedby="checkbox-1" type="checkbox"
                                                                                className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                                            <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                                                        </span>
                                                                    </td>

                                                                    <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>

                                                                        {row?.key}
                                                                    </td>

                                                                    <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>

                                                                        {row?.value}
                                                                    </td>
                                                                   
                                                                    <td>
                                                                        <button className="bg-gradient-to-r mt-1 mr-2 bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                            onClick={() => {
                                                                                setEditSeason(row);
                                                                                setEditRow({ edit: 1, id: index })
                                                                            }}
                                                                        >

                                                                            Edit</button>
                                                                        <button className="bg-gradient-to-r my-1 bg-red-600 hover:bg-red-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                        >

                                                                            Delete</button>
                                                                    </td>
                                                                </tr>}
                                                        </>
                                                       
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div></div></div></div>











                        {/* button div */}
                        <div className='flex justify-end mt-2 '>
                            <button className="mr-4 bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                onClick={() => setDisp(5)}>Previous </button>
                            <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                onClick={() => setDisp(1)}>Next </button>
                        </div>


                    </div>
                </div>

                {/* gallery */}

                <div id='1' className={disp === 1 ? 'block' : 'hidden'}>
                    {/* progress bar */}
                    <div key={0} className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
                        <div className="relative before:hidden  before:lg:block before:absolute before:w-[64%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">

                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">1</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Place</div>
                            </div>

                            <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary">2</button>
                                <div className={`${color.crossbg} lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto`}>Gallery</div>
                            </div>


                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">3</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Attractions</div>
                            </div>


                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">4</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Attraction</div>
                            </div>

                        </div>

                        <div className=" md:px-4 mx-auto w-full">
                            <div className={`flex shadow border p-4 m-4   ${color?.whitebackground} flex-wrap`}>
                                <div className="w-full lg:w-6/12  px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-lg font-bold ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Image Gallery
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>

                                    </div>
                                </div>


                                {/* images */}
                                <div className='flex'>
                                    {place?.images?.map((item, idx) => {
                                        return (<div key={idx} className=' p-2'>
                                            <img src={item?.image_link} alt={item?.description} />
                                        </div>)
                                    })}
                                </div>

                            </div>
                        </div>
                        <div className='flex justify-end mt-2 '>
                            <button className="mr-4 bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                onClick={() => setDisp(6)}>Previous </button>
                            <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                onClick={() => setDisp(2)}>Next </button>
                        </div>

                    </div>
                </div>


                {/* list of attraction */}
                <div id='2' className={disp === 2 ? 'block' : 'hidden'}>
                    <div className="relative before:hidden  before:lg:block before:absolute before:w-[64%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">



                        <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                            <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">1</button>
                            <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Places</div>
                        </div>
                        <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                            <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">2</button>
                            <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Gallery</div>
                        </div>

                        <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                            <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary">3</button>
                            <div className={`${color.crossbg} lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto`}>Attractions</div>
                        </div>


                        <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                            <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">4</button>
                            <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Attraction</div>
                        </div>
                    </div>

                    <div>
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
                                                    <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Attraction Name</th>
                                                    <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className={`${color?.whitebackground} divide-y  divide-gray-200`} id="TableList">
                                                {place?.attractions?.map((item, idx) => {
                                                    return (
                                                        <tr key={idx}>
                                                            <td className="p-4 w-4">
                                                                <span className="flex items-center">
                                                                    <input id="checkbox-1" name="r0091" aria-describedby="checkbox-1" type="checkbox"
                                                                        className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                                    <label htmlFor="checkbox-1" className="sr-only" />
                                                                </span>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap capitalize text-base font-normal text-gray-700">{item?.attraction_name}</td>

                                                            <td className="py-4 whitespace-nowrap capitalize">
                                                                <div> <Link href="../places/place">
                                                                    <a> <button
                                                                        onClick={() => { setAttraction(item); setDisp(3); }}
                                                                        className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                    >Edit </button>
                                                                    </a>
                                                                </Link>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}





                                            </tbody>
                                        </table>

                                        <div className='flex items-center justify-end space-x-2  sm:space-x-3 ml-auto'>
                                            <button className="bg-gradient-to-r mt-2 bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                onClick={() => setDisp(1)}>Previous </button>
                                            {/* <Button Primary={} onClick={() => { }} /> */}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                {/* attraction   */}
                <div id='3' className={disp === 3 ? 'block' : 'hidden'}>

                    {/* progress bar */}
                    <div key={0} className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
                        <div className="relative before:hidden  before:lg:block before:absolute before:w-[64%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">
                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">1</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Place</div>
                            </div>
                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">2</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Gallery</div>
                            </div>

                            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">3</button>
                                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Attractions</div>
                            </div>


                            <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                                <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary">4</button>
                                <div className={`${color.crossbg} lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto`}>Attraction</div>
                            </div>
                        </div>


                        <div className={`${color?.whitebackground}  mt-4 p-4 shadow divide-gray-200`} >
                            <div className='flex flex-wrap'>
                                <div className=" w-full lg:w-6/12  px-4">
                                    {/* attraction name  */}
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Attraction Name
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <input
                                                type="text" data-testid="test_property_name"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={attraction?.attraction_name} required
                                                onChange={
                                                    (e) => (
                                                        {}
                                                    )
                                                } />
                                            {/* <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                                             {error?.property_name}
                                                        </p> */}
                                        </div>
                                    </div>
                                </div>

                                <div className=" w-full lg:w-6/12  px-4">
                                    {/* attraction description */}
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Attraction Description
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <textarea data-testid="test_property_name"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={attraction?.attraction_description} required
                                                onChange={
                                                    (e) => (
                                                        {}
                                                    )
                                                } />
                                            {/* <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                                             {error?.property_name}
                                                        </p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Milestone */}
                        <div className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mt-8 mb-3">
                                <label
                                    className={`text-sm font-bold  ${color?.text} block mb-2`}
                                    htmlFor="grid-password">
                                    MileStones
                                    <span style={{ color: "#ff0000" }}>*</span>
                                </label>
                            </div>
                        </div>

                        {attraction?.milestones?.map((milestone, idx) => {
                            return (<div key={idx} className="flex flex-wrap">
                                {/* milestone name */}
                                <div className=" w-full lg:w-6/12  px-4">
                                    {/* attraction name  */}
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            MileStone Name
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <input
                                                type="text" data-testid="test_property_name"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={milestone?.milestone_name} required
                                                onChange={
                                                    (e) => (
                                                        {}
                                                    )
                                                } />
                                            {/* <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                                             {error?.property_name}
                                                        </p> */}
                                        </div>
                                    </div>
                                </div>
                                {/* milestone description */}
                                <div className=" w-full lg:w-6/12  px-4">
                                    {/* attraction name  */}
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            MileStone Description
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <textarea data-testid="test_property_name"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={milestone?.milestone_description} required
                                                onChange={
                                                    (e) => (
                                                        {}
                                                    )
                                                } />
                                            {/* <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                                             {error?.property_name}
                                                        </p> */}
                                        </div>
                                    </div>
                                </div>

                            </div>)
                        })}

                        <div className='flex items-center justify-end space-x-2  sm:space-x-3 ml-auto'>
                            <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                onClick={() => setDisp(2)}>Previous </button>
                            {/* <Button Primary={} onClick={() => { }} /> */}
                        </div>

                    </div>

                </div>


                
            </div>

            <Footer color={color} Primary={english.PlaceSide} />
        </div>







    )
}

export default Place