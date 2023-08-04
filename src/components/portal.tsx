/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    const targetEl = document.querySelector("#portal") as HTMLElement;

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    if (!targetEl) return <>{children}</>;

    return mounted ? createPortal(children, targetEl) : null;
};

export default Portal;
