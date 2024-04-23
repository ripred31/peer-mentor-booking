import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    const { UserID } = req.query;

    if (!UserID) {
        return res.status(400).json({ error: 'UserID is required' });
    }

    const dbconnection = await mysql.createConnection({
        host: '73.79.171.54',
        port: '3306',
        user: 'martin',
        password: 'SeniorCapstone2024!',
        database: 'peer-mentor'
    });

    try {
        const [rows, fields] = await dbconnection.execute('SELECT Name FROM User WHERE UserID = ?', [UserID]);

        // Check if user exists
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userName = rows[0].Name;
        return res.status(200).json({ userName });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } finally {
        await dbconnection.end();
    }
}
