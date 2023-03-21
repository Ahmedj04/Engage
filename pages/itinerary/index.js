import React, { useEffect, useState } from 'react';
import LoaderDarkTable from '../../components/loaders/darktableloader';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import colorFile from "../../components/colors/Color";
import axios from "axios";
import Link from "next/link";
import Table from '../../components/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import english from "../../components/Languages/en"
import french from "../../components/Languages/fr"
import arabic from "../../components/Languages/ar";
import LoaderTable from "../../components/loadertable";
import { useRouter } from "next/router"
import Headloader from "../../components/loaders/headloader";
import LineLoader from '../../components/loaders/lineloader';
import Footer from '../../components/Footer';
var language;
var currentProperty;
var currentLogged;
let colorToggle;
import Router from "next/router";
import Button from '../../components/Button';
import WidgetStatus from '../../components/widgetStatus';
import PackageItenarary from '../../components/devlopmentjson/PackageItenarary.json';

function Index() {
  const router = useRouter();
  const [visible, setVisible] = useState(1);
  const [spinner, setSpinner] = useState(0)
  const [basicDetails, setBasicDetails] = useState([]);
  const [flag, setFlag] = useState([]);
  const [color, setColor] = useState({})
  const [error, setError] = useState({})
  const [mode, setMode] = useState()
  const [disp, setDisp] = useState(0)
  const [imageLogo, setImageLogo] = useState()
  const [uploadImageSpin, setUploadImageSpin] = useState(false)

  const [visibleDay, setVisibleDay] = useState({})
  const [attraction, setAttraction] = useState([])
  const [activeMilestone, setActiveMilestone] = useState({})
  const [attractionInfo, setAttractionInfo] = useState([])
  const [actionDay, setActionDay] = useState(0)

  const [itenary, setItenary] = useState(PackageItenarary[0])

  const [addons, setAddons] = useState([
    {
      "addon_id": "addon001",
      "name": "First aid kit",
      "provider": "service provider",
      "description": "The first kit will be available on board",
      "price": "",
      "serves": "5",
      "quantity": "2"
    },
    {
      "addon_id": "addon002",
      "name": "Refreshment on the way to gulmarg",
      "provider": "Restaurant NH-1, Shalteng",
      "description": "The guest will be served with the refreshment i.e. chai pakauda and snacks",
      "price": "150",
      "serves": "1",
      "quantity": "20"
    },
    {
      "addon_id": "addon003",
      "name": "Gandola",
      "provider": "gulmarg gondola corp",
      "description": "The guest will get the gondola tickets once they reach at boarding point",
      "price": "1500",
      "serves": "1",
      "quantity": "20"
    },
    {
      "addon_id": "addon004",
      "name": "Skiing Gears",
      "provider": "Gulmarg Slopes",
      "description": "The guest will get the Skiing gears from the vendor",
      "price": "1500",
      "serves": "1",
      "quantity": "20"
    },
    {
      "addon_id": "addon005",
      "name": "Skiing Instructor",
      "provider": "Gulmarg Slopes",
      "description": "The guest will be able to learn from experienced instructor",
      "price": "1500",
      "serves": "1",
      "quantity": "20"
    },
    {
      "addon_id": "addon006",
      "name": "Dinner",
      "provider": "Hotel",
      "description": "The guest will be able to have veg as well as non veg food at hotel as per their choice",
      "price": "1500",
      "serves": "1",
      "quantity": "20"
    },
    {
      "addon_id": "addon007",
      "name": "welcome drink",
      "provider": "Hotel",
      "description": "The guest will be served with authentic kashmiri kehwa as soon as they check in",
      "price": "150",
      "serves": "1",
      "quantity": "20"
    },
    {
      "addon_id": "addon008",
      "name": "BreakFast",
      "provider": "Hotel",
      "description": "The guest will be able to have veg as well as non veg food at hotel as per their choice",
      "price": "250",
      "serves": "1",
      "quantity": "20"
    },
    {
      "addon_id": "addon0010",
      "name": "Horse ride gear",
      "provider": "Horse riding company",
      "description": "The rider will get riding gears",
      "price": "1250",
      "serves": "6",
      "quantity": "20"
    },
    {
      "addon_id": "addon0010",
      "name": "Horse ride",
      "provider": "Horse riding company",
      "description": "The rider will get ride with instructor",
      "price": "1250",
      "serves": "6",
      "quantity": "20"
    },
    {
      "addon_id": "addon0012",
      "name": "Lunch at betab valley",
      "provider": "valley view restaurants",
      "description": "The Guest will get veg as well as non veg options",
      "price": "650",
      "serves": "2",
      "quantity": "20"
    },
    {
      "addon_id": "addon0013",
      "name": "Kehwa at pampore",
      "provider": "Saffron field",
      "description": "The Guest authentic kehwa at saffron fields",
      "price": "150",
      "serves": "1",
      "quantity": "20"
    },
    {
      "addon_id": "addon0014",
      "name": "Life saving equipments",
      "provider": "Shikara walla",
      "description": "the life saving equipments will be present onboard",
      "price": "150",
      "serves": "1",
      "quantity": "20"
    },
    {
      "addon_id": "addon0017",
      "name": "Local taxi",
      "provider": "Taxi stand no 4",
      "description": "Sedan,Suv and hatchbacks available for guest",
      "price": "1500",
      "serves": "4",
      "quantity": "20"
    },
    {
      "addon_id": "addon0018",
      "name": "Photographer",
      "provider": "Photography club nishat",
      "description": "A4 size photographs will be provided to guest apart from other softcopy of photos",
      "price": "150",
      "serves": "1",
      "quantity": "20"
    }
  ])

  const [providers, setProviders] = useState([
    {
      "provider_id": "provider001",
      "provider_category": "Food",
      "Name": "M/s NH 1 Restautant",
      "Company": "NH 1 Restautant pvt ltd",
      "languageOptions": [
        "English",
        "Hindi",
        "kannad"
      ],
      "guideExperience": {
        "years": 10,
        "certifications": [
          "Certified Asian Chef",
          "Certified Muglai Chef"
        ],
        "specializations": [
          "Muglai food",
          "South Indian Food"
        ]
      },
      "groupSize": {
        "min": 2,
        "max": 20
      },
      "servicesOffered": {
        "Veg Food": true,
        "Non-Veg Food": true,
      },
      "contactInformation": {
        "email": "NH1@t2k.com",
        "phone": "101102911",
        "website": "www.NH1.t2k.com"
      },
      "reviews": [
        {
          "name": "Raman Iyer",
          "rating": 5,
          "review": "They serve authentic South indian food."
        }
      ]
    },
    {
      "provider_id": "provider002",
      "provider_category": "Transport",
      "Name": "Mr. Aziz mir",
      "Company": "Airpot taxi drivers assosciation",
      "languageOptions": [
        "English",
        "Hindi",
        "kannad"
      ],
      "guideExperience": {
        "years": 10,
        "certifications": [

        ],
        "specializations": [
          "SUV",
          "Sedan",
          "Hatchback"
        ]
      },
      "groupSize": {
        "min": 2,
        "max": 7
      },
      "servicesOffered": {
        "site seeing": true,
        "guiding": true,
      },
      "contactInformation": {
        "email": "taxi@t2k.com",
        "phone": "101102911",
        "website": "www.airport-taxi.t2k.com"
      },
      "reviews": [
        {
          "name": "Raman Iyer",
          "rating": 5,
          "review": "They serve authentic South indian food."
        }
      ]
    },
    {
      "provider_id": "provider004",
      "provider_category": "Transport",
      "Name": "M/s Cable car corporation",
      "Company": "Cabe car corporation",
      "languageOptions": [
        "English",
        "Hindi",
        "kannad",
        "French",
        "Spanish"
      ],
      "Experience": {
        "years": 30,
        "certifications": [
        ],
        "specializations": [
          "Asia's highest gondolla ",
          "Chair carriages for skiers"
        ]
      },
      "groupSize": {
        "min": 2,
        "max": 20
      },
      "servicesOffered": {
        "Chair carriage": true,
        "Closed carriage": true,
      },
      "contactInformation": {
        "email": "gulamrg gonadola@t2k.com",
        "phone": "1011029111",
        "website": "www.gg.t2k.com"
      },
      "reviews": [
        {
          "name": "Raman Iyer",
          "rating": 5,
          "review": "They serve authentic South indian food."
        }
      ]
    },
    {
      "provider_id": "provider003",
      "provider_category": "Activity",
      "Name": "M/s Gulmarg slopes",
      "Company": "M/s Gulmarg slopes",
      "languageOptions": [
        "English",
        "Hindi",
        "kannad",
        "French",
        "Spanish"
      ],
      "Experience": {
        "years": 30,
        "certifications": [
        ],
        "specializations": [

        ]
      },
      "groupSize": {
        "min": 2,
        "max": 20
      },
      "servicesOffered": {
        "Skiing gears": true,
        "Skiing instructor": true,
      },
      "contactInformation": {
        "email": "gulamrgSlopes@t2k.com",
        "phone": "1011029111",
        "website": "www.slopes.t2k.com"
      },
      "reviews": [
        {
          "name": "Raman Iyer",
          "rating": 5,
          "review": "They serve authentic South indian food."
        }
      ]
    },
    {
      "provider_id": "provider005",
      "provider_category": "Hotel",
      "Name": "Gulmarg peaks",
      "Company": "M/s Raddison pvt ltd",
      "languageOptions": [
        "English",
        "Hindi",
        "kannad",
        "French",
        "Spanish"
      ],
      "Experience": {
        "years": 30,
        "certifications": [
        ],
        "specializations": [
          "3 star king size room",

        ]
      },
      "groupSize": {
        "min": 2,
        "max": 20
      },
      "servicesOffered": {
        "bon fire": "true",
        "food": "true",
        "room service": "true",
        "vallet parking": "true"
      },
      "contactInformation": {
        "email": "Hotel@t2k.com",
        "phone": "1011029111",
        "website": "www.hotel.t2k.com"
      },
      "reviews": [
        {
          "name": "Raman Iyer",
          "rating": 5,
          "review": "They serve authentic South indian food."
        }
      ]
    },
    {
      "provider_id": "provider006",
      "provider_category": "Horse ride",
      "Name": "Pehalgam pony association",
      "Company": "",
      "languageOptions": [
        "English",
        "Hindi",
        "kannad",
        "French",
        "Spanish"
      ],
      "Experience": {
        "years": 30,
        "certifications": [
        ],
        "specializations": [
          "3 star king size room",

        ]
      },
      "groupSize": {
        "min": 2,
        "max": 20
      },
      "servicesOffered": {
        "horse ride": "true",
        "riding gears": "true",
        "riding instuctor": "true"
      },
      "contactInformation": {
        "email": "Horse@t2k.com",
        "phone": "1011029111",
        "website": "www.horse.t2k.com"
      },
      "reviews": [
        {
          "name": "Raman Iyer",
          "rating": 5,
          "review": "They serve authentic South indian food."
        }
      ]
    },
    {
      "provider_id": "provider007",
      "provider_category": "Food",
      "Name": "Valley view restautant",
      "Company": "",
      "languageOptions": [
        "English",
        "Hindi",
        "kannad",
        "French",
        "Spanish"
      ],
      "Experience": {
        "years": 3,
        "certifications": [
        ],
        "specializations": [
          "Asian food",
          "South indian food",
          "authentic kashmiri wazwaan"
        ]
      },
      "groupSize": {
        "min": 2,
        "max": 20
      },
      "servicesOffered": {
        "veg food": "true",
        "non-veg food": "true",
      },
      "contactInformation": {
        "email": "Horse@t2k.com",
        "phone": "1011029111",
        "website": "www.horse.t2k.com"
      },
      "reviews": [
        {
          "name": "Raman Iyer",
          "rating": 5,
          "review": "They serve authentic South indian food."
        }
      ]
    },
    {
      "provider_id": "provider007",
      "provider_category": "Hotel",
      "Name": "Highland hotel",
      "Company": "M/s Raddison pvt ltd",
      "languageOptions": [
        "English",
        "Hindi",
        "kannad",
        "French",
        "Spanish"
      ],
      "Experience": {
        "years": 30,
        "certifications": [
        ],
        "specializations": [
          "3 star king size room",

        ]
      },
      "groupSize": {
        "min": 2,
        "max": 20
      },
      "servicesOffered": {
        "bon fire": "true",
        "food": "true",
        "room service": "true",
        "vallet parking": "true"
      },
      "contactInformation": {
        "email": "Hotel@t2k.com",
        "phone": "1011029111",
        "website": "www.hotel.t2k.com"
      },
      "reviews": [
        {
          "name": "Raman Iyer",
          "rating": 5,
          "review": "They serve authentic South indian food."
        }
      ]
    },
    {
      "provider_id": "provider008",
      "provider_category": "Food",
      "Name": "Pampore saffron field cafe",
      "Company": "M/s JKTDC",
      "languageOptions": [
        "English",
        "Hindi",
        "kannad",
        "French",
        "Spanish"
      ],
      "Experience": {
        "years": 30,
        "certifications": [
        ],
        "specializations": [
          "Authentic kehwa",
          "noon chai and sot",
          "samavar chai"

        ]
      },
      "groupSize": {
        "min": 2,
        "max": 20
      },
      "servicesOffered": {
        "food": "true",
        "photography": "true",
        "vallet parking": "true"
      },
      "contactInformation": {
        "email": "safronfield@t2k.com",
        "phone": "1011029111",
        "website": "www.safronfield.t2k.com"
      },
      "reviews": [
        {
          "name": "Raman Iyer",
          "rating": 5,
          "review": "They serve authentic South indian food."
        }
      ]
    },
    {
      "provider_id": "provider009",
      "provider_category": "Travel",
      "Name": "Dal Shikara",
      "Company": "M/s JKTDC",
      "languageOptions": [
        "English",
        "Hindi",
        "kannad",
        "French",
        "Spanish"
      ],
      "Experience": {
        "years": 30,
        "certifications": [
        ],
        "specializations": [
          "shikara ride",
          "life saving equipment",
          "guiding services"
        ]
      },
      "groupSize": {
        "min": 2,
        "max": 20
      },
      "servicesOffered": {
        "photography": "true"
      },
      "contactInformation": {
        "email": "dalshikara@t2k.com",
        "phone": "1011029111",
        "website": "www.Dalshikara.t2k.com"
      },
      "reviews": [
        {
          "name": "Raman Iyer",
          "rating": 5,
          "review": "They serve authentic South indian food."
        }
      ]
    },
    {
      "provider_id": "provider0010",
      "provider_category": "Photography",
      "Name": "Photography club",
      "Company": "M/s Photography club association",
      "languageOptions": [
        "English",
        "Hindi",
        "kannad",
        "French",
        "Spanish"
      ],
      "Experience": {
        "years": 30,
        "certifications": [
        ],
        "specializations": [
          "Kashur dress photo",
          "couple photoshoot",
          "adventure photoshoot"
        ]
      },
      "groupSize": {
        "min": 2,
        "max": 20
      },
      "servicesOffered": {
        "photography": "true"
      },
      "contactInformation": {
        "email": "photographyclub@t2k.com",
        "phone": "1011029111",
        "website": "www.Photography.t2k.com"
      },
      "reviews": [
        {
          "name": "Raman Iyer",
          "rating": 5,
          "review": "They serve authentic South indian food."
        }
      ]
    }
  ])

  /** Fetching language from the local storage **/
  useEffect(() => {
    firstfun();
  }, [])



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
    router.push('../itinerary')
  }
  const name = ['Itinerary', 'Details', 'Places', 'Attractions', 'Activities','Milestones','Details']
  return (
    <div>
      <Header color={color} Primary={english.Side} Type={currentLogged?.user_type} Sec={colorToggler} mode={mode} setMode={setMode} />
      <Sidebar color={color} Primary={english.Side} Type={currentLogged?.user_type} />
      <div className={`${color?.greybackground} px-4 pt-24 pb-2 relative overflow-y-auto lg:ml-64`}>

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


        <div id='0' className={disp === 0 ? 'block' : 'hidden'}>
          {/* progress bar */}

          <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>

            <div>
              <WidgetStatus name={name} selected={1} color={color} />
            </div>
            <div className="pt-6 ">
              <div className=" md:px-4 mx-auto w-full">
                <div className="flex flex-wrap">

                  {/* tour name filed */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Tour Name
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={itenary.tour_name} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>

                  {/* tour type */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Tour Type
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <select data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          required
                        // onChange={(e) => ()} 
                        >
                          <option value="">{itenary.tour_type}</option>
                          <option value="">Independent Tours</option>
                          <option value="">Freedom Tours</option>
                          <option value="">Hosted Tours</option>
                          <option value="">Escorted Tours</option>
                          <option value="">Incentives Travel/Tours</option>
                        </select>
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>

                  {/* tour description */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Tour Description
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <textarea data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={itenary.tour_summary} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>

                  {/* duration day and night */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Tour Duration-Days and Nights
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block flex ' : 'hidden'}>
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password">
                          Duration Days
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} w-12 mx-4 border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={itenary.duration_days} required
                        // onChange={(e) => ()} 
                        />
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password">
                          Duration Night
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border w-12 mx-4 border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={itenary.duration_nights} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>


                </div>
                <div className='flex items-center justify-end space-x-2 sm:space-x-3 ml-auto'>
                  <Button Primary={language?.Update} onClick={() => { alert('update clicked') }} />
                  <Button Primary={language?.Next} onClick={() => { setDisp(1) }} />
                </div>
              </div>
            </div>


          </div>
        </div>


        {/* itinerary basic functionality */}
        <div id='1' className={disp === 1 ? 'block' : 'hidden'}>
          <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
            {/* progress bar */}
            <div>
              <WidgetStatus name={name} selected={2} color={color} />
            </div>
            {/* progress bar end */}
            <div className='flex justify-end'>
              <Button Primary={language?.Add} onClick={() => { alert("add days clicked") }} />
            </div>
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
                          <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Itenaray Day</th>
                          <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className=" bg-white divide-y  divide-gray-200" id="TableList">
                        {itenary?.plan?.map((days, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="p-4 w-4">
                                <span className="flex items-center">
                                  <input id="checkbox-1" name="r0091" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                  <label htmlFor="checkbox-1" className="sr-only" />
                                </span>
                              </td>
                              <td className="p-4 whitespace-nowrap capitalize text-base font-normal text-gray-700">Day {days.day}</td>

                              <td className="py-4 whitespace-nowrap capitalize">
                                <div>
                                  <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                    onClick={() => { setVisibleDay(days); setDisp(2); }}>Edit </button>

                                </div>
                              </td>
                            </tr>
                          )
                        })}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-end space-x-2 sm:space-x-3 ml-auto'>
              <Button Primary={language?.Previous} onClick={() => { setDisp(0) }} />
            </div>
          </div>
        </div>


        {/* Show Daily Activity */}
        <div id='2' className={disp === 2 ? `${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2 block` : 'hidden'}>
          {/* progress bar */}
          <div>
            <WidgetStatus name={name} selected={3} color={color} /> <widgetBar name={['Itinerary Description', 'Details', 'Places', 'Attractions']} selected={1} color={color} />
          </div>
          {/* progress bar end */}

          {/*content of div*/}
          <div className='flex '>
            <span className={`p-2 text-left text-lg font-bold text-gray-900 uppercase`}>Day : {visibleDay.day}</span>
            <div className="ml-auto">
              <button className="bg-gradient-to-r bg-cyan-600 mr-2 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                onClick={() => { alert('add aditional info') }}>Add Additional Info </button>
              <button className="bg-gradient-to-r bg-cyan-600 mt-1 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                onClick={() => { alert('add place') }}>Add Place</button>
            </div>


          </div>
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
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Places</th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className=" bg-white divide-y  divide-gray-200" id="TableList">
                      {visibleDay?.places?.map((place, id) => {
                        return (
                          <tr key={id}>
                            <td className="p-4 w-4">
                              <span className="flex items-center">
                                <input id="checkbox-1" name="r0091" aria-describedby="checkbox-1" type="checkbox"
                                  className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                <label htmlFor="checkbox-1" className="sr-only" />
                              </span>
                            </td>
                            <td className="p-4 whitespace-nowrap capitalize text-base font-normal text-gray-700">{place.place_name}</td>

                            <td className="py-4 whitespace-nowrap capitalize">
                              <div>
                                <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                  onClick={() => { setAttraction(place.attractions); setDisp(3) }}>Edit </button>

                              </div>
                            </td>
                          </tr>
                        )
                      })}

                    </tbody>
                  </table>

                  <div className='flex items-center justify-end space-x-2  sm:space-x-3 ml-auto'>
                    <Button Primary={language?.Previous} onClick={() => { setDisp(1) }} />
                  </div>

                </div>
              </div>
            </div>
          </div>


        </div>

        {/* Attractions */}
        <div id='3' className={disp === 3 ? `${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2 block` : 'hidden'}>
          {/* progress bar */}
          <div>
            <WidgetStatus name={name} selected={4} color={color} />
          </div>
          {/* progress bar end */}

          {/*content of div*/}
          <div className='flex '>
            <span className={`p-2 text-left text-lg font-bold text-gray-900 uppercase`}>Day : {visibleDay.day}</span>
            <button className="ml-auto bg-gradient-to-r bg-cyan-600  hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
              onClick={() => { alert('add attraction') }}>Add Attraction</button>
          </div>
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
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Attractions</th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase"></th>
                      </tr>
                    </thead>
                    <tbody className=" bg-white divide-y  divide-gray-200" id="TableList">
                      {attraction?.map((attraction, id) => {
                        return (
                          <tr key={id}>
                            <td className="p-4 w-4">
                              <span className="flex items-center">
                                <input id="checkbox-1" name="r0091" aria-describedby="checkbox-1" type="checkbox"
                                  className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                <label htmlFor="checkbox-1" className="sr-only" />
                              </span>
                            </td>
                            <td className="p-4 whitespace-nowrap capitalize text-base font-normal text-gray-700">{attraction?.activity_name}</td>

                            <td className="py-4 whitespace-nowrap capitalize">
                              <div>
                                <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                  onClick={() => { setAttractionInfo(attraction); setDisp(4) }}>Edit </button>

                              </div>
                            </td>

                            <td className="py-4 whitespace-nowrap capitalize">
                              <div>
                                <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                  onClick={() => { setAttractionInfo(attraction); setDisp(5) }}>Milestones </button>

                              </div>
                            </td>
                          </tr>
                        )
                      })}

                    </tbody>
                  </table>

                  <div className='flex items-center justify-end space-x-2  sm:space-x-3 ml-auto'>

                    <Button Primary={language?.Previous} onClick={() => { setDisp(2) }} />
                  </div>

                </div>
              </div>
            </div>
          </div>


        </div>

        {/* activity widget */}

        <div id='4' className={disp === 4 ? 'block' : 'hidden'}>

          <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
            {/* progress bar */}
            <div>
              <WidgetStatus name={name} selected={5} color={color} />
            </div>
            {/* progress bar end */}
            {/* activities of selected day display */}
            <div className="pt-6">
              <div className=" md:px-4 mx-auto w-full">
                <div className="flex flex-wrap">
                  {/* activity name field */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Activity Name
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={attractionInfo?.activity_name} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>


                  {/* borading point field */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Boarding Point
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={attractionInfo?.boarding_point} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>

                  {/*Tour capacity */}
                  <div className="w-full lg:w-6/12  px-4 ">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm capitalize font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Tour Capacity
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block flex flex-wrap' : 'hidden'}>
                        <label
                          className={`text-sm  font-medium ${color?.text} block mb-2 px-2 mt-2`}
                          htmlFor="grid-password">
                          Adults
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} w-12 mx-4 border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mt-2`}
                          defaultValue={attractionInfo?.capacity?.adult} required
                        // onChange={(e) => ()} 
                        />
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2 mt-2`}
                          htmlFor="grid-password">
                          Children
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border w-12 mx-4 border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mt-2`}
                          defaultValue={attractionInfo?.capacity?.children} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>

                  {/* guided tour field */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Guided Tour
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={attractionInfo?.Guided_tour} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>

                  {/* time of ride field */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Time Of Ride
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={attractionInfo?.time_of_ride} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>


                  {/* distance */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Distance
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={attractionInfo?.distance} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>

            <div className='flex items-center justify-end space-x-2 sm:space-x-3 ml-auto'>
              <Button Primary={language?.Update} onClick={() => { alert('update clicked') }} />
              <Button Primary={language?.Previous} onClick={() => { setDisp(3) }} />
            </div>


          </div>
        </div>

        {/* milestone widget-list of milestones */}

        <div id='5' className={disp === 5 ? 'block' : 'hidden'}>
        
          <div>
              <WidgetStatus name={name} selected={6} color={color} />
            </div>
          {/*content of div*/}
          <div className='flex '>
            <span className={`p-2 text-left text-lg font-bold text-gray-900 uppercase`}>Day : {visibleDay.day}</span>
            <button className="ml-auto bg-gradient-to-r bg-cyan-600  hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
              onClick={() => { alert('add milestone') }}>Add Milestone</button>
          </div>
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
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Milestone</th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>

                      </tr>
                    </thead>
                    <tbody className=" bg-white divide-y  divide-gray-200" id="TableList">
                      {attractionInfo?.milestones?.map((milestone, id) => {
                        return (
                          <tr key={id}>
                            <td className="p-4 w-4">
                              <span className="flex items-center">
                                <input id="checkbox-1" name="r0091" aria-describedby="checkbox-1" type="checkbox"
                                  className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                <label htmlFor="checkbox-1" className="sr-only" />
                              </span>
                            </td>
                            <td className="p-4 whitespace-nowrap capitalize text-base font-normal text-gray-700">{milestone?.milestone_name}</td>

                            <td className="py-4 whitespace-nowrap capitalize">
                              <div>
                                <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                  onClick={() => { setActiveMilestone(milestone); setDisp(6) }}>Edit </button>

                              </div>
                            </td>


                          </tr>
                        )
                      })}

                    </tbody>
                  </table>

                  <div className='flex items-center justify-end space-x-2  sm:space-x-3 ml-auto'>

                    <Button Primary={language?.Previous} onClick={() => { setDisp(3) }} />
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        {/* edit milestone widget */}
        <div className={disp === 6 ? 'block' : 'hidden'}>
        <div>
              <WidgetStatus name={name} selected={7} color={color} />
            </div>
        <span className={`p-2 text-left text-lg font-bold text-gray-900 uppercase`}>{activeMilestone.milestone_name}</span>
        
          <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
            
            <div className="pt-6">
              <div className=" md:px-4 mx-auto w-full">
                <div className="flex flex-wrap">
                  {/* milestone name */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Milestone Name
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={activeMilestone?.milestone_name} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>


                  {/* milestone description */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Milestone Description
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={activeMilestone?.milestone_name} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>






                </div>
              </div>
            </div>

            <div className='flex items-center justify-end space-x-2 sm:space-x-3 ml-auto'>
              <Button Primary={language?.Update} onClick={() => { alert('update clicked') }} />
              <Button Primary={language?.Previous} onClick={() => { setDisp(5) }} />
            </div>
          </div>
        </div>
      </div >
      <Footer color={color} Primary={english.Foot} />
    </div>
  )
}

export default Index