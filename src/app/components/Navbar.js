import Link from 'next/link';

export default function Navbar() {
    return(
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        About
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    )
}