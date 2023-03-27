import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";

function useFilter<T>(
    items: T[],
    filteringCB: (
        filterValue: string,
        events: T[],
        setFilteredEvents: Dispatch<SetStateAction<T[]>>
    ) => void,
    pathname?: string
) {
    const router = useRouter();
    const [allItems, setAllItems] = useState(items);
    const [value, setValue] = useState("");
    const { type } = router.query;

    const filterHandler = useCallback(() => {
        if (!value) return;
        const { query } = router;
        delete query.page;
        void router.push(
            {
                pathname: pathname || router.pathname,
                query: {
                    ...query,
                    type: value,
                },
            },
            undefined,
            { scroll: false }
        );

        filteringCB(value, items, setAllItems);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
        filterHandler();
    }, [filterHandler]);

    useEffect(() => {
        if (type && typeof type === "string") {
            setValue(type);
            filteringCB(type, items, setAllItems);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    return { filterItems: allItems, setValue, value };
}

export default useFilter;
