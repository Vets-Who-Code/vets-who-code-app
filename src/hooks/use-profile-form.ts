import { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import type { ProfileFormData, ProfileUser } from "@/types/profile";

const EMPTY_FORM: ProfileFormData = {
    name: "",
    bio: "",
    title: "",
    location: "",
    githubUrl: "",
    linkedinUrl: "",
    websiteUrl: "",
    branch: "",
    rank: "",
    yearsServed: "",
    mos: "",
};

interface Notification {
    type: "success" | "error";
    message: string;
}

interface UseProfileFormReturn {
    formData: ProfileFormData;
    originalFormData: ProfileFormData;
    isEditing: boolean;
    isSaving: boolean;
    isLoading: boolean;
    notification: Notification | null;
    setIsEditing: (editing: boolean) => void;
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
    handleSave: () => Promise<void>;
    handleCancel: () => void;
    dismissNotification: () => void;
}

export default function useProfileForm(user: ProfileUser): UseProfileFormReturn {
    const { data: session } = useSession();
    const [formData, setFormData] = useState<ProfileFormData>(EMPTY_FORM);
    const [originalFormData, setOriginalFormData] = useState<ProfileFormData>(EMPTY_FORM);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState<Notification | null>(null);

    // Keep a ref to formData so handleSave always reads the latest
    const formDataRef = useRef(formData);
    formDataRef.current = formData;

    useEffect(() => {
        async function fetchProfile() {
            if (!session?.user) return;
            try {
                const response = await fetch("/api/user/profile");
                if (response.ok) {
                    const userData = await response.json();
                    const profileData: ProfileFormData = {
                        name: userData.name || user.name || "",
                        bio: userData.bio || "",
                        title: userData.title || "",
                        location: userData.location || "",
                        githubUrl: userData.githubUrl || "",
                        linkedinUrl: userData.linkedinUrl || "",
                        websiteUrl: userData.websiteUrl || "",
                        branch: userData.branch || "",
                        rank: userData.rank || "",
                        yearsServed: userData.yearsServed?.toString() || "",
                        mos: userData.mos || "",
                    };
                    setFormData(profileData);
                    setOriginalFormData(profileData);
                } else {
                    const fallback: ProfileFormData = { ...EMPTY_FORM, name: user.name || "" };
                    setFormData(fallback);
                    setOriginalFormData(fallback);
                }
            } catch {
                const fallback: ProfileFormData = { ...EMPTY_FORM, name: user.name || "" };
                setFormData(fallback);
                setOriginalFormData(fallback);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProfile();
    }, [session, user]);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    const dismissNotification = useCallback(() => setNotification(null), []);

    const handleSave = useCallback(async () => {
        const currentData = formDataRef.current;
        setIsSaving(true);
        try {
            const response = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentData),
            });

            if (response.ok) {
                setIsEditing(false);
                setOriginalFormData(currentData);
                setNotification({ type: "success", message: "Profile updated successfully!" });
                setTimeout(() => setNotification(null), 5000);
            } else {
                const err = await response.json().catch(() => ({}));
                setNotification({
                    type: "error",
                    message: err.error || err.message || "Failed to update profile",
                });
                setTimeout(() => setNotification(null), 8000);
            }
        } catch {
            setNotification({
                type: "error",
                message: "An error occurred while saving your profile",
            });
            setTimeout(() => setNotification(null), 8000);
        } finally {
            setIsSaving(false);
        }
    }, []);

    const handleCancel = useCallback(() => {
        setFormData(originalFormData);
        setIsEditing(false);
    }, [originalFormData]);

    return {
        formData,
        originalFormData,
        isEditing,
        isSaving,
        isLoading,
        notification,
        setIsEditing,
        handleInputChange,
        handleSave,
        handleCancel,
        dismissNotification,
    };
}
