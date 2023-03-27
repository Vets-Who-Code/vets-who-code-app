/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useRef, useState, ElementType } from "react";

function useDynamicIconImport(name: string) {
    const ImportedIconRef = useRef<ElementType>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>();
    useEffect((): void => {
        setLoading(true);
        const importIcon = async (): Promise<void> => {
            try {
                ImportedIconRef.current = (
                    await import(`/src/assets/svgs/${name}.svg`)
                ).default;
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        void importIcon();
    }, [name]);

    return { loading, error, SvgIcon: ImportedIconRef.current };
}

export default useDynamicIconImport;
