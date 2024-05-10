import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@layout/layout-01';
import SEO from '@components/seo/page-seo';
import ProfileForm from '@components/forms/profile-form'; // Ensure this component is also converted to TypeScript
import { useUser } from '@contexts/user-context';
import type { NextPage } from 'next';

interface UserProfileData {
    name: string;
    email: string;
    bio: string;
    profilePicture: File | null;
}

const Profile: NextPage = () => {
    const { user, updateUser } = useUser();
    const router = useRouter();

    const handleSubmit = async (profileData: UserProfileData) => {
        const response = await fetch('/api/updateProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });

        if (response.ok) {
            const updatedUser = await response.json();
            updateUser(updatedUser); // Ensure your context method handles TypeScript types correctly
            router.push('/dashboard'); // Or any other appropriate page
        }
    };

    if (!user) {
        router.push('/login');
        return null;
    }

    return (
        <>
            <SEO title="Edit Profile" />
            <div className="tw-container tw-py-10">
                <ProfileForm user={user} onSubmit={handleSubmit} />
            </div>
        </>
    );
};

Profile.Layout = Layout;

export default Profile;
