import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/options";

// Redirect /profile to /profile/[currentUserId]
export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, options);

    if (!session?.user?.id) {
        return {
            redirect: {
                destination: "/login?callbackUrl=/profile",
                permanent: false,
            },
        };
    }

    return {
        redirect: {
            destination: `/profile/${session.user.id}`,
            permanent: false,
        },
    };
};

// This page never renders — it always redirects
export default function ProfileRedirect() {
    return null;
}
