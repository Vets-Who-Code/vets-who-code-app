import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useLoadMore = <T>(
    items: T[],
    initialShow: number,
    loadPerClick: number
) => {
    const router = useRouter();
    const [pageNumb, setPageNumb] = useState("1");
    const [hasMore, setHasMore] = useState(true);
    const [itemsToShow, setItemsToShow] = useState<T[]>([]);
    const limit = (+pageNumb - 1) * loadPerClick + initialShow;
    const itemToFetch = +pageNumb > 1 ? limit : initialShow;

    const handlerLoadMore = () => {
        const itemsCopy = [...items];
        const { page } = router.query;
        const pageNumber = page ? `${+page + 1}` : "2";

        void router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    page: pageNumber,
                },
            },
            undefined,
            { scroll: false }
        );

        setPageNumb(pageNumber);
        setItemsToShow(itemsCopy.slice(0, itemToFetch));
        setHasMore(items.length > itemToFetch);
    };
    const { page } = router.query;

    useEffect(() => {
        const pageNumber = (page as string) || "1";
        setPageNumb(pageNumber);
        setItemsToShow(items.slice(0, itemToFetch));
        setHasMore(items.length > itemToFetch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query, pageNumb]);

    return { hasMore, itemsToShow, handlerLoadMore };
};

export default useLoadMore;
