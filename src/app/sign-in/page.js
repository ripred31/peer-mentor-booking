import Header from "../components/Header"

export default function SignIn() {
    return(
        <div className="h-full">
            <Header />
            <div className="flex items-center justify-center mt-28">
                <form className="bg-rose-900 text-white p-12 rounded-md">
                    <p className="font-bold text-xl">Sign In</p>
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold mb-2 mt-6">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="my-6">
                    <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    </div>
                    <div className="flex items-center justify-between mt-8">
                        <button type="submit" className="bg-rose-700 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}