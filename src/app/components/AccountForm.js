
import React, { useEffect, useState } from 'react';

export default function AccountForm({ userId }) {
    const [userInfo, setUserInfo] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [areaOfNeed, setAreaOfNeed] = useState('');
    const [isFormChanged, setFormChanged] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch(`/api/getUserInfo?id=${userId}`);
                const userData = await response.json();
                setUserInfo(userData.userInfo);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    
        fetchUserData();
    }, []);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo?.Name || '');
            setEmail(userInfo?.Email || '');
            setBio(userInfo?.Bio || '');
            setAreaOfNeed(userInfo?.AreaOfNeed || '');
        }
    }, [userInfo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormChanged(true);
        if (name === 'name') setName(value);
        else if (name === 'email') setEmail(value);
        else if (name === 'bio') setBio(value);
        else if (name === 'areaOfNeed') setAreaOfNeed(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/updateUserInfo?id=${userId}&name=${name}&email=${email}&bio=${bio}&areaOfNeed=${areaOfNeed}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Failed to update user information');
            }
            setFormChanged(false);
            console.log('User information updated');
            console.log(userInfo?.Bio)
            
            const userInfoResponse = await fetch(`/api/getUserInfo?id=${userId}`);
            const userData = await userInfoResponse.json();
            setUserInfo(userData.userInfo);
        } catch (error) {
            console.error('Error updating user information:', error);
        }
    };
    
    

    const isDisabled = () => {
        return (
            (name === userInfo?.Name || name.trim() === '') &&
            (email === userInfo?.Email || email.trim() === '') &&
            (bio === userInfo?.Bio || bio.trim() === '') &&
            (areaOfNeed === userInfo?.AreaOfNeed || areaOfNeed.trim() === '')
        );
    };
    

    return (
        <div className="center my-16 m-auto bg-rose-900 w-5/12 p-6 rounded-lg">
            <div className='text-white font-bold text-3xl mb-8'>Account Settings</div>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className="text-rose-100 font-bold mx-2 inline-block text-right w-3/12" htmlFor="name">Name:</label>
                    <input className="pl-1 text-stone-800 rounded-md" type="text" id="name" name="name" value={name} onChange={handleInputChange} /><br />
                </div>

                <div className='mb-4'>
                    <label className="text-rose-100 font-bold mx-2 inline-block text-right w-3/12" htmlFor="email">Email:</label>
                    <input className="pl-1 text-stone-800 rounded-md" type="email" id="email" name="email" value={email} onChange={handleInputChange} /><br />
                </div>
                
                <div className='mb-4'>
                    <label className= "text-rose-100 font-bold mx-2 inline-block text-right w-3/12" htmlFor="bio">Bio:</label>
                    <textarea className="p-1 text-stone-800 min-h-20 min-w-60 rounded-md" id="bio" name="bio" value={bio} onChange={handleInputChange} /><br />
                </div>

                <div className='mb-4'>
                    <label className="text-rose-100 font-bold mx-2 inline-block text-right w-3/12" htmlFor="areaOfNeed">Area of Need:</label>
                    <input className="pl-1 text-stone-800 rounded-md" type="text" id="areaOfNeed" name="areaOfNeed" value={areaOfNeed} onChange={handleInputChange} /><br />
                </div>

                <button className="text-lg text-white border-2 rounded-md  font-bold block ml-auto mr-6 p-2 hover:bg-rose-700" type="submit" disabled={isDisabled()}>Update &raquo;</button>
            </form>
        </div>
    );
}

