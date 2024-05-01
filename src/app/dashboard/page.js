'use client'

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Calendar from "../components/Calendar"
import MentorSelect from "../components/MentorSelect"
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('/api/getUserInfo?id=1');
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

    return(
        <div className="h-full">
            <Header />
            <main className="flex">
                <Navbar />
                <div>
                    <Calendar />
                    <h1>
                        Hello {userInfo?.Name}
                    </h1>
                    <h2>
                        Your email is: {userInfo?.Email}
                    </h2>
                    <MentorSelect />
                </div>
            </main>
            <Footer />
        </div>
    )

}