import React, { useState, useEffect } from 'react';

export default function MentorDropdown({ onMentorSelect }) {
    const [mentors, setMentors] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState('');

    useEffect(() => {
        async function fetchMentors() {
            try {
                const response = await fetch('/api/getAllMentors');
                if (!response.ok) {
                    throw new Error('Failed to fetch mentors');
                }
                const data = await response.json();
                setMentors(data.mentors);
            } catch (error) {
                console.error('Error fetching mentors:', error);
            }
        }

        fetchMentors();
    }, []);

    const handleChange = (event) => {
        setSelectedMentor(event.target.value);
        if (onMentorSelect) {
            onMentorSelect(event.target.value);
        }
    };

    return (
        <div>
            <h1 className="text-white text-xl">Mentor Dropdown</h1>
            <select value={selectedMentor} onChange={handleChange}>
                <option value="">Select a mentor</option>
                {mentors.map((mentor, index) => (
                    <option key={index} value={mentor.mentorID}>{mentor.name}</option>
                ))}
            </select>
        </div>
    );
}
