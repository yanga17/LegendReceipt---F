'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

type Params = {
    params: {
        doc_number: string
    }
}

export default function Page({ params: { doc_number }}: Params) {
    const router = useRouter();

    const uid = 'QNJ00010'

    return(
        <div>
            <Link type="button" className="mt-52 bg-purple w-40 h-20 rounded-lg text-white hover:bg-[#af9dfa]" href={`/invoice/${uid}`}>
                View Invoice
            </Link>
        </div>
    )
}