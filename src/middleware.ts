import { type NextRequest, NextResponse } from "next/server";

// Pagination links use `/blogs/blog?page=N`. Serve N >= 2 from the static page/[page] route;
// page 1 and anything non-numeric fall through to the static index. Done here rather than in
// next.config.js rewrites, which would ship client-side rewrite matching to every route.
export function middleware(request: NextRequest) {
    const page = request.nextUrl.searchParams.get("page");
    if (!page || !/^([2-9]|[1-9]\d+)$/.test(page)) return NextResponse.next();

    const url = request.nextUrl.clone();
    url.pathname = `/blogs/blog/page/${page}`;
    url.searchParams.delete("page");
    return NextResponse.rewrite(url);
}

export const config = {
    matcher: "/blogs/blog",
};
