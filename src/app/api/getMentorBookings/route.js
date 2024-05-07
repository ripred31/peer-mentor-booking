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
        const [mentorIdRows, mentorIdFields] = await dbconnection.execute('SELECT MentorID FROM Mentor WHERE UserID = ?', [userId]);
        if (mentorIdRows.length === 0) {
            return NextResponse.error({ error: 'Mentor ID not found' });
        }
        const mentorId = mentorIdRows[0].MentorID;

        const query = `
            SELECT 
                Booking.BookingID, 
                Booking.MenteeID, 
                Booking.MentorID, 
                Booking.Location, 
                Booking.Date, 
                Booking.Time, 
                Booking.Status, 
                User.Name AS MenteeName, 
                User.Email AS MenteeEmail
            FROM 
                Booking
            JOIN 
                Mentee ON Booking.MenteeID = Mentee.MenteeID
            JOIN 
                User ON Mentee.UserID = User.UserID
            WHERE 
                Booking.MentorID = ? AND 
                Date = ?
        `;
        const [bookingRows, bookingFields] = await dbconnection.execute(query, [mentorId, selectedDate]);
        const bookings = bookingRows.map(row => ({
            bookingID: row.BookingID,
            menteeID: row.MenteeID,
            mentorID: row.MentorID,
            menteeName: row.MenteeName,
            menteeEmail: row.MenteeEmail,
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
