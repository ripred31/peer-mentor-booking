import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function BookingTable({ userId, selectedDate }) {
    const [bookings, setBookings] = useState([]);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await fetch(`/api/getUserInfo?id=${userId}`);
            const data = await response.json();
            setUserType(data.userInfo.UserType);
        };

        fetchUserInfo();
    }, [userId]);

    useEffect(() => {
        const fetchBookings = async () => {
            const formattedDate = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : '';
            const sqlDate = dayjs(formattedDate).format('YYYY-MM-DD');
            
            let apiUrl;
            if (userType === 'Mentee') {
                apiUrl = `/api/getMenteeBookings?userId=${userId}&selectedDate=${sqlDate}`;
            } else if (userType === 'Mentor') {
                apiUrl = `/api/getMentorBookings?userId=${userId}&selectedDate=${sqlDate}`;
            } else {
                console.error('Invalid user type');
                return;
            }
    
            const response = await fetch(apiUrl);
            const data = await response.json();
            setBookings(data.bookings);
        };
    
        fetchBookings();
    }, [userId, selectedDate, userType]);
    
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
                        <label className='text-md font-bold mr-4'>{userType === 'Mentee' ? 'Mentor' : 'Mentee'}</label>
                        <p>{userType === 'Mentee' ? booking.mentorName : booking.menteeName}</p>
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