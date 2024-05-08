import Navbar from "./Navbar"

export default function Header() {
    return(
        <div>
            <div className="flex justify-center p-12 text-white bg-rose-900 text-4xl font-bold">
                Peer Mentor Booking Platform
            </div>
            <div>
                <Navbar />
            </div>
        </div>
    )
}