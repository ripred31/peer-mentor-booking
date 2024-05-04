import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import dayjs from 'dayjs';

export async function GET(req, res) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const UserID = searchParams.get('UserID');
    const mentorID = searchParams.get('mentorID');
    const location = searchParams.get('location');
    const selectedDate = searchParams.get('selectedDate');
    const selectedTime = searchParams.get('selectedTime');

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

        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');

        await dbconnection.execute(
            'INSERT INTO Booking (MenteeID, MentorID, Location, Date, Time, Status) VALUES (?, ?, ?, ?, ?, ?)',
            [menteeID, mentorID, location, formattedDate, selectedTime, 'Pending']
        );

        return NextResponse.json({ message: 'Booking created successfully' });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.error({ error: error.message });
    } finally {
        await dbconnection.end();
    }
}