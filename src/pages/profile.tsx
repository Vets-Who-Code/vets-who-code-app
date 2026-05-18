import type { GetServerSideProps } from "next";
import { requireAuthSSR } from "@/lib/auth-guards";

// Redirect /profile to /profile/[currentUserId]
export const getServerSideProps: GetServerSideProps = async (context) => {
    const auth = await requireAuthSSR(context);
    if (!auth.ok) return auth.result;

    return {
        redirect: {
            destination: `/profile/${auth.session.user.id}`,
            permanent: false,
        },
    };
};

// This page never renders — it always redirects
export default function ProfileRedirect() {
    return null;
}
