import axios from 'axios'
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
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
    const [info, setInfo] = useState({})
    const [color, setColor] = useState({})
    const [error, setError] = useState({})
    const [mode, setMode] = useState()
    const router = useRouter();


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
            setInfo(response?.data?.additional_information)
            setCategories(response?.data?.place_category)
            setLanguages(response?.data?.place_languages)
            setSeasons(response?.data?.place_seasons)
            setVisible(1);
        }).catch((err) => { alert(JSON.stringify(err)) })

        console.log("Place Data fetched");
    }



    return (
        <div>
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
                <h6 className={`${color?.text} capitalize text-xl flex leading-none pl-6 lg:pt-2 pt-6 mb-8 font-bold`}>
                    {place?.name}
                </h6>


                {/* place definition */}
                <div id='0' className={disp === 0 ? 'block' : 'hidden'}>
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

                        <div className=" md:px-4 mx-auto w-full">
                            <div className={`flex shadow border p-4 m-4 ${color?.whitebackground} flex-wrap`}>
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


                                <label className={`w-full lg:w-12/12 mt-3 mb-3 px-4 text-sm font-bold ${color?.text} block mb-2`} htmlFor="grid-password">
                                    Climate

                                </label>

                                {seasons?.map((season, index) => {
                                    return (<div key={index} className="flex mt-4 flex-wrap">

                                        {/* season name  */}
                                        <div className="w-full lg:w-6/12  px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className={`text-sm font-medium ${color?.text} block mb-2`}
                                                    htmlFor="grid-password">
                                                    Season Name
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </label>
                                                <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                                <div className={visible === 1 ? 'block' : 'hidden'}>
                                                    <input
                                                        type="text" data-testid="test_property_name"
                                                        className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                        defaultValue={season?.season_name} required
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

                                        {/* season period  */}
                                        <div className="w-full lg:w-6/12  px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className={`text-sm font-medium ${color?.text} block mb-2`}
                                                    htmlFor="grid-password">
                                                    Season Period
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </label>
                                                <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                                <div className={visible === 1 ? 'block' : 'hidden'}>
                                                    <input
                                                        type="text" data-testid="test_property_name"
                                                        className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                        defaultValue={season?.period} required
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
                                        {/* mim temp */}

                                        <div className="w-full lg:w-6/12  px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className={`text-sm font-medium ${color?.text} block mb-2`}
                                                    htmlFor="grid-password">
                                                    Min Temperature
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </label>
                                                <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                                <div className={visible === 1 ? 'block' : 'hidden'}>
                                                    <input
                                                        type="text" data-testid="test_property_name"
                                                        className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                        defaultValue={season?.min_temp} required
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
                                        {/* min temp */}

                                        <div className="w-full lg:w-6/12  px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className={`text-sm font-medium ${color?.text} block mb-2`}
                                                    htmlFor="grid-password">
                                                    Max Temperature
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </label>
                                                <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                                <div className={visible === 1 ? 'block' : 'hidden'}>
                                                    <input
                                                        type="text" data-testid="test_property_name"
                                                        className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                        defaultValue={season?.max_temp} required
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
                                        {/* unit */}

                                        <div className="w-full lg:w-6/12  px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className={`text-sm font-medium ${color?.text} block mb-2`}
                                                    htmlFor="grid-password">
                                                    Temperature Unit
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </label>
                                                <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                                <div className={visible === 1 ? 'block' : 'hidden'}>
                                                    <input
                                                        type="text" data-testid="test_property_name"
                                                        className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                        defaultValue={season?.unit} required
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

                                <label className={`w-full lg:w-12/12 mt-3 mb-3 px-4 text-sm font-bold ${color?.text} block mb-2`} htmlFor="grid-password">
                                    Languages
                                </label>
                                {languages.map((language, index) => {
                                    return (
                                        <div key={index} className='flex mt-4 flex-wrap'>
                                            {/*Languages*/}
                                            <div className="w-full lg:w-full  px-4">
                                                <div className="relative w-full mb-3">
                                                    <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                                    <div className={visible === 1 ? 'block' : 'hidden'}>
                                                        <input
                                                            type="text" data-testid="test_property_name"
                                                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                            defaultValue={language?.language} required
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
                                    )
                                })}

                                <label className={`w-full lg:w-12/12 mt-3 mb-3 px-4 text-sm font-bold ${color?.text} block mb-2`} htmlFor="grid-password">
                                    Category
                                </label>

                                {categories?.map((category, index) => {
                                    return (
                                        <div key={index} className='flex mt-4 flex-wrap'>
                                            {/*Languages*/}
                                            <div className="w-full lg:w-full  px-4">
                                                <div className="relative w-full mb-3">
                                                    <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                                    <div className={visible === 1 ? 'block' : 'hidden'}>
                                                        <input
                                                            type="text" data-testid="test_property_name"
                                                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                            defaultValue={category?.cat_name} required
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
                                    )
                                })}

                                <label className={`w-full lg:w-12/12 mt-3 mb-3 px-4 text-sm font-bold ${color?.text} block mb-2`} htmlFor="grid-password">
                                    Additional Information
                                </label>

                                
                                {info?.map((info, index) => {
                                    return (
                                        <div key={index} className='flex mt-4 flex-wrap'>
                                            {/*Additional info*/}
                                            <div className="w-full lg:w-6/12  px-4">
                                                <div className="relative w-full mb-3">
                                                    <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                                    <div className={visible === 1 ? 'block' : 'hidden'}>
                                                        <input
                                                            type="text" data-testid="test_property_name"
                                                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                            defaultValue={info?.key} required
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
                                            {/*Additional info*/}
                                            <div className="w-full lg:w-6/12  px-4">
                                                <div className="relative w-full mb-3">
                                                    <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                                    <div className={visible === 1 ? 'block' : 'hidden'}>
                                                    <input
                                                            type="text" data-testid="test_property_name"
                                                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                            defaultValue={info?.value} required
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
                                    )
                                })}


                             
                            </div>
                        </div>
                        {/* button div */}
                        <div className='flex justify-end mt-2 '>
                            <button className="bg-gradient-to-r mb-4 bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
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
                                onClick={() => setDisp(0)}>Previous </button>
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


            </div>




        </div>


    )
}

export default Place