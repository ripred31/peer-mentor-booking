import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(req, res) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const bio = searchParams.get('bio');
    const areaOfNeed = searchParams.get('areaOfNeed');

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
        await dbconnection.execute('UPDATE User SET Name = ?, Email = ? WHERE UserID = ?', [name, email, id]);

        await dbconnection.execute('UPDATE Mentee SET Bio = ?, AreaOfNeed = ? WHERE UserID = ?', [bio, areaOfNeed, id]);

        return NextResponse.json({ message: 'User information updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error({ error: error.message });
    } finally {
        await dbconnection.end();
    }
}
