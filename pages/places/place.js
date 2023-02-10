import axios from 'axios'
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import language from "../../components/Languages/en";
import { useRouter } from "next/router"
import Headloader from "../../components/loaders/headloader";
import LineLoader from '../../components/loaders/lineloader';
// main function
const Place = () => {
    // states to store data 
    const [basicDetails, setBasicDetails] = useState({ "propert_name": "client", "property_id": "t2k0032" });
    const [visible, setVisible] = useState(1)
    const [place, setPlace] = useState({})
    const [color, setColor] = useState({ "text": "black" })
    const currentLogged = { "id": "user001" }
    // to execute as soon as page loads
    useEffect(() => {
        fetchPlace()
    }, [])
    //    function to fetch data
    const fetchPlace = async () => {
        axios.get('/api/places/srinagar').then((response) => {
            setPlace(response?.data);
        }).catch((err) => { alert(JSON.stringify(err)) })

        console.log("Place Data fetched");
    }

    return (
        <div>
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
                                        <a>{basicDetails?.property_name}</a>
                                    </Link>
                                    </div></div>

                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <div className={`${color?.textgray} text-base font-medium  inline-flex items-center`}>
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">{language?.basicdetails}</span>
                                </div>
                            </div>
                        </li>
                    </ol>
                </nav>
                <h6 className={`${color?.text} capitalize text-xl flex leading-none pl-6 lg:pt-2 pt-6  font-bold`}>
                    {place?.name}
                </h6>
                <div className=" md:px-4 mx-auto w-full">
              <div className="flex flex-wrap">
                {/* place name */}
                <div className="flex flex-col mt-8 lg:mr-0 sm:mr-0 ">
                    <div className="overflow-x-auto">
                        <div className="align-middle inline-block min-w-full">
                            <div className="shadow overflow-hidden">
                                
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

                            </div>
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

                {/* Avg Summer Temp */}
                            <div className="w-full lg:w-6/12  px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Average Summer Temperature
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <input
                                                type="text" data-testid="test_property_name"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={place?.avg_summer_temp} required
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

                {/* avg winter temp */}
                             <div className="w-full lg:w-6/12  px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Average Winter Temperature
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <input
                                                type="text" data-testid="test_property_name"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={place?.avg_winter_temp} required
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

                   
                {/* Images label */}
                        <div className="w-full lg:w-6/12  px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Image Gallery
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>

                                    </div>
                                </div>


                {/* images */}
                <div className='flex'>
                    {place?.images?.map((item, idx) => {
                        return (<div key={idx} className='border'>
 <img src={item?.image_link} alt={item?.description} height='250' width='170' />
                        </div>)
                    })}
                </div>

    </div></div>

    
                {/* attractions */}
                <div className="w-full lg:w-6/12  px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-bold  ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Attractions
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>

                                    </div>
                                </div>

                       

                {place?.attractions?.map((item, idx) => {
                    return (
                        <div key={idx} className='border border-4 border-black mt-4'>
                            {/* attraction name  */}
                                         <div className="w-full lg:w-6/12  px-4">
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
                                                            defaultValue={item?.attraction_name} required
                                                            onChange={
                                                                (e) => (
                                                                    {}
                                                                )
                                                            } />
                                                        {/* <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                    {error?.property_name}
                    </p> */}
                                                   
                                            {/* attraction details */}
                                            <div className="w-full lg:w-6/12  px-4">
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className={`text-sm font-medium ${color?.text} block mb-2`}
                                                        htmlFor="grid-password">
                                                        Attraction Details
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </label>
                                                    <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                                    <div className={visible === 1 ? 'block' : 'hidden'}>
                                                        <textarea
                                                            data-testid="test_property_name"
                                                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                            defaultValue={item?.attraction_description} required
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

                                            {/* Milestone */}
                                             <div className="w-full lg:w-6/12  px-4">
                                                                <div className="relative w-full mb-3">
                                                                    <label
                                                                        className={`text-sm font-bold  ${color?.text} block mb-2`}
                                                                        htmlFor="grid-password">
                                                                        MileStones
                                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                                    </label>

                                                                </div>
                                                            </div>

                                                      

                                            {item?.milestones?.map((milestone, idx) => {
                                                return (<div key={idx}>
                                                    {/* milestone name */}
                                                    <div className="w-full lg:w-6/12  px-4">
                                                        <div className="relative w-full mb-3">
                                                            <label
                                                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                                                htmlFor="grid-password">
                                                                Mile Stone Name
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </label>
                                                            <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                                            <div className={visible === 1 ? 'block' : 'hidden'}>
                                                                <input type='text'
                                                                    data-testid="test_property_name"
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
                                                    <div className="w-full lg:w-6/12  px-4">
                                                        <div className="relative w-full mb-3">
                                                            <label
                                                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                                                htmlFor="grid-password">
                                                                Mile Stone Description
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </label>
                                                            <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                                            <div className={visible === 1 ? 'block' : 'hidden'}>
                                                                <textarea
                                                                    data-testid="test_property_name"
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

                                        </div>
                                    
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Place