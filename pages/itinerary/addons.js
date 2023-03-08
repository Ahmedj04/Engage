import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Title from '../../components/title';
import Footer from '../../components/Footer';
import { InitialActions,ColorToggler } from '../../components/initalActions';
import { english, french, arabic } from '../../components/Languages/Languages';
import Link from "next/link";
import Headloader from '../../components/loaders/headloader';
import Textboxloader from '../../components/loaders/textboxloader';
import { ToastContainer, toast } from "react-toastify";

let language, currentLogged, currentProperty, colorToggle, property_name;
function Addons() {
    const [mode, setMode] = useState();
    const [color, setColor] = useState({});
    const [visible, setVisible] = useState(1);
    const [property_name,setProperty_name]=useState('')

    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        currentProperty = resp?.currentProperty
        setProperty_name(resp?.currentProperty?.property_name);
        colorToggle = resp?.colorToggle

    }, [])
    return (
        <>

            <Title name={`Engage |  ${language?.addons}`} />
            {/* name={`Engage |  ${language?.addons}`} /> */}
            <Header 
            color={color} 
            setColor={setColor}
            Primary={english.Side}
            Type={currentLogged?.user_type}
            Sec={ColorToggler} 
            mode={mode}
            setMode={setMode} />

            <Sidebar
            color={color} 
            Primary={english.Side}
            Type={currentLogged?.user_type} />

            <div id="main-content"
                className={`${color?.greybackground} px-4 pt-24 pb-2 relative overflow-y-auto h-screen lg:ml-64`}>
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
                                        <a className='capitalize'>{property_name}</a>
                                    </Link>
                                    </div></div>

                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <div className={`${color?.textgray} text-base font-medium  inline-flex items-center`}>
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">{language?.addons}</span>
                                </div>
                            </div>
                        </li>
                    </ol>
                </nav>



                {/* Toast Container */}
                <ToastContainer position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />


            </div>
            <Footer color={color} Primary={english.Foot} />
        </>
    )
}

export default Addons