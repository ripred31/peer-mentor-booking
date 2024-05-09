import dayjs from 'dayjs';
import MentorDropdown from './MentorSelect';
import TimeSelect from './TimeSelect';
import React, { useState } from 'react';

export default function BookingModal({ isVisible, onClose, selectedDate, userId }) {
    const [selectedMentorID, setSelectedMentorID] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [location, setLocation] = useState('');

    const userID = userId;

    const formattedDate = selectedDate ? dayjs(selectedDate).format('ddd, DD MMM YYYY') : '';
    const sqlDate = dayjs(formattedDate).format('YYYY-MM-DD');

    if( !isVisible ) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `/api/newBooking?UserID=${userID}&selectedDate=${sqlDate}&selectedTime=${selectedTime}&mentorID=${selectedMentorID}&location=${location}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to create booking');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    const handleClose = (e) => {
        if( e.target.id === "wrapper") {
            onClose();
            setSelectedMentorID('');
            setSelectedTime('');
            setLocation('');
        }
    }

    const handleMentorSelect = (mentorID) => {
        setSelectedMentorID(mentorID);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const isFormValid = selectedMentorID && selectedTime && location;

    return(
        <div 
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            id="wrapper" 
            onClick={handleClose}
        >
            <div className="w-[600px] flex flex-col">
                <button 
                    className="text-white text-xl place-self-end"
                    onClick={() => {
                        onClose();
                        setSelectedMentorID('');
                        setSelectedTime('');
                        setLocation('');
                    }}
                >
                    X
                </button>
                <div className="bg-rose-900 p-2 rounded-md">
                    <div className="p-6 text-left">
                        <h3 className="text-white text-lg">
                            Create Booking
                        </h3>
                        <form method="post" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-white">
                                    Selected Date: {formattedDate}
                                </label>
                                {/** Mentor Dropdown */}
                                <div className='mt-4'>
                                    <MentorDropdown onMentorSelect={handleMentorSelect} />
                                </div>
                                {/** Time Select */}
                                <div className="text-lg">
                                    <TimeSelect onChange={handleTimeSelect} />
                                </div>
                                {/** Location input */}
                                <div className="text-white text-lg">
                                    <label htmlFor="location">Location:</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={location}
                                        onChange={handleLocationChange}
                                    />
                                </div>
                                <div className="mt-6">
                                    <input 
                                        type="submit" 
                                        value="Submit" 
                                        className={`bg-rose-900 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={!selectedMentorID || !selectedTime || !location}
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
