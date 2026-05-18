import { useEffect, useRef, useState } from "react";

interface Props {
    fill: number; // 0..100
}

const CertBar = ({ fill }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") {
            setWidth(fill);
            return;
        }
        const node = ref.current;
        if (!node) return;
        const obs = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        setWidth(fill);
                        obs.disconnect();
                        break;
                    }
                }
            },
            { threshold: 0.3 },
        );
        obs.observe(node);
        return () => obs.disconnect();
    }, [fill]);

    return (
        <div ref={ref} className="tw-relative tw-h-[3px] tw-w-full tw-bg-cream/10">
            <div
                className="tw-absolute tw-left-0 tw-top-0 tw-h-full tw-bg-accent tw-transition-[width] tw-duration-[600ms] tw-ease-out"
                style={{ width: `${width}%` }}
            />
        </div>
    );
};

export default CertBar;
