'use client'

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Calendar from "../components/Calendar"
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            const response = await fetch('/api/getUserName');
            const userData = await response.json();
            setUserName(userData.userInfo.Name);
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
                        Hello {userName}
                    </h1>
                </div>
            </main>
            <Footer />
        </div>
    )

}