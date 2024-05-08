export default function Button({ method, bookingId }) {

    const status = method === 'Confirm' ? 'Confirmed' : 'Cancelled'

    const handleClick = async () => {
        try {
            const response = await fetch(`/api/updateBooking?bookingId=${bookingId}&status=${status}`);
            if (!response.ok) {
                throw new Error('Failed to update booking');
            }
            console.log('Booking updated successfully');

            const bookingResponse = await fetch(`/api/getSelectedBooking?bookingId=${bookingId}`);
            if (!bookingResponse.ok) {
                throw new Error('Failed to fetch updated booking');
            }

        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    return (
        <button 
            className="text-white bg-rose-900 hover:bg-rose-700 px-6 py-2 rounded-md"
            onClick={handleClick}
        >
            {method === 'Confirm' ? 'Confirm' : 'Cancel'}
        </button>
    );
}
