import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Create a connection pool to reuse connections
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 40, // Adjust based on your traffic
    queueLimit: 0,
    connectTimeout: 10000,
    ssl: {
        rejectUnauthorized: false
    }
});

export async function GET(request: NextRequest) {
    console.log('API route hit');
    
    const doc_number = request.nextUrl.searchParams.get('doc_number');
    
    if (!doc_number) {
        return NextResponse.json({ error: 'Missing doc_number parameter' }, { status: 400 });
    }

    console.log('Doc number:', doc_number);

    try {
        // Execute the query with prepared statements to prevent SQL injection
        const [rows]: [any[], any] = await pool.execute(`
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
                c.Description AS customer_name 
            FROM 
                bit_drywall_erp.tblsaleslines l 
            JOIN 
                bit_drywall_erp.tblmultistore m ON l.store = m.code 
            JOIN 
                bit_drywall_erp.tblcustomers c ON l.customer = c.Code 
            JOIN 
                bit_drywall_erp.tblparameters p
            WHERE 
                l.doc_number = ?
        `, [doc_number]);
        
        console.log('Query executed successfully');

        if (rows.length > 0) {
            console.log('Data returned:', rows);
            return NextResponse.json(rows);
        } else {
            return NextResponse.json({ message: 'No data found for this invoice' }, { status: 404 });
        }

    } catch (error: unknown) {
        console.error('Error during database query:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });

    }
}
