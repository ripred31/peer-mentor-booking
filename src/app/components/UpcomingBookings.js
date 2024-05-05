import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function UpcomingBookings({ userId }) {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        async function fetchUpcomingBookings() {
            try {
                const response = await fetch(`/api/getUpcomingBookings?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch upcoming bookings');
                }
                const data = await response.json();
                setBookings(data.bookings);
            } catch (error) {
                console.error('Error fetching upcoming bookings:', error);
            }
        }

        fetchUpcomingBookings();
    }, [userId]);

    return (
        <div className='w-auto'>
            {bookings.map(booking => (
                <div key={booking.bookingID} className='my-4'>
                    <p>{dayjs(booking.date).format('ddd, DD MMM YYYY')} - {booking.time}</p>
                    <p>{booking.location}</p>
                    <p>{booking.status}</p>
                </div>
            ))}
        </div>
    );
}
