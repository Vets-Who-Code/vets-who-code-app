// Import necessary components
import type { NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-03";
import Wrapper from "@ui/wrapper/wrapper-02";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";

const Login: NextPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (
            email === "jerome@vetswhocode.io" &&
            password === "yourSecretPassword"
        ) {
            // Update with a secure method for production
            console.log("Login successful");
            router.push("/dashboard"); // Redirect to the dashboard or another page
        } else {
            alert("Access Denied: Incorrect credentials");
        }
    };

    return (
        <Layout>
            <SEO title="Login" />
            <Wrapper className="tw-mb-[140px]">
                <div className="tw-max-w-sm tw-mx-auto tw-p-6 tw-bg-white tw-shadow-md tw-rounded-lg">
                    <h1 className="tw-text-lg tw-font-bold tw-mb-4">Login</h1>
                    <form onSubmit={handleSubmit} className="tw-space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                            >
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:tw-outline-none tw-focus:tw-ring-indigo-500 tw-focus:tw-border-indigo-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                            >
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:tw-outline-none tw-focus:tw-ring-indigo-500 tw-focus:tw-border-indigo-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="tw-w-full tw-flex tw-justify-center tw-py-2 tw-px-4 tw-border tw-border-transparent tw-rounded-md tw-shadow-sm tw-text-sm tw-font-medium tw-text-white tw-bg-secondary tw-hover:bg-primary tw-focus:tw-outline-none tw-focus:tw-ring-2 tw-focus:tw-ring-offset-2 tw-focus:tw-ring-primary"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </Wrapper>
        </Layout>
    );
};

export default Login;
