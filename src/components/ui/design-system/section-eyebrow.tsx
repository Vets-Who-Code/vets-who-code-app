import clsx from "clsx";

interface Props {
    label: string;
    subLabel?: string;
    tone?: "light" | "dark";
    size?: "sm" | "md";
    align?: "left" | "center";
    className?: string;
}

const SectionEyebrow = ({
    label,
    subLabel,
    tone = "light",
    size = "sm",
    align = "left",
    className,
}: Props) => {
    const labelColor = tone === "dark" ? "tw-text-cream" : "tw-text-[#6C757D]";
    const subColor = tone === "dark" ? "tw-text-[#B9D6F2]/70" : "tw-text-[#495057]";
    const fontSize = size === "md" ? "tw-text-[12px]" : "tw-text-[11px]";

    return (
        <div
            className={clsx(
                "tw-flex tw-items-center tw-gap-3",
                align === "center" && "tw-justify-center",
                className
            )}
        >
            <span aria-hidden="true" className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red" />
            <span
                className={clsx(
                    "tw-font-mono tw-uppercase tw-tracking-[0.12em]",
                    fontSize,
                    labelColor
                )}
            >
                {label}
                {subLabel ? (
                    <>
                        <span className={clsx("tw-mx-2", subColor)}>/</span>
                        <span className={subColor}>{subLabel}</span>
                    </>
                ) : null}
            </span>
        </div>
    );
};

export default SectionEyebrow;
