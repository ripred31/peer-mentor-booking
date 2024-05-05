import Link from 'next/link';

export default function Navbar() {
    return (
        <div className='flex h-auto'>
            <div className="bg-rose-900 w-48 p-4 flex-grow flex flex-col justify-between">
                <div>
                    <Link href="/dashboard">
                        <p className="block py-2 px-4 text-white hover:bg-rose-700 rounded-md">Dashboard</p>
                    </Link>
                    <Link href="/">
                        <p className="block py-2 px-4 text-white hover:bg-rose-700 rounded-md">About</p>
                    </Link>
                </div>
                <div>
                    <Link href="/sign-out">
                        <p className="block py-2 px-4 text-white hover:bg-rose-700 rounded-md">Sign Out</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
