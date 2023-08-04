import {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback,
    useEffect,
} from "react";

// UI Context

export type UIContextType = {
    trans1: () => { x: number; y: number };
    trans2: () => { x: number; y: number };
};

export const UIContext = createContext({} as UIContextType);

// UI Context Provider

type TProps = {
    children: React.ReactNode;
};

export const UIProvider = ({ children }: TProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const onMouseMove = useCallback((e: MouseEvent) => {
        setMousePosition({
            x: e.clientX - window.innerWidth / 2,
            y: e.clientY - window.innerHeight / 2,
        });
    }, []);

    const trans1 = useMemo(() => {
        return () => ({
            x: (mousePosition.x / 15) * -1,
            y: (mousePosition.y / 15) * -1,
        });
    }, [mousePosition]);

    const trans2 = useMemo(() => {
        return () => ({
            x: mousePosition.x / 15,
            y: mousePosition.y / 15,
        });
    }, [mousePosition]);

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [onMouseMove]);

    const value = useMemo(
        () => ({
            trans1,
            trans2,
        }),
        [trans1, trans2]
    );

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

// UI Context Consumer hooks

export const useUI = () => useContext(UIContext);
