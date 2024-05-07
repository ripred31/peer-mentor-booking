import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(req, res) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const bookingId = searchParams.get('bookingId')

    const dbconnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    const query = `
        SELECT  
            Booking.MentorID,
            Booking.MenteeID,
            Booking.Location,
            Booking.Date,
            Booking.Time,
            Booking.Status,
            Mentor.AreaOfExpertise,
            Mentor.Bio,
            User.Name,
            User.Email
        FROM 
            Booking 
        JOIN
            Mentor ON Mentor.MentorID = Booking.MentorID
        JOIN
            User ON User.UserID = Mentor.UserID
        WHERE 
            BookingID = ?
    `;

    try {
        const [rows, fields] = await dbconnection.execute(query, [bookingId]);
        const bookings = rows.map(row => ({
            mentorID: row.MentorID,
            menteeID: row.MenteeID,
            location: row.Location,
            date: row.Date,
            time: row.Time,
            status: row.Status,
            areaOfExpertise: row.AreaOfExpertise,
            bio: row.Bio,
            name: row.Name,
            email: row.Email
        }));
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.error({ error: error.message });
    } finally {
        await dbconnection.end();
    }
}
