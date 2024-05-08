import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(req, res) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get('id');

    console.log('ID:', id);

    if (!id) {
        return NextResponse.error({ error: 'Missing ID parameter' }, 400);
    }

    const dbconnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    try {
        const [userRows, userFields] = await dbconnection.execute('SELECT * FROM User WHERE UserID = ?', [id]);

        if (userRows.length === 0) {
            return NextResponse.error({ error: 'User not found' }, 404);
        }

        let additionalInfo;
        if (userRows[0].UserType === 'Mentee') {
            const [menteeRows, menteeFields] = await dbconnection.execute('SELECT Bio, AreaOfNeed FROM Mentee WHERE UserID = ?', [id]);
            additionalInfo = menteeRows[0];
        } else if (userRows[0].UserType === 'Mentor') {
            const [mentorRows, mentorFields] = await dbconnection.execute('SELECT Bio, AreaOfExpertise, Available FROM Mentor WHERE UserID = ?', [id]);
            additionalInfo = mentorRows[0];
        }

        const userInfo = { ...userRows[0], ...additionalInfo };

        return NextResponse.json({ userInfo });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error({ error: error.message });
    } finally {
        await dbconnection.end();
    }
}
