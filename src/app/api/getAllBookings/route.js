import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(req, res) {
    const dbconnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    const query = 'SELECT * FROM Booking';

    try {
        const [rows, fields] = await dbconnection.execute(query);
        const bookings = rows.map(row => ({
            bookingID: row.BookingID,
            menteeID: row.MenteeID,
            mentorID: row.MentorID,
            location: row.Location,
            date: row.Date,
            time: row.Time,
            status: row.Status
        }));
        return NextResponse.json({ bookings });
    } catch (error) {
        return NextResponse.error({ error: error.message });
    } finally {
        await dbconnection.end();
    }
}
