import { useEffect, useState } from "react";

export interface DevSession {
    user: {
        id: string;
        name: string;
        email: string;
        image: string;
        login: string;
    };
}

export function useDevSession() {
    const [session, setSession] = useState<DevSession | null>(null);
    const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">(
        "loading"
    );

    useEffect(() => {
        const stored = localStorage.getItem("dev-session");
        if (stored) {
            try {
                const user = JSON.parse(stored);
                setSession({ user });
                setStatus("authenticated");
            } catch {
                localStorage.removeItem("dev-session");
                setStatus("unauthenticated");
            }
        } else {
            setStatus("unauthenticated");
        }
    }, []);

    const signOut = () => {
        localStorage.removeItem("dev-session");
        setSession(null);
        setStatus("unauthenticated");
    };

    return { data: session, status, signOut };
}
