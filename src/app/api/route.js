import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(req, res) {

    const dbconnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })

    try {
        const [rows, fields] = await dbconnection.execute('SELECT * FROM Mentor');
        return NextResponse.json({ mentors: rows });
    } catch (error) {
        return NextResponse.error({ error: error.message });
    } finally {
        await dbconnection.end();
    }

}