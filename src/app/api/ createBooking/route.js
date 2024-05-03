import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(req, res) {
    const { UserID, selectedDate, selectedTime, mentorID, location } = req.body;

    const dbconnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    try {
        const [menteeRows] = await dbconnection.execute('SELECT MenteeID FROM Mentee WHERE UserID = ?', [UserID]);
        const menteeID = menteeRows[0].MenteeID;

        const [bookingIDRows] = await dbconnection.execute('SELECT MAX(BookingID) as maxBookingID FROM Booking');
        const bookingID = bookingIDRows[0].maxBookingID + 1;

        // await dbconnection.execute(
        //     'INSERT INTO Booking (BookingID, MenteeID, MentorID, Location, Date, Time, Status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        //     [bookingID, menteeID, mentorID, location, selectedDate, selectedTime, 'Pending']
        // );

        return NextResponse.json({ message: 'Booking created successfully' });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.error({ error: error.message });
    } finally {
        await dbconnection.end();
    }
}
