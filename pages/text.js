import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import roomPrice from '../components/devlopmentjson/roomPrice.json';
let i = 0;
const RoomPriceCalendar = () => {
    const [events, setEvents] = useState([])
    const [rooms, setRooms] = useState([])
    const [selectedRoom, setSelectedRoom] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');


    useEffect(() => {
        (function initialData() {
            setRooms(roomPrice.rates.map(item => ({ "room_id": item.room_id, "room_name": item.room_name })))
            setSelectedRoom({ "room_name": roomPrice?.rates[0].room_name, "room_id": roomPrice?.rates[0].room_id })
            setEvents(roomPrice?.rates[0].day_price)
        })()
    }, [])
    function changeRoom(e) {
        let newRoom = roomPrice?.rates?.filter(item => item.room_id === e.target.value)[0]
        alert(JSON.stringify(newRoom))
        setEvents(newRoom?.day_price)
        setSelectedRoom({ "room_name": newRoom.room_name, "room_id": newRoom.room_id })

    }
    const handleDateClick = (event) => { // bind with an arrow function
        setSelectedDate(event.dateStr);
        setModalVisible(true);
        console.log(JSON.stringify(event));
    }

    const closeModal = () => {
        setModalVisible(false);
    };
    function setNewValue(e) {
        let k = {
            "title": e.target.value,
            "date": selectedDate
        };
        let unchangedvalue = events?.filter(i => i.date != selectedDate)
        setEvents([...unchangedvalue, k])

    }

    return (
        <div>
            <div className='flex gap-2 justify-content items-center'>
                <label className="mt-4 block mb-2 text-sm font-bold text-gray-900 dark:text-white">Select Room</label>
                <select
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
            />

            {/* Tailwind CSS Modal */}
            {modalVisible && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                            onClick={closeModal}
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div
                            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    Date Selected
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Date: {selectedDate}
                                    </p>
                                </div>
                            </div>
                            <input type="text" onChange={(e) => setNewValue(e)}
                                defaultValue={events?.filter(i => i.date == selectedDate)[0]?.title} />
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomPriceCalendar;

