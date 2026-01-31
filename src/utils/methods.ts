/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { Dispatch, SetStateAction } from "react";
import { getStartOfDay } from "@utils/date";
import { get } from "ace-builds-internal/config";
import { SectionType, ICourse, IEvent } from "./types";

export const normalizedData = <T extends Record<string, unknown>>(
    data: T[],
    identifier: keyof T
): { [key: string]: SectionType } => {
    return data.reduce(
        (allContent, item) => {
            // Remove null properties and create a new object
            const cleanedObj = Object.entries(item).reduce(
                (acc, [key, value]) => {
                    if (value !== null) {
                        acc[key] = value;
                    }
                    return acc;
                },
                {} as Record<string, unknown>
            );

            // Get the identifier value and ensure it's a string
            const key = String(item[identifier]);

            // Return the accumulated object with the new entry
            return {
                ...allContent,
                [key]: {
                    ...cleanedObj,
                },
            };
        },
        {} as { [key: string]: SectionType }
    );
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

export const isObjectEmpty = (object: { [key: string]: unknown }): boolean => {
    return Object.keys(object).length === 0;
};

export const toCapitalize = (text: string): string => {
    return text.toLowerCase().charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const normalizePath = (path: string): string => {
    return path.startsWith("/") ? path.slice(1) : path;
};

export const courseSorting = (
    sortValue: string,
    courses: ICourse[],
    defaultCourses: ICourse[],
    setSort: Dispatch<SetStateAction<ICourse[]>>
): void => {
    const coursesCopy = [...courses];

    switch (sortValue) {
        case "latest": {
            const sorted = coursesCopy.sort((a, b) =>
                new Date(a.published_at).getTime() > new Date(b.published_at).getTime() ? -1 : 1
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
): void => {
    const todayStart = getStartOfDay().getTime();

    switch (filterValue) {
        case "all": {
            setFilteredEvents(events);
            break;
        }
        case "happening": {
            const filterEvents = events.filter((event) => {
                return getStartOfDay(event.start_date).getTime() === todayStart;
            });
            setFilteredEvents(filterEvents);
            break;
        }
        case "upcoming": {
            const filterEvents = events.filter((event) => {
                return getStartOfDay(event.start_date).getTime() > todayStart;
            });
            setFilteredEvents(filterEvents);
            break;
        }
        case "expired": {
            const filterEvents = events.filter((event) => {
                return getStartOfDay(event.start_date).getTime() < todayStart;
            });
            setFilteredEvents(filterEvents);
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

export const flatDeep = <T>(arr: unknown[], d = 1): T[] => {
    return d > 0
        ? arr.reduce((acc: T[], val) => {
              return acc.concat(Array.isArray(val) ? flatDeep<T>(val, d - 1) : (val as T));
          }, [])
        : (arr.slice() as T[]);
};

export const hasKey = (obj: unknown, key: string): boolean => {
    return !!Object.prototype.hasOwnProperty.call(obj, key);
};

export const getFocusableElements = (parent?: HTMLElement | null): HTMLElement[] => {
    if (!parent) return [];

    return (
        Array.from(
            parent.querySelectorAll("a[href], button, input, textarea, select, details,[tabindex]")
        )
            .filter(
                (el) =>
                    el.getAttribute("tabindex") !== "-1" &&
                    !el.hasAttribute("disabled") &&
                    !el.getAttribute("aria-hidden")
            )
            // sort tabindexes as follows: 1, 2, 3, 4, ..., 0, 0, 0
            .sort((a, b) => {
                const aIndex = Number(a.getAttribute("tabindex")) || 0;
                const bIndex = Number(b.getAttribute("tabindex")) || 0;
                if (aIndex === bIndex) return 0;
                if (aIndex === 0) return 1;
                if (bIndex === 0) return -1;
                return aIndex < bIndex ? -1 : 1;
            }) as HTMLElement[]
    );
};

export const nextFocus = (elements: HTMLElement[], forward = true): void => {
    const currentIndex = elements.findIndex((e) => e === document.activeElement);
    let nextIndex = 0;

    if (currentIndex > -1) {
        if (forward) {
            nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
        } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
        }
    }

    elements[nextIndex]?.focus();
};
