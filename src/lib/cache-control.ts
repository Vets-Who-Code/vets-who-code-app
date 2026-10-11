import type { NextApiResponse } from "next";

/** Lets the CDN share a response across visitors. Only call on success responses. */
export const setPublicCache = (res: NextApiResponse, sMaxAge: number, swr: number) =>
    res.setHeader("Cache-Control", `public, s-maxage=${sMaxAge}, stale-while-revalidate=${swr}`);
