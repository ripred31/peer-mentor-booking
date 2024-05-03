import dayjs from 'dayjs';
import MentorDropdown from './MentorSelect';
import TimeSelect from './TimeSelect';
import React, { useState } from 'react';

export default function BookingModal({ isVisible, onClose, selectedDate }) {
    const [selectedMentorID, setSelectedMentorID] = useState('');

    if( !isVisible ) return null;

    const handleClose = (e) => {
        if( e.target.id === "wrapper") onClose()
    }

    const formattedDate = selectedDate ? dayjs(selectedDate).format('ddd, DD MMM YYYY') : '';

    const handleMentorSelect = (mentorID) => {
        setSelectedMentorID(mentorID);
    };

    console.log(selectedMentorID)

    return(
        <div 
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            id="wrapper" 
            onClick={handleClose}
        >
            <div className="w-[600px] flex flex-col">
                <button 
                    className="text-white text-xl place-self-end"
                    onClick={() => onClose()}
                >
                    X
                </button>
                <div className="bg-white p-2 rounded-md">
                    <div className="p-6 text-left">
                        <h3 className="font-medium">
                            Create Booking
                        </h3>
                        <form method="post" action="/api/createBooking">
                            <div>
                                <label>
                                    Selected Date: {formattedDate}
                                </label>
                                <div className='mt-4'>
                                    <MentorDropdown onMentorSelect={handleMentorSelect} />
                                </div>
                                <div className='mt-4'>
                                    <TimeSelect />
                                </div>
                                <div className='mt-4'>
                                    <label htmlFor="location">Location:</label>
                                    <input type="text" id="location" name="location" />
                                </div>
                                <div className="mt-6">
                                    <input 
                                        type="submit" 
                                        value="Submit" 
                                        className="bg-rose-900 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded" 
                                    />
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )

}