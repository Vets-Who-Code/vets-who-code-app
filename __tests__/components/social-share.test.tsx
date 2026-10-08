import SocialShare from "@components/social-share/layout-03";
import { render, screen } from "@testing-library/react";

vi.mock("next/router", () => ({
    useRouter: () => ({ asPath: "/blogs/beyond-the-resume?utm=x#top" }),
}));

describe("SocialShare", () => {
    it("fills every share link with the encoded canonical URL on first render", () => {
        render(<SocialShare label="Share this post" />);
        const encoded = encodeURIComponent("https://vetswhocode.io/blogs/beyond-the-resume");
        const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
        expect(hrefs).toEqual([
            `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
            `https://twitter.com/intent/tweet?url=${encoded}`,
            `https://www.linkedin.com/shareArticle?url=${encoded}`,
        ]);
    });
});
