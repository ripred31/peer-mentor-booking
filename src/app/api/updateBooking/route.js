import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(req, res) {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const bookingId = searchParams.get('bookingId');
    const status = searchParams.get('status');

    console.log('Booking id in route:', bookingId)
    console.log('Status in route:', status)

    if (!bookingId || !status) {
        return NextResponse.error({ error: 'Booking ID and status are required' }, 400);
    }

    const dbconnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    try {
        const query = 'UPDATE Booking SET Status = ? WHERE BookingID = ?';
        const [result] = await dbconnection.execute(query, [status, bookingId]);

        if (result.affectedRows === 1) {
            return NextResponse.json({ message: 'Booking updated successfully' });
        } else {
            return NextResponse.error({ error: 'Booking not found' }, 404);
        }
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.error({ error: 'Failed to update booking' }, 500);
    } finally {
        await dbconnection.end();
    }
}
