import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(req, res) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const email = searchParams.get('email');
    const password = searchParams.get('password');

    const dbconnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    try {
        const [userRows, userFields] = await dbconnection.execute('SELECT UserID FROM User WHERE Email = ? AND Password = ?', [email, password]);
        if (userRows.length === 0) {
            return NextResponse.error({ error: 'Incorrect email or password' });
        }

        const userId = userRows[0].UserID;
        return NextResponse.json({ userId });
    } catch (error) {
        return NextResponse.error({ error: error.message });
    } finally {
        await dbconnection.end();
    }
}
