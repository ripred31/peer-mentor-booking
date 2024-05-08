'use client'
import Header from "../components/Header"
import AccountForm from "../components/AccountForm"

export default function Account() {
    const userID = typeof window !== 'undefined' ? localStorage.getItem('UserID') : null;
    console.log('userID:', userID);

    return(
        <div>
            <Header />
            <div>
                <AccountForm userId={userID}/>
            </div>
        </div>
    )

}