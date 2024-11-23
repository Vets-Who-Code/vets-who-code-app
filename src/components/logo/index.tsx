import Link from "next/link";
import clsx from "clsx";

type TProps = {
    variant?: "dark" | "light";
    className?: string;
};

const Logo = ({ variant = "dark", className }: TProps) => {
    return (
        <Link href="/" className={clsx("tw-inline-block", className)}>
            {variant === "dark" ? (
                <img
                    src="https://res.cloudinary.com/vetswhocode/image/upload/f_auto,q_auto/v1627489505/VWC_Logo_Horizontal_gsxn3h.png"
                    alt="Logo"
                    width={158}
                    height={26}
                />
            ) : (
                <img
                    src="https://res.cloudinary.com/vetswhocode/image/upload/f_auto,q_auto/v1627489505/VWC_Logo_Horizontal_gsxn3h.png"
                    alt="Logo"
                    width={158}
                    height={26}
                />
            )}
        </Link>
    );
};

export default Logo;
