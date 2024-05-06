import React from 'react';

export default function SignInForm() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch(`/api/signIn?email=${email}&password=${password}`);
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('UserID', data.userId);
                window.location.href = '/dashboard'; // Redirect to dashboard
            } else {
                const errorData = await response.json();
                console.error('Sign-in failed:', errorData.error);
            }
        } catch (error) {
            console.error('Sign-in failed:', error);
        }
    };

    return (
        <form className="text-gray-600 mx-auto w-6/12" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-bold mb-2 mt-6">Email</label>
                <input
                    id="email"
                    name="email"
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
                    name="password"
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
    );
}
