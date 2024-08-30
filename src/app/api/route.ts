import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request: NextRequest) {
    console.log('API route hit');
    const searchParams = request.nextUrl.searchParams;
    const doc_number = searchParams.get('doc_number');
    console.log('Doc number:', doc_number);

    let connection;

    try {
        // Establish a connection to the database
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            connectionLimit: 200000
        });

        // Execute a query with the doc_number parameter
        const [rows] = await connection.execute(`
            SELECT 
                l.doc_number, 
                l.description, 
                l.incl_price, 
                l.incl_line_total, 
                l.tax, 
                l.sale_date, 
                m.description AS store_name, 
                m.address_1, 
                m.address_2, 
                m.address_3, 
                m.address_4, 
                m.address_5, 
                m.address_6, 
                m.address_7, 
                c.Description AS customer_name, 
                p.com_logo 
            FROM 
                bit_drywall_erp.tblsaleslines l 
            JOIN 
                bit_drywall_erp.tblmultistore m ON l.store = m.code 
            JOIN 
                bit_drywall_erp.tblcustomers c ON l.customer = c.Code 
            JOIN 
                bit_drywall_erp.tblparameters p
            WHERE 
                doc_number = ?
        `, [doc_number]);
        
        console.log('Query results:', rows);
        

        if (Array.isArray(rows) && rows.length > 0) {
            // Return the data without additional formatting
            return NextResponse.json(rows);
        } else {
            return NextResponse.json({ message: 'No data found for this invoice' }, { status: 404 });
        }

    } catch (error) {
        console.error('Database connection or query error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

    } finally {
        if (connection) {
            await connection.end();
        }
    }
}