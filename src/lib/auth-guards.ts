import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/options";

type GuardOk = { ok: true; session: Session };
type GuardRedirect = { ok: false; result: GetServerSidePropsResult<never> };
export type GuardResult = GuardOk | GuardRedirect;

export async function requireAuthSSR(
    context: GetServerSidePropsContext
): Promise<GuardResult> {
    const session = await getServerSession(context.req, context.res, options);

    if (!session?.user) {
        return {
            ok: false,
            result: {
                redirect: {
                    destination: `/login?callbackUrl=${encodeURIComponent(
                        context.resolvedUrl
                    )}`,
                    permanent: false,
                },
            },
        };
    }

    return { ok: true, session };
}

export async function requireAdminSSR(
    context: GetServerSidePropsContext
): Promise<GuardResult> {
    const auth = await requireAuthSSR(context);
    if (!auth.ok) return auth;

    if (auth.session.user.role !== "ADMIN") {
        return {
            ok: false,
            result: {
                redirect: { destination: "/", permanent: false },
            },
        };
    }

    return auth;
}
