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

    try {
        // Dummy data
        const bookingID = 8;
        const menteeID = 2;
        const mentorID = 1;
        const location = 'Test Location2';
        const date = '2024-05-06'; // YYYY-MM-DD
        const time = '12:00:00'; // HH:MM:SS
        const status = 'Pending';

        await dbconnection.execute(
            'INSERT INTO Booking (BookingID, MenteeID, MentorID, Location, Date, Time, Status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [bookingID, menteeID, mentorID, location, date, time, status]
        );

        return NextResponse.json({ message: 'Booking created successfully', bookingID });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.error({ error: error.message });
    } finally {
        await dbconnection.end();
    }
}
