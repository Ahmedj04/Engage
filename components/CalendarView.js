import React, { useEffect, useState } from 'react';
import InputText from './utils/InputText';
import Button from './Button';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import roomPrice from './devlopmentjson/roomPrice.json';
import randomColor from 'randomcolor';
import RoomDiscounts from './rooms/roomDiscounts';
import RoomRateModification from './rooms/roomRateModification';
let i = 0;
let lang;
const RoomPriceCalendar = ({ color, language }) => {
    const [events, setEvents] = useState([])
    const [rooms, setRooms] = useState([])
    const [selectedRoom, setSelectedRoom] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [title, setTitle] = useState('');
    const [editUI, setEditUI] = useState('none')


    useEffect(() => {
        (function initialData() {
            // setRooms(roomPrice.rates.map(item => ({ "room_id": item.room_id, "room_name": item.room_name })))
            // setSelectedRoom({ "room_name": roomPrice?.rates[0].room_name, "room_id": roomPrice?.rates[0].room_id })
            let room_ids = roomPrice?.rates.map((rate) => {
                return rate?.room_id
            })
            const uniqueArray = [...new Set(room_ids)];
            //set is data type in js like array but has unique ele
            //aasign unique color for unique rooms
            let keycolors = uniqueArray.map((item) => {
                return (
                    {
                        [item]: `${randomColor({
                            luminosity: 'bright',
                            hue: 'random'
                        })
                            }`
                    }
                )
            })
            //    convert color array to object
            const mergedColors = Object.assign({}, ...keycolors);

            //object with color information
            let final = roomPrice?.rates.map((rate) => {
                let color = mergedColors[rate.room_id]
                return (
                    { ...rate, "color": `${color}` }
                )
            })
            setEvents(final)
            lang = localStorage.getItem('Language') != undefined ? localStorage.getItem('Language') : 'en'
        })()
    }, [])
    function changeRoom(e) {
        let newRoom = roomPrice?.rates?.filter(item => item.room_id === e.target.value)[0]
        setEvents(newRoom?.day_price)
        setSelectedRoom({ "room_name": newRoom.room_name, "room_id": newRoom.room_id })

    }
    const handleDateClick = (event) => { // bind with an arrow function
        alert(JSON.stringify(event))
        setSelectedRoom(event?.extendedProps)
        setSelectedDate(`${event.start.getDate()}-${event.start.getMonth() + 1}-${event.start.getFullYear()}`);
        setModalVisible(true);
        setTitle(event?.title);
        console.log(JSON.stringify(event));
    }

    const updateRate = () => {
        setModalVisible(false);
    };
    function setNewValue(e) {
        let k = {
            "title": e.target.value,
            "date": selectedDate,
            "room_id": selectedRoom.room_id,
            "room_name": selectedRoom.room_name,
        };
        alert(JSON.stringify(k))
        let unchangedvalue = events?.filter(i => (new Date(i.date) != new Date(selectedDate)))
        alert(JSON.stringify(unchangedvalue))
        setEvents([...unchangedvalue, k])

    }

    return (
        <div className='h-full'>
            <div className='flex gap-2 justify-content items-center'>
                {/* <label htmlFor='roomList' className="text-sm font-medium ${color?.text} block mb-2">
                    Select Room</label> */}
                <select id='roomList'
                    className={`shadow-sm ${color?.greybackground} capitalize border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mb-4`}
                    // className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    onChange={(e) => changeRoom(e)}>
                    <option value={selectedRoom?.room_id}>{selectedRoom?.room_name}</option>
                    {rooms.map((room, idx) => {
                        return (
                            <option key={idx} value={room?.room_id}>{room?.room_name}</option>
                        )
                    })}
                </select>
            </div>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={events}
                dateClick={(event) => handleDateClick(event)}
                eventColor='#0891B4'
                eventDisplay='block'
                locale={lang}
                eventClick={(e) => {
                    handleDateClick(e.event)
                    console.log(JSON.stringify(e.event.start), JSON.stringify(e.event.extendedProps))
                }}

            />

            {/* Tailwind CSS Modal */}
            {modalVisible === true ?
                <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                    <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                        <div className={`${color?.whitebackground} rounded-lg shadow relative`}>

                            <div className="flex items-start justify-between pl-5 pt-5 pr-5 pb-1 border-b rounded-t mb-2">
                                <h3 className={`${color?.text} text-xl font-semibold`}>
                                    Edit Rate of {selectedRoom?.room_name} for {selectedDate}
                                </h3>
                                {/* cross button to close the modal */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        document.getElementById('rate').reset();
                                        setModalVisible(false);
                                    }}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                                {/* cross button to close the modal */}
                            </div>

                            <form id='rate'>
                                <InputText
                                    label={`${selectedRoom?.room_name} Rate`}
                                    visible={1}
                                    defaultValue={title}
                                    onChangeAction={(e) => setNewValue(e)}
                                    color={color}
                                    req={true}
                                    title={`enter new rate of room for ${selectedDate}`}
                                    tooltip={true}
                                />

                            </form>
                            <select
                                className={`shadow-sm ${color?.greybackground} capitalize border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-11/12 mx-4 p-2.5 mb-4`}
                                onChange={(e) => setEditUI(e.target.value)}>
                                <option selected>Change rate options</option>
                                <option value="discount">I want to give discount</option>
                                <option value="modification">I want to do rate modification</option>
                            </select>

                            {/* discount ui */}
                            {editUI === 'discount' ?
                                <div>
                                    <RoomDiscounts />
                                </div>
                                : undefined}
                            {/* modification ui */}
                            {editUI === 'modification' ?
                                <div>
                                    <RoomRateModification />
                                </div> : undefined}


                            <div className="items-center p-4 border-t border-gray-200 rounded-b">
                                <Button Primary={language?.Update} onClick={() => { updateRate() }} />

                            </div>


                        </div>
                    </div>
                </div> : undefined
            }

        </div >
    );
};

export default RoomPriceCalendar;

