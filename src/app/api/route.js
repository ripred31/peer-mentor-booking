import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(req, res) {

    const dbconnection = await mysql.createConnection({
        host: '73.79.171.54',
        port: '3306',
        user: 'martin',
        password: 'SeniorCapstone2024!',
        database: 'peer-mentor'
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