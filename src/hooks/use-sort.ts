import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";

function useSort<T>(
    items: T[],
    sortingCB: (
        sortValue: string,
        items: T[],
        defaultItems: T[],
        setSort: Dispatch<SetStateAction<T[]>>
    ) => void
) {
    const router = useRouter();
    const [sortValue, setSortValue] = useState("");
    const [allItems, setAllItems] = useState(items);
    const defaultItems = useRef<T[]>(items);
    const { sortBy } = router.query;

    const sortHandler = useCallback(() => {
        if (!sortValue) return;
        void router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    sortBy: sortValue,
                },
            },
            undefined,
            { scroll: false }
        );
        sortingCB(sortValue, allItems, defaultItems.current, setAllItems);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortValue]);

    useEffect(() => {
        sortHandler();
    }, [sortHandler]);

    useEffect(() => {
        sortingCB(
            sortBy as string,
            allItems,
            defaultItems.current,
            setAllItems
        );
        setSortValue(sortBy as string);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy]);

    return { sortedItems: allItems, setSortValue, sortValue };
}

export default useSort;
