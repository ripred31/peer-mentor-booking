'use client'

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Calendar from "../components/Calendar"
import MentorSelect from "../components/MentorSelect"
import BookingModal from "../components/BookingModal"
import React, { Fragment, useEffect, useState } from 'react';

export default function Dashboard() {
    const [userInfo, setUserInfo] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userID = localStorage.getItem('UserID');
                const response = await fetch(`/api/getUserInfo?id=${userID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                setUserInfo(userData.userInfo);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, []);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    console.log('dashboard: ', selectedDate)

    return(
        <Fragment>
            <div className="h-full">
                <Header />
                <main className="flex">
                    <Navbar />
                    <div>
                        <Calendar onChange={handleDateSelect}/>
                        <button 
                            className="text-white bg-rose-900 hover:bg-rose-700 px-6 py-2 rounded-md"
                            onClick={() => setShowModal(true)}
                        >
                            Add Event
                        </button>
                        <BookingModal 
                            isVisible={showModal}
                            onClose={() => setShowModal(false)}
                            selectedDate={selectedDate} 
                        />
                        <h1>
                            Hello {userInfo?.Name}
                        </h1>
                        <h2>
                            Your email is: {userInfo?.Email}
                        </h2>
                        <h3>Selected date is: {selectedDate ? selectedDate.toString() : ''}</h3>
                        <MentorSelect />
                    </div>
                </main>
                <Footer />
            </div>
        </Fragment>
    )

}