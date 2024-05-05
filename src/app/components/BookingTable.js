import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function BookingTable({ userId, selectedDate }) {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const formattedDate = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : '';
            const sqlDate = dayjs(formattedDate).format('YYYY-MM-DD');

            const response = await fetch(`/api/getUserBookings?userId=${userId}&selectedDate=${sqlDate}`);
            const data = await response.json();
            setBookings(data.bookings);
        };

        fetchBookings();
    }, [userId, selectedDate]);
    return (
        <div>
            {bookings.map(booking => (
                <div key={booking.bookingID} className='my-4 border-2 rounded-lg p-4'>
                    <div className='flex'>
                        <label className='text-md font-bold mr-4'>Date:</label>
                        <p>{booking.date} - {booking.time}</p>
                    </div>
                    <div className='flex'>
                        <label className='text-md font-bold mr-4'>Location:</label>
                        <p>{booking.location}</p>
                    </div>
                    <div className='flex'>
                        <label className='text-md font-bold mr-4'>Mentor:</label>
                        <p>{booking.mentorName}</p>
                    </div>
                    <div className='flex'>
                        <label className='text-md font-bold mr-4'>Status:</label>
                        <p>{booking.status}</p>
                    </div>
                </div>
            ))}
        </div>
    );
    
}