/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";
import { SectionType, ICourse, IEvent } from "./types";

export const normalizedData = <T>(data: T[], identifier: keyof T) => {
    let allContetnt: { [x: string]: SectionType } = {};
    data.forEach((item) => {
        // Remove properties with null value
        const newObj: T = item;
        Object.entries(item).reduce((acc, cur: [string, string]) => {
            const [key, property] = cur;
            if (property === null) {
                return acc;
            }
            return {
                ...acc,
                [key]: property,
            };
        }, {});

        // Store All Content
        const k = newObj[identifier] as unknown as string;

        allContetnt = {
            ...allContetnt,
            [k]: {
                ...newObj,
            },
        };
    });
    return allContetnt;
};

export const slugify = (text: string): string => {
    if (!text) return "";
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
};

export const unslugify = (text: string): string => {
    if (!text) return "";
    return text
        .replace(/-/g, " ") // Replace spaces with -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
};
export const isObjectEmpty = (object: { [key: string]: unknown }) => {
    return Object.keys(object).length === 0;
};

export const toCapitalize = (text: string) => {
    return (
        text.toLowerCase().charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    );
};

export const normalizePath = (path: string) => {
    return path.startsWith("/") ? path.slice(1) : path;
};

export const courseSorting = (
    sortValue: string,
    courses: ICourse[],
    defaultCourses: ICourse[],
    setSort: Dispatch<SetStateAction<ICourse[]>>
) => {
    const cousesCopy = [...courses];

    switch (sortValue) {
        case "latest": {
            const sorted = cousesCopy.sort((a, b) =>
                new Date(a.published_at).getTime() >
                new Date(b.published_at).getTime()
                    ? -1
                    : 1
            );
            setSort(sorted);
            break;
        }
        case "popular": {
            const sorted = cousesCopy.sort((a, b) =>
                a.total_students > b.total_students ? -1 : 1
            );
            setSort(sorted);
            break;
        }
        case "price": {
            const sorted = cousesCopy.sort((a, b) =>
                b.price > a.price ? -1 : 1
            );
            setSort(sorted);
            break;
        }
        case "price-desc": {
            const sorted = cousesCopy.sort((a, b) =>
                a.price > b.price ? -1 : 1
            );
            setSort(sorted);
            break;
        }
        default: {
            setSort(defaultCourses);
        }
    }
};

export const eventFilter = (
    filterValue: string,
    events: IEvent[],
    setFilteredEvents: Dispatch<SetStateAction<IEvent[]>>
) => {
    switch (filterValue) {
        case "all": {
            setFilteredEvents(events);
            break;
        }
        case "happening": {
            const filterEvnts = events.filter((evnt) => {
                return dayjs().isSame(evnt.start_date, "day");
            });
            setFilteredEvents(filterEvnts);
            break;
        }
        case "upcoming": {
            const filterEvnts = events.filter((evnt) => {
                return dayjs().isBefore(evnt.start_date, "day");
            });
            setFilteredEvents(filterEvnts);
            break;
        }
        case "expired": {
            const filterEvnts = events.filter((evnt) => {
                return dayjs().isAfter(evnt.start_date, "day");
            });
            setFilteredEvents(filterEvnts);
            break;
        }
        default:
            setFilteredEvents([]);
            break;
    }
};

export const minutesToHours = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;

    const hoursString = hours > 0 ? `${hours}h ` : "";
    const minutesString = minutesLeft > 0 ? `${minutesLeft}m` : "";

    return `${hoursString}${minutesString}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flatDeep = <T>(arr: any[], d = 1): T[] => {
    return d > 0
        ? arr.reduce((acc, val) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              return acc.concat(
                  Array.isArray(val) ? flatDeep<T>(val, d - 1) : val
              );
          }, [])
        : arr.slice();
};

// Check object has the key or not
export const hasKey = (obj: unknown, key: string): boolean => {
    return !!Object.prototype.hasOwnProperty.call(obj, key);
};

// Get focuseable element
export const getFocusableElements = (
    parent?: HTMLElement | null
): HTMLElement[] => {
    if (!parent) return [];

    return (
        Array.from(
            parent.querySelectorAll(
                "a[href], button, input, textarea, select, details,[tabindex]"
            )
        )
            .filter(
                (el) =>
                    el.getAttribute("tabindex") !== "-1" &&
                    !el.hasAttribute("disabled") &&
                    !el.getAttribute("aria-hidden")
            )
            // sort tabindexes as follows: 1, 2, 3, 4, ..., 0, 0, 0
            .sort((a, b) => {
                const aIndex = Number(a.getAttribute("tabindex")) ?? 0; // no `tabindex` means `tabindex=0` on a focusable element
                const bIndex = Number(b.getAttribute("tabindex")) ?? 0;
                if (aIndex === bIndex) return 0;
                if (aIndex === 0) return 1;
                if (bIndex === 0) return -1;
                return aIndex < bIndex ? -1 : 1;
            }) as HTMLElement[]
    );
};

// Focus on the next focusable element
export const nextFocus = (elements: HTMLElement[], forward = true) => {
    const currentIndex = elements.findIndex(
        (e) => e === document.activeElement
    );
    let nextIndex = 0;

    if (currentIndex > -1) {
        if (forward) {
            nextIndex =
                currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
        } else {
            nextIndex =
                currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
        }
    }

    elements[nextIndex]?.focus();
};
