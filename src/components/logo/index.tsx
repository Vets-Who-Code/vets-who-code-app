import Link from "next/link";
import clsx from "clsx";

type TProps = {
    variant?: "dark" | "light";
    className?: string;
};

const Logo = ({ variant, className }: TProps) => {
    return (
        <Link href="/">
            <a className={clsx("tw-inline-block", className)}>
                {variant === "dark" && (
                    <img
                        src="https://res.cloudinary.com/vetswhocode/image/upload/f_auto/f_auto/f_auto/v1627489505/VWC_Logo_Horizontal_gsxn3h.png"
                        alt="Logo"
                        width={158}
                        height={26}
                    />
                )}
                {variant === "light" && (
                    <img
                        src="https://res.cloudinary.com/vetswhocode/image/upload/f_auto/f_auto/f_auto/v1627489505/VWC_Logo_Horizontal_gsxn3h.png"
                        alt="Logo"
                        width={158}
                        height={26}
                    />
                )}
            </a>
        </Link>
    );
};

export default Logo;
