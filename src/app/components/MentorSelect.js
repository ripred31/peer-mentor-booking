import React, { useState, useEffect } from 'react';

export default function MentorDropdown() {
    const [mentorNames, setMentorNames] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState('');

    useEffect(() => {
        async function fetchMentorNames() {
            try {
                const response = await fetch('/api/getAllMentors');
                if (!response.ok) {
                    throw new Error('Failed to fetch mentor names');
                }
                const data = await response.json();
                setMentorNames(data.mentorNames);
            } catch (error) {
                console.error('Error fetching mentor names:', error);
            }
        }

        fetchMentorNames();
    }, []);

    const handleChange = (event) => {
        setSelectedMentor(event.target.value);
    };

    return (
        <div>
            <h1>Mentor Dropdown</h1>
            <select value={selectedMentor} onChange={handleChange}>
                <option value="">Select a mentor</option>
                {mentorNames.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                ))}
            </select>
            <p>Selected mentor: {selectedMentor}</p>
        </div>
    );
}
