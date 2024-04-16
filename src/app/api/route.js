import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "../sharedCode/common";

let connectionParams = GetDBSettings();

export async function GET(request) {

    try {
        const connection = await mysql.createConnection(connectionParams);

        let get_exp_query = "";
        get_exp_query = "SELECT * FROM mentor.PeerMentor";

        let values = [];

        const [results] = await connection.execute(get_exp_query, values);

        connection.end();

        return NextResponse.json(results)

    } catch(err) {
        console.log('ERROR: API - ', err.message);

        const results = {
            error: err.message,
            returnedStatus: 200,
        };

        return NextResponse.json(response, { status: 200 });
    }
}