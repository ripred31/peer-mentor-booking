'use client'

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Calendar from "../components/Calendar"
import MentorSelect from "../components/MentorSelect"
import BookingModal from "../components/BookingModal"
import BookingTable from "../components/BookingTable"
import React, { Fragment, useEffect, useState } from 'react';
import dayjs from "dayjs"

export default function Dashboard() {
    const [userInfo, setUserInfo] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [showModal, setShowModal] = useState(false);

    const userID = localStorage.getItem('UserID');

    useEffect(() => {
        async function fetchUserData() {
            try {
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

    const formattedDate = dayjs(selectedDate).format('ddd, DD MMM YYYY');

    return(
        <Fragment>
            <div className="h-full">
                <Header />
                <main className="flex">
                    <Navbar />
                    <div>
                        <Calendar 
                            onChange={handleDateSelect}
                            defaultDates={[dayjs()]}
                        />
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
                            userId={userID} 
                        />
                        <h1>
                            Hello {userInfo?.Name}
                        </h1>
                        <h2>
                            Your email is: {userInfo?.Email}
                        </h2>
                        <h3>Selected date is: {formattedDate}</h3>
                        <MentorSelect />
                    </div>
                    <div className="mx-6 my-4">
                        <h2 className="text-lg font-bold">Upcoming meetings:</h2>
                        <BookingTable
                            userId={userID}
                            selectedDate={selectedDate}
                        />
                    </div>
                </main>
                <Footer />
            </div>
        </Fragment>
    )

}