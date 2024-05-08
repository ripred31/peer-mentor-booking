import React from 'react';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className='flex h-auto'>
            <div className="bg-rose-900 p-4 flex w-full flex-row justify-center">
                <div>
                    <Link href="/dashboard">
                        <p className="inline-block py-2 px-4 text-white hover:bg-rose-700 rounded-md">Dashboard</p>
                    </Link>
                    <Link href="/">
                        <p className="inline-block py-2 px-4 text-white hover:bg-rose-700 rounded-md">About</p>
                    </Link>
                </div>
                <div>
                    <Link href="/">
                        <p className="inline-block py-2 px-4 text-white hover:bg-rose-700 rounded-md">Sign Out</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
