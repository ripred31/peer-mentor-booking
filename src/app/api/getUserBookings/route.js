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
        // Query user type based on UserID
        const [userRows, userFields] = await dbconnection.execute('SELECT UserType FROM User WHERE UserID = ?', [userId]);
        if (userRows.length === 0) {
            return NextResponse.error({ error: 'User not found' });
        }
        const userType = userRows[0].UserType;

        let idField, idQuery;
        if (userType === 'Mentee') {
            idField = 'MenteeID';
            idQuery = 'SELECT MenteeID FROM Mentee WHERE UserID = ?';
        } else if (userType === 'Mentor') {
            idField = 'MentorID';
            idQuery = 'SELECT MentorID FROM Mentor WHERE UserID = ?';
        } else {
            return NextResponse.error({ error: 'Invalid user type' });
        }

        // Fetch the ID (MentorID or MenteeID) based on user type
        const [idRows, idFields] = await dbconnection.execute(idQuery, [userId]);
        if (idRows.length === 0) {
            return NextResponse.error({ error: `${userType} ID not found` });
        }
        const id = idRows[0][idField];

        // Fetch bookings based on user type
        const query = `SELECT * FROM Booking WHERE ${idField} = ? AND Date = ?`;
        const [bookingRows, bookingFields] = await dbconnection.execute(query, [id, selectedDate]);
        const bookings = bookingRows.map(row => ({
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
