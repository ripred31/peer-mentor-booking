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

    const query = 'SELECT u.Name, m.MentorID FROM User u JOIN Mentor m ON u.UserID = m.UserID WHERE u.UserType = "Mentor"';

    try {
        const [rows, fields] = await dbconnection.execute(query);
        const mentors = rows.map(row => ({ name: row.Name, mentorID: row.MentorID }));
        return NextResponse.json({ mentors });
    } catch (error) {
        return NextResponse.error({ error: error.message });
    } finally {
        await dbconnection.end();
    }
}
