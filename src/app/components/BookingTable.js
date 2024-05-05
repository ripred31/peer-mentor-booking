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
    return(
        <div>
            {bookings.map(booking => (
                <div key={booking.bookingID}>
                    <p>{booking.date} - {booking.time}</p>
                    <p>{booking.location}</p>
                    <p>{booking.status}</p>
                </div>
            ))}
        </div>
    )
}