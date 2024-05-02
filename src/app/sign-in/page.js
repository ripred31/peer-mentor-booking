export default function SignIn() {
    return(
        <div className="flex flex-col h-screen bg-rose-900">
            <div className="bg-white mx-auto my-16 w-6/12 px-2 py-12">
                <img src="/lhu_logo_hor.png"alt="LHU Logo" className="w-7/12 mx-auto"/>
                <form className="text-gray-600 mx-auto w-6/12">
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold mb-2 mt-6">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="my-6">
                    <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    </div>
                    <div className="flex items-center justify-between mt-8">
                        <button type="submit" className="bg-rose-700 hover:bg-rose-900 text-white font-bold py-2 px-8 mx-auto focus:outline-none focus:shadow-outline rounded-md">Sign In</button>
                    </div>
                </form>
                <p className="m-auto w-7/12 mt-4 text-xs text-gray-500">This is a private system for use of Commonwealth University Faculty, 
                        Staff, and Students only. Unauthorized access is prohibited</p>
            </div>
        </div>
    )
}