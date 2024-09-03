import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('API route hit');
    
    const { doc_number } = req.query;
    console.log('Doc number:', doc_number);

    try {
        console.log('Connecting to the database');
        
        // Establish a connection to the database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            ssl: {
                rejectUnauthorized: false
            }
        });

        console.log('Connected to the database');

        // Execute the query with the doc_number parameter
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

        console.log('Query executed successfully');

        // Close the connection
        await connection.end();

        // Return the results
        console.log('Rows:', rows);
        res.status(200).json(rows);
        
    } catch (error) {
        console.log('Error connecting to the database or executing the query', error);
        res.status(500).json({ error: 'Database query failed' });
    }
}