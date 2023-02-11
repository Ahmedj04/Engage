import React, { useEffect, useState } from 'react';
import LoaderDarkTable from '../../components/loaders/darktableloader';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import colorFile from "../../components/color";
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
  const [activity, setActivity] = useState([])
  const [actionDay, setActionDay] = useState(0)

  const [itenary, setItenary] = useState(
    {
      "tour_id": "tour001",
      "tour_name": "Kashmir Winters",
      "tour_type": "private",
      "duration_days": 3,
      "duration_nights": 2,
      "min_participants": 2,
      "max_participants": 5,
      "tour_summary": "This tour package explores the Kashmir in  winters to explores the real beauty of paradise on earth.Where guests will explore the steep hills suitable for skiing in gulmarg, the snow clad mountains of pehalgam and the beautiful city of srinagar.",
      "price_type": "Per Person",
      "price_amount": 7999,
      "tax_included": "False",
      "tax_type": "Percentage",
      "tax_amount": "18%",
      "other_charges": 0,
      "currency": "Rupees",
      "plan": [
        {
          "day": 1,
          "activities": [
            {
              "activity_name": "Transfer From Srinagar airport to Gulmarg",
              "time_of_ride": "3 Hrs",
              "distance": "60km",
              "place": "Gulmarg",
              "milestones": [
                {
                  "Tangmarg": true,
                  "description": "Tangmarg is gateway of gulmarg which is just 13kms away, also drung waterfall is 3kms away which makes tangmarg most crowded place in the evening due to clean & fresh environment. "
                },
                {
                  "Drang waterfall": true,
                  "description": "The Drung Waterfall is an extremely popular tourist attraction located in the Tangmarg tehsil of Gulmarg, Baramulla. A cascading waterfall set amidst majestic mountains, it freezes completely during winter due to the extremely low temperature. This frozen waterfall is a must-visit in the area."
                },
                {
                  "Baba Reshi Shrine ": true,
                  "description": "The Ziarat of Baba Reshi is a popular shrine of Baramula, situated near the Alpather Lake at 13 km from Gulmarg and belongs to saint Baba payam-Din."
                }
              ],
              "boarding_point": "srinagr",
              "Guided_tour": true,
              "add_on": [
                {
                  "addon_id": "addon001"
                },
                {
                  "addon_id": "addon002"
                }
              ],
              "capacity": 
                {
                  "adult": 4,
                  "children": 3
                }
              ,
              "providers": [
                {
                  "provider_id": "provider001"
                },
                {
                  "provider_id": "provider002"
                }
              ]
            },

            {
              "activity_name": "Gondolla ride",
              "time_of_ride": "30 min",
              "distance": "10km",
              "place": "Gulmarg",
              "milestones": [
                {
                  "kongdori-phase I": true,
                  "description": "It starts at a height of 2,990 m following which there is a vertical rise of 400m."
                },
                {
                  "Apharwat - Phase II": true,
                  "description": "it makes a further ascent of 1,330 vertical meters and takes you to a total height of almost 4,000 m"
                },
                {
                  "Phase III": true,
                  "description": "Once here, you can trek a further 30 minutes and reach the top of the mountain to catch a glimpse of the Line of Control (LOC) which is visible from here. "
                }
              ],
              "boarding_point": "Gandola point",
              "Guided_tour": false,
              "add_on": [
                {
                  "addon_id": "addon001"
                },
                {
                  "addon_id": "addon003"
                }
              ],
              "capacity": 
                {
                  "adult": 4,
                  "children": 3
                }
              ,
              "providers": [
                {
                  "provider_id": "provider004"
                }
              ]
            },
            {
              "activity_name": "Skiing on Apharwat Peaks",
              "time_of_ride": "1 Hr",
              "distance": "6km",
              "place": "Gulmarg",
              "milestones": [
                {
                  "Apharwat-peak": true,
                  "description": "Best slopes in Asia for best skiing experience."
                }
              ],
              "boarding_point": "Apharwat Peak",
              "Guided_tour": true,
              "add_on": [
                {
                  "addon_id": "addon001"
                },
                {
                  "addon_id": "addon004"
                }
                ,
                {
                  "addon_id": "addon005"
                }
              ],
              "capacity": [
                {
                  "adult": 4,
                  "children": 0
                }
              ],
              "providers": [
                {
                  "provider_id": "provider004"
                }
              ]
            },
            {
              "activity_name": "Night Stay In Gulmarg",
              "time_of_ride": "",
              "distance": "",
              "place": "Gulmarg",
              "milestones": [

              ],
              "boarding_point": "Gulmarg",
              "Guided_tour": false,
              "add_on": [
                {
                  "addon_id": "addon001"
                },
                {
                  "addon_id": "addon006"
                },
                {
                  "addon_id": "addon007"
                },
                {
                  "addon_id": "addon008"
                },
                {
                  "addon_id": "addon009"
                }
              ],
              "capacity": [
                {
                  "adult": 4,
                  "children": 2
                }
              ],
              "providers": [
                {
                  "provider_id": "provider005"
                }
              ]
            }
          ]
        },
        {
          "day": 2,
          "activities": [
            {
              "activity_name": "Transfer From Gulmarg to pehalgam",
              "time_of_ride": "5 Hrs",
              "distance": "160km",
              "place": "Pehalgam",
              "milestones": [
                {
                  "Avantipora temple": true,
                  "description": "The ancient temple in avantipur of district pulwama which is on the way to pehalgam. "
                },
                {
                  "Chinar bagh": true,
                  "description": "Chinar bagh is located in the Bijbhara of district Anantnag which host oldest chinars of kashmir"
                },
                {
                  "Mattan Temple": true,
                  "description": "Mattan temple is one of the oldest temple of kashmir."
                }
              ],
              "boarding_point": "Gulmarg",
              "Guided_tour": true,
              "add_on": [
                {
                  "addon_id": "addon001"
                },
                {
                  "addon_id": "addon002"
                }
              ],
              "capacity": [
                {
                  "adult": 4,

                  "children": 3
                }
              ],
              "providers": [
                {
                  "provider_id": "provider001"
                }
              ]
            },
            {
              "activity_name": "Horse ride to baisaran",
              "time_of_ride": "30 min",
              "distance": "5 km",
              "place": "Pehalgam",
              "milestones": [
                {
                  "Baisaran Valley": true,
                  "description": "Baisaram valley is located 5km from the pehalgam it is also known as the mini switzerland ."
                }
              ],
              "boarding_point": "Pehalgam horse stand",
              "Guided_tour": true,
              "add_on": [
                {
                  "addon_id": "addon001"
                },
                {
                  "addon_id": "addon0011"
                },
                {
                  "addon_id": "addon0010"
                }
              ],
              "capacity": 
                {
                  "adult": 4,
                  "children": 3
                }
              ,
              "providers": [
                {
                  "provider_id": "provider006"
                }
              ]
            },
            {
              "activity_name": "Visit to betab valley",
              "time_of_ride": "1 Hr",
              "distance": "16km",
              "place": "pehalgam",
              "milestones": [
                {
                  "Betab valley": true,
                  "description": "Mesmerising valley in the foot hills of chandanwari."
                }
              ],
              "boarding_point": "Pehalgam taxi stand",
              "Guided_tour": true,
              "add_on": [
                {
                  "addon_id": "addon001"
                },
                {
                  "addon_id": "addon0012"
                }
              ],
              "capacity": [
                {
                  "adult": 4
                },
                {
                  "children": 0
                }
              ],
              "providers": [
                {
                  "provider_id": "provider007"
                }
              ]
            },
            {
              "activity_name": "Stay in Pehalgam",
              "time_of_ride": "",
              "distance": "",
              "place": "pehalgam",
              "milestones": [

              ],
              "boarding_point": "Pehalgam",
              "Guided_tour": true,
              "add_on": [
                {
                  "addon_id": "addon001"
                },
                {
                  "addon_id": "addon006"
                },
                {
                  "addon_id": "addon007"
                },
                {
                  "addon_id": "addon008"
                },
                {
                  "addon_id": "addon009"
                }
              ],
              "capacity": [
                {
                  "adult": 4
                },
                {
                  "children": 2
                }
              ],
              "providers": [
                {
                  "provider_id": "provider007"
                }
              ]
            }
          ]
        },
        {
          "day": 3,
          "activities": [
            {
              "activity_name": "Transfer From pehalgam to srinagar",
              "time_of_ride": "2 Hrs",
              "distance": "110km",
              "place": "srinagar",
              "milestones": [
                {
                  "Pampore Saffron fields": true,
                  "description": "Witness the freshness of worlds best saffron fields"
                }
              ],
              "boarding_point": "Pehalgam",
              "Guided_tour": true,
              "add_on": [
                {
                  "addon_id": "addon001"
                },
                {
                  "addon_id": "addon0013"
                }
              ],
              "capacity": [
                {}
              ],
              "providers": [
                {
                  "provider_id": "provider008"
                }
              ]
            },
            {
              "activity_name": "Shikara Ride",
              "time_of_ride": "30 min",
              "distance": "7 km",
              "place": "Srinagar",
              "milestones": [
                {
                  "Nehru Park": true,
                  "description": "Nehru Park, Dal Lake, Srinagar, Kashmir, a small island park with swimming pool, boating facilities and small park for picnic. Can be reached by shikaras, popular destination in evenings."
                },
                {
                  "Char Chinar": true,
                  "description": "Char Chinar, also sometimes called Char Chinari, Ropa Lank, or Rupa Lank, is an island in Dal Lake, Srinagar, Jammu and Kashmir. Dal Lake includes 3 islands, 2 of which are marked with beautiful Chinar trees. The island located on the Lakut Dal (small Dal) is known as Roph Lank (Silver Island), is marked with the presence of majestic Chinar trees at the four corners, thus known as Char-Chinari (Four Chinars). The second Chinar Island, known as Sone Lank (Gold Island), is located on the Bod Dal (Big Dal) and overlooks the holy shrine of Hazratbal ."
                }
              ],
              "boarding_point": "Ghat no 2",
              "Guided_tour": true,
              "add_on": [
                {
                  "addon_id": "addon001"
                },
                {
                  "addon_id": "addon0014"
                }
              ],
              "capacity": 
                {
                  "adult": 4,
                  "children": 3
                }
              ,
              "providers": [
                {
                  "provider_id": "provider009"
                }
              ]
            },
            {
              "activity_name": "Visit to Mughal Gardens",
              "time_of_ride": "1 Hr",
              "distance": "16km",
              "place": "Srinagar",
              "milestones": [
                {
                  "Nishat": true,
                  "description": "Nishat is famous for the Nishat Gardens (Nishat Bagh). And is a very popular tourist destination. The Nishat Bagh is a 12 terraced garden located near Srinagar's famous Dal Lake. It is the second-largest Mughal garden in Kashmir after Shalimar Bagh. Nishat Bagh was designed and built in 1633 by Asif Khan, the elder brother of Nur Jehan."
                },
                {
                  "Shalimar": true,
                  "description": "Shalimar Bagh is a Mughal garden in Srinagar, Jammu and Kashmir, India, linked through a channel to the northeast of Dal Lake. It is also known as Shalimar Gardens, Farah Baksh, and Faiz Baksh. The other famous shoreline garden in the vicinity is Nishat Bagh, 'The Garden of Delight'. The Bagh was built by Mughal Emperor Jahangir, for his wife Nur Jahan, in 1619. ."
                },
                {
                  "Chashma shahie": true,
                  "description": "Chashme Shahi or Chashma i Shahi Or Cheshma Shahi (translation: the royal spring), also called Chashma Shahi or Cheshma Shahi, is one of the Mughal gardens built in 1632 AD around a spring by Ali Mardan Khan, a governor of Mughal emperor Shah Jahan as per the orders of the Emperor, as a gift for his eldest son Prince Dara Shikoh.[1][2] The garden is located in the Zabarwan Range, near Raj Bhawan (Governor's house) overlooking Dal Lake in Srinagar, Kashmir, India."
                },

                {
                  "Pari mehal": true,
                  "description": "Pari Mahal or Peer Mahal, also known as The Palace of Fairies, is a seven-terraced garden located at the top of Zabarwan mountain range, overlooking the city of Srinagar and the south-west of Dal Lake in the Indian union territory of Jammu and Kashmir. It is an example of Islamic architecture and patronage of art during the reign of the then Mughal Emperor Shah Jahan. ."
                }
              ],
              "boarding_point": "Pehalgam taxi stand",
              "Guided_tour": true,
              "add_on": [
                {
                  "addon_id": "addon001"
                },
                {
                  "addon_id": "addon0017"
                },
                {
                  "addon_id": "addon0018"
                }
              ],
              "capacity": [
                {
                  "adult": 4
                },
                {
                  "children": 0
                }
              ],
              "providers": [
                {
                  "provider_id": "provider002"
                },
                {
                  "provider_id": "provider0010"
                }
              ]
            },
            {
              "activity_name": "Stay in Srinagar",
              "time_of_ride": "",
              "distance": "",
              "place": "pehalgam",
              "milestones": [

              ],
              "boarding_point": "Pehalgam",
              "Guided_tour": true,
              "add_on": [
                {
                  "addon_id": "addon001"
                }
              ],
              "capacity": [
                {
                  "adult": 4
                },
                {
                  "children": 2
                }
              ],
              "providers": [
                {
                  "provider_id": "provider004"
                }
              ]
            }
          ]
        },
        {
          "day": 4,
          "activities": [
            {
              "activity_name": "Transfer From Srinagar Airport",
              "time_of_ride": "1 Hrs",
              "distance": "16km",
              "place": "Srinagar",
              "milestones": [

              ],
              "boarding_point": "Srinagar hotel",
              "Guided_tour": true,
              "add_on": [
                {
                  "addon_id": "addon001"
                }
              ],
              "capacity": 
                {
                  "adult": 4,
                  "children": 3
                }
              ,
              "providers": [
                {
                  "provider_id": "provider004"
                }
              ]
            }

          ]
        }
      ]

    }
  )

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
          <div key={0} className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
            <div className="relative before:hidden  before:lg:block before:absolute before:w-[64%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">
              <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary">1</button>
                <div className={`${color.crossbg} lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto`}>Tour Description</div>
              </div>

              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">2</button>
                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Tour Itenary</div>
              </div>

              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">3</button>
                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Day Description</div>
              </div>
              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">4</button>
                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Activity</div>
              </div>

            </div>

            <div className="pt-6">
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
                  <Button Primary={language?.Next} onClick={() => { setDisp(1) }} />
                </div>
              </div>
            </div>


          </div>
        </div>


      {/* itinerary basic functionality */}
        <div id='1' className={disp === 1 ? 'block' : 'hidden'}>
          {/* progress bar */}
          <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
            <div className="relative before:hidden  before:lg:block before:absolute before:w-[64%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">
              <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">1</button>
                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Tour Description</div>
              </div>

              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary">2</button>
                <div className={`${color.crossbg} lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto`}>Tour Itenary</div>
              </div>

              <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">3</button>
                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Day Description</div>
              </div>
              <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">4</button>
                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Activity</div>
              </div>

            </div>
            {/* progress bar end */}
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
                        {itenary.plan.map((days, idx) => {
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
                                  <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150" onClick={() => { setVisibleDay(days); setDisp(2); }}>Edit </button>

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
            <div className="relative before:hidden  before:lg:block before:absolute before:w-[64%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">
              <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">1</button>
                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Tour Description</div>
              </div>
              <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">2</button>
                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Tour Itenary</div>
              </div>

              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary">3</button>
                <div className={`${color.crossbg} lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto`}>Day Description</div>
              </div>

              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 btn-primary">4</button>
                <div className={`${color.crossbg} lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto`}>Activity</div>
              </div>

            </div>
          </div>
          {/* progress bar end */}

          {/*content of div*/}
          <span className={`p-2 text-left text-lg font-bold text-gray-900 uppercase`}>Day : {visibleDay.day}</span>

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
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Activity Name</th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className=" bg-white divide-y  divide-gray-200" id="TableList">
                      {visibleDay?.activities?.map((activity, id) => {
                        return (
                          <tr key={id}>
                            <td className="p-4 w-4">
                              <span className="flex items-center">
                                <input id="checkbox-1" name="r0091" aria-describedby="checkbox-1" type="checkbox"
                                  className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                <label htmlFor="checkbox-1" className="sr-only" />
                              </span>
                            </td>
                            <td className="p-4 whitespace-nowrap capitalize text-base font-normal text-gray-700">{activity.activity_name}</td>

                            <td className="py-4 whitespace-nowrap capitalize">
                              <div>
                                <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                  onClick={() => { setActivity(activity); setDisp(3) }}>Edit </button>

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

        {/* activity widget */}

        <div id='3' className={disp === 3 ? 'block' : 'hidden'}>
          {/* progress bar */}
          <div key={0} className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
            <div className="relative before:hidden  before:lg:block before:absolute before:w-[64%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">
              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">1</button>
                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Tour Description</div>
              </div>
              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">2</button>
                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Tour Itenary</div>
              </div>

              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">3</button>
                <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>Day Description</div>
              </div>


              <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary">4</button>
                <div className={`${color.crossbg} lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto`}>Activity</div>
              </div>
            </div>

            {/* activities of selected day display */}

            <div key={8} className="shadow-lg  border-2 border mb-4">
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
                            defaultValue={activity.activity_name} required
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
                            defaultValue={activity.boarding_point} required
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
                             defaultValue={activity?.capacity?.adult} required
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
                          defaultValue={activity?.capacity?.children} required
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
                            defaultValue={activity.Guided_tour} required
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
                            defaultValue={activity.time_of_ride} required
                          // onChange={(e) => ()} 
                          />
                          <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                            {/* for error messages{error?.property_name}*/}</p>
                        </div>
                      </div>
                    </div>


                    {/* distance field */}
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
                            defaultValue={activity.distance} required
                          // onChange={(e) => ()} 
                          />
                          <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                            {/* for error messages{error?.property_name}*/}</p>
                        </div>
                      </div>
                    </div>

                    {/* place */}
                    <div className="w-full lg:w-6/12  px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password">
                          Place
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                          <input
                            type="text" data-testid="test_property_name"
                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                            defaultValue={activity?.place} required
                          // onChange={(e) => ()} 
                          />
                          <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                            {/* for error messages{error?.property_name}*/}</p>
                        </div>
                      </div>
                    </div>

                    {/* milestone label */}
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-black ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Mile Stones
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                    </div>
                    {/* mile stones */}
                    {activity?.milestones?.map((eve, idx) => {
                      return (
                        <div key={idx} className="flex mt-4 p-4 shadow-lg border flex-wrap lg:w-full md:w-full">
                          {/* milestone place field */}
                          <div key={idx * 3 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Mile Stone {idx + 1} Place
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <input
                                  type="text" data-testid="test_property_name"
                                  className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                  defaultValue={Object.keys(eve)[0]} required
                                // onChange={(e) => ()} 
                                />
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>
                          <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Description
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <textarea rows='3' data-testid="test_property_name"
                                  className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                  defaultValue={eve.description} required
                                // onChange={(e) => ()} 
                                />
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    <>
                      {/* addon label */}
                      <div className="relative w-full mt-4 ">
                        <label
                          className={`text-sm font-black ${color?.text} block`}
                          htmlFor="grid-password">
                          ADD ONs
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                      </div>
                      {/* addno */}
                      {activity?.add_on?.map((add, idx) => {
                        let temp = addons.filter(i => i.addon_id === add.addon_id);
                        return (
                          <div key={idx} className="mt-8 p-4 shadow-lg border flex flex-wrap lg:w-full">
                            {/* Addon name field */}
                            <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className={`text-sm font-medium ${color?.text} block mb-2`}
                                  htmlFor="grid-password">
                                  Addon Name
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </label>
                                <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                <div className={visible === 1 ? 'block' : 'hidden'}>
                                  <input type='text' data-testid="test_property_name"
                                    className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                    defaultValue={temp[0]?.name} required
                                  // onChange={(e) => ()} 
                                  />
                                  <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                    {/* for error messages{error?.property_name}*/}</p>
                                </div>
                              </div>
                            </div>

                            {/* Addon Description field */}
                            <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className={`text-sm font-medium ${color?.text} block mb-2`}
                                  htmlFor="grid-password">
                                  Addon Provider
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </label>
                                <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                <div className={visible === 1 ? 'block' : 'hidden'}>
                                  <input type='text' data-testid="test_property_name"
                                    className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                    defaultValue={temp[0]?.provider} required
                                  // onChange={(e) => ()} 
                                  />
                                  <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                    {/* for error messages{error?.property_name}*/}</p>
                                </div>
                              </div>
                            </div>

                            {/* Addon Provider field */}
                            <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className={`text-sm font-medium ${color?.text} block mb-2`}
                                  htmlFor="grid-password">
                                  Addon Description
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </label>
                                <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                <div className={visible === 1 ? 'block' : 'hidden'}>
                                  <input type='text' data-testid="test_property_name"
                                    className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                    defaultValue={temp[0]?.description} required
                                  // onChange={(e) => ()} 
                                  />
                                  <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                    {/* for error messages{error?.property_name}*/}</p>
                                </div>
                              </div>
                            </div>

                            {/* Addon Price field */}
                            <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className={`text-sm font-medium ${color?.text} block mb-2`}
                                  htmlFor="grid-password">
                                  Addon Price
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </label>
                                <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                <div className={visible === 1 ? 'block' : 'hidden'}>
                                  <input type='text' data-testid="test_property_name"
                                    className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                    defaultValue={temp[0]?.price} required
                                  // onChange={(e) => ()} 
                                  />
                                  <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                    {/* for error messages{error?.property_name}*/}</p>
                                </div>
                              </div>
                            </div>

                            {/* Addon Services field */}
                            <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className={`text-sm font-medium ${color?.text} block mb-2`}
                                  htmlFor="grid-password">
                                  Addon Serves to
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </label>
                                <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                <div className={visible === 1 ? 'block' : 'hidden'}>
                                  <input type='text' data-testid="test_property_name"
                                    className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                    defaultValue={temp[0]?.serves} required
                                  // onChange={(e) => ()} 
                                  />
                                  <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                    {/* for error messages{error?.property_name}*/}</p>
                                </div>
                              </div>
                            </div>

                            {/* Addon quantity field */}
                            <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className={`text-sm font-medium ${color?.text} block mb-2`}
                                  htmlFor="grid-password">
                                  Addon Has Quantity
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </label>
                                <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                <div className={visible === 1 ? 'block' : 'hidden'}>
                                  <input type='text' data-testid="test_property_name"
                                    className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                    defaultValue={temp[0]?.quantity} required
                                  // onChange={(e) => ()} 
                                  />
                                  <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                    {/* for error messages{error?.property_name}*/}</p>
                                </div>
                              </div>
                            </div>



                          </div>
                        )
                      })}

                      {/* Provider label */}
                      <div className="relative w-full mt-4 ">
                        <label
                          className={`text-sm font-black ${color?.text} block mb-2`}
                          htmlFor="grid-password">
                          Providers
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                      </div>
                      {/* providers */}
                      {activity?.providers?.map((add, idx) => {
                        let temp = providers.filter(i => i.provider_id === add.provider_id);
                        return (<div key={idx} className="mt-4 mb-4 p-4 shadow-lg border flex flex-wrap lg:w-full">
                          {/* Provider category name field */}
                          <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Provider Category
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <input type='text' data-testid="test_property_name"
                                  className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                  defaultValue={temp[0]?.provider_category} required
                                // onChange={(e) => ()} 
                                />
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>

                          {/* Provider name field */}
                          <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Provider Name
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <input type='text' data-testid="test_property_name"
                                  className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                  defaultValue={temp[0]?.Name} required
                                // onChange={(e) => ()} 
                                />
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>


                          {/* Provider Company name field */}
                          <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Company
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <input type='text' data-testid="test_property_name"
                                  className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                  defaultValue={temp[0]?.Company} required
                                // onChange={(e) => ()} 
                                />
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>

                          {/* Provider Experience field */}
                          <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Experience
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <input type='text' data-testid="test_property_name"
                                  className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                  defaultValue={temp[0]?.guideExperience?.years} required
                                // onChange={(e) => ()} 
                                />
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>

                          {/* Languages field */}
                          <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Languages
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <select className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}>
                                  {temp[0]?.languageOptions.map((item, i) => { return (<option value={item} key={i}>{item}</option>) })}
                                </select>
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>

                          {/* Certification field */}
                          <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Certification
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <select className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}>
                                  {temp[0]?.guideExperience?.certifications.map((item, i) => { return (<option value={item} key={i}>{item}</option>) })}
                                </select>
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>

                          {/* Specialization field */}
                          <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Specialisations
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <select className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}>
                                  {temp[0]?.guideExperience?.specializations.map((item, i) => { return (<option value={item} key={i}>{item}</option>) })}
                                </select>
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>

                           {/* Services offered */}
                            <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Services offered
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <select className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}>
                                {Object.keys(temp[0]?.servicesOffered).map((item, i) => { return (<option value={item} key={i}>{item}</option>) })}
                                </select>
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/} </p>
                              </div>
                            </div>
                          </div> 


                           {/* Contact email information */}
                           <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Email
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <input type='text' className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                defaultValue={temp[0]?.contactInformation.email} />
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>

                           {/* Contact phone information */}
                           <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Phone
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <input type='text' className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                defaultValue={temp[0]?.contactInformation.phone} />
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>
                           {/* Contact website information */}
                           <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Website
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <input type='text' className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                defaultValue={temp[0]?.contactInformation.website} />
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>


                           {/*Provider review */}
                           <span key={idx * 8 + 20} className="w-full   px-4">Provider Review</span>
                            <div >
                            {
                              temp[0]?.reviews?.map((item,id)=>{
                                return (<div key={id}
                                  className="mt-4 mb-4 p-4 shadow-lg border flex flex-wrap lg:w-11/12">

                                    {/* reviewer name */}
                                    {/* Reviewers name*/}
                           <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Reviewers name
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <input type='text' className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                defaultValue={item?.name} />
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>
                                    {/* Ratings*/}
                           <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Ratings
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <input type='text' className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                defaultValue={item?.rating} />
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>
                                    {/* Review*/}
                           <div key={idx * 8 + 20} className="w-full lg:w-6/12  px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={`text-sm font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password">
                                Review
                                <span style={{ color: "#ff0000" }}>*</span>
                              </label>
                              <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                <input type='text' className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                defaultValue={item?.review} />
                                <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                  {/* for error messages{error?.property_name}*/}</p>
                              </div>
                            </div>
                          </div>
                                  {/* {JSON.stringify(item)} */}
                                </div>)
                              })
                            }
                            </div>
                         
                        </div>
                        )
                      })}
                    </>

                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-center justify-end space-x-2 sm:space-x-3 ml-auto'>
              <Button Primary={language?.Previous} onClick={() => { setDisp(2) }} />
            </div>


          </div>
        </div>


      </div >
      <Footer color={color} Primary={english.Foot} />
    </div>
  )
}

export default Index