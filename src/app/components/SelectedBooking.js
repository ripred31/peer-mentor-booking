import { useEffect, useState } from 'react';
import Button from './Button';

export default function SelectedBooking({ bookingId }) {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await fetch(`/api/getSelectedBooking?bookingId=${bookingId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch booking');
                }
                const data = await response.json();
                setBooking(data[0]);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (bookingId) {
            fetchBooking();
        }
    }, [bookingId]);

    const isPending = booking.status === 'Pending';

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!booking) {
        return <div>No booking found</div>;
    }

    return (
        <div>
            <h2>Selected Booking</h2>
            <div>
                <strong>Mentor ID:</strong> {booking.mentorID}<br />
                <strong>Mentee ID:</strong> {booking.menteeID}<br />
                <strong>Mentor Name:</strong> {booking.name}<br />
                <strong>Mentor Email:</strong> {booking.email}<br />
                <strong>Location:</strong> {booking.location}<br />
                <strong>Date:</strong> {booking.date}<br />
                <strong>Time:</strong> {booking.time}<br />
                <strong>Status:</strong> {booking.status}<br />
                <strong>Area of Expertise:</strong> {booking.areaOfExpertise}<br />
                <strong>Bio:</strong> {booking.bio}<br />
            </div>
            <div className='flex justify-between mt-4'>
                {isPending && <Button method='Confirm' bookingId={bookingId} />}
                {isPending && <Button method='Cancel' bookingId={bookingId} />}
            </div>
        </div>
    );
}
