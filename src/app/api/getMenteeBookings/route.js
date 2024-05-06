import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(req, res) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const userId = searchParams.get('userId');
    const selectedDate = searchParams.get('selectedDate');

    const dbconnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    try {
        const [menteeIdRows, menteeIdFields] = await dbconnection.execute('SELECT MenteeID FROM Mentee WHERE UserID = ?', [userId]);
        if (menteeIdRows.length === 0) {
            return NextResponse.error({ error: 'Mentee ID not found' });
        }
        const menteeId = menteeIdRows[0].MenteeID;

        const query = `
            SELECT 
                Booking.BookingID, 
                Booking.MenteeID, 
                Booking.MentorID, 
                Booking.Location, 
                Booking.Date, 
                Booking.Time, 
                Booking.Status, 
                User.Name AS MentorName, 
                User.Email AS MentorEmail
            FROM 
                Booking
            JOIN 
                Mentor ON Booking.MentorID = Mentor.MentorID
            JOIN 
                User ON Mentor.UserID = User.UserID
            WHERE 
                Booking.MenteeID = ? AND 
                Date = ?
        `;
        const [bookingRows, bookingFields] = await dbconnection.execute(query, [menteeId, selectedDate]);
        const bookings = bookingRows.map(row => ({
            bookingID: row.BookingID,
            menteeID: row.MenteeID,
            mentorID: row.MentorID,
            mentorName: row.MentorName,
            mentorEmail: row.MentorEmail,
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
