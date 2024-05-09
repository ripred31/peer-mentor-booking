import { useEffect, useState } from 'react';
import Button from './Button';
import dayjs from 'dayjs';

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

    const isPending = booking && booking.status === 'Pending';

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
            <div>
                <strong>Mentor Name:</strong> {booking.name}<br />
                <strong>Mentor Email:</strong> {booking.email}<br />
                <strong>Location:</strong> {booking.location}<br />
                <strong>Date:</strong> {dayjs(booking.date).format('ddd, DD MMM YYYY')}<br />
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
