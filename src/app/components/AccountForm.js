
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
        <div className="flex justify-center h-screen mt-16">
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={handleInputChange} /><br />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={handleInputChange} /><br />

                <label htmlFor="bio">Bio:</label>
                <textarea id="bio" name="bio" value={bio} onChange={handleInputChange} /><br />

                <label htmlFor="areaOfNeed">Area of Need:</label>
                <input type="text" id="areaOfNeed" name="areaOfNeed" value={areaOfNeed} onChange={handleInputChange} /><br />

                <button type="submit" disabled={isDisabled()}>Update</button>
            </form>
        </div>
    );
}

