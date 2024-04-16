import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="flex h-full">
            <div className="bg-rose-900 w-48 p-4">
                <Link href="/dashboard">
                    <p className="block py-2 px-4 text-white hover:bg-rose-700 rounded-md">Dashboard</p>
                </Link>
                <Link href="/schedule">
                    <p className="block py-2 px-4 text-white hover:bg-rose-700 rounded-md">Schedule</p>
                </Link>
                <Link href="/about">
                    <p className="block py-2 px-4 text-white hover:bg-rose-700 rounded-md">About</p>
                </Link>
                <Link href="/sign-out">
                    <p className="block py-2 px-4 text-white hover:bg-rose-700 rounded-md">Sign Out</p>
                </Link>
            </div>
        </nav>
    )
}
