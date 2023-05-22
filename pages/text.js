import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

const RoomPriceCalendar = () => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        (function initialData() {
            let item = [];
            for (let i = 0; i < 30; i++) {
                item.push({ title: `Rate is ${i}000`, date: i < 10 ? `2023-05-0${i}` : `2023-05-${i}` })
            }
            setEvents(item)
        })()
    }, [])
    const roomTypes = [
        { id: 'a', title: 'Room Type A' },
        { id: 'b', title: 'Room Type B' },
    ];

    const roomPrices = [
        { resourceId: 'a', title: '\$100', start: '2023-06-01', editable: true },
        { resourceId: 'a', title: '\$120', start: '2023-06-02', editable: true },
        // ...
        { resourceId: 'b', title: '\$150', start: '2023-06-01', editable: true },
        { resourceId: 'b', title: '\$170', start: '2023-06-02', editable: true },
        // ...
    ];



    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    // const handleDateClick = (arg) => {
    //     setSelectedDate(arg.dateStr);
    //     setModalVisible(true);
    // };

    const handleDateClick = (event) => { // bind with an arrow function
        // let newEvent = [{title:}]
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
        {/* <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
                initialView="timelineMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timelineMonth,timelineWeek,timelineDay'
                }}
                events={roomPrices}
                resources={roomTypes}
                schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                eventOverlap={false}
                eventDurationEditable={true}
                eventResourceEditable={true}
                dayClick={handleDateClick}
                selectable ={true}
            /> */}

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

