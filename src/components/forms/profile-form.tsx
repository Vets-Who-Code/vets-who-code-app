import React, { useState, FormEvent } from 'react';
import type { UserProfile } from '@contexts/user-context'; // Ensure to import or define the UserProfile type

interface ProfileFormProps {
    user: UserProfile;
    onSubmit: (profileData: UserProfile) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSubmit }) => {
    const [profileData, setProfileData] = useState<UserProfile>({ ...user });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(profileData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={profileData.name} onChange={handleChange} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={profileData.email} onChange={handleChange} />
            </div>
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default ProfileForm;
