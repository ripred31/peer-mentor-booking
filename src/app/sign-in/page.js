'use client'

import SignInForm from "../components/SignInForm"

export default function SignIn() {

    return(
        <div className="flex flex-col h-screen bg-rose-900">
            <div className="bg-white mx-auto my-16 w-6/12 px-2 py-12">
                <img src="/lhu_logo_hor.png"alt="LHU Logo" className="w-7/12 mx-auto"/>
                <SignInForm />
                <p className="m-auto w-7/12 mt-4 text-xs text-gray-500">This is a private system for use of Commonwealth University Faculty, 
                        Staff, and Students only. Unauthorized access is prohibited</p>
            </div>
        </div>
    )

}