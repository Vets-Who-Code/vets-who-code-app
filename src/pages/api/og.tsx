import { ImageResponse } from "next/og";
import { cardTitle } from "@/lib/og-card";

/**
 * Branded Open Graph card, rendered on demand.
 *
 * /api/og?title=Learn+Software+Engineering
 *
 * Pages without their own artwork (everything but blog posts) point og:image
 * here, so a share shows the page title on brand instead of one stale asset.
 * Deliberately not documented with @swagger — it returns an image, not JSON,
 * and has no place in the API reference.
 */
export const config = { runtime: "edge" };

const NAVY = "#091f40";
const RED = "#c5203e";
const CREAM = "#EEEDE9";
const GOLD = "#FDB330";

const FONT_DIR = "/fonts/gotham";
const SITE_URL = "https://vetswhocode.io";
// Fixed label. Deliberately not a query param: nothing sets one, and every
// attacker-controlled string drawn on first-party branding is a liability.
const EYEBROW = "vetswhocode.io";

/**
 * Fonts are fetched over HTTP because the edge runtime has no filesystem. Only
 * trust the request's own origin for hosts we recognise — otherwise a spoofed
 * Host header would choose where this server sends its requests.
 */
const fontOrigin = (requestOrigin: string) => {
    try {
        const { hostname } = new URL(requestOrigin);
        const trusted =
            hostname === "localhost" ||
            hostname === "127.0.0.1" ||
            hostname === "vetswhocode.io" ||
            hostname.endsWith(".vetswhocode.io") ||
            hostname.endsWith(".vercel.app");
        return trusted ? requestOrigin : SITE_URL;
    } catch {
        return SITE_URL;
    }
};

const loadFont = async (origin: string, file: string) => {
    const res = await fetch(`${origin}${FONT_DIR}/${file}`);
    // arrayBuffer() happily returns an HTML 404 body. Satori then fails *after*
    // ImageResponse has already handed back a 200, so the CDN caches a broken
    // PNG. Fail loudly here instead, while the status code is still ours.
    if (!res.ok) throw new Error(`OG card: font ${file} responded ${res.status}`);
    return res.arrayBuffer();
};

const handler = async (req: Request) => {
    const { searchParams, origin } = new URL(req.url);

    const title = cardTitle(searchParams.get("title"));
    const assetOrigin = fontOrigin(origin);

    const [black, medium] = await Promise.all([
        loadFont(assetOrigin, "GothamPro-Black.ttf"),
        loadFont(assetOrigin, "GothamPro-Medium.ttf"),
    ]);

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: NAVY,
                padding: "64px 72px",
            }}
        >
            {/* Wordmark with the red bar that fronts the brand's headings */}
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 10, height: 44, backgroundColor: RED }} />
                <div
                    style={{
                        marginLeft: 20,
                        fontFamily: "Gotham",
                        fontWeight: 900,
                        fontSize: 30,
                        letterSpacing: "0.06em",
                        color: CREAM,
                    }}
                >
                    VETS WHO CODE
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    fontFamily: "Gotham",
                    fontWeight: 900,
                    fontSize: title.length > 48 ? 68 : 84,
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
                    color: CREAM,
                    textTransform: "uppercase",
                }}
            >
                {title}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ width: 96, height: 4, backgroundColor: GOLD }} />
                <div
                    style={{
                        marginTop: 20,
                        fontFamily: "Gotham",
                        fontWeight: 500,
                        fontSize: 24,
                        letterSpacing: "0.1em",
                        color: "rgba(238, 237, 233, 0.65)",
                        textTransform: "uppercase",
                    }}
                >
                    {EYEBROW}
                </div>
            </div>
        </div>,
        {
            width: 1200,
            height: 630,
            fonts: [
                { name: "Gotham", data: black, weight: 900, style: "normal" },
                { name: "Gotham", data: medium, weight: 500, style: "normal" },
            ],
            headers: {
                "Cache-Control":
                    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
            },
        }
    );
};

export default handler;
