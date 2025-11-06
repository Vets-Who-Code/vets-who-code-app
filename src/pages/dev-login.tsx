import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";

interface DevLoginProps {
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
}

type PageWithLayout = NextPage<DevLoginProps> & {
    Layout?: typeof Layout;
};

const DevLogin: PageWithLayout = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("Dev User");
    const [email, setEmail] = useState("dev@vetswhocode.io");
    const [role, setRole] = useState<"STUDENT" | "INSTRUCTOR" | "ADMIN">("ADMIN");
    const [error, setError] = useState("");

    const handleDevLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/dev-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, role }),
            });

            const data = await response.json();

            if (response.ok) {
                // Set the session cookie
                document.cookie = `next-auth.session-token=${data.sessionToken}; path=/; max-age=${30 * 24 * 60 * 60}`;

                // Redirect to courses page
                router.push("/courses");
            } else {
                setError(data.error || "Failed to login");
            }
        } catch (err) {
            console.error("Dev login error:", err);
            setError("Failed to login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="tw-flex tw-min-h-screen tw-items-center tw-justify-center tw-bg-secondary">
            <div className="tw-w-full tw-max-w-md tw-overflow-hidden tw-rounded-lg tw-bg-white tw-shadow-lg">
                <div className="tw-space-y-3 tw-p-8">
                    <h1 className="tw-text-center tw-text-2xl tw-font-bold tw-text-secondary">
                        Development Login
                    </h1>
                    <p className="tw-text-center tw-text-secondary">
                        Quick bypass for testing the platform
                    </p>
                    <div className="tw-rounded tw-bg-yellow-50 tw-p-3 tw-text-sm tw-text-yellow-600">
                        ⚠️ This is for development only - bypasses GitHub OAuth
                    </div>
                </div>
                <form onSubmit={handleDevLogin} className="tw-space-y-4 tw-p-6">
                    {error && (
                        <div className="tw-rounded tw-bg-red-50 tw-p-3 tw-text-sm tw-text-red-600">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="name" className="tw-mb-1 tw-block tw-text-sm tw-font-medium tw-text-secondary">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="tw-mb-1 tw-block tw-text-sm tw-font-medium tw-text-secondary">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="tw-mb-1 tw-block tw-text-sm tw-font-medium tw-text-secondary">
                            Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value as "STUDENT" | "INSTRUCTOR" | "ADMIN")}
                            className="tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                        >
                            <option value="STUDENT">Student</option>
                            <option value="INSTRUCTOR">Instructor</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-bg-primary tw-px-4 tw-py-3 tw-text-sm tw-font-medium tw-text-white tw-transition-colors hover:tw-opacity-90 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className="tw-h-4 tw-w-4 tw-animate-spin tw-rounded-full tw-border-2 tw-border-white tw-border-t-transparent" />
                                Logging in...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-code" />
                                Login as {role.charAt(0) + role.slice(1).toLowerCase()}
                            </>
                        )}
                    </button>

                    <div className="tw-text-center">
                        <Link
                            href="/login"
                            className="tw-text-sm tw-text-secondary tw-underline hover:tw-opacity-80"
                        >
                            Use GitHub OAuth instead
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

DevLogin.Layout = Layout;

export const getStaticProps: GetStaticProps<DevLoginProps> = () => ({
    props: {
        layout: {
            headerShadow: true,
            headerFluid: false,
            footerMode: "light",
        },
    },
});

export default DevLogin;
