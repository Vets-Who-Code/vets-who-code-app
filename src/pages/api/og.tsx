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

const NAVY_LIFT = "#0f2d5c"; // radial highlight so the field isn't flat

const FONT_DIR = "/fonts/gotham";
const SITE_URL = "https://vetswhocode.io";
// Fixed labels. Deliberately not query params: nothing sets one, and every
// attacker-controlled string drawn on first-party branding is a liability.
const EYEBROW = "Software Engineering Accelerator";
const DOMAIN = "vetswhocode.io";

// The wordmark ships as navy type on transparency, which disappears on a navy
// field. e_colorize repaints it cream; f_png because satori decodes PNG/JPEG,
// and f_auto would hand it a webp.
const LOGO_URL =
    "https://res.cloudinary.com/vetswhocode/image/upload/e_colorize:100,co_rgb:EEEDE9,f_png/v1627489505/VWC_Logo_Horizontal_gsxn3h.png";
const LOGO_W = 300;
const LOGO_H = 75; // 426x107 native, kept to ratio

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

/**
 * Inline the wordmark as a data URI. Satori would happily fetch the URL itself,
 * but then a Cloudinary hiccup takes the whole card down; resolving it here lets
 * the card fall back to a type-only lockup instead of 500ing.
 */
const loadLogo = async (): Promise<string | null> => {
    try {
        const res = await fetch(LOGO_URL);
        if (!res.ok) return null;
        const bytes = new Uint8Array(await res.arrayBuffer());
        let binary = "";
        for (const byte of bytes) binary += String.fromCharCode(byte);
        return `data:image/png;base64,${btoa(binary)}`;
    } catch {
        return null;
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

    const [black, medium, logo] = await Promise.all([
        loadFont(assetOrigin, "GothamPro-Black.ttf"),
        loadFont(assetOrigin, "GothamPro-Medium.ttf"),
        loadLogo(),
    ]);

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: NAVY,
                backgroundImage: `radial-gradient(circle at 78% 18%, ${NAVY_LIFT} 0%, ${NAVY} 58%)`,
            }}
        >
            {/* Full-bleed accent rule: red into gold, the two brand accents */}
            <div
                style={{
                    display: "flex",
                    height: 10,
                    width: "100%",
                    backgroundImage: `linear-gradient(90deg, ${RED} 0%, #d9542f 45%, ${GOLD} 100%)`,
                }}
            />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flex: 1,
                    padding: "58px 72px 62px 72px",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={logo} width={LOGO_W} height={LOGO_H} alt="Vets Who Code" />
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                fontFamily: "Gotham",
                                fontWeight: 900,
                                fontSize: 40,
                                letterSpacing: "-0.01em",
                                color: CREAM,
                            }}
                        >
                            VetsWhoCode
                        </div>
                    )}
                    <div
                        style={{
                            marginTop: 22,
                            fontFamily: "Gotham",
                            fontWeight: 500,
                            fontSize: 21,
                            letterSpacing: "0.16em",
                            color: GOLD,
                            textTransform: "uppercase",
                        }}
                    >
                        {EYEBROW}
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            display: "flex",
                            fontFamily: "Gotham",
                            fontWeight: 900,
                            fontSize: title.length > 48 ? 66 : 82,
                            lineHeight: 1.06,
                            letterSpacing: "-0.02em",
                            color: CREAM,
                            textTransform: "uppercase",
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            marginTop: 26,
                            width: 110,
                            height: 6,
                            backgroundColor: RED,
                        }}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        fontFamily: "Gotham",
                        fontWeight: 500,
                        fontSize: 23,
                        letterSpacing: "0.1em",
                        color: GOLD,
                        textTransform: "uppercase",
                    }}
                >
                    {DOMAIN}
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
