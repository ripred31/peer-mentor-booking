import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Calendar from "../components/Calendar"

export default function Dashboard() {

    return(
        <div className="h-full">
            <Header />
            <main className="flex">
                <Navbar />
                <div>
                    <Calendar />
                    <h1>
                        Hello (user_name)
                    </h1>
                </div>
            </main>
            <Footer />
        </div>
    )

}