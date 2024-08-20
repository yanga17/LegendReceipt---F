'use client'

import * as React from "react"
import { useState, useEffect } from 'react'
import { CheckIcon, Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { apiEndPoint } from '@/utils/colors';
import Image from 'next/image';
import axios from 'axios';

interface ReceiptData {
    doc_number: string;
    description: string;
    incl_price: number;
    incl_line_total: number;
    tax: number;
    sale_date: string;
}
type ReceiptResponse = ReceiptData[];

export default function Page() {
    const [receiptdata, setReceiptData] = useState<ReceiptResponse>([]);

    const fetchReceiptData = async (docNum: string) => {
        try {
            const url = `invoice/getinvoice/${docNum}`;
            const response = await axios.get<ReceiptResponse>(`${apiEndPoint}/${url}`);
            setReceiptData(response.data);
            console.log("Receipt response:", response);
        } catch (error) {
            console.error('Error fetching receipt data:', error);
        }
    }

    useEffect(() => {
        const initialDocNum = 'QNJ00010'; // Assuming you want to fetch data for this doc number on mount
        fetchReceiptData(initialDocNum);
    }, []);

    // Extract common details outside the loop
    const doc_number = receiptdata[0]?.doc_number || '';
    const sale_date = receiptdata[0]?.sale_date ? new Date(receiptdata[0].sale_date).toLocaleDateString() : '';
    const totalAmount = receiptdata.reduce((sum, item) => sum + item.incl_line_total, 0);

    return (
        <div className="min-h-screen overflow-y-auto">
            <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-center mb-4">Roadside Assistance Services</h2>
                <div className="flex justify-center bg-white mb-6">
                    <button>
                        <CheckIcon size={80} strokeWidth={2} color="green" />
                    </button>
                </div>

                <h3 className="text-center text-lg mb-6 font-bold">Payment Received</h3>

                {/* Display these common details only once */}
                <div className="text-center mb-6">
                    <h4 className="text-sm">TAX INVOICE</h4>
                    <p className="text-sm">
                        Thank you for your payment of{' '}
                        <span className="text-green">R{totalAmount.toFixed(2)}</span> on{' '}
                        <strong>{sale_date}</strong>
                    </p>
                    <div className="flex items-center justify-center gap-4 pt-6 divide-x text-gray-500">
                        <p className="mb-2 text-xs font-bold">Sale #{doc_number}</p>
                        <p className="mb-2 text-xs font-bold pl-4">VAT Number: 4530125071</p>
                    </div>
                </div>

                <div className="w-full mb-4 text-left">
                    <div className="flex justify-between border-b border-gray-300 text-xs text-gray-400">
                        <div className="py-2">DESCRIPTION</div>
                        <div className="py-2">AMOUNT</div>
                    </div>

                    {/* Loop through and display each item */}
                    {receiptdata.map(({ description, incl_price, incl_line_total }, index) => (
                        <div key={index} className="flex flex-col py-2 text-xs">
                            <div className="flex justify-between">
                                <div>
                                    <p>{description}</p>
                                </div>
                                <p>R{incl_line_total.toFixed(2)}</p>
                            </div>
                            {/* Include the additional details */}
                            <div className="text-xs text-gray-500 pl-4">
                                <p>1 Each @ R{incl_price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between pt-4">
                        <p>Total VAT:</p>
                        <p>R{receiptdata.reduce((sum, item) => sum + item.tax, 0).toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total (Incl. tax):</p>
                        <p>R{totalAmount.toFixed(2)}</p>
                    </div>
                </div>

                <div className="flex justify-between border-t border-gray-300 text-md font-bold">
                    <div className="py-2">Amount Paid:</div>
                    <div className="py-2">R{totalAmount.toFixed(2)}</div>
                </div>
                <div className="flex justify-between border-b border-gray-300 text-xs text-gray-500 py-4 font-bold uppercase">
                    <div>Card</div>
                    <div>Approved</div>
                </div>
                <div className="text-left text-sm pt-6 pb-2">
                    <p>Thank you for your business</p>
                </div>

                <div className="text-left text-sm pt-4 pb-3">
                    <p className="py-1">Contact Us:</p>
                    <p className="py-1">011 991 8000</p>
                </div>

                <div className="text-left text-sm pb-6">
                    <p className="py-0">Roadside Assistance Services</p>
                    <p className="py-0">4 Ellis Road</p>
                    <p className="py-0">Constantia Kloof</p>
                    <p className="py-0">Block E, 4th Floor</p>
                    <p className="py-0">Johannesburg</p>
                    <p className="py-0">1709</p>
                </div>

                <div className="bg-black text-white py-10 flex justify-between gap-4 px-6 -mx-6">
                    <div className="w-[200px]">
                        <p className="text-sm">Get in touch:</p>
                        <p className="text-sm">
                            Visit
                            <a href="https://www.yoco.com/za/" className="text-blue">
                                {' '}
                                www.yoco.com
                            </a>
                            ,
                            <a href="https://api.whatsapp.com/send/" className="text-blue">
                                {' '}
                                Call us
                            </a>
                        </p>
                        <p className="text-sm">Mon - Sat: 8am - 5pm,</p>
                        <p className="text-sm"> Sun: (Chat only) 8am - 5pm</p>
                    </div>
                    <div className="w-[200px] pt-4">
                        <div className="flex flex-cols gap-4">
                            <Facebook size={20} strokeWidth={2} />
                            <Twitter size={20} strokeWidth={2} />
                            <Instagram size={20} strokeWidth={2} />
                            <Youtube size={20} strokeWidth={2} />
                            <Linkedin size={20} strokeWidth={2} />
                        </div>
                        <p className="text-sm">Yoco Technologies Pty Ltd</p>
                        <p className="text-sm">7th Floor, 56 Shortmarket Street</p>
                        <p className="text-sm">Cape Town</p>
                        <p className="text-sm">Western Cape, 8001, ZA</p>
                        <div className="pt-4">
                            <a href="https://www.yoco.com/za/" className="text-sm text-blue pt-6">
                                Become a Yoco merchant
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between border-t border-gray-300 text-xs text-gray-500 py-4 font-bold uppercase">
                    <p className="py-2 text-xs font-bold">Reference Number:</p>
                    <p className="py-2 text-xs font-bold">ADpey2aS60nP</p>
                </div>
                <div className="flex items-center justify-center pt-6">
                    <Image
                        src="/covers/yoco.png"
                        alt="Yoco"
                        width={100}
                        height={30}
                        className="text-center"
                    />
                </div>
            </div>
        </div>
    );
}
