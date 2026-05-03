import type { ServiceShape } from "@data/software-factory";

type Tone = "red" | "gold" | "navy" | "white";

const toneToColor: Record<Tone, string> = {
    red: "#c5203e",
    gold: "#FDB330",
    navy: "#091f40",
    white: "#FFFFFF",
};

type Props = {
    shape: ServiceShape;
    tone?: Tone;
    size?: number;
    className?: string;
};

const ServiceMark = ({ shape, tone = "red", size = 40, className }: Props) => {
    const color = toneToColor[tone];

    const renderShape = () => {
        switch (shape) {
            case "square":
                return <rect x="8" y="8" width="24" height="24" fill={color} />;
            case "halfsquare":
                return (
                    <>
                        <rect
                            x="8"
                            y="8"
                            width="24"
                            height="24"
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                        />
                        <rect x="8" y="8" width="12" height="24" fill={color} />
                    </>
                );
            case "bars":
                return (
                    <>
                        <rect x="8" y="8" width="6" height="24" fill={color} />
                        <rect x="17" y="14" width="6" height="18" fill={color} />
                        <rect x="26" y="20" width="6" height="12" fill={color} />
                    </>
                );
            case "diag":
                return (
                    <>
                        <rect
                            x="8"
                            y="8"
                            width="24"
                            height="24"
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                        />
                        <line x1="8" y1="32" x2="32" y2="8" stroke={color} strokeWidth="2" />
                    </>
                );
            case "cross":
                return (
                    <>
                        <line x1="20" y1="8" x2="20" y2="32" stroke={color} strokeWidth="2" />
                        <line x1="8" y1="20" x2="32" y2="20" stroke={color} strokeWidth="2" />
                    </>
                );
            case "dot":
                return (
                    <>
                        <rect
                            x="8"
                            y="8"
                            width="24"
                            height="24"
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                        />
                        <circle cx="20" cy="20" r="6" fill={color} />
                    </>
                );
            case "stack":
                return (
                    <>
                        <rect x="8" y="8" width="24" height="6" fill={color} />
                        <rect x="8" y="17" width="24" height="6" fill={color} opacity="0.6" />
                        <rect x="8" y="26" width="24" height="6" fill={color} opacity="0.3" />
                    </>
                );
            case "target":
                return (
                    <>
                        <rect
                            x="8"
                            y="8"
                            width="24"
                            height="24"
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                        />
                        <rect
                            x="14"
                            y="14"
                            width="12"
                            height="12"
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                        />
                        <rect x="18" y="18" width="4" height="4" fill={color} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 40 40"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            {renderShape()}
        </svg>
    );
};

export default ServiceMark;
