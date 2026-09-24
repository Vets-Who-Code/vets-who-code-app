import AuthorMeta from "@components/blog-meta/author";
import EventCard from "@components/event-card/event-01";
import Logo from "@components/logo";
import VideoButton from "@components/ui/video-button";
import Video02 from "@components/ui/video-with-poster/video-02";
import VWCGridCard from "@components/vwc-card";
import ZoomCard from "@components/zoom-card";
import NavItem from "@containers/blog-details/nav-links/nav-item";
import { render, screen } from "@testing-library/react";
import type { IInstructor, ILocation } from "@utils/types";

// An <img alt=""> has role "presentation", so getByRole("img") cannot find it;
// decorative assertions below query the DOM node directly instead.

const LOCATION: ILocation = {
    venue: "Online",
    town: "Nashville",
    city: "Nashville",
    country: "USA",
    zip: "37201",
    latitude: 0,
    longitude: 0,
};

const AUTHOR: IInstructor = {
    id: 1,
    name: "Jerome Hardaway",
    slug: "jerome-hardaway",
    path: "/team/jerome-hardaway",
    url: "https://github.com/jeromehardaway",
    image: { src: "/images/team/jerome.jpg" },
    designation: "Founder",
    bio: "",
    socials: [],
};

describe("image alt fallbacks", () => {
    describe("EventCard (event-01)", () => {
        const props = {
            title: "#VetsWhoCode Drill: Anthony Bartolo",
            path: "/events/drill",
            start_date: "2026-10-01",
            location: LOCATION,
        };

        it("falls back to the event title when the thumbnail has no alt", () => {
            render(<EventCard {...props} thumbnail={{ src: "/images/event/1.jpg" }} />);
            expect(screen.getByRole("img")).toHaveAttribute("alt", props.title);
        });

        it("uses the thumbnail's own alt when provided", () => {
            render(
                <EventCard
                    {...props}
                    thumbnail={{ src: "/images/event/1.jpg", alt: "Speaker at a podium" }}
                />
            );
            expect(screen.getByRole("img")).toHaveAttribute("alt", "Speaker at a podium");
        });
    });

    describe("ZoomCard", () => {
        const props = {
            title: "Team member responsibilities",
            path: "/zoom-meetings/meeting-01",
            meeting_id: "123-456",
            date: "2026-10-01",
            time: "10:00",
            duration: 60,
        };

        it("falls back to the meeting title when the thumbnail has no alt", () => {
            render(<ZoomCard {...props} thumbnail={{ src: "/images/event/13.jpg" }} />);
            expect(screen.getByRole("img")).toHaveAttribute("alt", props.title);
        });

        it("uses the thumbnail's own alt when provided", () => {
            render(
                <ZoomCard
                    {...props}
                    thumbnail={{ src: "/images/event/13.jpg", alt: "Whiteboard session" }}
                />
            );
            expect(screen.getByRole("img")).toHaveAttribute("alt", "Whiteboard session");
        });
    });

    describe("VWCGridCard", () => {
        it("falls back to the card title when the thumbnail has no alt", () => {
            render(<VWCGridCard title="Prework" thumbnail={{ src: "/images/prework.png" }} />);
            expect(screen.getByRole("img")).toHaveAttribute("alt", "Prework");
        });

        it("uses the thumbnail's own alt when provided", () => {
            render(
                <VWCGridCard
                    title="Prework"
                    thumbnail={{ src: "/images/prework.png", alt: "Prework course thumbnail" }}
                />
            );
            expect(screen.getByRole("img")).toHaveAttribute("alt", "Prework course thumbnail");
        });
    });

    describe("AuthorMeta", () => {
        it("keeps the avatar decorative and names the link by the author", () => {
            const { container } = render(<AuthorMeta author={AUTHOR} />);
            expect(container.querySelector("img")).toHaveAttribute("alt", "");
            expect(screen.getByRole("link", { name: AUTHOR.name })).toBeInTheDocument();
        });
    });

    describe("Video02", () => {
        it("keeps the poster decorative when it has no alt", () => {
            const { container } = render(
                <Video02 poster={{ src: "/images/poster.jpg" }} video={{ videoId: "abc123" }} />
            );
            expect(container.querySelector("img")).toHaveAttribute("alt", "");
        });
    });

    describe("VideoButton", () => {
        it("names the button, not the icon", () => {
            const { container } = render(<VideoButton videoId="abc123" />);
            expect(screen.getByRole("button", { name: "Play video" })).toBeInTheDocument();
            expect(container.querySelector("img")).toHaveAttribute("alt", "");
        });
    });

    describe("Logo", () => {
        it("names the home link by the organisation", () => {
            render(<Logo />);
            expect(screen.getByRole("link", { name: "Vets Who Code" })).toHaveAttribute(
                "href",
                "/"
            );
        });
    });

    describe("NavItem", () => {
        // Regression: the old expression parsed as `(image.alt || variant === "prev") ? ... : ...`,
        // so the hover background was announced even when the link already carried the title.
        it.each([
            "prev",
            "next",
        ] as const)("keeps the %s hover background decorative even when image.alt is set", (variant) => {
            const { container } = render(
                <NavItem
                    title="From Combat to Code"
                    path="/blogs/combat-to-code"
                    image={{ src: "/images/combat.jpg", alt: "Marine at a laptop" }}
                    variant={variant}
                />
            );
            expect(container.querySelector("img")).toHaveAttribute("alt", "");
            expect(screen.getByRole("link", { name: "From Combat to Code" })).toBeInTheDocument();
        });
    });
});
