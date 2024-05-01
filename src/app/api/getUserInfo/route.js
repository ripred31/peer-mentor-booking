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
        const [rows, fields] = await dbconnection.execute('SELECT * FROM User WHERE UserID = ?', [id]);

        if (rows.length === 0) {
            return NextResponse.error({ error: 'User not found' }, 404);
        }

        return NextResponse.json({ userInfo: rows[0] });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error({ error: error.message });
    } finally {
        await dbconnection.end();
    }
}
