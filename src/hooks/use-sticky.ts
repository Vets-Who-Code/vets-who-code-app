import { useState, useEffect, useRef, useCallback } from "react";
import useWindowSize from "./use-window-size";

const useSticky = () => {
    const [headerHeight, setHeaderHeight] = useState(0);
    const [sticky, setSticky] = useState(false);
    const stickyHeight = useRef(0);
    const { width } = useWindowSize();

    useEffect(() => {
        stickyHeight.current = headerHeight * 2;
    }, [headerHeight]);

    const measuredRef = useCallback(
        (node: HTMLDivElement) => {
            if (node !== null) {
                setHeaderHeight(node.getBoundingClientRect().height);
                if (width && width < 1200) {
                    setHeaderHeight(node.getBoundingClientRect().height);
                }
            }
        },
        [width]
    );

    useEffect(() => {
        const scrollHandler = () => {
            const scrollPos = window.scrollY;
            if (scrollPos > stickyHeight.current) {
                setSticky(true);
            }

            if (scrollPos < stickyHeight.current) {
                setSticky(false);
            }
        };

        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, [sticky, stickyHeight]);

    return { sticky, measuredRef, headerHeight };
};

export default useSticky;
