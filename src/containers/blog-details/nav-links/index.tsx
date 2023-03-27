import { IBlog } from "@utils/types";
import NavItem from "./nav-item";

type TProps = {
    prevPost?: IBlog;
    nextPost?: IBlog;
};

const NavLinks = ({ prevPost, nextPost }: TProps) => {
    return (
        <div className="tw-mt-[34px] tw-grid md:tw-grid-cols-2 tw-gap-7.5">
            {prevPost && (
                <NavItem
                    title={prevPost.title}
                    path={prevPost.path}
                    image={prevPost.image}
                    variant="prev"
                />
            )}
            {nextPost && (
                <NavItem
                    title={nextPost.title}
                    path={nextPost.path}
                    image={nextPost.image}
                    variant="next"
                />
            )}
        </div>
    );
};

export default NavLinks;
