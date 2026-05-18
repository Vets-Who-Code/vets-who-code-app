import Spinner from "@ui/spinner";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { type ReactNode, useEffect } from "react";

type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN" | "MENTOR";

interface ProtectedContentProps {
    children: ReactNode;
    /** Override the default centered-spinner placeholder. */
    fallback?: ReactNode;
    /** When set, signed-in users without this role see a "not authorized" message. */
    requiredRole?: UserRole;
}

/**
 * Wraps a protected page body. While the session resolves and during a
 * redirect to /login, renders `fallback` (default: a centered spinner) — never
 * the page shell. That prevents the flash-of-unauthenticated-content pattern
 * where a page renders fully and then bounces from a `useEffect`.
 *
 * Prefer `requireAuthSSR` in `getServerSideProps` when possible — server-side
 * redirects don't render at all. Use this component only when the page is
 * client-rendered (no `getServerSideProps`) or when an inner section needs
 * gating below an unauthenticated layout.
 */
export default function ProtectedContent({
    children,
    fallback,
    requiredRole,
}: ProtectedContentProps) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            const callbackUrl = encodeURIComponent(router.asPath);
            router.replace(`/login?callbackUrl=${callbackUrl}`);
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
        return <>{fallback ?? <DefaultLoadingFallback />}</>;
    }

    if (requiredRole && session?.user?.role !== requiredRole) {
        return <DefaultUnauthorizedFallback />;
    }

    return <>{children}</>;
}

function DefaultLoadingFallback() {
    return (
        <div className="tw-flex tw-min-h-[60vh] tw-items-center tw-justify-center">
            <Spinner />
        </div>
    );
}

function DefaultUnauthorizedFallback() {
    return (
        <div className="tw-container tw-py-24 tw-text-center">
            <h1 className="tw-mb-3 tw-text-3xl tw-font-bold tw-text-navy">Not authorized</h1>
            <p className="tw-text-navy/70">You don't have access to this section.</p>
        </div>
    );
}
